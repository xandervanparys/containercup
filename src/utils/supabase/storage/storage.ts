import supabaseBrowserClient from "../client/client";

const db = supabaseBrowserClient;

const getFilePath = async (path: string): Promise<string> => {
  const user = (await db.auth.getUser()).data.user;
  const userId = user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  return `${userId}/${path}`;
}

export const uploadImage = async (file: File, path: string, bucket: 'profile-picures' | 'containercup-pictures') => {
  const filePath = await getFilePath(path);
  const { data, error } = await db.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading image:', error.message);
    throw error;
  }

  return data;
}

export const getPublicUrl = async (path: string, bucket: 'profile-picures' | 'containercup-pictures') => {
  const filePath = await getFilePath(path);
  const { data } = db.storage
    .from(bucket)
    .getPublicUrl(filePath);

  if (!data.publicUrl) {
    console.error('Error getting public URL:');
    throw new Error('Error getting public URL');
  }

  return data.publicUrl;
}

export const getSignedUrl = async (path: string, bucket: 'profile-pictures' | 'containercup-pictures') => {
  const filePath = await getFilePath(path);
  const { data, error } = await db.storage
    .from(bucket)
    .createSignedUrl(filePath, 600);

  if (error) {
    console.error('Error generating signed URL:', error.message);
    throw error;
  }

  return data.signedUrl;
}