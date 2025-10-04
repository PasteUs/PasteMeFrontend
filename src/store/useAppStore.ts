import { create } from 'zustand';
import type { AppState, AppConfig } from '@/types';

interface AppStore extends AppState {
  init: () => void;
  updateMode: (readOnce: boolean) => void;
  updateNotFound: (notFound: boolean) => void;
  updateState: (state: Partial<AppState>) => void;
  setConfig: (config: AppConfig) => void;
}

const initialConfig: AppConfig = {
  api: {
    backend: '',
    admin: ''
  },
  footer: []
};

export const useAppStore = create<AppStore>((set) => ({
  readOnce: false,
  notFound: false,
  config: initialConfig,
  view: 'loading',
  namespace: 'nobody',
  key: '',
  content: '',
  lang: '',

  init: () => set({
    readOnce: false,
    notFound: false
  }),

  updateMode: (readOnce) => set({ readOnce }),

  updateNotFound: (notFound) => set({ notFound }),

  updateState: (state) => set(state),

  setConfig: (config) => set({ config })
}));
