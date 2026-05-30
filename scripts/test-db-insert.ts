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

async function testInsert() {
    console.log("Testing insert into customers table...");
    const { data, error } = await supabase
        .from('customers')
        .insert([{
            full_name: 'Test User Script',
            email: 'test_script@example.com',
            address: { city: 'Test City' }
        }])
        .select();

    if (error) {
        console.error("Insert failed:", JSON.stringify(error, null, 2));
    } else {
        console.log("Insert successful:", data);
        // detailed cleanup (optional)
        const { error: deleteError } = await supabase.from('customers').delete().eq('id', data[0].id);
        if (deleteError) console.error("Cleanup failed:", deleteError);
        else console.log("Cleanup successful.");
    }
}

testInsert();
