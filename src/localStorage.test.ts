import { assertEquals } from '../deps.ts';
import { IStorage, LocalStorage } from '../mod.ts';

Deno.test('localStorage_constructor_shouldSet_key', () => {
	// Arrange

	const storage: IStorage = new LocalStorage('foo');

	// Act
	const result = storage.key;

	// Assert
	assertEquals(result, 'foo');
});

Deno.test('localStorage_set_shouldSave_inLocalStorage', () => {
	// Arrange

	const storage: IStorage = new LocalStorage('foo');

	// Act
	storage.set('Foo, Bar, FooBar');
	const result = localStorage.getItem('foo');

	// Assert
	assertEquals(result, 'Foo, Bar, FooBar');
});
