# SaaS Analytics Dashboard

A lightweight event analytics system that tracks user interactions from web applications and provides aggregated metrics such as visitors, page views, and custom events.

The system demonstrates a full event ingestion pipeline similar to analytics tools like PostHog or Mixpanel.

------------------------------------------------------------

ARCHITECTURE

Browser (tracker.js)
        ↓
POST /api/collect
        ↓
Analytics Backend (Node.js / Express)
        ↓
MongoDB Atlas (Event Storage)
        ↓
Analytics Aggregation API
        ↓
Dashboard Metrics

Additionally backend services can also send events.

Application Backend
        ↓
trackEvent()
        ↓
POST /api/track
        ↓
Analytics Backend

------------------------------------------------------------

LIVE DEMO

Task Tracker App (Event Source)
https://task-tracker-olive-eta.vercel.app

Analytics Backend
https://analytics-dashboard-server.onrender.com

Example analytics endpoint
/api/analytics/summary?trackingId=trk_tasktracker

------------------------------------------------------------

FEATURES

Event Tracking
- Browser page view tracking
- Custom event tracking
- Backend event instrumentation

Visitor Identification
- Unique visitor ID using localStorage
- Visitor persistence across sessions

Analytics Metrics
- Total events
- Unique visitors
- Page views

Event Ingestion
- /api/collect for browser tracking
- /api/track for backend event tracking

Scalable Data Model
- Indexed MongoDB schema
- Optimized for aggregation queries

Deployment
- Frontend hosted on Vercel
- Backend hosted on Render
- MongoDB Atlas database

------------------------------------------------------------

TECH STACK

Backend
Node.js
Express.js
MongoDB Atlas
Mongoose

Frontend
React
Vite
React Query
Axios

Deployment
Vercel
Render
MongoDB Atlas

------------------------------------------------------------

EVENT DATA MODEL

const eventSchema = new mongoose.Schema({
  trackingId: String,
  visitorId: String,
  event: String,
  url: String,
  timestamp: Number
}, { timestamps: true })

Indexes

eventSchema.index({ trackingId: 1, timestamp: -1 })
eventSchema.index({ trackingId: 1, event: 1 })

------------------------------------------------------------

BROWSER TRACKING SCRIPT

Example integration

<script src="https://analytics-dashboard-server.onrender.com/tracker.js"></script>

<script>
analytics.init("trk_tasktracker")
</script>

Example event payload

{
  "trackingId": "trk_tasktracker",
  "visitorId": "v_a8s92k1",
  "event": "page_view",
  "url": "/tasks",
  "timestamp": 1710000000
}

------------------------------------------------------------

BACKEND EVENT TRACKING

Applications can send events directly.

Example

trackEvent({
  trackingId: "trk_tasktracker",
  visitorId: "tasktracker_user",
  event: "task_created",
  url: "/tasks"
})

------------------------------------------------------------

ANALYTICS API

Summary endpoint

GET /api/analytics/summary

Example response

{
  "visitors": 4,
  "pageViews": 1,
  "events": 4
}

------------------------------------------------------------

PROBLEMS SOLVED DURING DEVELOPMENT

MongoDB DNS Error

querySrv ECONNREFUSED

Solution
Test connection using mongosh and deploy backend to Render.

------------------------------------------------------------

Frontend Calling Localhost API

VITE_API_URL=http://localhost:5000

Solution

VITE_API_URL=https://task-tracker-api.onrender.com

------------------------------------------------------------

Tracker Script Using Localhost

API_URL = http://localhost:5000/api/collect

Solution

API_URL = https://analytics-dashboard-server.onrender.com/api/collect

------------------------------------------------------------

CORS Issues

Browser blocked analytics requests.

Solution

app.use(cors({
 origin:[
   "http://localhost:5173",
   "https://task-tracker-olive-eta.vercel.app"
 ]
}))

------------------------------------------------------------

CURRENT CAPABILITIES

The system currently supports

- Page view tracking
- Custom event tracking
- Unique visitor tracking
- Backend instrumentation
- Aggregated analytics metrics

------------------------------------------------------------

FUTURE IMPROVEMENTS

Planned analytics features

- Events per day analytics
- Top pages
- Top events
- Real-time metrics
- Funnel analytics
- Event batching for performance

------------------------------------------------------------

WHAT THIS PROJECT DEMONSTRATES

This project demonstrates understanding of

- Event driven architectures
- Analytics data pipelines
- REST API design
- MongoDB aggregation
- Client side tracking
- Backend instrumentation
- Cloud deployment

------------------------------------------------------------

AUTHOR

Vimal Raj P
Full Stack Developer (MERN)
