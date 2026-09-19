// Ambient declaration for global stylesheet side-effect imports
// (e.g. `import './globals.css'` in app/layout.tsx).
// Next.js only ships declarations for `*.module.css` / `*.module.scss`,
// so editors and stricter TS setups flag plain `.css` imports without this.
declare module '*.css'
