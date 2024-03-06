import { CollectionGroupColorType } from 'src/app/helpers/colors.helper';
import { ICollectionReference } from './collection-reference.document';

export interface IUserCollectionGroup {
    name: string;
    color: CollectionGroupColorType;
    collections: ICollectionReference[];
}
