
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://myewnqyxumekgrzvuwid.supabase.co'
const supabaseKey = 'sb_publishable_JMtaDJzYXPB0eubEllWVxg_nYgGXLTJ'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkPrices() {
    console.log('Fetching products...')
    const { data, error } = await supabase
        .from('products')
        .select('id, title, price, grade, category')

    if (error) {
        console.error('Error fetching products:', error)
    } else {
        console.log('Products found:', data.length)
        console.log(JSON.stringify(data, null, 2))
    }
}

checkPrices()
