'use client'

import { useCallback } from 'react'

export const useAnalytics = () => {
  // Analytics disabled: provide no-op functions to avoid network/DB calls
  const trackEvent = useCallback(async (_event: string, _data?: Record<string, unknown>) => {
    void _event; void _data
    return
  }, [])

  const trackPageView = useCallback(async (_page: string) => {
    void _page
    return
  }, [])

  const trackSectionView = useCallback(async (_section: string) => {
    void _section
    return
  }, [])

  const trackProjectClick = useCallback(async (_project: string) => {
    void _project
    return
  }, [])

  const trackSocialLinkClick = useCallback(async (_platform: string, _url: string) => {
    void _platform; void _url
    return
  }, [])

  return {
    trackEvent,
    trackPageView,
    trackSectionView,
    trackProjectClick,
    trackSocialLinkClick,
  }
}
