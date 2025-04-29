import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const supabase = createClient(
  "https://ozbhoydwuqxeuvkywgis.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96YmhveWR3dXF4ZXV2a3l3Z2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjAzNzcsImV4cCI6MjA2MTUzNjM3N30.HJVTomH3Wnupl4ZZewR1uSpq_swZWuVb8SbkExIhibk"
);
