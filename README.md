# Shop Master

Mobile-first PWA starter for a multi-store commerce dashboard.

## Stack

- Frontend: HTML, CSS, JavaScript
- PWA: service worker + web manifest
- Auth/data (next phase): Firebase Authentication + Firestore
- Hosting: Cloudflare Pages

## Firebase setup

1. Create a Firebase project in the Firebase console.
2. Enable Authentication > Email/Password.
3. Create a Firestore database.
4. Open the web app config and paste values into `app.js` inside `firebaseConfig`.
5. Keep the app running locally or deploy to Cloudflare Pages.

## Local run

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deployment

Connect this GitHub repository to Cloudflare Pages and publish the repository root as the static project.

## Current status

The app supports:
- login flow
- dashboard overview
- add-product modal
- product listing
- Firebase-ready auth + Firestore integration with fallback localStorage

## Next steps

- connect real Firebase project
- add URL metadata extraction
- create order and commission analytics
- add marketplace connection APIs for Shopee and Lazada
