export function checkAdminPasscode(request) {
  const passcode = request.headers.get("X-Admin-Passcode") || 
                   request.nextUrl?.searchParams?.get("passcode") || 
                   process.env.ADMIN_PASSCODE;
                   
  // In a real app, we would compare with process.env.ADMIN_PASSCODE
  // For the dev/demo flow if not set, we might fallback to a default or strict fail.
  const target = process.env.ADMIN_PASSCODE || "admin123"; 
  return passcode === target;
}
