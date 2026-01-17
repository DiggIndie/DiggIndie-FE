// src/hooks/useRecConcerts.ts
"use client";

import { useEffect, useState } from "react";
import type { ConcertItem } from "@/types/concerts";
import { getRecConcerts } from "@/api/concerts";

type State = {
  concerts: ConcertItem[];
  isLoading: boolean;
  error: string | null;
};

export function useRecConcerts() {
  const [state, setState] = useState<State>({
    concerts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const concerts = await getRecConcerts();
        if (!mounted) return;
        setState({ concerts, isLoading: false, error: null });
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : "Failed to fetch recommended concerts";
        setState({ concerts: [], isLoading: false, error: msg });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    concerts: state.concerts,
    isLoading: state.isLoading,
    error: state.error,
  };
}
