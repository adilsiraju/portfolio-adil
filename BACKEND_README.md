# Portfolio Backend with Vercel Functions + Vercel KV

This portfolio now includes a complete backend infrastructure using Vercel Functions and Vercel KV for contact form submissions and analytics tracking.

## 🚀 Features

### ✅ Implemented
- **Contact Form API**: Handles form submissions with validation and storage
- **Analytics API**: Tracks user interactions and page views
- **Admin Dashboard**: View contact submissions and analytics data
- **Toast Notifications**: User feedback for form submissions
- **Analytics Tracking**: Comprehensive user behavior tracking

### 📊 Analytics Events Tracked
- `section_view`: When users view different portfolio sections
- `project_click`: When users expand project details
- `project_category_filter`: When users filter projects by category
- `contact_form_submit`: Contact form submission attempts
- `contact_form_success`: Successful form submissions
- `contact_form_error`: Failed form submissions
- `social_link_click`: Social media link clicks
- `story_step_progress`: Welcome story progression
- `story_completed`: Welcome story completion
- `portfolio_entry_click`: Portfolio entry button clicks

## 🛠 Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env.local` and add your Vercel KV credentials:

```bash
cp .env.example .env.local
```

### 2. Vercel KV Setup
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the Storage tab
3. Create a new KV database
4. Copy the environment variables to your `.env.local` file

### 3. Local Development
```bash
npm run dev
```

### 4. Deployment
Deploy to Vercel and add the KV environment variables in your project settings.

## 📡 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact` - Get all contact submissions (admin)

### Analytics
- **POST** `/api/analytics` - Track analytics event
- **GET** `/api/analytics` - Get analytics data (admin)

### Admin Dashboard
- **GET** `/api/admin` - Get admin overview data
- **GET** `/api/admin?type=contacts` - Get contact submissions
- **GET** `/api/admin?type=analytics` - Get analytics data

## 🎯 Usage

### Contact Form
The contact form automatically:
- Validates email format
- Stores submissions in Vercel KV
- Shows success/error toast notifications
- Tracks submission analytics

### Analytics
Analytics are automatically tracked when users:
- View different sections of the portfolio
- Interact with projects
- Submit contact forms
- Click social links
- Progress through the welcome story

### Admin Dashboard
Access the admin dashboard at `/admin` to view:
- Total contacts and analytics events
- Recent contact submissions
- Analytics event summaries
- Real-time activity feed

## 🔧 Technical Implementation

### Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Vercel Functions (Edge Runtime)
- **Database**: Vercel KV (Redis)
- **Notifications**: React Hot Toast
- **Analytics**: Custom implementation with KV storage

### Data Structure
Contact submissions and analytics events are stored with:
- Unique IDs and timestamps
- User agent and URL information
- Event-specific metadata
- Automatic cleanup capabilities

### Security
- Input validation on all endpoints
- Rate limiting through Vercel Functions
- Environment variable protection
- Client-side error handling

## 📈 Next Steps
- Set up automated email notifications for new contacts
- Add more detailed analytics dashboards
- Implement data export functionality
- Add analytics data retention policies
- Create webhook integrations for external services
