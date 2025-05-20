# Event Management Frontend

A Nuxt.js 3 frontend for a multi-tenant event management system, built with TypeScript, Tailwind CSS, and Pinia. Integrates with a Laravel API to manage events and attendees.

## Features
- Public users can view upcoming events (`/org3/events`) and register (name, email, phone).
- Admins can login/register, create/update/delete events, and view attendees.
- Multi-tenancy via path-based routing (`/{org_slug}/events`).
- Success/error messaging using Pinia.
- Responsive design with Tailwind CSS.

## Prerequisites
- Node.js 18+
- Laravel API at `http://127.0.0.1:8000` (see `event-management-api` repo)

## Setup
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd event-management-frontend