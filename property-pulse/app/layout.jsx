import '@/assets/styles/globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import '@/assets/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

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
            <NavBar />
              <main>
              {children}
              </main>
            <Footer />
            <ToastContainer  position='top-center'  />
      </body>
      </html>
    </AuthProvider>
  )   
}
