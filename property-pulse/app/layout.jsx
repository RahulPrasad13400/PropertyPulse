import '@/assets/styles/globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
    title : 'Propery Pulse',
    keywords : 'rental, property, real estate',
    description : 'Find the perfect rental property'
}

export default function MainLayout({children}) {
  return (
    <AuthProvider>
      <html>
      <body>
        <main>
            <NavBar />
            {children}
            <Footer />
        </main>
      </body>
      </html>
    </AuthProvider>
  )   
}
