import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionManager";

interface ClickableWordProps {
  children: React.ReactNode;
  value: number;
  onEarn: (amount: number) => void;
  wordId: string;
  onTriggerHeader?: () => void;
}

export const ClickableWord = ({ children, value, onEarn, wordId, onTriggerHeader }: ClickableWordProps) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animating, setAnimating] = useState(false);

  // Check if this word was already clicked
  useEffect(() => {
    const checkIfClicked = async () => {
      const sessionId = getSessionId();
      
      const { data, error } = await supabase
        .from('clicked_words')
        .select('*')
        .eq('session_id', sessionId)
        .eq('word_id', wordId)
        .maybeSingle();

      if (!error && data) {
        setClicked(true);
      }
      setIsLoading(false);
    };

    checkIfClicked();
  }, [wordId]);

  const handleClick = async (e: React.MouseEvent) => {
    if (clicked || isLoading) return;
    
    // Trigger animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);
    
    setClicked(true);
    onEarn(value);
    onTriggerHeader?.();

    // Save to database
    const sessionId = getSessionId();
    await supabase
      .from('clicked_words')
      .insert({
        session_id: sessionId,
        word_id: wordId,
        value: value,
      });
  };

  if (isLoading) {
    return <span className="relative inline-block text-muted-foreground">{children}</span>;
  }

  return (
    <span className="relative inline-block">
      <span
        onClick={handleClick}
        className={`
          ${clicked ? "clickable-word-clicked" : "clickable-word"}
          ${animating ? "click-animation" : ""}
        `}
      >
        {children}
      </span>
    </span>
  );
};
