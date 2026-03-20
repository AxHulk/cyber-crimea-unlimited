ALTER TABLE public.players
ALTER COLUMN profile_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_players_profile_unique
ON public.players(profile_id);