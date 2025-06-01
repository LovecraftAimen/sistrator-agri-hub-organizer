
import { supabase } from '@/integrations/supabase/client';
import { TratoristaData } from '@/hooks/useTratoristasData';
import { Beneficiario } from '@/hooks/useBeneficiarios';

export const databaseService = {
  // Operações para Tratoristas
  tratoristas: {
    async getAll() {
      try {
        const { data, error } = await supabase
          .from('tratoristas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching tratoristas:', error);
          throw new Error('Erro ao buscar tratoristas');
        }

        return data || [];
      } catch (error) {
        console.error('Database service - get tratoristas error:', error);
        throw error;
      }
    },

    async create(tratorista: Omit<TratoristaData, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const { data, error } = await supabase
          .from('tratoristas')
          .insert([tratorista])
          .select()
          .single();

        if (error) {
          console.error('Error creating tratorista:', error);
          throw new Error('Erro ao criar tratorista');
        }

        return data;
      } catch (error) {
        console.error('Database service - create tratorista error:', error);
        throw error;
      }
    },

    async update(id: string, updates: Partial<TratoristaData>) {
      try {
        const { data, error } = await supabase
          .from('tratoristas')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating tratorista:', error);
          throw new Error('Erro ao atualizar tratorista');
        }

        return data;
      } catch (error) {
        console.error('Database service - update tratorista error:', error);
        throw error;
      }
    },

    async delete(id: string) {
      try {
        const { error } = await supabase
          .from('tratoristas')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting tratorista:', error);
          throw new Error('Erro ao deletar tratorista');
        }

        return true;
      } catch (error) {
        console.error('Database service - delete tratorista error:', error);
        throw error;
      }
    }
  },

  // Operações para Beneficiários
  beneficiarios: {
    async getAll() {
      try {
        const { data, error } = await supabase
          .from('beneficiarios')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching beneficiarios:', error);
          throw new Error('Erro ao buscar beneficiários');
        }

        return data || [];
      } catch (error) {
        console.error('Database service - get beneficiarios error:', error);
        throw error;
      }
    },

    async create(beneficiario: Omit<Beneficiario, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const { data, error } = await supabase
          .from('beneficiarios')
          .insert([beneficiario])
          .select()
          .single();

        if (error) {
          console.error('Error creating beneficiario:', error);
          throw new Error('Erro ao criar beneficiário');
        }

        return data;
      } catch (error) {
        console.error('Database service - create beneficiario error:', error);
        throw error;
      }
    },

    async update(id: string, updates: Partial<Beneficiario>) {
      try {
        const { data, error } = await supabase
          .from('beneficiarios')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          console.error('Error updating beneficiario:', error);
          throw new Error('Erro ao atualizar beneficiário');
        }

        return data;
      } catch (error) {
        console.error('Database service - update beneficiario error:', error);
        throw error;
      }
    },

    async delete(id: string) {
      try {
        const { error } = await supabase
          .from('beneficiarios')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error deleting beneficiario:', error);
          throw new Error('Erro ao deletar beneficiário');
        }

        return true;
      } catch (error) {
        console.error('Database service - delete beneficiario error:', error);
        throw error;
      }
    }
  },

  // Operações para Serviços
  servicos: {
    async getAll() {
      try {
        const { data, error } = await supabase
          .from('servicos')
          .select(`
            *,
            beneficiarios(nome, cpf),
            tratoristas(nome, cpf)
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching servicos:', error);
          throw new Error('Erro ao buscar serviços');
        }

        return data || [];
      } catch (error) {
        console.error('Database service - get servicos error:', error);
        throw error;
      }
    }
  },

  // Verificação de conectividade
  async testConnection() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) {
        console.error('Database connection test failed:', error);
        return false;
      }

      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.error('Database connection test error:', error);
      return false;
    }
  }
};
