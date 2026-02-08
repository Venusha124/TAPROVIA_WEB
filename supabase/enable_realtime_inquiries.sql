-- Enable replication for inquiries table to support real-time subscriptions
ALTER TABLE public.inquiries REPLICA IDENTITY FULL;

-- Note: The publication normally includes all tables if 'supabase_realtime' publication exists.
-- If you need to add it explicitly:
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;
