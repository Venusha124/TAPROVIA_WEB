import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual env parsing
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        env[match[1]] = match[2]; // handle simple key=value
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase env vars");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log("Checking customers table schema...");
    // We can't easily query information_schema via supabase-js without an RPC or direct SQL connection.
    // But we can try to select the column and see if it errors, or just insert.

    // Let's try to just select it.
    const { data, error } = await supabase
        .from('customers')
        .select('address')
        .limit(1);

    if (error) {
        console.error("Error selecting address:", JSON.stringify(error, null, 2));
    } else {
        console.log("Successfully selected address column.");
    }
}

checkSchema();
