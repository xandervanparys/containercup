export interface IContainerCup {
    id: number;
    user_id?: string;
    name: string;
    description: string;
    image_url: string;
}

export default class ContainerCup implements IContainerCup {
    id: number;
    user_id?: string | undefined;
    name: string;
    description: string;
    image_url: string;

    constructor({ id, user_id, name, description, image_url }: IContainerCup) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.image_url = image_url;
    }

    toString(): string {
        return `Id: ${this.id} - user_id: ${this.user_id} - Name: ${this.name} - Description: ${this.description} - Image URL: ${this.image_url}`;
    }
}