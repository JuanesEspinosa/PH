import { useNavigate } from 'react-router-dom';
import { useCreateLote } from '../hooks/useLotesQuery';
import { CreateLoteDto } from '@/types/lotes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoteFormSimple } from '../components/LoteFormSimple';
import { ArrowLeft } from 'lucide-react';

export const LoteCreateView = () => {
  const navigate = useNavigate();
  const createLote = useCreateLote();
  
  const handleSubmit = async (data: CreateLoteDto) => {
    try {
      await createLote.mutateAsync(data);
      navigate('/dashboard/lotes');
    } catch (error) {
      console.error('Error al crear lote:', error);
    }
  };
  
  const handleCancel = () => {
    navigate('/dashboard/lotes');
  };
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">🌾 Registrar Nuevo Lote</h1>
          <p className="text-gray-600 mt-1">
            Delimita el lote en el mapa y completa la información
          </p>
        </div>
      </div>
      
      {/* Formulario */}
      <LoteFormSimple
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={createLote.isPending}
      />
    </div>
  );
};

export default LoteCreateView;

