
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TratoristaData {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  endereco?: string;
  cnh: string;
  validade_cnh: string;
  experiencia?: string;
  especialidades?: string[];
  disponibilidade?: string;
  observacoes?: string;
  status: 'ativo' | 'inativo' | 'licenca';
  data_cadastro: string;
  horas_trabalhadas: number;
  created_at: string;
  updated_at: string;
}

export const useTratoristasData = () => {
  const [tratoristas, setTratoristas] = useState<TratoristaData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTratoristas = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tratoristas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tratoristas:', error);
        toast({
          title: "Erro ao carregar tratoristas",
          description: "Não foi possível carregar os dados.",
          variant: "destructive"
        });
        return;
      }

      setTratoristas(data || []);
    } catch (error) {
      console.error('Exception fetching tratoristas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTratorista = async (tratorista: Omit<TratoristaData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tratoristas')
        .insert([tratorista])
        .select()
        .single();

      if (error) {
        console.error('Error adding tratorista:', error);
        toast({
          title: "Erro ao cadastrar",
          description: "Não foi possível cadastrar o tratorista.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Tratorista cadastrado",
        description: "Tratorista cadastrado com sucesso!",
      });

      await fetchTratoristas();
      return data;
    } catch (error) {
      console.error('Exception adding tratorista:', error);
      return null;
    }
  };

  const updateTratorista = async (id: string, updates: Partial<TratoristaData>) => {
    try {
      const { error } = await supabase
        .from('tratoristas')
        .update(updates)
        .eq('id', id);

      if (error) {
        console.error('Error updating tratorista:', error);
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível atualizar o tratorista.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Tratorista atualizado",
        description: "Dados atualizados com sucesso!",
      });

      await fetchTratoristas();
      return true;
    } catch (error) {
      console.error('Exception updating tratorista:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchTratoristas();
  }, []);

  return {
    tratoristas,
    isLoading,
    addTratorista,
    updateTratorista,
    refetch: fetchTratoristas
  };
};
