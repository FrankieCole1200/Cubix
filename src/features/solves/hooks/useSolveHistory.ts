
import { useState, useEffect } from "react";
import type { Solve } from "../types/Solve";

const STORAGE_KEY = "cubix-solves";

export function useSolveHistory() {
  const [solves, setSolves] = useState<Solve[]>(() => {
    const savedSolves = localStorage.getItem(STORAGE_KEY);
    return savedSolves ? JSON.parse(savedSolves) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solves));
  }, [solves]);

  const saveTime = (time: number) => {
    const newSolve: Solve = {
      id: crypto.randomUUID(),
      time: time,
      timestamp: Date.now(),
      penalty: "NONE",
    };

    setSolves(previousSolves => [...previousSolves, newSolve]);
  };

  return { solves, saveTime };
}
