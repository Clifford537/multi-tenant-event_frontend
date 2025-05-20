# Event Management Frontend

A **Nuxt.js 3** frontend for a **multi-tenant event management system**, built with **TypeScript**, **Tailwind CSS**, and **Pinia**. Integrates with a **Laravel API** to manage events and attendees.

## 🔧 Features

- ✅ Public users can view upcoming events via routes like `/{org_slug}/events` and register (name, email, phone).
- ✅ Admins can login/register, create, update, delete events, and view attendees.
- ✅ Multi-tenancy via path-based routing.
- ✅ Global success/error messaging via Pinia.
- ✅ Fully responsive using Tailwind CSS.

---

## ✅ Prerequisites

- **Node.js** `v18+`
- Backend Laravel API: [`multi-tenant-event_manager`](https://github.com/Clifford537/event-management-backend)  
  Make sure the Laravel API is running at: `http://127.0.0.1:8000`

---

## 🚀 Setup Instructions

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/Clifford537/multi-tenant-event_frontend.git
cd multi-tenant-event_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Copy the example file and update as needed:

```bash
cp .env.example .env
```

Ensure `API_BASE_URL` is correctly pointing to your Laravel backend:

```env
API_BASE_URL=http://127.0.0.1:8000/api
```

### 4. Run the Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000`

---

## 🧠 Notes

- **Multi-tenancy**: Use URLs like `/org1/events`, `/org2/events`, etc., to scope each tenant.
- **Backend repo**: [event-management-backend](https://github.com/Clifford537/event-management-backend)
- Use Laravel's `sanctum` for auth and CSRF protection in production.
