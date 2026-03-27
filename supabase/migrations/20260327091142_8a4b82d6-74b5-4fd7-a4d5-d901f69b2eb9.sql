
-- Add external stats cache columns to players
ALTER TABLE public.players
  ADD COLUMN IF NOT EXISTS external_elo integer,
  ADD COLUMN IF NOT EXISTS external_kda numeric,
  ADD COLUMN IF NOT EXISTS external_winrate numeric,
  ADD COLUMN IF NOT EXISTS external_level integer,
  ADD COLUMN IF NOT EXISTS external_matches integer,
  ADD COLUMN IF NOT EXISTS external_data jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS stats_synced_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS verification_code text;

-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
