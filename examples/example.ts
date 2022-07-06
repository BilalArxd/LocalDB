import { Entity, Collection, StorageType } from '../mod.ts';

interface Car extends Entity {
	name?: string;
	year?: number;
}

const print = (collection: Car[], state: string) => {
	let text = `${state?.toUpperCase()} -> [\n`;
	collection.forEach((item) => {
		text += `Car {_id:${item._id}, name:${item.name}, year:${item.year}}\n`;
	});
	text += ']\n';
	console.log(text);
};

console.clear();
const cars = new Collection<Car>('cars', StorageType.LOCAL_STORAGE);

cars.addSingle({ name: 'Honda', year: 2004 });
print(cars.getMultiple({}), 'added_single');

cars.addMultiple([
	{ name: 'Toyota', year: 2010 },
	{ name: 'Hyundai', year: 2012 },
	{ name: 'Suzuki', year: 2004 }
]);
print(cars.getMultiple({}), 'added_multiple');

let result = cars.getMultiple({ year: 2004 });
print(result, 'get_multiple_by_year_2004');

result = [cars.getSingle({ year: 2012 })];
print(result, 'get_single_by_year_2012');

result[0].name = 'KIA';
result = [cars.update({ year: 2012 }, result[0])];
print(cars.getMultiple({}), 'updated_single_by_year_2012');

cars.removeSingle({ year: 2012 });
print(cars.getMultiple({}), 'removed_single_by_year_2012');

cars.removeMultiple({ year: 2004 });
print(cars.getMultiple({}), 'removed_multiple_by_year_2004');

cars.clear();
print(cars.getMultiple({}), 'cleared_collection');
