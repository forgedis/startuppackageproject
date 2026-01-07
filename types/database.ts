/**
 * Database types generated from Supabase schema
 * This file should be regenerated when database schema changes
 * Run: npx supabase gen types typescript --project-id your-project-id > types/database.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          slug: string
          name_cs: string
          name_en: string | null
          description_cs: string | null
          icon: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name_cs: string
          name_en?: string | null
          description_cs?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name_cs?: string
          name_en?: string | null
          description_cs?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          slug: string
          name: string
          logo_url: string | null
          short_description: string | null
          full_description: string | null
          website_url: string | null
          contact_email: string | null
          is_verified: boolean
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          logo_url?: string | null
          short_description?: string | null
          full_description?: string | null
          website_url?: string | null
          contact_email?: string | null
          is_verified?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          logo_url?: string | null
          short_description?: string | null
          full_description?: string | null
          website_url?: string | null
          contact_email?: string | null
          is_verified?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          slug: string
          partner_id: string
          category_id: string | null
          title_cs: string
          subtitle_cs: string | null
          description_cs: string
          pricing_tier: string | null
          pricing_details: Json | null
          conditions: Json | null
          cta_text: string
          meta_title: string | null
          meta_description: string | null
          is_active: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          partner_id: string
          category_id?: string | null
          title_cs: string
          subtitle_cs?: string | null
          description_cs: string
          pricing_tier?: string | null
          pricing_details?: Json | null
          conditions?: Json | null
          cta_text?: string
          meta_title?: string | null
          meta_description?: string | null
          is_active?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          partner_id?: string
          category_id?: string | null
          title_cs?: string
          subtitle_cs?: string | null
          description_cs?: string
          pricing_tier?: string | null
          pricing_details?: Json | null
          conditions?: Json | null
          cta_text?: string
          meta_title?: string | null
          meta_description?: string | null
          is_active?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          offer_id: string | null
          partner_id: string | null
          first_name: string
          last_name: string
          email: string
          phone: string | null
          company_name: string | null
          note: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          status: string
          gdpr_consent: boolean
          marketing_consent: boolean
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          offer_id?: string | null
          partner_id?: string | null
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          company_name?: string | null
          note?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          status?: string
          gdpr_consent?: boolean
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          offer_id?: string | null
          partner_id?: string | null
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          company_name?: string | null
          note?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          status?: string
          gdpr_consent?: boolean
          marketing_consent?: boolean
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
