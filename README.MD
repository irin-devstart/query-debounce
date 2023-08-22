# Query Debounce

Query Debounce merupakan custom hook untuk memudahkan menagement banyak inputan yang bisa didebounce dengan berupa object, sehingga mempermudah untuk memanage banyak query params untuk menghindari pemanggilan berulang yang tidak diperlukan pada server (API).

[![licence](https://img.shields.io/npm/l/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![minzip](https://img.shields.io/bundlephobia/minzip/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![npm downloads](https://img.shields.io/npm/dm/query-debounce)](https://www.npmjs.com/package/query-debounce)

## Features

- Mempermudah melakukan debounce pada banyak inputan (state object)
- Bisa memperoleh value without debounce (callback pada set value)
- Bisa memperoleh status progress perubahan loading or success
- Tersedia returns untuk set, get, watch, clear, register.

## Installation

```
npm install query-debounce
```

## Quickstart

```jsx
import { useQueryDebounce } from "query-debounce";
const App = () => {
  const { register, getValues, watch } = useQueryDebounce({
    defaultValues: {
      id: 0,
      name: "",
    },
    wait: 500,
  });

  console.log("Get all values", getValues());

  console.log("Get value by key", watch("name"));

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" {...register("name")} />
    </div>
  );
};
export default App;
```

## Documentation

### useQueryDebounce: (options) => returns

Query Debounce merupakan custom hook untuk membuat debounce state.

### Options

#### `defaultValues`

#### `onProgress`

#### `onSuccess`

#### `wait`

### Returns

#### `getValues`

#### `setValue`

#### `clearValues`

#### `register`

#### `watch`

#### `reset`
