import supabaseBrowserClient from "./client";
import ContainerCup from "@/types/containercup";


class DatabaseService {
    private _db = supabaseBrowserClient;

    public async createContainerCup(userId: string, name: string, description?: string, imageUrl?: string): Promise<ContainerCup | null> {
        const { data, error } = await this._db.from('container_cups').insert([{
            user_id: userId,
            name: name,
            description: description ?? '',
            image_url: imageUrl ?? ''
        }]);

        if (error) throw error;
        return data as ContainerCup | null;
    }

    public async getContainerCupsFromUser(userId: string): Promise<ContainerCup[]> {
        const { data, error } = await this._db.from('container_cups')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data as ContainerCup[];
    }

    public async getContainerCup(id: number): Promise<ContainerCup | null> {
        const { data, error } = await this._db.from('container_cups')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as ContainerCup | null;
    }

    public async updateContainerCup(id: number, updates: Partial<{ name: string; description?: string; image_url?: string }>): Promise<ContainerCup | null> {
        const { data, error } = await this._db.from('container_cups')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
        return data as ContainerCup | null;
    }

    public async deleteContainerCup(id: number): Promise<ContainerCup | null> {
        const { data, error } = await this._db.from('container_cups')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return data as ContainerCup | null;
    }
}

export default new DatabaseService();
