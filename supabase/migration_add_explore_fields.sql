-- Add new columns for Explore page data
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS grade text,
ADD COLUMN IF NOT EXISTS origin text,
ADD COLUMN IF NOT EXISTS features text[]; -- Using text array for features
