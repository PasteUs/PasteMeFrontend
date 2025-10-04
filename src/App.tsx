import { Outlet } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const { readOnce, notFound } = useAppStore();

  const bgClass = readOnce ? 'bg-paste-gray' : notFound ? 'bg-paste-blue' : 'bg-white';

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-300`}>
      {!notFound && <Header />}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      {!notFound && <Footer />}
      <Toaster />
    </div>
  );
}

export default App
