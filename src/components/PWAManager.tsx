'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone, Monitor } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PWAManager = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope)
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error)
        })
    }

    // Check if already running as PWA
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as { standalone?: boolean }).standalone ||
      document.referrer.includes('android-app://')
    
    setIsStandalone(isStandaloneMode)

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show install prompt after user has been on site for 30 seconds
      setTimeout(() => {
        if (!isStandaloneMode) {
          setShowInstallPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully')
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice
    
    if (choiceResult.outcome === 'accepted') {
      console.log('✅ User accepted PWA install')
    } else {
      console.log('❌ User dismissed PWA install')
    }
    
    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  // Don't show if already installed or running as PWA
  if (isStandalone) return null

  return (
    <>
      {/* Install Prompt Banner */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  {isIOS ? <Smartphone className="w-5 h-5 text-white" /> : <Monitor className="w-5 h-5 text-white" />}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">
                    Install Portfolio App
                  </h3>
                  <p className="text-white/80 text-xs mb-3">
                    {isIOS 
                      ? 'Add to Home Screen for the best experience'
                      : 'Get faster access and offline viewing'
                    }
                  </p>
                  
                  <div className="flex gap-2">
                    {isIOS ? (
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 text-center py-2 px-3 bg-white/20 rounded-lg text-white text-xs font-medium"
                      >
                        Share → Add to Home Screen
                      </motion.div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleInstallClick}
                        className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-white/20 rounded-lg text-white text-xs font-medium hover:bg-white/30 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Install
                      </motion.button>
                    )}
                    
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowInstallPrompt(false)}
                      className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Status Indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 text-xs">
          <div className={`px-2 py-1 rounded text-white ${
            isStandalone ? 'bg-green-500' : 'bg-gray-500'
          }`}>
            {isStandalone ? 'PWA Mode' : 'Browser Mode'}
          </div>
        </div>
      )}
    </>
  )
}

export default PWAManager