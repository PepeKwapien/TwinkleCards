import { CollectionGroupColorType } from 'src/app/helpers/colors.helper';

export interface IUserCollectionGroup {
    name: string;
    color: CollectionGroupColorType;
    colletions: string[];
}
