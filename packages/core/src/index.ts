import { createClient } from '@supabase/supabase-js';

// Re-export types if needed
export * from './types';

// The URL and Key should be passed from the environment of the consuming app
export const createWeedClubClient = (supabaseUrl: string, supabaseAnonKey: string) => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
