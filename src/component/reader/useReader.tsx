import { useRef, useState, type ChangeEvent } from 'react'

export const useReader = () => {
  const refInputFile = useRef<HTMLInputElement>(null)
  const refImageFile = useRef<HTMLImageElement>(null)
  const refCopyButton = useRef<HTMLButtonElement>(null)
  const [result, setResult] = useState('Upload a image for scan')
  const [isEmpty, setEmpty] = useState(true)

  const onClickSelect = () => {
    refInputFile.current?.click()
  }
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file)
    if (file == null) return

    const formData = new FormData()
    formData.append('file', file)

    refImageFile.current?.setAttribute('src', URL.createObjectURL(file))
    setEmpty(false)
    setResult('Scanning QR Code...')

    fetch('http://api.qrserver.com/v1/read-qr-code/', {
      method: 'POST', body: formData
    }).then(async res => await res.json()).then(result => {
      result = result[0].symbol[0].data
      if (result != null) {
        setResult(result as string)
      } else {
        setResult('Couldn\'t Scan QR Code...')
      }
    }).catch(() => {
      setResult('Couldn\'t Scan QR Code...')
    })
  }

  const copy = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        refCopyButton.current?.style.setProperty('background-color', 'green')
        const span = refCopyButton.current?.querySelector('span')
        if (span != null) {
          span.innerHTML = 'Copied !'
        }

        setTimeout(() => {
          refCopyButton.current?.style.removeProperty('background-color')
          if (span != null) {
            span.innerHTML = 'Copy'
          }
        }, 3000)
      })
      .catch(() => {})
  }

  const share = () => {
    try {
      navigator.share({
        title: 'QR Decoded',
        text: result
      }).then(() => {
        alert('Shared')
      }).catch(() => {})
    } catch (err) {
      alert("Your browser doesn't support sharing")
    }
  }

  return {
    refInputFile,
    refImageFile,
    refCopyButton,
    share,
    copy,
    onClickSelect,
    onChangeFile,
    isEmpty,
    result
  }
}
