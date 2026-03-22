const { createClient } = require( '@supabase/supabase-js')


const supabaseUrl = 'https://afpjvaktyzbvrrphlvjl.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmcGp2YWt0eXpidnJycGhsdmpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzIyMDY5NSwiZXhwIjoyMDg4Nzk2Njk1fQ.SPA43gjnlVPfY9yQn3TAso6_u5a6a0m0AIsfRXQVBSI' 

const supabase = createClient(supabaseUrl, supabaseServiceKey)

module.exports = supabase;