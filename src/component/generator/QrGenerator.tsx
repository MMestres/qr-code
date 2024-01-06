import { useState } from 'react'
import { useGenerator } from './useGenerator'

interface Props {
  className?: string
}

export default function QrGenerator ({
  className = ''
}: Props) {
  const [confOpen, setConfOpen] = useState(false)
  const generator = useGenerator()

  return <section className={`flex flex-col gap-4 ${confOpen ? 'pt-16' : 'pt-8 sm:pt-10'} overflow-hidden relative transition-all duration-500 ${className}`}>
    <div className={`rounded-b-lg absolute left-0 right-0 ${confOpen ? 'top-0' : '-top-8'} transition-all duration-500`}>
      <div className="grid grid-cols-3 h-7 border-none">
        <input
          type="color"
          name="light"
          value={generator.get('light')}
          className="r-l bg-transparent w-full h-full"
          onChange={(e) => { generator.set('light', e.target.value) }} />
        <input
          type="color"
          name="dark"
          value={generator.get('dark')}
          className="bg-transparent w-full h-full"
          onChange={(e) => { generator.set('dark', e.target.value) }} />
        <select
          name="size"
          className="w-full h-full outline-none ring-0 border-none p-1 bg-slate-800 text-xs sm:text-sm"
          value={generator.get('size')}
          onChange={(e) => { generator.set('size', e.target.value) }}>
          {[...Array(10)].map((_, i) => {
            const sizeO = (i + 1) * 100
            return <option key={i} value={sizeO}>{sizeO}x{sizeO}</option>
          })}
        </select>
      </div>
      <button
        className="w-full text-center p-1 text-xs hover:bg-sky-800 transition-all duration-500 rounded-b-lg"
        onClick={() => { setConfOpen((open) => !open) }}>
        Configure
      </button>
    </div>
    <div className="flex flex-col gap-4 px-4 sm:px-8 mb-4 sm:mb-8">
      <textarea
        name="text"
        className="w-full resize-none h-20 sm:h-24 outline-none ring-0 bg-transparent border border-sky-800/60 rounded-lg p-2 placeholder:text-sky-200/60 placeholder:font-light text-sm sm:text-base"
        placeholder="Enter text to encode"
        onChange={(e) => { generator.set('text', e.target.value) }}
        value={generator.get('text')} />
      <div className="w-full grid place-content-center aspect-square">
        {generator.get('text') != null && generator.get('text') !== '' && <img src={generator.url} alt="QR Code" className="max-w-full rounded-lg" />}
        {!(generator.get('text') != null && generator.get('text') !== '') && <svg xmlns="http://www.w3.org/2000/svg" className="text-sky-800/60" width="200" height="200" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4h1a1 1 0 0 1 1 1v1m-.297 3.711a1 1 0 0 1 -.703 .289h-4a1 1 0 0 1 -1 -1v-4c0 -.275 .11 -.524 .29 -.705" /><path d="M7 17v.01" /><path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M7 7v.01" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M17 7v.01" /><path d="M20 14v.01" /><path d="M14 14v3" /><path d="M14 20h3" /><path d="M3 3l18 18" /></svg>}
      </div>
    </div>
    <footer className="grid grid-cols-2 rounded-t-lg place-content-center">
      <a download href={generator.url} target="_blank" className="bg-sky-800 hover:bg-sky-700 text-center py-2 rounded-bl-lg transition-all duration-500 text-sm sm:text-base flex flex-row items-center justify-center gap-2" rel="noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
        Download
      </a>
      <button onClick={() => { generator.share().catch(() => {}) }} className="bg-sky-800 hover:bg-sky-700 text-center py-2 rounded-br-lg transition-all duration-500 text-sm sm:text-base flex flex-row items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4"viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" /></svg>
        Share
      </button>
    </footer>
  </section>
}
