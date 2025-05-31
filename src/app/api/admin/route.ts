import { NextRequest, NextResponse } from 'next/server'
import { redisClient } from '@/lib/redis'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const type = url.searchParams.get('type') || 'all'
      if (type === 'contacts') {
      // Get contact submissions from the list
      const submissionIds = await redisClient.lRange('contact:submissions', 0, -1) // All submissions
      const contacts = await Promise.all(
        submissionIds.map(async (id: string) => {
          const data = await redisClient.hGetAll(`contact:${id}`) as Record<string, string>
          return {
            id,
            timestamp: data.timestamp || '',
            name: data.name || '',
            email: data.email || '',
            message: data.message || ''
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
      // Get analytics summary from counters
      const pageViews = await redisClient.get('analytics:page_view:total') || 0
      const projectClicks = await redisClient.get('analytics:project_click:total') || 0
      const sectionViews = await redisClient.get('analytics:section_view:total') || 0
      const contactClicks = await redisClient.get('analytics:contact_click:total') || 0

      const eventCounts = {
        'page_view': Number(pageViews),
        'project_click': Number(projectClicks),
        'section_view': Number(sectionViews),
        'contact_click': Number(contactClicks)
      }

      const totalEvents = Object.values(eventCounts).reduce((sum, count) => sum + count, 0)

      return NextResponse.json({ 
        eventCounts,
        recentEvents: [], // We'll implement this if needed
        totalEvents
      })
    }    // Get summary of both
    const totalSubmissions = await redisClient.get('stats:total_submissions') || 0
    
    return NextResponse.json({
      totalContacts: Number(totalSubmissions),
      totalAnalyticsEvents: 0, // Will be calculated from counters
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

