import { useState } from 'react'

export const useGenerator = () => {
  const [light, setLight] = useState('#ffffff')
  const [dark, setDark] = useState('#000000')
  const [size, setSize] = useState('400')
  const [text, setText] = useState('')

  const set = (param: 'light' | 'dark' | 'size' | 'text', value: string) => {
    switch (param) {
      case 'light':
        setLight(value)
        break
      case 'dark':
        setDark(value)
        break
      case 'size':
        setSize(value)
        break
      case 'text':
        setText(value)
        break
    }
  }

  const get = (param: 'light' | 'dark' | 'size' | 'text') => {
    switch (param) {
      case 'light':
        return light
      case 'dark':
        return dark
      case 'size':
        return size
      case 'text':
        return text
    }
  }

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${text}&bgcolor=${light.slice(1)}&color=${dark.slice(1)}`

  const urlToObject = async () => {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], 'image.jpg', { type: blob.type })
    return file
  }

  const share = async () => {
    const files = [await urlToObject()]

    try {
      navigator.share({
        title: 'QR Decoded',
        text,
        files
      }).then(() => {}).catch(() => {})
    } catch (err) {
      alert("Your browser doesn't support sharing")
    }
  }

  return {
    get,
    set,
    url,
    share
  }
}
