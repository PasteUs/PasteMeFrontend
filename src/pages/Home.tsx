import { useAppStore } from '@/store/useAppStore';
import Form from '@/components/Form';
import Success from '@/components/Success';

export default function Home() {
  const view = useAppStore(state => state.view);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {view === 'success' ? <Success /> : <Form />}
      </div>
    </div>
  );
}
