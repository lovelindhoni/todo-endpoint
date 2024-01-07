import { createClient } from "@supabase/supabase-js";
import env from "dotenv";
import type { Database } from "./db-types";
env.config();
const supabase = createClient<Database>(
  process.env.PROJECT_URL as string,
  process.env.ANON_KEY as string
);
export default supabase;
