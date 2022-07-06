import { assertEquals, assertNotEquals } from '../deps.ts';
import { Collection, Entity, StorageType } from '../mod.ts';

interface Car extends Entity {
	id?: number;
	name?: string;
	year?: number;
}
Deno.test('collection_clear_should_emptyCollection', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ name: 'foo', year: 2004 },
		{ name: 'bar', year: 2005 }
	]);

	// Act
	collection.clear();
	const result = collection.getMultiple({});

	// Assert
	assertEquals(result.length, 0);
});

Deno.test('collection_addSingle_shouldAdd_singleItem', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addSingle({ name: 'foo', year: 2004 });

	// Act
	const result = collection.getMultiple({});

	// Assert
	assertEquals(result.length, 1);
	assertEquals(result[0].name, 'foo');
});

Deno.test('collection_addMultiple_shouldAdd_collection', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ name: 'foo', year: 2004 },
		{ name: 'bar', year: 2005 }
	]);

	// Act
	const result = collection.getMultiple({});

	// Assert
	assertEquals(result.length, 2);
	assertEquals(result[0].name, 'foo');
	assertEquals(result[1].name, 'bar');
});
Deno.test('collection_update_shouldUpdate_given_selector', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ id: 1, name: 'foo', year: 2004 },
		{ id: 2, name: 'bar', year: 2005 },
		{ id: 3, name: 'baz', year: 2005 }
	]);
	// Act
	collection.update({ name: 'foo' }, { id: 4, name: 'foobar', year: 2022 });
	const result = collection.getSingle({ name: 'foobar' });

	// Assert
	assertNotEquals(result.id, 1);
	assertEquals(result.id, 4);
	assertNotEquals(result.name, 'foo');
	assertEquals(result.name, 'foobar');
	assertNotEquals(result.year, 2004);
	assertEquals(result.year, 2022);
});
Deno.test(
	'collection_getSingle_shouldReturn_undefined_forEmptyCollection',
	() => {
		// Arrange
		const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);

		// Act
		const result = collection.getSingle({});

		// Assert
		assertEquals(result, undefined);
	}
);

Deno.test('collection_getSingle_shouldReturn_firstItem', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ id: 1, name: 'foo', year: 2004 },
		{ id: 2, name: 'bar', year: 2005 },
		{ id: 3, name: 'foo', year: 2005 }
	]);

	// Act
	const byYearResult = collection.getSingle({ year: 2005 });
	const byNameResult = collection.getSingle({ name: 'foo' });

	// Assert
	assertEquals(byYearResult.year, 2005);
	assertEquals(byNameResult.name, 'foo');
});
Deno.test(
	'collection_getSingle_shouldReturn_firstItem_withEmptySelector',
	() => {
		// Arrange
		const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
		collection.addMultiple([
			{ id: 1, name: 'foo', year: 2004 },
			{ id: 2, name: 'bar', year: 2005 },
			{ id: 3, name: 'baz', year: 2005 }
		]);

		// Act
		const result = collection.getSingle({});

		// Assert
		assertEquals(result.year, 2004);
		assertEquals(result.name, 'foo');
	}
);

Deno.test(
	'collection_getMultiple_shouldReturn_zeroItems_forEmptyCollection',
	() => {
		// Arrange
		const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);

		// Act
		// Assert
		const result = collection.getMultiple({});

		assertEquals(result.length, 0);
	}
);

Deno.test('collection_getMultiple_shouldReturn_validItems_forAllKeys', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ id: 1, name: 'foo', year: 2004 },
		{ id: 2, name: 'bar', year: 2005 },
		{ id: 3, name: 'foo', year: 2005 }
	]);

	// Act
	const filterByYear = collection.getMultiple({ year: 2005 });
	const filterByName = collection.getMultiple({ name: 'foo' });

	// Assert
	assertEquals(filterByYear.length, 2);
	assertEquals(
		filterByYear.every((item) => item.year === 2005),
		true
	);

	assertEquals(filterByName.length, 2);
	assertEquals(
		filterByName.every((item) => item.name === 'foo'),
		true
	);
});

Deno.test('collection_removeSingle_shouldRemove_singleItem', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ id: 1, name: 'foo', year: 2004 },
		{ id: 2, name: 'bar', year: 2005 },
		{ id: 3, name: 'foo', year: 2005 }
	]);

	// Act
	const byYearItem = collection.getSingle({ id: 2 });
	const byYearResult = collection.removeSingle({ year: 2005 });
	const byNameItem = collection.getSingle({ id: 1 });
	const byNameResult = collection.removeSingle({ name: 'foo' });

	// Assert
	assertEquals(byYearResult, byYearItem._id);
	assertEquals(byNameResult, byNameItem._id);
});

Deno.test('collection_removeMultiple_shouldRemove_multipleItems', () => {
	// Arrange
	const collection = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);
	collection.addMultiple([
		{ id: 1, name: 'foo', year: 2004 },
		{ id: 2, name: 'bar', year: 2005 },
		{ id: 3, name: 'foo', year: 2020 },
		{ id: 4, name: 'baz', year: 2005 },
		{ id: 5, name: 'foobar', year: 2010 }
	]);

	// Act
	const byYearItems = collection.getMultiple({ year: 2005 });
	const byYearResult = collection.removeMultiple({ year: 2005 });
	const byNameItem = collection.getMultiple({ name: 'foo' });
	const byNameResult = collection.removeMultiple({ name: 'foo' });
	const result = collection.getMultiple({});
	// Assert
	assertNotEquals(byYearResult, undefined);
	assertEquals(byYearResult[0], byYearItems[0]._id);
	assertEquals(byYearResult[1], byYearItems[1]._id);

	assertNotEquals(byNameResult, undefined);
	assertEquals(byNameResult[0], byNameItem[0]._id);
	assertEquals(byNameResult[1], byNameItem[1]._id);

	assertEquals(result.length, 1);
	assertEquals(result[0].name, 'foobar');
});
