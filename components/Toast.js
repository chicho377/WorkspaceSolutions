import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  const icons = { success: '✓', error: '✕', info: 'ℹ' }

  return (
    <div className={`toast ${type}`}>
      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{icons[type]}</span>
      {message}
    </div>
  )
}
