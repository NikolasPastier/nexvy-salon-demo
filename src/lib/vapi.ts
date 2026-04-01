// Vapi singleton — one instance for the lifetime of the page.
// Import this anywhere instead of calling `new Vapi()` directly.
import Vapi from "@vapi-ai/web";

const VAPI_PUBLIC_KEY = "b73cc625-3be1-4ef7-9ef2-211e946a4b63";

// Lazy singleton so it's only created on the client
let _vapi: Vapi | null = null;

export function getVapi(): Vapi {
  if (!_vapi) {
    _vapi = new Vapi(VAPI_PUBLIC_KEY);
  }
  return _vapi;
}
