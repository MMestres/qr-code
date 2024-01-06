import { Footer } from './Footer'
import QrComponent from './component/QrCode'

function App () {
  return <div className="min-w-[320px] relative">
    <main className="z-10 w-screen min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <QrComponent />
      <Footer github='https://github.com/MMestres/qr-code' />
    </main>
  </div>
}

export default App
