'use client'

import { useCallback } from 'react'

interface AnalyticsEvent {
  event: string
  data?: Record<string, any>
}

export const useAnalytics = () => {
  const trackEvent = useCallback(async (event: string, data?: Record<string, any>) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          data: {
            ...data,
            timestamp: new Date().toISOString(),
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
            url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }, [])

  const trackPageView = useCallback(async (page: string) => {
    await trackEvent('page_view', { page })
  }, [trackEvent])

  const trackSectionView = useCallback(async (section: string) => {
    await trackEvent('section_view', { section })
  }, [trackEvent])

  const trackProjectClick = useCallback(async (project: string) => {
    await trackEvent('project_click', { project })
  }, [trackEvent])

  const trackContactFormSubmit = useCallback(async () => {
    await trackEvent('contact_form_submit')
  }, [trackEvent])

  const trackSocialLinkClick = useCallback(async (platform: string, url: string) => {
    await trackEvent('social_link_click', { platform, url })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackSectionView,
    trackProjectClick,
    trackContactFormSubmit,
    trackSocialLinkClick,
  }
}
