import { getCollection } from './mongodb';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  role: z.enum(['admin', 'prefeito', 'vereador', 'secretaria', 'tratorista']),
});

export type User = z.infer<typeof userSchema>;

export async function initializeUsers() {
  const users = await getCollection('users');
  
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

  // Check if users already exist
  const existingUsers = await users.find({}).toArray();
  
  if (existingUsers.length === 0) {
    await users.insertMany(defaultUsers);
    console.log('Default users created');
  }
}

export async function authenticateUser(email: string, password: string) {
  const users = await getCollection('users');
  
  const user = await users.findOne({ email, password });
  
  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}