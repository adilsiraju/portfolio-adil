import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Analytics disabled: accept and ignore to avoid client errors
  try {
    // Best-effort parse to avoid body stream lock on some runtimes
    await request.json().catch(() => undefined)
  } catch {}
  return NextResponse.json({ success: true, analytics: 'disabled' })
}

export async function GET() {
  // Return static zeros while analytics is disabled
  return NextResponse.json({
    overview: {
      totalPageViews: 0,
      projectClicks: 0,
      sectionViews: 0,
      contactClicks: 0,
      downloads: 0,
      todayViews: 0,
    },
    projects: {},
    sections: {},
    analytics: 'disabled',
  })
}

