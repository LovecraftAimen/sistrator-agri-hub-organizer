
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'prefeito' | 'vereador' | 'secretaria' | 'tratorista';
  cpf?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const users: CreateUserRequest[] = [
      {
        email: 'secagri@sistrator.com',
        password: 'Admin@2024!',
        name: 'Secretário de Agricultura',
        role: 'admin'
      },
      {
        email: 'prefeito@sistrator.com',
        password: 'Prefeito#2024',
        name: 'Prefeito Municipal',
        role: 'prefeito'
      },
      {
        email: 'vereador@sistrator.com',
        password: 'Vereador$2024',
        name: 'Vereador Municipal',
        role: 'vereador'
      },
      {
        email: 'secretaria@sistrator.com',
        password: 'Secretaria&2024',
        name: 'Secretária da Agricultura',
        role: 'secretaria'
      },
      {
        email: 'tratorista@sistrator.com',
        password: 'Tratorista%2024',
        name: 'João Silva Santos',
        role: 'tratorista',
        cpf: '123.456.789-00'
      }
    ]

    const results = []

    for (const userData of users) {
      try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true,
          user_metadata: {
            name: userData.name,
            role: userData.role,
            cpf: userData.cpf || null
          }
        })

        if (authError) {
          console.error(`Error creating user ${userData.email}:`, authError)
          results.push({ email: userData.email, success: false, error: authError.message })
          continue
        }

        // Criar perfil do usuário
        const { error: profileError } = await supabaseAdmin
          .from('profiles')
          .upsert({
            id: authData.user.id,
            email: userData.email,
            name: userData.name,
            role: userData.role
          })

        if (profileError) {
          console.error(`Error creating profile for ${userData.email}:`, profileError)
          results.push({ email: userData.email, success: false, error: profileError.message })
        } else {
          results.push({ 
            email: userData.email, 
            success: true, 
            userId: authData.user.id,
            password: userData.password,
            role: userData.role
          })
        }

      } catch (error) {
        console.error(`Exception for user ${userData.email}:`, error)
        results.push({ email: userData.email, success: false, error: error.message })
      }
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
