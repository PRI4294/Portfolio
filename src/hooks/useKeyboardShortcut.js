import { useEffect } from 'react'

/**
 * Lightweight global keyboard-shortcut hook.
 * Combo example: { key: 'k', meta: true } → Cmd+K (or Ctrl+K on Windows).
 */
export function useKeyboardShortcut(combo, handler) {
  useEffect(() => {
    const onKey = (e) => {
      const targetKey = (combo.key || '').toLowerCase()
      if (e.key.toLowerCase() !== targetKey) return
      if (combo.meta && !(e.metaKey || e.ctrlKey)) return
      if (combo.shift && !e.shiftKey) return
      if (combo.alt && !e.altKey) return
      e.preventDefault()
      handler(e)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [combo.key, combo.meta, combo.shift, combo.alt, handler])
}
