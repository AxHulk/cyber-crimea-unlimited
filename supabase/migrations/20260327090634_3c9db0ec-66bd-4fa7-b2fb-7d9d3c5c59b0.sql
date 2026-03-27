
-- Add steam_id, faceit_nickname and verification fields to players
ALTER TABLE public.players
  ADD COLUMN IF NOT EXISTS steam_id text,
  ADD COLUMN IF NOT EXISTS faceit_nickname text,
  ADD COLUMN IF NOT EXISTS steam_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS faceit_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_verified boolean NOT NULL DEFAULT false;

-- Create teams table
CREATE TABLE public.teams (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  tag text NOT NULL,
  discipline text NOT NULL,
  captain_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  logo_url text,
  rating integer NOT NULL DEFAULT 1000,
  wins integer NOT NULL DEFAULT 0,
  losses integer NOT NULL DEFAULT 0,
  draws integer NOT NULL DEFAULT 0,
  prize_total numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create team_members table (with history support via left_at)
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'player',
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  left_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add unique constraint: a player can only be active in one team per discipline
CREATE UNIQUE INDEX idx_active_team_member ON public.team_members (player_id, team_id) WHERE left_at IS NULL;

-- Enable RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Teams RLS: public read
CREATE POLICY "Public can view teams" ON public.teams FOR SELECT TO anon, authenticated USING (true);

-- Teams RLS: captain can update own team
CREATE POLICY "Captain can update own team" ON public.teams FOR UPDATE TO authenticated
  USING (captain_id = auth.uid())
  WITH CHECK (captain_id = auth.uid());

-- Teams RLS: authenticated can create teams
CREATE POLICY "Authenticated can create teams" ON public.teams FOR INSERT TO authenticated
  WITH CHECK (captain_id = auth.uid());

-- Teams RLS: captain can delete own team
CREATE POLICY "Captain can delete own team" ON public.teams FOR DELETE TO authenticated
  USING (captain_id = auth.uid());

-- Team members RLS: public read
CREATE POLICY "Public can view team members" ON public.team_members FOR SELECT TO anon, authenticated USING (true);

-- Team members RLS: captain can manage members
CREATE POLICY "Captain can add members" ON public.team_members FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.captain_id = auth.uid()));

CREATE POLICY "Captain can remove members" ON public.team_members FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.captain_id = auth.uid()));

CREATE POLICY "Captain can update members" ON public.team_members FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.captain_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.teams t WHERE t.id = team_members.team_id AND t.captain_id = auth.uid()));

-- Add updated_at triggers
CREATE TRIGGER set_teams_updated_at BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_players_updated_at BEFORE UPDATE ON public.players
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
