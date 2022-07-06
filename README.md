# LocalDB

![deno workflow](https://github.com/BilalArxd/LocalDB/actions/workflows/deno.yml/badge.svg)

A lightweight local document database for **[Deno](https://deno.land)** by using
localstorage without any permissions.

## Usage

```typescript
import { Collection, Entity, StorageType } from "../mod.ts";

interface Car extends Entity {
  name?: string;
  year?: number;
}

// Just For Decoration Purposes
const print = (collection: Car[], state: string) => {
  let text = `${state?.toUpperCase()} -> [\n`;
  collection.forEach((item) => {
    text += `Car {_id:${item._id}, name:${item.name}, year:${item.year}}\n`;
  });
  text += "]\n";
  console.log(text);
};

console.clear();
const cars = new Collection<Car>("cars", StorageType.LOCAL_STORAGE);

cars.addSingle({ name: "Honda", year: 2004 });
print(cars.getMultiple({}), "added_single");
/* Output
ADDED_SINGLE -> [
Car {_id:11e267b9-dcec-436b-b4f7-c34c90baee82, name:Honda, year:2004}
]
*/

cars.addMultiple([
  { name: "Toyota", year: 2010 },
  { name: "Hyundai", year: 2012 },
  { name: "Suzuki", year: 2004 },
]);
print(cars.getMultiple({}), "added_multiple");
/* Output
ADDED_MULTIPLE -> [
Car {_id:11e267b9-dcec-436b-b4f7-c34c90baee82, name:Honda, year:2004}
Car {_id:f3546cdf-163f-423a-a159-366b18ab6473, name:Toyota, year:2010}
Car {_id:44376b11-04d8-4af1-b800-d2329ff16801, name:Hyundai, year:2012}
Car {_id:572d6e1b-b6ed-4b70-8b6c-e4ae67d6cd78, name:Suzuki, year:2004}
]
*/

let result = cars.getMultiple({ year: 2004 });
print(result, "get_multiple_by_year_2004");
/* Output
GET_MULTIPLE_BY_YEAR_2004 -> [
Car {_id:11e267b9-dcec-436b-b4f7-c34c90baee82, name:Honda, year:2004}
Car {_id:572d6e1b-b6ed-4b70-8b6c-e4ae67d6cd78, name:Suzuki, year:2004}
]
*/

result = [cars.getSingle({ year: 2012 })];
print(result, "get_single_by_year_2012");
/* Output
GET_SINGLE_BY_YEAR_2012 -> [
Car {_id:44376b11-04d8-4af1-b800-d2329ff16801, name:Hyundai, year:2012}
]
*/

result[0].name = "KIA";
result = [cars.update({ year: 2012 }, result[0])];
print(cars.getMultiple({}), "updated_single_by_year_2012");
/* Output
UPDATED_SINGLE_BY_YEAR_2012 -> [
Car {_id:11e267b9-dcec-436b-b4f7-c34c90baee82, name:Honda, year:2004}
Car {_id:f3546cdf-163f-423a-a159-366b18ab6473, name:Toyota, year:2010}
Car {_id:44376b11-04d8-4af1-b800-d2329ff16801, name:KIA, year:2012}
Car {_id:572d6e1b-b6ed-4b70-8b6c-e4ae67d6cd78, name:Suzuki, year:2004}
]
*/

cars.removeSingle({ year: 2012 });
print(cars.getMultiple({}), "removed_single_by_year_2012");
/* Output
REMOVED_SINGLE_BY_YEAR_2012 -> [
Car {_id:11e267b9-dcec-436b-b4f7-c34c90baee82, name:Honda, year:2004}
Car {_id:f3546cdf-163f-423a-a159-366b18ab6473, name:Toyota, year:2010}
Car {_id:572d6e1b-b6ed-4b70-8b6c-e4ae67d6cd78, name:Suzuki, year:2004}
]
*/

cars.removeMultiple({ year: 2004 });
print(cars.getMultiple({}), "removed_multiple_by_year_2004");
/* Output
REMOVED_MULTIPLE_BY_YEAR_2004 -> [
Car {_id:f3546cdf-163f-423a-a159-366b18ab6473, name:Toyota, year:2010}
]
*/

cars.clear();
print(cars.getMultiple({}), "cleared_collection");
/* Output
CLEARED_COLLECTION -> [
]
*/
```

## Examples

```bash
deno task example
```

## Test

```bash
deno task test
```
