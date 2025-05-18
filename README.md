<p align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="120" alt="Next.js Logo" /></a>
</p>

<p align="center">
  <b>Frontend của ứng dụng quản lý nhà thuốc</b> — Xây dựng bằng <a href="https://nextjs.org">Next.js</a>, <a href="https://www.typescriptlang.org">TypeScript</a>, và thiết kế theo hướng cá nhân hoá
</p>

<p align="center">
  <a href="https://github.com/vercel/next.js"><img src="https://img.shields.io/badge/Next.js-Frontend-blue" alt="Next.js Frontend" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/TailwindCSS-Styling-teal" alt="Tailwind CSS" /></a>
  <a href="#auth"><img src="https://img.shields.io/badge/Auth-OAuth2%20+%20JWT-orange" alt="OAuth2 + JWT" /></a>
  <a href="#"><img src="https://img.shields.io/github/license/yourusername/pharmacy-frontend" alt="License: MIT" /></a>
</p>

---

# Pharmacy Frontend

> 🧪 Dự án cá nhân tôi dành nhiều tâm huyết nhất: giao diện chuẩn mực, xác thực bằng Google/Facebook, Cookie an toàn, và đồng bộ với Backend NestJS.

## 📚 Tóm tắt

Frontend dành cho hệ thống nhà thuốc bao gồm:

- Hiển thị danh sách sản phẩm, chi tiết, đặt hàng
- Đăng nhập bằng email/password hoặc Google/Facebook
- Xác thực JWT bằng Cookie (không dùng localStorage)
- Tự động redirect sau login OAuth
- GỬi API NestJS qua Axios

## 🚀 Cài đặt

```bash
# Clone
$ git clone https://github.com/yourusername/pharmacy-frontend.git
$ cd pharmacy-frontend

# Cài đặt
$ yarn install

# Tạo .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Chạy
$ yarn dev
```

> Frontend lắng nghe tại: `http://localhost:3000`

## 📋 Cấu trúc

```
.
├── pages/               # Trang Next.js
│   ├── index.tsx       # Trang chủ
│   └── auth/callback   # Xử lý redirect sau OAuth
├── components/         # UI components
├── services/           # Gọi API qua Axios
├── hooks/              # Custom hooks
├── styles/             # Global CSS / Tailwind
├── public/             # Ảnh tĩnh
└── .env.local          # Biến môi trường
```

## 🔐 Xác thực OAuth2 + JWT

### Flow:

1. FE gọ `/auth/google` hoặc `/auth/facebook`
2. BE redirect đến Google/Facebook
3. Sau khi đăng nhập, BE redirect về `/auth/callback`
4. BE set cookie `access_token` và `refresh_token`
5. FE redirect về trang chủ

> FE không bao giờ cần lưu token, mọi request đã đi kèm Cookie

## 🛋‍♂️ Tình trạng hiện tại

- [x] UI thân thiện và responsive
- [x] OAuth2 redirect working
- [x] Cookie-based secure login
- [ ] Hiển thị Avatar sau login
- [ ] Giỏ hàng (cart)
- [ ] Admin dashboard

## 🚫 Bỏ qua

- CSRF (đang tạm tắt vì dã không dùng session)
- Redux (hiện tại dùng state cục bộ)

## 💡 Gợi ý triển khai

- Vercel: deploy trong 1 click
- Cập nhật `.env.production` và domain Google OAuth
- CORS phía backend nhớ cho domain FE production

```ts
app.enableCors({
  origin: "https://pharmacy-frontend.vercel.app",
  credentials: true,
});
```

## 🌟 Về tác giả

> Tôi hiện là sinh viên AI, đầm nhiệm từ thiết kế UI đến tích hợp OAuth, backend NestJS và triển khai CI/CD. Dự án này là sự kết hợp giữa tình yêu với Next.js và sự quyết tâm xây dựng ứng dụng thực tế.

- [GitHub Backend Repo](https://github.com/yourusername/pharmacy-backend)
- [GitHub Frontend Repo](https://github.com/yourusername/pharmacy-frontend)
- Contact: [yourname@email.com](mailto:yourname@email.com)

---

## 📄 License

MIT @ 2025
