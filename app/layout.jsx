import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main className="p-4">{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
