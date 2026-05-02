/** Short confirmation beep for practice EVM (no external asset). */
export function playVoteBeep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.setValueAtTime(0.12, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    o.start(ctx.currentTime)
    o.stop(ctx.currentTime + 0.15)
  } catch {
    /* ignore */
  }
}
