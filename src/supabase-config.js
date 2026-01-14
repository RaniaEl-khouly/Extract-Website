
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uexnofkdbhoerdroymjm.supabase.co'
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVleG5vZmtkYmhvZXJkcm95bWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwNzkyMTIsImV4cCI6MjA3NzY1NTIxMn0.S7WrkuYkE9isJvnltAs8c-LtOFTrcKthpgcNJG6a0lM'
export const supabase = createClient(supabaseUrl, supabaseKey)