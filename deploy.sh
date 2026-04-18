#!/bin/bash
# ─────────────────────────────────────────────────────
#  Villa Booking Platform — EC2 Deployment Script
#  Run this on a fresh Ubuntu EC2 instance
# ─────────────────────────────────────────────────────

set -e

echo "╔══════════════════════════════════════════════╗"
echo "║  🏡 Villa Booking Platform — EC2 Setup       ║"
echo "╚══════════════════════════════════════════════╝"

# ─── Step 1: System Update ──────────────────────────
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# ─── Step 2: Install Node.js (v20 LTS) ─────────────
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version

# ─── Step 3: Install PM2 ───────────────────────────
echo "📦 Installing PM2..."
sudo npm install -g pm2

# ─── Step 4: Install NGINX ─────────────────────────
echo "📦 Installing NGINX..."
sudo apt install -y nginx
sudo systemctl enable nginx

# ─── Step 5: Install Git ───────────────────────────
echo "📦 Installing Git..."
sudo apt install -y git

# ─── Step 6: Clone Repository ──────────────────────
echo "📂 Cloning repository..."
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/Villa-Booking.git villa-booking
sudo chown -R $USER:$USER /var/www/villa-booking
cd /var/www/villa-booking

# ─── Step 7: Setup Backend ─────────────────────────
echo "🔧 Setting up backend..."
cd backend
npm ci --only=production

# Create .env file (EDIT THESE VALUES!)
cat > .env << 'EOF'
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/villa-booking
JWT_SECRET=CHANGE_THIS_TO_A_RANDOM_256_BIT_SECRET
JWT_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=villa-booking-images
CORS_ORIGIN=http://your-domain.com
EOF

echo "⚠️  IMPORTANT: Edit /var/www/villa-booking/backend/.env with your actual credentials!"

# Create logs directory
mkdir -p logs

# ─── Step 8: Build Frontend ────────────────────────
echo "🔧 Building frontend..."
cd ../frontend
npm ci
npm run build

# ─── Step 9: Start Backend with PM2 ────────────────
echo "🚀 Starting backend with PM2..."
cd ../backend
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# ─── Step 10: Configure NGINX ──────────────────────
echo "🔧 Configuring NGINX..."
sudo cp ../nginx/villa-booking.conf /etc/nginx/sites-available/villa-booking
sudo ln -sf /etc/nginx/sites-available/villa-booking /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# ─── Step 11: Firewall Setup ───────────────────────
echo "🔐 Configuring firewall..."
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw --force enable

# ─── Step 12: Seed Database ────────────────────────
echo "🌱 Seeding database..."
cd /var/www/villa-booking/backend
node seed.js

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅ Deployment Complete!                     ║"
echo "║                                              ║"
echo "║  Next steps:                                 ║"
echo "║  1. Edit backend/.env with real credentials  ║"
echo "║  2. Update NGINX server_name with your IP    ║"
echo "║  3. Run: pm2 restart all                     ║"
echo "║  4. Run: sudo systemctl restart nginx        ║"
echo "║                                              ║"
echo "║  Optional HTTPS:                             ║"
echo "║  sudo apt install certbot python3-certbot-nginx"
echo "║  sudo certbot --nginx -d your-domain.com     ║"
echo "╚══════════════════════════════════════════════╝"
