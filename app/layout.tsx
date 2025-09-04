export const metadata = {
  title: 'PDF Generator API',
  description: 'PDF Generation Service for Signature Furniture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}