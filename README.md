# Atharva's Portfolio

A premium, modern, and dynamic personal portfolio website built with Next.js and MongoDB. This project features a fully functional admin dashboard that allows for real-time content updates directly from the UI, persisting data securely to a MongoDB Atlas backend.

## Features

- **Dynamic Content Management:** Log in via the built-in admin modal to edit your hero section, about details, skills, projects, and experience directly on the page.
- **MongoDB Integration:** All portfolio data is securely saved and fetched from a MongoDB Atlas database, ensuring changes are permanent and globally accessible.
- **Modern UI/UX:** Built with React and Tailwind CSS, featuring glassmorphism, responsive layouts, hover effects, and custom animations.
- **Dark Mode Optimized:** Designed specifically for a sleek, neon-accented dark mode experience.
- **Fully Responsive:** Looks and functions perfectly across all devices—from mobile phones to ultra-wide desktop monitors.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Frontend:** React, Tailwind CSS, Lucide React (Icons)
- **Database:** MongoDB Atlas with Mongoose
- **Language:** TypeScript
- **Styling:** PostCSS, Custom CSS Variables

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Atharva7652005/Atharva_Portfolio.git
   cd Atharva_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the example environment file and add your MongoDB connection string.
   ```bash
   cp .env.example .env
   ```
   Open `.env` and configure your URI:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Admin Access

To access the admin features and edit your portfolio:
1. Click the floating **Lock** icon in the bottom right corner.
2. Enter the admin credentials.
3. Click the inline **Edit (Pencil)** icons on different sections to update the content.
4. Click the **Save** button in the bottom right corner to persist your changes to MongoDB.

## 👨‍💻 Author

**Atharva Khairnar**
- GitHub: [@Atharva7652005](https://github.com/Atharva7652005)
