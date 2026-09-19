import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'kinxly@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

// In-memory rate limit: max 5 messages per hour per IP.
// No database needed — this resets on redeploy, which is fine for a portfolio.
const hits = new Map<string, number[]>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { name, email, topic, message, company } = (body ?? {}) as Record<
    string,
    unknown
  >

  // Honeypot field ("company" is hidden in the form). Bots fill it; humans don't.
  if (typeof company === 'string' && company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json(
      { error: 'A valid email is required.' },
      { status: 400 },
    )
  }
  if (typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'Input too long.' }, { status: 400 })
  }
  const subject =
    typeof topic === 'string' && topic.trim()
      ? topic.trim().slice(0, 80)
      : 'General Inquiry'

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429 },
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured yet.' },
      { status: 500 },
    )
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `[${subject}] Inquiry from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${subject}\n\n${message.trim()}`,
    })
    if (error) {
      return NextResponse.json(
        { error: 'Could not deliver the message. Please try again.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: 'Could not deliver the message. Please try again.' },
      { status: 502 },
    )
  }
}
