-- Add action_taken column to inquiries table to track workflow status
ALTER TABLE public.inquiries 
ADD COLUMN IF NOT EXISTS action_taken BOOLEAN DEFAULT FALSE;

-- Optional: Create an index if filtering by this column becomes frequent and table is large
CREATE INDEX IF NOT EXISTS idx_inquiries_action_taken ON public.inquiries(action_taken);
