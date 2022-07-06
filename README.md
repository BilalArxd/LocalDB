# LocalDB

![deno workflow](https://github.com/BilalArxd/LocalDB/actions/workflows/deno.yml/badge.svg)

A lightweight local document database for **[Deno](https://deno.land)** by using
localstorage without any permissions.

## Usage

```typescript
import { getGreeting } from "{source}/{version}/mod.ts";

const helloWorld = getGreeting();
console.log(helloWorld); // Prints Hello World from 🦕
```

## Examples

```bash
deno task example
```

## Test

```bash
deno task test
```
