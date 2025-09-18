import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Admin endpoints disabled from DB; return safe placeholders
  const url = new URL(request.url)
  const type = url.searchParams.get('type') || 'all'

  if (type === 'contacts') {
    return NextResponse.json({ contacts: [] })
  }

  if (type === 'analytics') {
    return NextResponse.json({
      eventCounts: {
        page_view: 0,
        project_click: 0,
        section_view: 0,
        contact_click: 0,
      },
      recentEvents: [],
      totalEvents: 0,
    })
  }

  return NextResponse.json({
    totalContacts: 0,
    totalAnalyticsEvents: 0,
    lastUpdated: new Date().toISOString(),
  })
}

