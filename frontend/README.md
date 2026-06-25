# AI Writer Pro Frontend

React + Vite frontend for the AI content generator.

## Local Setup

1. Start the Django backend from the `backend` folder:

   ```bash
   python manage.py runserver
   ```

   The API should be available at `http://127.0.0.1:8000/api`.

2. Create a frontend environment file:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Install and run the frontend:

   ```bash
   npm install
   npm run dev
   ```

## API URL

The frontend reads the backend URL from `VITE_API_URL`.

For local development:

```bash
VITE_API_URL=http://127.0.0.1:8000/api
```

For deployment, set `VITE_API_URL` to the public URL of the deployed Django backend, ending with `/api`.

Example:

```bash
VITE_API_URL=https://your-backend.example.com/api
```

If registration shows that the backend API could not be reached, the Django backend is not running or `VITE_API_URL` is pointing to the wrong place.
