# 🏡 VillaStay — Luxury Villa Booking Platform

A production-ready, full-stack villa booking platform with premium Airbnb-inspired UI, advanced Framer Motion animations, JWT authentication, and AWS deployment infrastructure.

![VillaStay](frontend/public/images/villa-1.jpg)

---

## ✨ Features

- **Premium UI** — Dark luxury theme with gold accents, glassmorphism, and custom animations
- **Shared Layout Animations** — Click-to-expand villa cards using Framer Motion shared layout
- **Parallax Hero** — Scroll-driven parallax on villa detail images
- **JWT Authentication** — Register/Login with secure token-based auth
- **Booking System** — Date selection, price calculation, overlap prevention
- **AWS S3 Integration** — Pre-signed URL uploads for villa images
- **Mobile-First** — Responsive design across all screen sizes
- **Skeleton Loading** — Shimmer loaders for premium loading experience
- **Toast Notifications** — Beautiful feedback for all user actions

---

## 🧱 Tech Stack

| Layer     | Technology                                       |
| --------- | ------------------------------------------------ |
| Frontend  | React (Vite), Tailwind CSS v4, Framer Motion     |
| Backend   | Node.js, Express, JWT, Joi                       |
| Database  | MongoDB Atlas (Mongoose)                         |
| Storage   | AWS S3 (pre-signed URLs)                         |
| Hosting   | AWS EC2 (Ubuntu) + NGINX + PM2                   |
| Container | Docker + Docker Compose (optional)               |

---

## 📁 Project Structure

```
Villa-Booking/
├── frontend/               # React + Vite + Tailwind
│   ├── src/
│   │   ├── api/            # Axios instance + API modules
│   │   ├── components/     # UI components (villa, booking, auth, layout)
│   │   ├── context/        # AuthContext (JWT management)
│   │   ├── pages/          # Route pages
│   │   └── utils/          # Helper functions
│   └── public/images/      # Villa images (simulating S3)
│
├── backend/                # Node.js + Express
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, error handling
│   │   └── config/         # DB + S3 config
│   ├── seed.js             # Seed 3 demo villas
│   ├── ecosystem.config.js # PM2 config
│   └── Dockerfile
│
├── nginx/                  # NGINX reverse proxy config
├── docker-compose.yml      # Docker orchestration
├── deploy.sh               # EC2 deployment script
└── .gitignore
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone & Install

```bash
git clone <repo-url>
cd Villa-Booking

# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 2. Environment Setup

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

### 4. Start Development Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

Visit **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint               | Auth | Description             |
| ------ | ---------------------- | ---- | ----------------------- |
| GET    | `/api/villas`          | No   | List villas (paginated) |
| GET    | `/api/villas/:id`      | No   | Villa details           |
| POST   | `/api/auth/register`   | No   | Create account          |
| POST   | `/api/auth/login`      | No   | Get JWT token           |
| GET    | `/api/auth/me`         | Yes  | Current user profile    |
| POST   | `/api/bookings`        | Yes  | Create booking          |
| GET    | `/api/bookings/user`   | Yes  | User's bookings         |
| PATCH  | `/api/bookings/:id/cancel` | Yes | Cancel booking      |
| GET    | `/api/health`          | No   | Health check            |

---

## ☁️ AWS Deployment

### EC2 Setup (Automated)

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

### Manual Steps After Deployment

1. Edit `/var/www/villa-booking/backend/.env` with real credentials
2. Update NGINX `server_name` with your domain/IP
3. Restart services:
   ```bash
   pm2 restart all
   sudo systemctl restart nginx
   ```

### Optional HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🐳 Docker Deployment

```bash
# Build and start
docker-compose up -d

# Check logs
docker-compose logs -f backend
```

---

## 🔐 Environment Variables

### Backend (`.env`)

| Variable               | Description                    |
| ---------------------- | ------------------------------ |
| `PORT`                 | Server port (default: 5000)    |
| `NODE_ENV`             | development / production       |
| `MONGODB_URI`          | MongoDB Atlas connection string|
| `JWT_SECRET`           | JWT signing secret             |
| `JWT_EXPIRES_IN`       | Token expiry (default: 7d)     |
| `AWS_ACCESS_KEY_ID`    | AWS IAM access key             |
| `AWS_SECRET_ACCESS_KEY`| AWS IAM secret key             |
| `AWS_REGION`           | S3 bucket region               |
| `AWS_S3_BUCKET`        | S3 bucket name                 |
| `CORS_ORIGIN`          | Frontend URL                   |

### Frontend (`.env`)

| Variable        | Description                |
| --------------- | -------------------------- |
| `VITE_API_URL`  | Backend API URL            |

---

## 📄 License

MIT
