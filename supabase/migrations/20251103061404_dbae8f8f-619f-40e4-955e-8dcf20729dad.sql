-- Create a table to store clicked words
CREATE TABLE public.clicked_words (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  word_id TEXT NOT NULL,
  value INTEGER NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, word_id)
);

-- Enable Row Level Security
ALTER TABLE public.clicked_words ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read their session's clicked words
CREATE POLICY "Anyone can view their session's clicked words" 
ON public.clicked_words 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert clicked words
CREATE POLICY "Anyone can insert clicked words" 
ON public.clicked_words 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX idx_clicked_words_session_id ON public.clicked_words(session_id);