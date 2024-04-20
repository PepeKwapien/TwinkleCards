import { CollectionGroupColorType } from 'src/app/types/color.type';
import { ICollectionReference } from './collection-reference.document';

export interface IUserCollectionGroup {
    name: string;
    color: CollectionGroupColorType;
    collections: ICollectionReference[];
}
