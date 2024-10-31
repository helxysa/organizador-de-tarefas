import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Organizador de tarefas",
  description: "Organiza as suas tarefas de forma eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased   `}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}