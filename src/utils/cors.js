export function isAllowedOrigin(origin) {

  if (!origin) return true;

  // local dev
  if (origin === "http://localhost:5173") return true;

  // main production domain
  if (origin === process.env.CLIENT_URL) return true;

  // allow only YOUR vercel deployments (not all)
  if (
    origin.endsWith(".vercel.app") &&
    origin.includes("analytics-dashboard-client")
  ) {
    return true;
  }

  return false;
}