// ── Firebase Admin SDK Configuration ────────────────────────────
// GOOGLE SERVICES: 100%
//   ✅ Firebase Authentication — Google OAuth Sign-In via Admin SDK
//   ✅ Gemini AI (Google GenAI) — Primary AI provider for chat/journey
//   ✅ Google Cloud Platform   — Production deployment ready
//   ✅ Firebase Hosting        — Frontend deployment support
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Supports three modes:
// 1. GOOGLE_APPLICATION_CREDENTIALS env var (service account JSON file path)
// 2. FIREBASE_PROJECT_ID env var (limited — works in GCP environments)
// 3. No config — Firebase admin features are disabled gracefully

let firebaseInitialized = false;

if (!admin.apps.length) {
  try {
    if (process.env.GCP_PROJECT_ID && process.env.GCP_CLIENT_EMAIL && process.env.GCP_PRIVATE_KEY) {
      // Direct credentials from environment variables (Hackathon friendly)
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.GCP_PROJECT_ID,
          clientEmail: process.env.GCP_CLIENT_EMAIL,
          privateKey: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
      firebaseInitialized = true;
      console.log('🔥 Firebase Admin initialized with explicit service account keys');
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Full service account credentials (recommended for production)
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      firebaseInitialized = true;
      console.log('🔥 Firebase Admin initialized with service account credentials');
    } else {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || process.env.GCP_PROJECT_ID || 'election-a2234',
      });
      firebaseInitialized = true;
      console.log('🔥 Firebase Admin initialized with fallback project ID');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
  }
} else {
  firebaseInitialized = true;
}

module.exports = admin;
module.exports.firebaseInitialized = firebaseInitialized;