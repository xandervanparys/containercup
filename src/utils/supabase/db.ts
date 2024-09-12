import supabaseBrowserClient from "./client/client";
import ContainerCup from "@/types/containercup";

const db = supabaseBrowserClient;

export const createContainerCup = async (
  cup: ContainerCup
): Promise<ContainerCup | null> => {
  const { data, error } = await db.from('container_cups').insert([{
    user_id: cup.user_id,
    name: cup.name,
    description: cup.description ?? '',
    image_url: cup.image_url ?? ''
  }]);

  if (error) {
    throw error;
  }
  
  return data as ContainerCup | null;
};

export const getContainerCupsFromUser = async (userId: string): Promise<ContainerCup[]> => {
  const { data, error } = await db.from('container_cups')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data as ContainerCup[];
};

export const getContainerCup = async (id: number): Promise<ContainerCup | null> => {
  const { data, error } = await db.from('container_cups')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as ContainerCup | null;
};

export const updateContainerCup = async (
  id: number, 
  updates: Partial<{ name: string; description?: string; image_url?: string }>
): Promise<ContainerCup | null> => {
  const { data, error } = await db.from('container_cups')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
  return data as ContainerCup | null;
};

export const deleteContainerCup = async (id: number): Promise<ContainerCup | null> => {
  const { data, error } = await db.from('container_cups')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data as ContainerCup | null;
};


