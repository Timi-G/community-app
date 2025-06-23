# 🌐 JendZ Community App

A simplified community platform where users can register, create groups, and post content inside groups. Unauthenticated users can view public posts, while authenticated users can create and manage their own groups and posts.

---

## 🚀 Technologies Used

### 🔧 Backend
- Python 3.x
- Django
- Django REST Framework
- Django Cors Headers
- MySQL

### 🎨 Frontend
- React (with Create React App)
- Tailwind CSS
- Axios
- React Router

### ☁️ Deployment & Infrastructure
- Vercel (Backend Hosting)
- Render (Backend Hosting)
- Railway (Cloud Infra)
- CI/CD (Git + GitHub)

---

## 🛠️ Setup Instructions

### ✅ Prerequisites
Ensure the following are installed:
- Node.js (v16+ recommended)
- Python (v3.8+)
- MySQL Server
- Git

---

## 🐍 Backend Setup

```bash
# 1. Clone the repo and navigate into backend
git clone https://github.com/Timi-G/community-app.git
cd backend

# 2. Create virtual environment
python -m venv env
source env/bin/activate   # On Windows: env\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure MySQL database in settings.py or .env
# Example (settings.py):
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'community_db',
    'USER': 'community_user',
    'PASSWORD': 'your_password',
    'HOST': 'localhost',
    'PORT': '3306',
  }
}

# 5. Apply migrations
python manage.py migrate

# 6. Create superuser (optional)
python manage.py createsuperuser

# 7. Run development server
python manage.py runserver
```

---

## ⚛️ Frontend Setup
```bash
# 1. Open another terminal

# 2. From root folder, navigate to the frontend directory
cd frontend

# 3. Install dependencies
npm install

## Install Tailwindcss (If tailwind.config.js isn't created automatically in the frontend folder)
npm install -D tailwindcss@3
npx tailwindcss init

# 4. Configure base URL in axios.js (e.g., src/api/axios.js)
export default axios.create({
  baseURL: "http://localhost:8000",
});

# 5. Build the React app (Optional)
npm run build

# 6. Start the React development server
npm run start
```

## 📌 Assumptions
- User Simplicity
  - Assumes users only need a username and email to register (no email verification or profile settings).

- Group Permissions
  - Only group creators can delete their group information. Assumes any user can post in a group.

- Authentication
  - Assumes token-based auth (via DRF TokenAuth) is sufficient for login sessions.

  - Assumes that storing tokens in localStorage is safe enough (no refresh tokens or HTTP-only cookies).

- Single-Region Hosting
  - Assumes all services (frontend, backend, DB) are hosted in similar regions to reduce latency.

- Simple Public Feed Logic
  - Assumes all posts across all groups can be shown publicly with no privacy or filtering logic.

- No Real-time Requirements
  - Assumes real-time updates (e.g. new posts appearing instantly) are not required.

## ❗ Limitations
- 🚫 No Email Verification or Reset
  - There's no system for verifying user email or resetting forgotten passwords.

- 🔐 Auth Token Vulnerabilities
  - Storing auth tokens in localStorage is vulnerable to XSS attacks.
  - No support for refresh tokens or token expiry.

- 📤 No Pagination or Filtering
  - The /api/groups/ and /api/posts/ endpoints return all records, which may not scale with large data.

- 🔎 Limited Search or Discovery
  - No keyword search, sorting, or category tagging for groups or posts.

- 📱 Limited Responsiveness
  - May not be fully optimized for mobile users without additional layout handling.

- 🧪 No Testing Layer
  - There are no unit tests, integration tests, or end-to-end tests in the backend or frontend.

- 💬 No Comment or Like System
  - Users can only create posts; there's no interaction model like comments, likes, or replies.

- 📦 Monolithic Deployment
  - Backend and frontend are deployed separately but not orchestrated as a unified service (e.g. with Docker or Kubernetes).

- 🔁 No Background Jobs / Asynchronous Handling
  - All operations (like sending emails, post-processing) are synchronous — no Celery or task queue.

- 👤 No Role Management
  - All authenticated users have the same level of permissions except for ownership rules.
