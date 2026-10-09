export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type MessageStatus = 'new' | 'read' | 'replied';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          phone: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email: string;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string;
          phone?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      destinations: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          location: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          location?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          location?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          destination_id: string | null;
          title: string;
          description: string | null;
          duration: string | null;
          price: number;
          image_url: string | null;
          highlights: string[] | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          destination_id?: string | null;
          title: string;
          description?: string | null;
          duration?: string | null;
          price: number;
          image_url?: string | null;
          highlights?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          destination_id?: string | null;
          title?: string;
          description?: string | null;
          duration?: string | null;
          price?: number;
          image_url?: string | null;
          highlights?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          icon: string | null;
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      tour_plans: {
        Row: {
          id: string;
          package_id: string;
          day_number: number;
          title: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          package_id: string;
          day_number: number;
          title: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          package_id?: string;
          day_number?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string | null;
          package_id: string | null;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string;
          travel_date: string | null;
          travelers: number;
          total_amount: number | null;
          special_request: string | null;
          status: BookingStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          package_id?: string | null;
          customer_name: string;
          customer_email?: string | null;
          customer_phone: string;
          travel_date?: string | null;
          travelers?: number;
          total_amount?: number | null;
          special_request?: string | null;
          status?: BookingStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          package_id?: string | null;
          customer_name?: string;
          customer_email?: string | null;
          customer_phone?: string;
          travel_date?: string | null;
          travelers?: number;
          total_amount?: number | null;
          special_request?: string | null;
          status?: BookingStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string;
          subject: string | null;
          message: string;
          status: MessageStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone: string;
          subject?: string | null;
          message: string;
          status?: MessageStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string;
          subject?: string | null;
          message?: string;
          status?: MessageStatus;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          customer_name: string;
          rating: number;
          review_text: string;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          customer_name: string;
          rating: number;
          review_text: string;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          customer_name?: string;
          rating?: number;
          review_text?: string;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_roles: {
        Row: {
          id: string;
          user_id: string;
          role: 'admin' | 'super_admin';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role?: 'admin' | 'super_admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: 'admin' | 'super_admin';
          created_at?: string;
        };
      };
    };
  };
}
