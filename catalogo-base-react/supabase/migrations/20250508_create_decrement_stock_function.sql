
CREATE OR REPLACE FUNCTION public.decrement_stock(product_id UUID, quantity INTEGER) 
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  current_stock INTEGER;
BEGIN
  -- Get current stock
  SELECT stock INTO current_stock FROM products WHERE id = product_id;
  
  -- Calculate new stock, ensuring it doesn't go below 0
  current_stock := GREATEST(current_stock - quantity, 0);
  
  -- Return the new stock value (the update is done in the calling query)
  RETURN current_stock;
END;
$$;
