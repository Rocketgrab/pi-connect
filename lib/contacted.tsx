"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "sydney-pi-playbook-contacted";

type ContactedMap = Record<string, boolean>;

type ContactedContextValue = {
  ready: boolean;
  isContacted: (id: string) => boolean;
  setContacted: (id: string, value: boolean) => void;
  contactedCount: number;
};

const ContactedContext = createContext<ContactedContextValue | null>(null);

function readStored(): ContactedMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ContactedMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function ContactedProvider({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<ContactedMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMap(readStored());
    setReady(true);
  }, []);

  const persist = useCallback((next: ContactedMap) => {
    setMap(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isContacted = useCallback((id: string) => Boolean(map[id]), [map]);

  const setContacted = useCallback(
    (id: string, value: boolean) => {
      persist({ ...map, [id]: value });
    },
    [map, persist],
  );

  const contactedCount = useMemo(
    () => Object.values(map).filter(Boolean).length,
    [map],
  );

  const value = useMemo(
    () => ({ ready, isContacted, setContacted, contactedCount }),
    [ready, isContacted, setContacted, contactedCount],
  );

  return (
    <ContactedContext.Provider value={value}>
      {children}
    </ContactedContext.Provider>
  );
}

export function useContacted() {
  const ctx = useContext(ContactedContext);
  if (!ctx) {
    throw new Error("useContacted must be used inside ContactedProvider");
  }
  return ctx;
}
