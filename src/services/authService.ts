
import { supabase } from '@/integrations/supabase/client';

export const authService = {
  // Login com validação robusta
  async signIn(email: string, password: string) {
    try {
      console.log('Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Usuário não encontrado');
      }

      console.log('Login successful for:', data.user.email);
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Auth service error:', error);
      throw error;
    }
  },

  // Logout
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw new Error(error.message);
      }
      console.log('Logout successful');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  // Obter sessão atual
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session error:', error);
        return null;
      }
      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },

  // Obter perfil do usuário - Otimizado para novas políticas RLS
  async getUserProfile(userId: string) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Profile error:', error);
        throw new Error('Erro ao carregar perfil do usuário');
      }

      return profile;
    } catch (error) {
      console.error('Get user profile error:', error);
      throw error;
    }
  },

  // Verificar se usuários existem - Atualizado para usar as novas políticas
  async checkUsersExist() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email, role')
        .order('email');

      if (error) {
        console.error('Error checking users:', error);
        return [];
      }

      console.log('Existing users in database:', data);
      return data || [];
    } catch (error) {
      console.error('Exception checking users:', error);
      return [];
    }
  },

  // Criar usuários de demonstração
  async createDemoUsers() {
    try {
      console.log('Starting demo users creation...');
      
      const existingUsers = await this.checkUsersExist();
      console.log('Existing users found:', existingUsers.length);

      const response = await fetch('https://vyzsgtigwezgglagvbou.supabase.co/functions/v1/create-demo-users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5enNndGlnd2V6Z2dsYWd2Ym91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NTE3MjEsImV4cCI6MjA2NDEyNzcyMX0.6gNIiDVTaCMhw2dolXebUvZ-9146olJIaIGiPY-gVuE`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error('Erro ao criar usuários de demonstração');
      }

      const result = await response.json();
      console.log('Demo users creation result:', result);
      
      return result;
    } catch (error) {
      console.error('Create demo users error:', error);
      throw error;
    }
  }
};
