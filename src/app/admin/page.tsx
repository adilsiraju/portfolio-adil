'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Mail, 
  Activity,
  RefreshCw,
  Eye,
  Mouse,
  MessageSquare
} from 'lucide-react'

interface ContactData {
  id: string
  timestamp: string
  name: string
  email: string
  message: string
}

interface AnalyticsData {
  eventCounts: Record<string, number>
  recentEvents: Array<{
    id: string
    timestamp: string
    event: string
    data?: Record<string, unknown>
  }>
  totalEvents: number
}

interface AdminData {
  totalContacts: number
  totalAnalyticsEvents: number
  lastUpdated: string
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'analytics'>('overview')
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [contacts, setContacts] = useState<ContactData[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = async (type: string = 'all') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin?type=${type}`)
      const data = await response.json()
      
      if (type === 'all') {
        setAdminData(data)
      } else if (type === 'contacts') {
        setContacts(data.contacts || [])
      } else if (type === 'analytics') {
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (activeTab === 'contacts' && contacts.length === 0) {
      fetchData('contacts')
    } else if (activeTab === 'analytics' && !analytics) {
      fetchData('analytics')
    }
  }, [activeTab, contacts.length, analytics])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getEventIcon = (event: string) => {
    switch (event) {
      case 'section_view': return <Eye className="w-4 h-4" />
      case 'project_click': return <Mouse className="w-4 h-4" />
      case 'contact_form_submit': return <MessageSquare className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Portfolio analytics and contact management</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'contacts', label: 'Contacts', icon: <Mail className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <Activity className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'contacts' | 'analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
          
          <button
            onClick={() => fetchData(activeTab === 'overview' ? 'all' : activeTab)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && adminData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Total Contacts</h3>
                </div>
                <p className="text-3xl font-bold text-blue-400">{adminData.totalContacts}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Analytics Events</h3>
                </div>
                <p className="text-3xl font-bold text-green-400">{adminData.totalAnalyticsEvents}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Last Updated</h3>
                </div>
                <p className="text-sm text-purple-400">{formatDate(adminData.lastUpdated)}</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'contacts' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Contact Submissions</h3>
              {contacts.length === 0 ? (
                <p className="text-gray-400">No contacts yet.</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-white">{contact.name}</h4>
                        <span className="text-sm text-gray-400">{formatDate(contact.timestamp)}</span>
                      </div>
                      <p className="text-purple-300 mb-2">{contact.email}</p>
                      <p className="text-gray-300 text-sm">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && analytics && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Event Counts */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Event Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(analytics.eventCounts).map(([event, count]) => (
                    <div key={event} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        {getEventIcon(event)}
                        <span className="text-sm text-gray-300 capitalize">
                          {event.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Events */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">Recent Events</h3>
                <div className="space-y-2">
                  {analytics.recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 py-2 px-3 bg-white/5 rounded-lg">
                      {getEventIcon(event.event)}
                      <span className="text-white font-medium">{event.event}</span>
                      {event.data && (
                        <span className="text-gray-400 text-sm">
                          {JSON.stringify(event.data, null, 0)}
                        </span>
                      )}
                      <span className="text-gray-500 text-xs ml-auto">
                        {formatDate(event.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
