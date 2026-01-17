"use client";

import { useCallback, useEffect, useState } from "react";
import type { MyConcertItem } from "@/types/concerts";
import { getMyConcerts } from "@/api/concerts";

type State = {
  concerts: MyConcertItem[];
  isLoading: boolean;
  error: string | null;
};

export function useMyConcerts() {
  const [state, setState] = useState<State>({
    concerts: [],
    isLoading: true,
    error: null,
  });

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const concerts = await getMyConcerts();
      setState({ concerts, isLoading: false, error: null });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to fetch my concerts";
      setState((prev) => ({ ...prev, isLoading: false, error: msg }));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const concerts = await getMyConcerts();
        if (!mounted) return;
        setState({ concerts, isLoading: false, error: null });
      } catch (e) {
        if (!mounted) return;
        const msg = e instanceof Error ? e.message : "Failed to fetch my concerts";
        setState((prev) => ({ ...prev, isLoading: false, error: msg }));
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
    refetch,
  };
}
