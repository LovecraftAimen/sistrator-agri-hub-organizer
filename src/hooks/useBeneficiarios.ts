
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Beneficiario {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
  regiao: string;
  vereador?: string;
  culturas_principais?: string[];
  area_total?: number;
  observacoes?: string;
  data_cadastro: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useBeneficiarios = () => {
  const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchBeneficiarios = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('beneficiarios')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching beneficiarios:', error);
        toast({
          title: "Erro ao carregar beneficiários",
          description: "Não foi possível carregar os dados.",
          variant: "destructive"
        });
        return;
      }

      setBeneficiarios(data || []);
    } catch (error) {
      console.error('Exception fetching beneficiarios:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addBeneficiario = async (beneficiario: Omit<Beneficiario, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('beneficiarios')
        .insert([beneficiario])
        .select()
        .single();

      if (error) {
        console.error('Error adding beneficiario:', error);
        toast({
          title: "Erro ao cadastrar",
          description: "Não foi possível cadastrar o beneficiário.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Beneficiário cadastrado",
        description: "Beneficiário cadastrado com sucesso!",
      });

      await fetchBeneficiarios();
      return data;
    } catch (error) {
      console.error('Exception adding beneficiario:', error);
      return null;
    }
  };

  const updateBeneficiario = async (id: string, updates: Partial<Beneficiario>) => {
    try {
      const { error } = await supabase
        .from('beneficiarios')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating beneficiario:', error);
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar o beneficiário.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Beneficiário atualizado",
        description: "Dados atualizados com sucesso!",
      });

      await fetchBeneficiarios();
      return true;
    } catch (error) {
      console.error('Exception updating beneficiario:', error);
      return false;
    }
  };

  const deleteBeneficiario = async (id: string) => {
    try {
      const { error } = await supabase
        .from('beneficiarios')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting beneficiario:', error);
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o beneficiário.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Beneficiário excluído",
        description: "Beneficiário excluído com sucesso!",
      });

      await fetchBeneficiarios();
      return true;
    } catch (error) {
      console.error('Exception deleting beneficiario:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchBeneficiarios();
  }, []);

  return {
    beneficiarios,
    isLoading,
    addBeneficiario,
    updateBeneficiario,
    deleteBeneficiario,
    refetch: fetchBeneficiarios
  };
};
