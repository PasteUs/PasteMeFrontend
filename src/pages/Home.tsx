import { useAppStore } from '@/store/useAppStore';
import Form from '@/components/Form';
import Success from '@/components/Success';

export default function Home() {
  const view = useAppStore(state => state.view);

  return (
    <div className="py-8">
      {view === 'success' ? <Success /> : <Form />}
    </div>
  );
}
