# ORIGIN - Your GitHub Dashboard

See all activity on specific repositories in one place. Track commits, pull requests, issues, and more — all from a single dashboard.

## How to Run

git clone https://github.com/yourusername/yourrepo.git  
cd origin

# Backend setup

cd server  
python -m venv .venv  
source .venv/bin/activate # Mac/Linux  
.venv\Scripts\activate # Windows  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver

# Frontend setup

cd ../client  
npm install  
npm run dev

# Backend .env (server/.env)

GITHUB_CLIENT_ID=your_client_id  
GITHUB_CLIENT_SECRET=your_client_secret  
DJANGO_SECRET_KEY=your_django_secret  
DEBUG=True

# Frontend .env (client/.env)

VITE_API_BASE_URL=http://localhost:8000/api/  
VITE_GITHUB_CLIENT_ID=your_client_id

# GitHub OAuth App Setup

1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App"
3. Homepage URL: http://localhost:5173
4. Authorization callback URL: http://localhost:5173/github/callback
5. Copy your Client ID and Client Secret into the .env files above

# Running the app

Open two terminals:  
Terminal 1:  
cd server  
source .venv/bin/activate # Mac/Linux  
.venv\Scripts\activate # Windows  
python manage.py runserver

Terminal 2:  
cd client  
npm run dev

Open http://localhost:5173 in your browser.
