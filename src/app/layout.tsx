import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Portfolio | Frontend Developer",
  description: "Personal portfolio showcasing projects, skills, and experience in modern web development.",
  keywords: ["portfolio", "frontend developer", "react", "next.js", "typescript"],
  openGraph: {
    type: "website",
    title: "Portfolio | Frontend Developer",
    description: "Personal portfolio showcasing projects, skills, and experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a2e',
              color: '#f8fafc',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '12px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            },
            success: {
              iconTheme: { primary: '#8b5cf6', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  );
}
