export const metadata = {
  title: 'Genie - Your Personal AI Assistant',
  description: 'The AI assistant that helps you with everything',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/genie-background.jpg" type="image/jpeg" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {children}
      </body>
    </html>
  )
}
