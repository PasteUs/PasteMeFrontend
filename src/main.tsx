import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import './lib/i18n'
import { router } from './lib/router'
import { useAppStore } from './store/useAppStore'
import { api } from './lib/api'

function AppInit() {
  const setConfig = useAppStore(state => state.setConfig);

  useEffect(() => {
    // Load config and initialize
    api.get('/usr/config.json').then(response => {
      setConfig(response);
      return api.get(api.join(response.api.backend, 'beat'), { method: 'beat' });
    }).catch(console.error);
  }, [setConfig]);

  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppInit />
  </StrictMode>,
)
