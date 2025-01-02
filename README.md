# Lead Management System for Udaan

## Project Overview

Udaan, a B2B e-commerce platform, requires a Lead Management System tailored for Key Account Managers (KAMs) to effectively manage relationships with large restaurant accounts. This system enables tracking and management of leads, interactions, and account performance while providing efficient tools for call planning and performance tracking.

## Features

- **Profile Management:**

  - Create and edit restaurant profiles.

- **Food Item Management:**

  - Create, edit, and delete food items.
  - View all food items associated with your restaurant.

- **Order Management:**

  - Track recent orders placed by customers.
  - Update the status of food delivery for each order.

- **Lead Management:**
- Add, update, and track restaurant leads.

- **Contact Management:**
- Store multiple Points of Contact (POC) for each lead.

- **Interaction Tracking:**
- Record calls, orders, and interaction details.

- **Call Planning:**/**Performance Tracking:**
- Schedule calls and track last interaction.
- Monitor ordering patterns and identify account performance.

## Technologies Used

- **Frontend:**
  - [Next.js] - A React framework for building server-rendered applications.
  - [TypeScript] - A statically typed superset of JavaScript.
  - [Tailwind CSS] - A utility-first CSS framework.
- **Authentication:**
  - [Clerk](https://clerk.dev/) - A developer-first authentication API.
- **Backend:**
  - [MongoDB](https://www.mongodb.com/) - A NoSQL database.
- **State Management:**
  - [Zustand](https://zustand.surge.sh/) - A small, fast, and reactive state management library.
- **Input Validation:**
  - [Zod](https://github.com/colinhacks/zod) - A TypeScript-first schema validation library.

## Usage

1. Clone the repository to your local machine{`git clone`} [`https://github.com/arunsingh2004/Key-Account-Manager-KAM-Lead-Management-System`].
2. Set up environment variables in a .env file:
   DATABASE_URL=mongodb:`<your-mongo-uri>`
   CLERK_API_KEY=`<your-clerk-api-key>`
3. Install the required dependencies using `npm install`.
4. Start the development server using `npm run dev`.

## Getting Started

Access the application at `http://localhost:3000`in your web browser.
Use the dashboard to add, track, and manage leads.

1. Login to the admin dashboard using your credentials.
2. Navigate through the dashboard sections to manage your restaurant profile, food items, and orders.
3. Use the provided features to create, edit, and delete food items, as well as track and update the status of orders.

# System Design

## Architecture

**Frontend:** Next.js, communicating with the backend via RESTful APIs.
**Backend:** Node.js with Express.js, connected to MongoDB.
**Authentication:** Clerk handles user authentication and authorization.
**Database:** MongoDB, with a schema designed for leads, interactions, and performance data.

## System Design Diagram

**Components**

1. Frontend:
   Next.js renders user interfaces.
   State managed by Zustand.
2. Backend:
   RESTful API built with Node.js.
   Authentication with Clerk.
3. Database:
   MongoDB for data storage.
4. Authentication:
   Secure access control using Clerk.

   ## Diagram (Logical Overview)

   [User] --> [Frontend (Next.js)] --> [Backend (Node.js)]
   --> [Clerk (Authentication)]
   --> [MongoDB (Database)]

## API Documentation

1. POST/CreateProfile :Add Restaurant
2. POST /leads: Add a new lead.
3. GET /leads: Retrieve all leads.
4. PATCH /leads/:id: Update lead information.
5. POST /interactions: Record an interaction.
6. GET /performance: Fetch performance metrics.

**Add a Lead**

{
"name": "Restaurant ABC",
"contactInfo": { "email": "abc@restaurant.com", "phone": "1234567890" },
"timezone": "UTC+5:30",
"callFrequency": 7
}
**How would you design the overall architecture?**
The overall architecture follows a modular and scalable design:

1. Frontend:
   Built with Next.js for server-side rendering (SSR) and static site generation (SSG) to improve SEO and performance.
   State management handled by Zustand.
   UI Styling implemented using Tailwind CSS for a clean and responsive design.
   Authentication: Managed using Clerk.

2. Backend:
   Developed using Node.js with Express.js for building RESTful APIs.
   Business logic encapsulated in services for modularity and reusability.
   Middleware for request validation and error handling.

3. Database:
   MongoDB as the primary database for its flexibility in handling hierarchical and unstructured data.
   Indexing for performance optimization and querying efficiency.
   Caching:

Use Redis for caching frequently accessed data, such as lead lists or performance metrics.

**What database(s) would you choose and why?**

1. Database: MongoDB
   MongoDB is chosen for its flexibility in handling hierarchical and unstructured data, which is suitable
   for storing.
   Reasons:
   1. Schema flexibility: Ideal for storing nested documents like restaurant profiles, POCs, and interactions.
   2. Indexing: Supports compound indexes for efficient querying.
   3. Scalability: Handles horizontal scaling effectively with MongoDB Atlas.
   4. Geospatial Queries: Useful if the application includes location-based features.

**How would you handle relationships between entities?**

1. References:
   Use ObjectId references in MongoDB to establish relationships. For example:
   leadId in Interactions and POC references the Lead entity.
   Useful for querying related entities without duplication.

2. Embedding:
   Embed tightly coupled information, such as performance metrics in the Lead schema.

3. Hybrid Approach:
   Use embedding for frequently accessed data and references for relationships requiring separate queries.

**What indexes would you create for optimal performance?**

1. Lead Collection:
   Index on name and timezone for efficient searches:
   db.leads.createIndex({ name: 1, timezone: 1 });

2. Interaction Collection:
   Compound index for querying interactions by lead and sorting by date:
   db.interactions.createIndex({ leadId: 1, date: -1 });

3. POC Collection:
   Index on leadId for quick lookup of POCs by lead:
   db.pocs.createIndex({ leadId: 1 });

4. Performance Metrics:
   Index on performanceMetrics.status for account performance filtering:
   db.leads.createIndex({ "performanceMetrics.status": 1 });

**How would you handle scalability?**

1. Database Scalability:
   Use MongoDB Atlas for horizontal sharding and clustering.
   Optimize database queries with proper indexing and aggregation pipelines.

2. Backend Scalability:
   Design stateless APIs to allow scaling by adding more instances.
   Use containerization (Docker) for consistent deployment and orchestration with Kubernetes.

3. Frontend Scalability:
   Use Next.js ISR (Incremental Static Regeneration) to serve content dynamically and reduce server load.

**How would you handle timezone differences for call scheduling?**

- Store timezone for each lead.
- Use libraries like moment-timezone to calculate local times dynamically.

## Data Modeling Questions

**Design the database schema or class structure**

1. Lead Schema:
   const LeadSchema = new mongoose.Schema({
   name: { type: String, required: true },
   contactInfo: { email: String, phone: String },
   status: { type: String, enum: ["New", "In Progress", "Closed"], default: "New" },
   timezone: { type: String, required: true },
   callFrequency: { type: Number, default: 7 }, // in days
   lastCallDate: { type: Date },
   performanceMetrics: {
   totalOrders: { type: Number, default: 0 },
   avgOrderValue: { type: Number, default: 0 },
   status: { type: String, enum: ["Well-performing", "Underperforming"], default: "Underperforming" }
   },
   });

2. Interaction Schema:
   const InteractionSchema = new mongoose.Schema({
   leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
   interactionType: { type: String, enum: ["Call", "Order"], required: true },
   details: { type: String },
   date: { type: Date, default: Date.now },
   });

3. Call Schema:
   const POCSchema = new mongoose.Schema({
   leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true },
   name: { type: String, required: true },
   role: { type: String },
   contactInfo: { email: String, phone: String },
   });
