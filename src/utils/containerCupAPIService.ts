import axios from 'axios';
import ContainerCup from '@/types/containercup';

export class ContainerCupAPIService {
    private static _API_URL = '/api/container-cups';
    public static async getContainerCups(userId: string): Promise<ContainerCup[]> {
        try {
            const response = await axios.get(this._API_URL, { params: { userId } });
            return response.data;
        } catch (error) {
            console.error('Error fetching container cups:', error);
            throw error;
        }
    }

    public static async createContainerCup(userId: string, name: string, description?: string, imageUrl?: string): Promise<ContainerCup> {
        try {
            const response = await axios.post(this._API_URL, { userId, name, description, imageUrl });
            return response.data;
        } catch (error) {
            console.error('Error creating container cup:', error);
            throw error;
        }
    }

    public static async updateContainerCup(id: number, updates: Partial<{ name: string; description?: string; imageUrl?: string }>): Promise<ContainerCup> {
        try {
            const response = await axios.put(this._API_URL, { id, updates });
            return response.data;
        } catch (error) {
            console.error('Error updating container cup:', error);
            throw error;
        }
    }

    public static async deleteContainerCup(id: number): Promise<ContainerCup> {
        try {
            const response = await axios.delete(`${this._API_URL}?id=${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting container cup:', error);
            throw error;
        }
    }
}