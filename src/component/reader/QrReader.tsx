import { useReader } from './useReader'

interface Props {
  className?: string
}

export default function QrReader ({
  className = ''
}: Props) {
  const reader = useReader()

  return <section className={`${className} flex flex-col gap-4 pt-8 sm:pt-10 overflow-hidden relative transition-all duration-500`}>
    <div className="flex flex-col gap-4 px-4 sm:px-8 mb-4 sm:mb-8 items-center justify-center text-center">
      <input ref={reader.refInputFile} type="file" hidden onChange={reader.onChangeFile} />
      <div className="w-full grid place-content-center aspect-square cursor-pointer" onClick={reader.onClickSelect}>
        <img ref={reader.refImageFile} src="#" alt="" className="max-w-full rounded-lg" />
        {reader.isEmpty && <div className="text-sky-800/60">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-sky-800/60" width="200" height="200" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M12 11v6" /><path d="M9.5 13.5l2.5 -2.5l2.5 2.5" /></svg>
        </div>}
      </div>
      <textarea
        name="result"
        className="w-full resize-none h-20 sm:h-24 outline-none ring-0 bg-transparent border border-sky-800/60 rounded-lg p-2  text-sm sm:text-base"
        value={reader.result}
        spellCheck={false}
        disabled />
    </div>
    <footer className="grid grid-cols-2 rounded-t-lg place-content-center">
      <button ref={reader.refCopyButton} onClick={reader.copy} className="bg-sky-800 hover:bg-sky-700 text-center py-2 rounded-bl-lg transition-all duration-500 text-sm sm:text-base flex flex-row items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
        <span>Copy</span>
      </button>
      <button onClick={reader.share} className="bg-sky-800 hover:bg-sky-700 text-center py-2 rounded-br-lg transition-all duration-500 text-sm sm:text-base flex flex-row items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4"viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 4v4c-6.575 1.028 -9.02 6.788 -10 12c-.037 .206 5.384 -5.962 10 -6v4l8 -7l-8 -7z" /></svg>
        Share
      </button>
    </footer>
  </section>
}
