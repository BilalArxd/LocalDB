import { IStorage } from './types.ts';

export class LocalStorage implements IStorage {
	key: string;
	constructor(key: string) {
		this.key = key;
	}

	set(collectionText: string): void {
		localStorage.setItem(this.key, collectionText);
	}
	get(): string | null {
		const collectionText = localStorage.getItem(this.key);
		return collectionText;
	}
}
