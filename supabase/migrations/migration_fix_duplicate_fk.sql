-- Drop the redundant foreign key we added, since the default one 'orders_customer_id_fkey' already exists
ALTER TABLE orders DROP CONSTRAINT IF EXISTS fk_orders_customers;

-- We KEEP 'fk_order_items_orders' because the previous error suggested it was missing. 
-- However, just to be safe and avoid future ambiguity if a default one existed but wasn't detected for some reason:
-- We can ensure we only have one.
-- But given the previous error 'no matches found' for order_items, we likely need the one we added there.

-- Reload Schema Cache to apply changes immediately
NOTIFY pgrst, 'reload schema';
