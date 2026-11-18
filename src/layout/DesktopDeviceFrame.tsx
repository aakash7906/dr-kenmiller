import React, { useState, useEffect, useRef } from 'react'

interface DesktopDeviceFrameProps {
  children: React.ReactNode
}

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  // 1. Detect if running inside an iframe (prevents infinite recursion)
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top

  // 2. Track screen width (Mobile/Tablet < 768px vs Desktop >= 768px)
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768
  })

  const [deviceScale, setDeviceScale] = useState<number>(1)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)

      // Auto-fit device scale to vertically fit the desktop screen without outer page scrolling
      if (desktop) {
        const availableHeight = window.innerHeight - 48
        const deviceHeight = 860
        if (availableHeight < deviceHeight) {
          const scale = Math.max(0.65, Math.min(1, availableHeight / deviceHeight))
          setDeviceScale(Number(scale.toFixed(2)))
        } else {
          setDeviceScale(1)
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 3. Bi-Directional History & Popstate Sync: Desktop browser Back/Forward navigates the iframe
  useEffect(() => {
    if (isInsideIframe || !isDesktop) return

    const handlePopState = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.location.replace(window.location.href)
        } catch {
          // Cross-origin fallback
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isInsideIframe, isDesktop])

  // If on actual mobile device (< 768px) OR already running inside the iframe:
  // Render children directly in 100% native full-screen mobile mode with zero frame overhead!
  if (isInsideIframe || !isDesktop) {
    return <>{children}</>
  }

  // Initial path for iframe source
  const initialPath = typeof window !== 'undefined'
    ? `${window.location.pathname}${window.location.search}${window.location.hash}`
    : '/'

  return (
    <div
      className="min-h-screen h-screen w-full flex items-center justify-center overflow-hidden relative select-none"
      style={{
        background: 'linear-gradient(135deg, #DAE9FE 0%, #F6F7FC 48%, #E7E0FF 100%)'
      }}
    >
      {/* Centered Device Container with Dynamic Fit Scale */}
      <div
        className="relative transition-transform duration-300 origin-center"
        style={{ transform: `scale(${deviceScale})` }}
      >
        {/* Sleek iPhone Frame with balanced bezel & slightly sharper corners */}
        <div className="relative w-[393px] h-[852px] bg-[#0A0A0C] rounded-[38px] p-[5px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.36),0_8px_20px_-4px_rgba(0,0,0,0.18)] border border-[#1C1C20]">
          
          {/* Subtle Top Ear Speaker Micro-Slit */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-11 h-[2px] bg-[#222226] rounded-full pointer-events-none z-30" />

          {/* Inner Display Screen Area */}
          <div className="relative w-full h-full bg-white rounded-[33px] overflow-hidden shadow-inner flex flex-col">
            
            {/* The Isolated Viewport <iframe> with standard iPhone viewport */}
            <iframe
              ref={iframeRef}
              src={initialPath}
              title="Dr. Ken Miller Dental Clinic Mobile Viewport"
              className="w-full h-full border-0 select-auto bg-white no-scrollbar"
              style={{
                colorScheme: 'light',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
