
CREATE TABLE public.arena_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discipline TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT '5v5',
  status TEXT NOT NULL DEFAULT 'waiting',
  team1_id UUID REFERENCES public.teams(id),
  team2_id UUID REFERENCES public.teams(id),
  player1_id UUID REFERENCES public.players(id),
  player2_id UUID REFERENCES public.players(id),
  winner_team_id UUID REFERENCES public.teams(id),
  winner_player_id UUID REFERENCES public.players(id),
  score TEXT,
  map TEXT,
  stream_url TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  finished_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.arena_matches ENABLE ROW LEVEL SECURITY;

-- Everyone can view matches
CREATE POLICY "Public can view arena matches"
  ON public.arena_matches FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can create matches
CREATE POLICY "Authenticated can create arena matches"
  ON public.arena_matches FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Creator can update their matches
CREATE POLICY "Creator can update arena matches"
  ON public.arena_matches FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Creator can delete their matches
CREATE POLICY "Creator can delete arena matches"
  ON public.arena_matches FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.arena_matches;
