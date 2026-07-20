import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cashipro - Modern Trading Platform',
  description: 'Next-generation digital asset trading platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0f172a', color: '#f8fafc', margin: 0, fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
