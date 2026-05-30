-- Explicitly name the foreign key constraint to ensure PostgREST detects it
-- First, try to drop if it exists with a generated name (hard to guess) or just add a named one.

-- We'll try to add a named constraint 'fk_order_items_orders'.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_order_items_orders') THEN
        ALTER TABLE order_items
        ADD CONSTRAINT fk_order_items_orders
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE;
    END IF;
END $$;

-- Also verify the customers relationship
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_orders_customers') THEN
        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_customers
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE SET NULL;
    END IF;
END $$;

-- Reload Supabase Schema Cache
NOTIFY pgrst, 'reload schema';
