import { createClient } from "https://esm.sh/@supabase/supabase-js";

export const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_KEY"
);
