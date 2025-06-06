import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  role: z.enum(['admin', 'prefeito', 'vereador', 'secretaria', 'tratorista']),
});

export type User = z.infer<typeof userSchema>;

export async function initializeUsers() {
  const { data: existingUsers, error: fetchError } = await supabase
    .from('users')
    .select('*');

  if (fetchError) {
    console.error('Error checking existing users:', fetchError);
    return;
  }

  if (!existingUsers || existingUsers.length === 0) {
    const defaultUsers = [
      {
        email: 'secagri@sistrator.com',
        password: 'sis123456',
        name: 'Secretário de Agricultura',
        role: 'admin'
      },
      {
        email: 'prefeito@sistrator.com',
        password: 'pref123456',
        name: 'Prefeito Municipal',
        role: 'prefeito'
      },
      {
        email: 'vereador@sistrator.com',
        password: 'ver123456',
        name: 'Vereador Municipal',
        role: 'vereador'
      },
      {
        email: 'secretaria@sistrator.com',
        password: 'sec123456',
        name: 'Secretária da Agricultura',
        role: 'secretaria'
      },
      {
        email: 'tratorista@sistrator.com',
        password: 'trat123456',
        name: 'João Silva Santos',
        role: 'tratorista'
      }
    ];

    for (const user of defaultUsers) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (signUpError) {
        console.error('Error creating user:', signUpError);
        continue;
      }

      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          email: user.email,
          name: user.name,
          role: user.role
        }]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }
    }

    console.log('Default users created');
  }
}

export async function authenticateUser(email: string, password: string) {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (authError || !authData.user) {
    return null;
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('email, name, role')
    .eq('email', email)
    .single();

  if (userError || !userData) {
    return null;
  }

  return userData;
}