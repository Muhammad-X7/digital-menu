// app/layout.jsx
// Root layout — Server Component.
// Next.js requires a root layout even when locale layouts handle the <html>
// tag. This thin wrapper simply renders children and does no work itself.
export default function RootLayout({ children }) {
    return children;
}