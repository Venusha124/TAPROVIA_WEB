-- Add new columns to match the contact form
ALTER TABLE public.inquiries 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS subject text,
ADD COLUMN IF NOT EXISTS preferred_contact text,
ADD COLUMN IF NOT EXISTS timeframe text;

-- Drop the check constraint on classification to allow values from the UI
-- (Partnership, Export, Bulk, Packaging, Booking)
ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_classification_check;

-- Optional: Re-add check constraint with new values if strict validation is desired at DB level
-- ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_classification_check 
-- CHECK (classification IN ('Partnership', 'Export', 'Bulk', 'Packaging', 'Booking'));
