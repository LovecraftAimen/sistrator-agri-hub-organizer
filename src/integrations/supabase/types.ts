export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agendamentos: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_agendamento: string
          hora_fim: string | null
          hora_inicio: string
          id: string
          observacoes: string | null
          servico_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_agendamento: string
          hora_fim?: string | null
          hora_inicio: string
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_agendamento?: string
          hora_fim?: string | null
          hora_inicio?: string
          id?: string
          observacoes?: string | null
          servico_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
        ]
      }
      beneficiarios: {
        Row: {
          area_total: number | null
          cpf: string
          created_at: string | null
          created_by: string | null
          culturas_principais: string[] | null
          data_cadastro: string | null
          endereco: string | null
          id: string
          nome: string
          observacoes: string | null
          regiao: string
          status: string | null
          telefone: string | null
          updated_at: string | null
          vereador: string | null
        }
        Insert: {
          area_total?: number | null
          cpf: string
          created_at?: string | null
          created_by?: string | null
          culturas_principais?: string[] | null
          data_cadastro?: string | null
          endereco?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          regiao: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          vereador?: string | null
        }
        Update: {
          area_total?: number | null
          cpf?: string
          created_at?: string | null
          created_by?: string | null
          culturas_principais?: string[] | null
          data_cadastro?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          regiao?: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
          vereador?: string | null
        }
        Relationships: []
      }
      documentos: {
        Row: {
          arquivo_url: string | null
          beneficiario_id: string | null
          categoria: string | null
          created_at: string | null
          created_by: string | null
          data_upload: string | null
          id: string
          nome: string
          servico_id: string | null
          tamanho: number | null
          tipo: string
          tratorista_id: string | null
          updated_at: string | null
        }
        Insert: {
          arquivo_url?: string | null
          beneficiario_id?: string | null
          categoria?: string | null
          created_at?: string | null
          created_by?: string | null
          data_upload?: string | null
          id?: string
          nome: string
          servico_id?: string | null
          tamanho?: number | null
          tipo: string
          tratorista_id?: string | null
          updated_at?: string | null
        }
        Update: {
          arquivo_url?: string | null
          beneficiario_id?: string | null
          categoria?: string | null
          created_at?: string | null
          created_by?: string | null
          data_upload?: string | null
          id?: string
          nome?: string
          servico_id?: string | null
          tamanho?: number | null
          tipo?: string
          tratorista_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_tratorista_id_fkey"
            columns: ["tratorista_id"]
            isOneToOne: false
            referencedRelation: "tratoristas"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      servicos: {
        Row: {
          area: number | null
          beneficiario_id: string | null
          codigo_servico: string
          created_at: string | null
          created_by: string | null
          culturas_previstas: string[] | null
          data_agendamento: string
          endereco: string | null
          equipamentos: string[] | null
          fim_real: string | null
          horas_estimadas: number | null
          horas_reais: number | null
          id: string
          inicio_estimado: string | null
          inicio_real: string | null
          observacoes: string | null
          prioridade: string | null
          regiao: string | null
          status: Database["public"]["Enums"]["service_status"] | null
          tipo: Database["public"]["Enums"]["service_type"]
          tratorista_id: string | null
          updated_at: string | null
          vereador: string | null
        }
        Insert: {
          area?: number | null
          beneficiario_id?: string | null
          codigo_servico: string
          created_at?: string | null
          created_by?: string | null
          culturas_previstas?: string[] | null
          data_agendamento: string
          endereco?: string | null
          equipamentos?: string[] | null
          fim_real?: string | null
          horas_estimadas?: number | null
          horas_reais?: number | null
          id?: string
          inicio_estimado?: string | null
          inicio_real?: string | null
          observacoes?: string | null
          prioridade?: string | null
          regiao?: string | null
          status?: Database["public"]["Enums"]["service_status"] | null
          tipo: Database["public"]["Enums"]["service_type"]
          tratorista_id?: string | null
          updated_at?: string | null
          vereador?: string | null
        }
        Update: {
          area?: number | null
          beneficiario_id?: string | null
          codigo_servico?: string
          created_at?: string | null
          created_by?: string | null
          culturas_previstas?: string[] | null
          data_agendamento?: string
          endereco?: string | null
          equipamentos?: string[] | null
          fim_real?: string | null
          horas_estimadas?: number | null
          horas_reais?: number | null
          id?: string
          inicio_estimado?: string | null
          inicio_real?: string | null
          observacoes?: string | null
          prioridade?: string | null
          regiao?: string | null
          status?: Database["public"]["Enums"]["service_status"] | null
          tipo?: Database["public"]["Enums"]["service_type"]
          tratorista_id?: string | null
          updated_at?: string | null
          vereador?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "servicos_beneficiario_id_fkey"
            columns: ["beneficiario_id"]
            isOneToOne: false
            referencedRelation: "beneficiarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servicos_tratorista_id_fkey"
            columns: ["tratorista_id"]
            isOneToOne: false
            referencedRelation: "tratoristas"
            referencedColumns: ["id"]
          },
        ]
      }
      tratoristas: {
        Row: {
          cnh: string
          cpf: string
          created_at: string | null
          created_by: string | null
          data_cadastro: string | null
          disponibilidade: string | null
          endereco: string | null
          especialidades: string[] | null
          experiencia: string | null
          horas_trabalhadas: number | null
          id: string
          nome: string
          observacoes: string | null
          status: Database["public"]["Enums"]["tratorista_status"] | null
          telefone: string | null
          updated_at: string | null
          validade_cnh: string
        }
        Insert: {
          cnh: string
          cpf: string
          created_at?: string | null
          created_by?: string | null
          data_cadastro?: string | null
          disponibilidade?: string | null
          endereco?: string | null
          especialidades?: string[] | null
          experiencia?: string | null
          horas_trabalhadas?: number | null
          id?: string
          nome: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["tratorista_status"] | null
          telefone?: string | null
          updated_at?: string | null
          validade_cnh: string
        }
        Update: {
          cnh?: string
          cpf?: string
          created_at?: string | null
          created_by?: string | null
          data_cadastro?: string | null
          disponibilidade?: string | null
          endereco?: string | null
          especialidades?: string[] | null
          experiencia?: string | null
          horas_trabalhadas?: number | null
          id?: string
          nome?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["tratorista_status"] | null
          telefone?: string | null
          updated_at?: string | null
          validade_cnh?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_political_role: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_tratorista: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      service_status:
        | "agendado"
        | "em_execucao"
        | "pausado"
        | "concluido"
        | "cancelado"
      service_type:
        | "aracao"
        | "gradagem"
        | "subsolagem"
        | "plantio_direto"
        | "cultivo"
        | "outros"
      tratorista_status: "ativo" | "inativo" | "licenca"
      user_role: "admin" | "prefeito" | "vereador" | "secretaria" | "tratorista"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      service_status: [
        "agendado",
        "em_execucao",
        "pausado",
        "concluido",
        "cancelado",
      ],
      service_type: [
        "aracao",
        "gradagem",
        "subsolagem",
        "plantio_direto",
        "cultivo",
        "outros",
      ],
      tratorista_status: ["ativo", "inativo", "licenca"],
      user_role: ["admin", "prefeito", "vereador", "secretaria", "tratorista"],
    },
  },
} as const
