import { NextRequest, NextResponse } from 'next/server'
import { redisClient } from '@/lib/redis'

interface ContactFormData {
  name: string
  email: string
  message: string
  timestamp: string
  id: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create submission data
    const submission: ContactFormData = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString()    }    // Store in Redis
    await redisClient.hSet(`contact:${submission.id}`, {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      timestamp: submission.timestamp
    })
    
    // Add to submissions list for easy retrieval
    await redisClient.lPush('contact:submissions', submission.id)
    
    // Increment total submissions counter
    await redisClient.incr('stats:total_submissions')

    console.log('Contact form submission saved:', submission.id)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        id: submission.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {    // Get recent submissions (for admin use)
    const submissionIds = await redisClient.lRange('contact:submissions', 0, 9) // Last 10
    const submissions = []

    for (const id of submissionIds) {
      const submission = await redisClient.hGetAll(`contact:${id}`)
      if (submission) {
        submissions.push(submission)
      }
    }

    const totalSubmissions = await redisClient.get('stats:total_submissions') || 0

    return NextResponse.json({
      submissions,
      total: totalSubmissions
    })

  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
