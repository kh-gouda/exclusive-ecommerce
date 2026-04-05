# Exclusive -- Next.js E‑commerce Platform

## Overview

**Exclusive** is a full‑stack e‑commerce platform built with **Next.js,
TypeScript, and PostgreSQL**.\
The project was developed as a **graduation project for the Frontend
Diploma by Al‑Madrasa**, but it goes beyond the basic requirements by
implementing a **production‑level architecture and full e‑commerce
functionality**.

Although the diploma required building the project with React, the
platform was implemented using **Next.js** to take advantage of advanced
capabilities such as:

- Server‑Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- Client‑Side Rendering (CSR)
- SEO optimization
- Performance improvements

The result is a **modern, scalable, and production‑ready e‑commerce
platform** that demonstrates both frontend and backend engineering
skills.

---

# Live Architecture

The platform is built as a **full‑stack application** using:

- **Frontend:** Next.js + React + TypeScript
- **Backend:** Next.js Server Actions & API routes
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Emails:** Resend
- **Image Hosting:** Cloudinary
- **Deployment:** Vercel
- **Internationalization:** i18n + next-intl

---

# Key Features

## Authentication System

The platform includes a complete authentication system using
**NextAuth**.

Users can:

- Sign up with credentials
- Sign in with credentials
- Sign in with Google OAuth
- Reset their password through email verification

Password reset flow:

1.  User enters their email.
2.  A **verification code** is sent to the email.
3.  The user confirms the code.
4.  A **new password is sent via email**.

---

# Email System

Email functionality is handled using **Resend** and includes multiple
workflows:

### Contact Messages

- Users can send messages through the **Contact Page**
- Messages are stored in the **contactMessages table**
- An email notification is sent to the admin

### Password Reset

- Verification email with code
- Confirmation email with new password

### Order Notifications

When the admin updates an order from:

    Pending → In Progress

The user receives an email containing:

- Order details
- Estimated delivery time

---

# Payment System

The platform supports two payment methods:

### Cash on Delivery

Users can place orders and pay when the product arrives.

### Visa / Card Payments

Handled securely through **Stripe Payment Gateway**.

---

# Database Architecture

The database is implemented using **PostgreSQL** with a **relational
structure** including:

- relational tables
- join tables
- normalized schema
- JSON fields where appropriate

This structure allows scalable querying and efficient data management.

---

# Product System

Products are fully dynamic and stored in the database.

Features include:

- Product categories
- Subcategories
- Product variants
- Dynamic product pages
- Product images hosted on Cloudinary

### Dynamic Routing

The following pages are **dynamically rendered based on IDs**:

- Product details
- Category pages
- Subcategory pages
- Flash sales
- Best selling products

Example:

    /product/[productId]

---

# Image Management

All images are hosted on **Cloudinary**.

When an admin:

### Adds a product

- Images are uploaded to Cloudinary
- **Public IDs** are stored in the database

### Deletes a product

- All related images are **automatically removed from Cloudinary**

This ensures efficient storage and resource cleanup.

---

# Store Sections

The store includes several dynamic sections:

- Flash Sales
- Best Selling Products
- Shop Page (all products)

Users can browse products by:

- Category
- Subcategory

---

# Search System

The platform implements a **database-driven search system**.

Users can:

- Search products
- Fetch search results directly from PostgreSQL

---

# Wishlist & Cart

Authenticated users have access to:

- Wishlist page
- Shopping cart

These routes are **protected** and require login.

---

# User Account Management

Users can manage their account through a dedicated dashboard.

Features include:

- Edit profile
- Manage address book
- View orders

Order statuses include:

- Pending
- In Progress
- Completed
- Returned
- Cancelled

---

# Vendor Advertising System

The platform includes a **dedicated Ads section** where vendors can:

- Reserve advertising space
- Display promotional ads

---

# Admin Dashboard

The platform includes a **separate admin dashboard**.

Admins can:

- Add products
- Edit products
- Delete products
- Manage orders
- Update order status

### Dashboard Analytics

The dashboard home includes statistics such as:

- Total revenue
- Current year revenue
- Total registered users
- Total products
- Revenue chart for the current year

---

# Application Architecture

The project separates the application into two layouts:

### App Layout

Used for:

- Store pages
- Product pages
- Cart
- Wishlist
- Account pages

### Dashboard Layout

Used for:

- Admin dashboard
- Product management
- Order processing
- Analytics

---

# Multi‑Language Support

The platform supports **21 languages** using:

- **i18n**
- **next-intl**

Features include:

- Dynamic translations
- Language switching
- **Full RTL support** for Arabic
- SEO‑friendly localization

Languages include English, Arabic, Chinese, Japanese and more.

---

# Responsive Design

The entire application is **fully responsive** and optimized for:

- Desktop
- Tablet
- Mobile devices

---

# Technologies Used

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js Server Actions
- API Routes

## Database

- PostgreSQL

## Authentication

- NextAuth.js

## Payments

- Stripe

## Email Service

- Resend

## Image Hosting

- Cloudinary

## Deployment

- Vercel

---

# Learning Outcomes

Although my speciality as a **Frontend Engineer**, this
project involved building a **complete full‑stack system**.

Through this project the developer gained hands‑on experience with:

- Authentication systems
- Email workflows
- Payment gateways
- PostgreSQL database design
- Cloud image storage
- Multi‑language applications
- Server rendering strategies in Next.js
- Full production architecture

This project represents a **significant learning milestone** and
demonstrates the ability to design and build **a full production‑ready
e‑commerce platform**.

---

# Deployment

The project is deployed using:

- **GitHub** for version control
- **Vercel** for hosting and deployment

---

# Project Name

**Exclusive -- E‑commerce Platform**
