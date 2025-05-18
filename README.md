<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" />
</p>

<p align="center">
  <b>Pharmacy Frontend</b> – A modern React-based frontend for a pharmacy management system
</p>

<p align="center">
  Developed by <b>Hồ Sỹ Thắng</b> • <a href="mailto:hothang2004@gmail.com">hothang2004@gmail.com</a>
</p>

---

## 🚀 Features

- 🔐 Google & Facebook OAuth2 Login
- 📆 Product catalog with dynamic rendering
- 🛂 Order and cart management
- 📁 News/article section
- 🍃 Clean UI & responsive design (TailwindCSS / Material UI)
- 🌐 Connected to NestJS backend (OAuth, JWT, REST API)

---

## 🧰 Tech Stack

- **Framework**: React 18, Next.js
- **Styling**: Tailwind CSS / MUI
- **State Management**: Context API / Redux (optional)
- **Authentication**: Google & Facebook OAuth2 via Backend
- **Deployment Ready**: Vercel / Netlify / Docker

---

## 📦 Installation

```bash
git clone https://github.com/imsythang/pharmacy-fe.git
cd pharmacy-fe
yarn install  # or npm install
```

---

## 🔧 Environment Setup

Create a `.env.local` file in the project root and add:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001  # your NestJS backend
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your-client-id>
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=<your-facebook-id>
```

---

## ▶️ Run Locally

```bash
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧺 Testing

```bash
yarn test
# or
npm run test
```

---

## 📂 Project Structure

```
/components        # Reusable UI components
/pages             # Next.js pages
/services          # API service functions
/context           # Global context providers
/public            # Static assets
/styles            # Custom styling (if any)
```

---

## 🛡️ Security Notes

- Access token & refresh token are stored in **HTTP-only cookies**.
- CSRF is disabled for development ease but should be handled in production.
- Input is sanitized using `sanitize-html` before registration.

---

## ✅ Deployment

This app is ready to be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Docker**

---

## 🙌 Author

- **Name**: Hồ Sỹ Thắng
- **Contact**: [hothang2004@gmail.com](mailto:hothang2004@gmail.com)

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
