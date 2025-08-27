<div align="center">
  
<h1 style=" 
  font-size: 2.5em;
  font-weight: bold;
  background: linear-gradient(to right, #b19cd9, #ffffff, #00bfff);
  text-align: center;
">
🎓 Intelli Learn - AI Education Portal
</h1>

<!-- Image placeholder with fixed size -->
<img src="https://github.com/user-attachments/assets/2d841f2c-56b7-4e8f-8f1b-2ecf1025ae11"
     style="border-radius:20px"
     alt="AI Education Portal" 
       style="border-radius:20px; width:800px; height:400px;object-fit:contain;"/>

![AI Education Portal](https://img.shields.io/badge/AI%20Education-Portal-blue?style=for-the-badge&logo=graduation-cap)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Empowering Learning with Artificial Intelligence**

*A cutting-edge online platform designed to make learning intelligent, interactive, and accessible for everyone.*

[🚀 Live Demo](https://ai-education-portal.vercel.app/) 

</div>


## 🌟 Overview

Our AI Education Portal leverages advanced artificial intelligence technologies to provide personalized learning paths, real-time assessments, and adaptive content that evolves with each learner's progress. Whether you're a student, professional, or lifelong learner, our platform offers curated courses, tutorials, and resources across multiple subjects to help you master concepts efficiently.

### ✨ Key Highlights

- 🧠 **AI-Powered Learning**: Personalized learning paths that adapt to your pace and style
- 📊 **Real-Time Analytics**: Track progress with intelligent insights
- 🎯 **Adaptive Content**: Dynamic content that evolves based on learning patterns
- 🌐 **Cloud-First Architecture**: Scalable and robust infrastructure on AWS
- 🔒 **Secure Authentication**: Enterprise-grade security with Clerk integration
- 📱 **Responsive Design**: Seamless experience across all devices

---

## 🚀 Features

### 🎯 Core Learning Features
- **Personalized Learning Paths** - AI-driven personalized courses
- **Progress Tracking** - Comprehensive learning analytics
- **Multi-Subject Support** - Wide range of courses and subjects
- **Adaptive Content Delivery** - Content that matches your learning style
- **Secured Sunscription** - Mange your subscriptions securely 

### 🔧 Technical Features
- **User Authentication** - Secure login with Clerk
- **Real-Time Database** - PostgreSQL via Supabase
- **Responsive UI** - Modern design with Tailwind CSS
- **Pricing and Billing** -Powered by Clerk and Stripe
- **AI Integration** - Advanced machine learning algorithms
- **Cloud Deployment** - Scalable AWS EC2 infrastructure

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) |
| **Authentication** | ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) |
| **Payment** | ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white) |
| **Deployment** | ![AWS EC2](https://img.shields.io/badge/AWS_EC2-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) |
| **Process Management** | ![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white) |
| **Reverse Proxy** | ![NGINX](https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white) |

</div>

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **Git**
- **AWS Managment Console** (for deployment)
- **Ubuntu(or any other distro)** (for configuring virtual machine) 

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-education-portal.git
cd ai-education-portal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY

#Clerk-Custom Auth
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL

#Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
#Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN

#Sentry
SENTRY_AUTH_TOKEN
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [https://ai-education-portal.vercel.app/] to see the application running! 🎉

---

## 🚀 Deployment on AWS EC2

### Server Setup

1. **Launch Ubuntu EC2 Instance**
   ```bash
   # Connect to your EC2 instance
    chmod 400 "privateKey.pem"
    ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

2. **Install Required Software**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 and NGINX
   sudo npm install -g pm2
   sudo apt install nginx -y
   ```

3. **Deploy Application**
   ```bash
   # Clone and setup project
   git clone https://github.com/SwastikIIIT/AI-education-portal.git
   cd ai-education-portal
   npm install
   
   # Configure environment
   nano .env.local
   
   # Edit .env with your production values
   Ctrl+O -> Enter-> Ctrl+X
    
   # Start application with PM2
   pm2 start npm --name "intelli" --start
   pm2 list
   pm2 save

   # For starting application on reboot
   pm2 startup
   copy the command that will be shown and execute
   ```

### NGINX Configuration

Create NGINX configuration file:

```bash
sudo nano /etc/nginx/sites-available/yourdomain_Or_default
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:Port_where_u_are_listening_your_App;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/ai-edu-portal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📁 Project Structure

```
ai-education-portal/
├── 📁 components/          # Reusable UI components
├── 📁 app/                 # Next.js pages and routes
├── 📁 lib/                # Utility functions and configurations
├── 📁 constants/          # Dummy data
├── 📁 types/              # TypeScript type definitions
├── 📁 public/             # Static assets
├── 📄 next.config.js      # Next.js configuration
├── 📄 sentry.config.js    # Sentry.js configuration
├── 📄 tailwind.config.js  # Tailwind CSS configuration
├── 📄 package.json        # Dependencies and scripts
└── 📄 README.md           # This file
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📊 Performance & Monitoring

- **Uptime Monitoring**: Integrated health checks
- **Performance Metrics**: Real-time application monitoring
- **Error Tracking**: Comprehensive error logging
- **Analytics**: User behavior and learning analytics
- **Page Load Performance**: First Contentful Paint,Largest Contentful Paint
- **API Latencies**: Database queries, external service calls
- **Error Rates**: JavaScript errors, network failures

---

## 🔒 Security

- **Authentication**: Clerk-powered secure authentication
- **Data Protection**: Data is stored in vapi securely
- **Secured Payment**: Secured payment management
- **Security Headers**: Comprehensive security header configuration

---
<div align="center">

**Built with ❤️ by the Swastik Sharma**

[📧 Contact](swastikiiit.05@gmail.com) • [ Codolio](https://codolio.com/profile/swastiksharma)

</div>

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Supabase](https://supabase.com/) - The Open Source Firebase Alternative
- [Clerk](https://clerk.dev/) - Authentication and User Management
- [Vercel](https://vercel.com/) - Platform for frontend frameworks and static sites
- [AWS](https://aws.com/)-For cloud deployement and services
- [Sentry](https://sentry.com/)-For performance tracking and latency

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**
[![GitHub stars](https://img.shields.io/github/stars/SwastikIIIT/AI-education-portal?style=social)](https://github.com/SwastikIIIT/AI-education-portal)
</div>
