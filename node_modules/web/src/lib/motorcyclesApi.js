import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient.js';

const TABLE = 'motos';
const BUCKET = 'motos';

export function getMotorcycleImageUrl(image) {
  if (!image) {
    return 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop';
  }

  if (typeof image === 'string' && /^https?:\/\//i.test(image)) {
    return image;
  }

  if (!supabase) {
    return image;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(image);
  return data?.publicUrl || image;
}

export async function fetchMotorcycles({ onlyAvailable = false } = {}) {
  if (!isSupabaseConfigured) return [];

  let query = supabase.from(TABLE).select('*').order('created_at', { ascending: false });

  if (onlyAvailable) {
    query = query.eq('status', 'disponível');
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function fetchFeaturedMotorcycles() {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('status', 'disponível')
    .eq('featured_home', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchMotorcycleById(id) {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function fetchSimilarMotorcycles(currentMotorcycle) {
  if (!isSupabaseConfigured || !currentMotorcycle?.id) return [];

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .neq('id', currentMotorcycle.id)
    .eq('status', 'disponível')
    .or(`marca.eq.${currentMotorcycle.marca || ''},tipo.eq.${currentMotorcycle.tipo || ''}`)
    .limit(4)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createMotorcycle(payload) {
  if (!isSupabaseConfigured) throw new Error('Supabase não configurado.');

  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMotorcycle(id, payload) {
  if (!isSupabaseConfigured) throw new Error('Supabase não configurado.');

  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMotorcycle(id, imagePaths = []) {
  if (!isSupabaseConfigured) throw new Error('Supabase não configurado.');

  const validPaths = (imagePaths || []).filter((item) => item && !/^https?:\/\//i.test(item));
  if (validPaths.length) {
    await supabase.storage.from(BUCKET).remove(validPaths);
  }

  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

export async function uploadMotorcycleImages(files = []) {
  if (!isSupabaseConfigured) throw new Error('Supabase não configurado.');

  const uploadedPaths = [];

  for (const file of files) {
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`.replace(/\s+/g, '-');
    const path = safeName;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) throw error;
    uploadedPaths.push(path);
  }

  return uploadedPaths;
}
