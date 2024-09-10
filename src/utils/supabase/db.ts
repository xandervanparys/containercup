import supabaseBrowserClient from "./client";
import ContainerCup from "@/types/containercup";

const db = supabaseBrowserClient;

export const createContainerCup = async (
  userId: string, 
  name: string, 
  description?: string, 
  imageUrl?: string
): Promise<ContainerCup | null> => {
  const { data, error } = await db.from('container_cups').insert([{
    user_id: userId,
    name: name,
    description: description ?? '',
    image_url: imageUrl ?? ''
  }]);

  if (error) {
    console.log(error);
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
