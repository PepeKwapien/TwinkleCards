import { CollectionGroupColorType } from './color.type';

export type ConfirmActionProperties = {
    title: string;
    description: string;
    confirmation?: string;
    color?: CollectionGroupColorType;
};
