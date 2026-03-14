# Modern Personal Portfolio

A sleek, responsive, and fully customizable personal portfolio application built with Next.js 15, Tailwind CSS v4, and Supabase.

## Features

- **Modern UI**: Clean, professional design with Framer Motion page transitions.
- **Dark/Light Mode**: Full theme support via `next-themes`.
- **Database Driven**: Experience, Projects, Certifications, Skills, and Achievements are powered by Supabase.
- **Admin Dashboard**: Secure, hidden admin area to add, edit, and delete your portfolio items.
- **SEO Optimized**: Pre-configured metadata exports for all pages.

## Tech Stack

- **Framework**: Next.js App Router
- **Styling**: Tailwind CSS v4
- **Database / Auth**: Supabase
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repository>
cd personal-portfolio
npm install
```

### 2. Supabase Setup
1. Create a new project at [Supabase](https://supabase.com/).
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `schema.sql` from this repository and run it. This will create all the necessary tables and Row Level Security (RLS) policies.
4. Go to Authentication -> Providers and make sure Email/Password is enabled.
5. Create an initial user account manually in Authentication -> Users to access the dashboard.

### 3. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Fill in your Supabase URL and Anon Key from your Supabase Project Settings -> API.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view your site.
Go to [http://localhost:3000/login](http://localhost:3000/login) and log in with the user account you created to start adding content.

## Deployment to Vercel

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Environment Variables in Vercel.
4. Deploy!

## Customization

- **Colors**: Modify `app/globals.css` to change the CSS variables for different theming.
- **Structure**: Edit the navigation links in `components/navbar.tsx` and `app/admin/layout.tsx`.
