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

async function checkFK() {
    console.log("Checking foreign keys on order_items...");

    // We can't query information_schema easily with supabase-js but we can try to insert a bad row to trigger FK error
    // or just try to select with the relationship and print the error detailed.

    const { data, error } = await supabase
        .from("orders")
        .select(`
            id,
            items:order_items(id)
        `)
        .limit(1);

    if (error) {
        console.error("Relationship Query Error:", JSON.stringify(error, null, 2));
    } else {
        console.log("Relationship Query Success:", data);
    }
}

checkFK();
