'use client'

import React, { useEffect } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Mail, MessageCircle, Github, Phone, Linkedin } from 'lucide-react'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  description: string
  color: string
  internal?: boolean
}

export default function ContactEpilogue() {
  const { trackEvent } = useAnalytics()

  const socialLinks: SocialLink[] = [
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      url: 'mailto:mohdadilsiraju@gmail.com',
      description: 'mohdadilsiraju@gmail.com',
      color: 'hover:text-purple-400',
      internal: true
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      url: 'https://wa.me/918113936995',
      description: '+91 81139 36995',
      color: 'hover:text-green-400',
      internal: true
    },
    {
      name: 'SMS',
      icon: <Phone className="w-6 h-6" />,
      url: 'sms:+918113936995',
      description: '+91 81139 36995',
      color: 'hover:text-blue-400',
      internal: true
    },
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      url: 'https://github.com/adilsiraju',
      description: 'github.com/adilsiraju',
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/adilsiraju',
      description: 'linkedin.com/in/adilsiraju',
      color: 'hover:text-blue-400'
    }
  ]

  useEffect(() => {
    trackEvent('contact_section_view')
  }, [trackEvent])

  const handleClick = (link: SocialLink) => {
    trackEvent('contact_link_click', {
      channel: link.name.toLowerCase(),
      url: link.url
    })
  }

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 py-24 px-4"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl font-bold mb-6 text-white leading-tight">
          Let&apos;s Connect
        </h2>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Ready to create something meaningful? Reach out directly—no forms, just instant contact.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.internal ? '_self' : '_blank'}
              rel={link.internal ? undefined : 'noopener noreferrer'}
              onClick={() => handleClick(link)}
              className={`group relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-700/40 ${link.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700 group-hover:border-purple-500/40 transition-colors">
                  {link.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white tracking-wide flex items-center gap-2">
                    {link.name}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-300 group-hover:bg-purple-600/30 group-hover:text-purple-200 transition-colors">
                      Direct
                    </span>
                  </div>
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 break-all">
                    {link.description}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-14 text-sm text-slate-500">
          Prefer another channel (Discord, Telegram)? Just mention it when you reach out.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>
    </section>
  )
}
