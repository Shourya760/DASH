import { useEffect, useState } from 'react'

/**
 * Animates integer from 0 to `end` when `active` becomes true (e.g. section in view).
 */
export function useCountUp(end, { duration = 2200, active = true } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active || end <= 0) {
      setValue(0)
      return
    }
    let startTime
    let frame
    const step = (now) => {
      if (startTime === undefined) startTime = now
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - p) ** 3
      setValue(Math.round(eased * end))
      if (p < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [end, duration, active])

  return value
}
