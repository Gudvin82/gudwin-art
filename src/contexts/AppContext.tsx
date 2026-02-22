import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Lang, type Mode, translations } from '@/data/site-content';

export type GenerationStatus = 'running' | 'succeeded' | 'failed';

export interface GenerationRecord {
  id: string;
  mode: Mode;
  styleName: string;
  createdAt: string;
  imageUrl: string;
  paid: boolean;
  status: GenerationStatus;
  packId?: 'digital' | 'starter';
  packStars?: number;
}

export interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface AppContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  t: (key: keyof (typeof translations)['ru']) => string;
  generations: GenerationRecord[];
  addGeneration: (record: GenerationRecord) => void;
  markPaid: (id: string) => void;
  selectedPack: 'digital' | 'starter';
  setSelectedPack: (pack: 'digital' | 'starter') => void;
  telegramUser: TelegramUser | null;
  isAuthorized: boolean;
  loginWithTelegram: (user: TelegramUser) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const getStoredLang = (): Lang => {
  if (typeof window === 'undefined') return 'ru';
  return localStorage.getItem('gwa_lang') === 'en' ? 'en' : 'ru';
};

const getStoredMode = (): Mode => {
  if (typeof window === 'undefined') return 'pets';
  return localStorage.getItem('gwa_mode') === 'humans' ? 'humans' : 'pets';
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);
  const [mode, setModeState] = useState<Mode>(getStoredMode);
  const [generations, setGenerations] = useState<GenerationRecord[]>([]);
  const [selectedPack, setSelectedPackState] = useState<'digital' | 'starter'>(() => {
    if (typeof window === 'undefined') return 'digital';
    const raw = localStorage.getItem('gwa_pack');
    return raw === 'starter' ? 'starter' : 'digital';
  });
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('gwa_tg_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as TelegramUser;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem('gwa_lang', next);
  };

  const setMode = (next: Mode) => {
    setModeState(next);
    localStorage.setItem('gwa_mode', next);
  };

  const addGeneration = (record: GenerationRecord) => {
    setGenerations((prev) => [record, ...prev]);
  };

  const markPaid = (id: string) => {
    setGenerations((prev) => prev.map((item) => (item.id === id ? { ...item, paid: true } : item)));
  };

  const setSelectedPack = (pack: 'digital' | 'starter') => {
    setSelectedPackState(pack);
    localStorage.setItem('gwa_pack', pack);
  };

  const loginWithTelegram = (user: TelegramUser) => {
    setTelegramUser(user);
    localStorage.setItem('gwa_tg_user', JSON.stringify(user));
  };

  const logout = () => {
    setTelegramUser(null);
    localStorage.removeItem('gwa_tg_user');
  };

  const t = (key: keyof (typeof translations)['ru']) => translations[lang][key] ?? String(key);

  const value = {
    lang,
    setLang,
    mode,
    setMode,
    t,
    generations,
    addGeneration,
    markPaid,
    selectedPack,
    setSelectedPack,
    telegramUser,
    isAuthorized: Boolean(telegramUser),
    loginWithTelegram,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return ctx;
}
