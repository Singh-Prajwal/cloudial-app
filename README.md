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
## API for Adding/Updating Invoices from EXTERNAL API

You can add or update invoices via the external API using the following PowerShell command. This command sends a POST request to the `/api/external/invoices` endpoint with the required fields.

### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/external/invoices" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{ 
    "externalCustomerId": "cm9x1f4r000000c0wk5u4x4e7", 
    "externalInvoiceId": "cm9xyx9720001xa0vaxoknq7v", 
    "amount": 22424200, 
    "dueDate": "2025-05-30T00:00:00.000Z", 
    "status": "PENDING" 
  }'

Explanation of Fields:
externalCustomerId: The identifier of the customer from the external system.

externalInvoiceId: The identifier of the invoice from the external system.

amount: The amount for the invoice.

dueDate: The due date for the invoice, in ISO 8601 format.

status: The current status of the invoice (e.g., PENDING, PAID, etc.).

Steps to Execute:
Open PowerShell.

Copy the command above and paste it into PowerShell.

Ensure your application is running locally at http://localhost:3000.

Execute the command to add or update the invoice.

## 📄 License

This project is licensed under the MIT License.
