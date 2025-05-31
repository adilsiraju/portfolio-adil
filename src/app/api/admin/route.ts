import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface ContactData {
  timestamp: string
  name: string
  email: string
  message: string
}

interface AnalyticsData {
  timestamp: string
  event: string
  data?: Record<string, any>
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'all'

    if (type === 'contacts') {
      // Get all contact submissions
      const contactKeys = await kv.keys('contact:*')
      const contacts = await Promise.all(
        contactKeys.map(async (key) => {
          const data = await kv.get(key) as ContactData
          return {
            id: key,
            ...data
          }
        })
      )
      
      return NextResponse.json({ 
        contacts: contacts.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      })
    }

    if (type === 'analytics') {
      // Get analytics summary
      const analyticsKeys = await kv.keys('analytics:*')
      const analytics = await Promise.all(
        analyticsKeys.map(async (key) => {
          const data = await kv.get(key) as AnalyticsData
          return {
            id: key,
            ...data
          }
        })
      )

      // Group analytics by event type
      const eventCounts = analytics.reduce((acc: Record<string, number>, event: AnalyticsData) => {
        const eventType = event.event
        acc[eventType] = (acc[eventType] || 0) + 1
        return acc
      }, {})

      // Recent analytics events (last 50)
      const recentEvents = analytics
        .sort((a: AnalyticsData, b: AnalyticsData) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 50)

      return NextResponse.json({ 
        eventCounts,
        recentEvents,
        totalEvents: analytics.length
      })
    }

    // Get summary of both
    const contactKeys = await kv.keys('contact:*')
    const analyticsKeys = await kv.keys('analytics:*')
    
    return NextResponse.json({
      totalContacts: contactKeys.length,
      totalAnalyticsEvents: analyticsKeys.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}
