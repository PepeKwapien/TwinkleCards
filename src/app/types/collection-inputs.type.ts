import { CollectionType } from './collection-type.type';

export type CollectionInputs = {
    name: string;
    description: string | null;
    isPublic: boolean;
    type: CollectionType;
    group: string;
};
