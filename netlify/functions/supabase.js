const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nzijgrwojqzqxfxpfmpy.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56aWpncndvanF6cXhmeHBmbXB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODU3MjMyOCwiZXhwIjoyMDY0MTQ4MzI4fQ.IQvZGWaADnv5m3aaQMyYjgQSfdXh4kLpyqnnfYWME5k';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
