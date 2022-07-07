import { Entity, IStorage, Selector, StorageType } from './types.ts';
import { v4 } from '../deps.ts';
import { LocalStorage } from './localStorage.ts';

export class Collection<T extends Entity> {
	collection: T[];
	key: string;
	storage: LocalStorage;
	constructor(key: string, storageType: StorageType) {
		this.collection = [];
		this.key = `collection.${key}`;
		switch (storageType) {
			case StorageType.LOCAL_STORAGE:
				this.storage = new LocalStorage(this.key);
				break;
			default:
				this.storage = new LocalStorage(this.key);
				break;
		}
		this.init();
	}

	private init(): void {
		this.collection = [] as T[];
		this.set(this.collection);
	}

	clear(): void {
		this.collection = [];
		this.set(this.collection);
	}

	addSingle(item: T) {
		if (!item._id || !v4.validate(item._id)) {
			item._id = crypto.randomUUID();
		}
		const date = +new Date();
		item._created = date;
		item._updated = date;
		this.collection.push(item);
		this.set(this.collection);
	}

	addMultiple(items: T[]) {
		items.forEach((item) => {
			if (!item._id || !v4.validate(item._id)) {
				item._id = crypto.randomUUID();
			}
			const date = +new Date();
			item._created = date;
			item._updated = date;
			this.collection.push(item);
		});
		this.set(this.collection);
	}

	update(selector: Selector<T>, updated: T): T {
		const selected = this.getSingle(selector);
		const index = this.collection.indexOf(selected);
		updated._updated = +new Date();
		this.collection[index] = updated;
		return this.collection[index];
	}

	getSingle(selector: Selector<T>): T {
		return this.getMultiple(selector)[0];
	}

	getMultiple(selector: Selector<T>): T[] {
		if (selector instanceof Function) {
			return this.collection.filter(selector);
		}

		return this.collection.filter((el) => {
			return Object.keys(selector).every((key) => {
				return selector[key as keyof T] === el[key as keyof T];
			});
		});
	}

	removeSingle(selector: Selector<T>) {
		const item = this.getSingle(selector);
		const filteredCollection = this.collection.filter(
			({ _id }) => _id !== item._id
		);
		this.collection = filteredCollection;
		this.set(this.collection);
		return item._id;
	}

	removeMultiple(selector: Selector<T>) {
		const items = this.getMultiple(selector);
		this.collection = this.collection.filter((el) => !items.includes(el));
		this.set(this.collection);
		return items.map((t: T) => t._id);
	}

	private set(collection: T[]): T[] {
		const collectionText = JSON.stringify(this.collection);
		this.storage.set(collectionText);
		return collection;
	}

	private load(): T[] {
		const collectionText = this.storage.get();
		if (collectionText == null) {
			console.error(`collection at ${this.key} is null.`);
			this.collection = this.set([]);
		} else {
			this.collection = JSON.parse(collectionText);
		}
		return this.collection;
	}
}
