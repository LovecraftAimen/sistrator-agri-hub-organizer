
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

  // Obter perfil do usuário
  async getUserProfile(userId: string) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

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

  // Criar usuários de demonstração
  async createDemoUsers() {
    try {
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/create-demo-users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabase.supabaseKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
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
