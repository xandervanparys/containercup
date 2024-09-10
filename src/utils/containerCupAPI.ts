import axios from 'axios';
import ContainerCup from '@/types/containercup';

const API_URL = '/api/container-cups';

export const getContainerCups = async (userId: string): Promise<ContainerCup[]> => {
    try {
        const response = await axios.get(API_URL, { params: { userId } });
        return response.data;
    } catch (error) {
        console.error('Error fetching container cups:', error);
        throw error;
    }
};

export const createContainerCup = async (
    userId: string, 
    name: string, 
    description?: string, 
    imageUrl?: string
): Promise<ContainerCup> => {
    try {
        const response = await axios.post(API_URL, { userId, name, description, imageUrl });
        return response.data as ContainerCup;
    } catch (error) {
        console.error('Error creating container cup:', error);
        throw error;
    }
};

export const updateContainerCup = async (
    id: number, 
    updates: Partial<{ name: string; description?: string; imageUrl?: string }>
): Promise<ContainerCup> => {
    try {
        const response = await axios.put(API_URL, { id, updates });
        return response.data;
    } catch (error) {
        console.error('Error updating container cup:', error);
        throw error;
    }
};

export const deleteContainerCup = async (id: number): Promise<ContainerCup> => {
    try {
        const response = await axios.delete(`${API_URL}?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting container cup:', error);
        throw error;
    }
};
