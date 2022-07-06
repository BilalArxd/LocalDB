export interface Entity {
	_id?: string;
	_created?: number;
	_updated?: number;
}
export interface IStorage {
	key: string;
	set(collectionText: string): void;
	get(): string | null;
}

export type Selector<T> = T | ((document: T) => boolean | undefined);

export enum StorageType {
	LOCAL_STORAGE
}
