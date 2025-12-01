"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"

type CelebrationConfettiProps = {
  durationMs?: number
  message?: string
}

export default function CelebrationConfetti({
  durationMs = 8000,
  message = "Celebrating 12 Years!",
}: CelebrationConfettiProps) {
  const [show, setShow] = useState(false)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Check if today is December 1
    const today = new Date()
    const isDecember1 =
      today.getMonth() === 11 && // December is 11 (0-indexed)
      today.getDate() === 1

    if (!isDecember1) return // Do nothing if not Dec 1

    setShow(true)

    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    update()
    window.addEventListener("resize", update)

    const timer = setTimeout(() => setShow(false), durationMs)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", update)
    }
  }, [durationMs])

  if (!show) return null

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      <Confetti width={size.width} height={size.height} numberOfPieces={300} recycle={false} />
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          color: "#fff",
          padding: "16px 28px",
          borderRadius: 9999,
          fontWeight: 700,
          fontSize: 18,
          boxShadow: "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          letterSpacing: "0.5px",
          pointerEvents: "auto",
        }}
      >
        {message}
      </div>
    </div>
  )
}
