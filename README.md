# Cloudial App

A modern customer and invoice management system built with Next.js, Tailwind CSS, Prisma, and PostgreSQL.

## 🚀 Features

* Authentication with NextAuth
* Customer and invoice tracking
* PostgreSQL + Prisma for data handling
* Clean, responsive UI with Tailwind CSS
* API routes for invoice and customer CRUD

---

## 🛠️ Getting Started

Follow the steps below to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Singh-Prajwal/cloudial-app.git
cd cloudial-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Copy the provided `.env` file into the root directory of the project.

> Ensure that your `.env` file contains the following (or similar) variables:

```env
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Generate Prisma Client & Push Schema

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the App

```bash
npm run dev
```

The app will start on `http://localhost:3000`.

---

## 🔐 Admin Credentials

Use the following credentials to log in as an admin:

* **Email:** `admin@gmail.com`
* **Password:** `admin12345`

---

## 🧠 Tech Stack

* **Frontend:** Next.js (App Router), Tailwind CSS
* **Backend:** API Routes with Prisma ORM
* **Database:** PostgreSQL
* **Auth:** NextAuth.js
* **ORM:** Prisma

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── (protected)/
│   │   ├── layout.tsx
│   │   ├── actions/
│   │   │   ├── addInvoice.ts
│   │   │   ├── deleteInvoice.ts
│   │   │   ├── getInvoices.ts
│   │   │   ├── invoiceStatusUpdate.ts
│   │   │   └── updateInvoice.ts
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── customers/route.ts
│   │   │   └── dashboard/route.ts
│   │   └── register/route.ts
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── components/
│   └── ui/
│       ├── backButton.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── deleteInvoiceButton.tsx
│       ├── editInvoiceForm.tsx
│       ├── invoiceList.tsx
│       ├── invoiceSearchFilter.tsx
│       ├── invoiceStatusButton.tsx
│       └── topbar.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── prisma.ts
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
└── layout.tsx
```

---

## 📄 License

This project is licensed under the MIT License.
