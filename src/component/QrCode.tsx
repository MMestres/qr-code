import QrGenerator from './generator/QrGenerator'
import QrReader from './reader/QrReader'
import './QrCode.css'
import { useState } from 'react'

export default function QrComponent () {
  const [tabActive, setTabActive] = useState<'generator' | 'reader'>('generator')

  const setActive = (tab: 'generator' | 'reader') => {
    setTabActive(tab)
  }

  return (
    <section className="flex flex-col rounded-lg bg-slate-800/40 backdrop-blur-sm w-full sm:w-[350px] shadow-2xl shadow-black/80 h-fit">
      <header className="bg-sky-800 rounded-t-lg">
        <h1 className="text-2xl sm:text-4xl font-bold text-center p-4 sm:py-6">
          QR Code
        </h1>
        <nav className="grid grid-cols-2">
          <button className={`py-2 hover:bg-sky-700 ${tabActive === 'generator' ? 'bg-sky-700' : ''} transition-all duration-500 text-sm sm:text-base`} onClick={() => { setActive('generator') }}>Generator</button>
          <button className={`py-2 hover:bg-sky-700 ${tabActive === 'reader' ? 'bg-sky-700' : ''} transition-all duration-500 text-sm sm:text-base`} onClick={() => { setActive('reader') }}>Reader</button>
        </nav>
      </header>
      {tabActive === 'generator' && <QrGenerator />}
      {tabActive === 'reader' && <QrReader />}
    </section>
  )
};
