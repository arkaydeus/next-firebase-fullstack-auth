# Example Next.js 14 implementation of Firebase Auth on the client and server side

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`.

## Firebase setup

Setting environment variables:

Create a `.env.local` file with the following environment variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...
```

You can get the values for the environment variables from the Firebase console. You will need to get the service account key from the Firebase console under project settings.

## Client and server-side authentication

The client-side authentication is implemented using the Firebase SDK. The server-side authentication is implemented using the Firebase Admin SDK.

The client-side authentication is used to authenticate the user and get the ID token. The ID token is then sent to the server-side and used to authenticate the user.

The server-side authentication is used to create a session cookie and provide access in server components.

### Middleware

The middleware.ts ensures that the user is authenticated before allowing access to server-side pages. Where a session is not detected, the user is redirected to the login page.

### Context

The AuthContext.tsx provides a context for the authentication state and provides a signIn and signOut function.
