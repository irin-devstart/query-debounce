# Query Debounce

Query Debounce adalah hook untuk mengelola banyak inputan yang akan dibuat asyncronos (debounce) pada perubahan status inputan sesuai waktu yang ditentukan yang disimpan dalam bentuk object.

[![licence](https://img.shields.io/npm/l/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![minzip](https://img.shields.io/bundlephobia/minzip/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![npm downloads](https://img.shields.io/npm/dm/query-debounce)](https://www.npmjs.com/package/query-debounce)

## Features

- Mempermudah melakukan pengontrolan proses watch, get, set dan reset dll
- Bisa memperoleh value without debounce (callback pada set value)
- Bisa memperoleh status progress perubahan loading or success
- Mempermudah melakukan debounce pada banyak inputan
- Sangat mudah dipahami

## Installation

```
npm install query-debounce
```

Or

## Quickstart

```jsx
import { useQueryDebounce } from "query-debounce";
const App = () => {
  const { setValues, getValues, watch } = useQueryDebounce({
    defaultValues: {
      id: 0,
      name: "",
    },
    wait: 500,
  });

  console.log("Get all values", getValues());

  console.log("Get value by key", watch("name"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues("name", event.currentTarget.value);
  };

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" onChange={handleChange} />
    </div>
  );
};
```

## Documentation

On progress
