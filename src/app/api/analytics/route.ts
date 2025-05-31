import { NextRequest, NextResponse } from 'next/server'
import { redisClient } from '@/lib/redis'

interface AnalyticsEvent {
  type: 'page_view' | 'project_click' | 'section_view' | 'download' | 'contact_click'
  page?: string
  section?: string
  project?: string
  timestamp: string
  userAgent?: string
  referer?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, page, section, project } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }

    // Create analytics event
    const event: AnalyticsEvent = {
      type,
      page,
      section,
      project,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined
    }

    // Generate unique event ID
    const eventId = `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`    // Store event
    await redisClient.hSet(`analytics:event:${eventId}`, {
      type: event.type,
      page: event.page || '',
      section: event.section || '',
      project: event.project || '',
      timestamp: event.timestamp,
      userAgent: event.userAgent || '',
      referer: event.referer || ''
    })

    // Update counters
    await redisClient.incr(`analytics:${type}:total`)
    
    if (page) {
      await redisClient.incr(`analytics:page:${page}`)
    }
    
    if (section) {
      await redisClient.incr(`analytics:section:${section}`)
    }
    
    if (project) {
      await redisClient.incr(`analytics:project:${project}`)
    }

    // Track daily stats
    const today = new Date().toISOString().split('T')[0]
    await redisClient.incr(`analytics:daily:${today}`)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Get analytics summary
    const pageViews = await redisClient.get('analytics:page_view:total') || 0
    const projectClicks = await redisClient.get('analytics:project_click:total') || 0
    const sectionViews = await redisClient.get('analytics:section_view:total') || 0
    const contactClicks = await redisClient.get('analytics:contact_click:total') || 0
    const downloads = await redisClient.get('analytics:download:total') || 0

    // Get today's stats
    const today = new Date().toISOString().split('T')[0]
    const todayViews = await redisClient.get(`analytics:daily:${today}`) || 0    // Get popular projects
    const projects = ['ecovest', 'password-manager']
    const projectStats: Record<string, number> = {}
    
    for (const project of projects) {
      const count = await redisClient.get(`analytics:project:${project}`) || 0
      projectStats[project] = count as number
    }

    // Get popular sections
    const sections = ['about', 'experience', 'education', 'projects', 'contact']
    const sectionStats: Record<string, number> = {}
    
    for (const section of sections) {
      const count = await redisClient.get(`analytics:section:${section}`) || 0
      sectionStats[section] = count as number
    }

    return NextResponse.json({
      overview: {
        totalPageViews: pageViews,
        projectClicks,
        sectionViews,
        contactClicks,
        downloads,
        todayViews
      },
      projects: projectStats,
      sections: sectionStats
    })

  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

