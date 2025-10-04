export interface AppConfig {
  api: {
    backend: string;
    admin: string;
  };
  footer: Array<{
    text: string;
    link: string;
  }>;
}

export interface AppState {
  readOnce: boolean;
  notFound: boolean;
  config: AppConfig;
  view: string;
  namespace: string;
  key: string;
  content: string;
  lang: string;
}

export interface PasteFormData {
  lang: string;
  content: string;
  password: string;
  self_destruct: boolean;
  expire_count: number;
  expire_second: number;
}

export interface PasteResponse {
  code: number;
  key?: string;
  message?: string;
  content?: string;
  lang?: string;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  content: string;
  link: string;
  type: 'DAILY_ANNOUNCEMENT' | 'EMERGENCY' | 'UPDATE_LOG';
  time: string;
}

export type ViewType = 'loading' | 'home' | 'success' | 'password_auth' | 'paste_view' | 'manual_deleted';
