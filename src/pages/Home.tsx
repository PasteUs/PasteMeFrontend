import { useAppStore } from '@/store/useAppStore';
import Form from '@/components/Form';
import Success from '@/components/Success';

export default function Home() {
  const view = useAppStore(state => state.view);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {view === 'success' ? <Success /> : <Form />}
    </div>
  );
}
