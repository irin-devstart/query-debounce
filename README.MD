# Query Debounce

Query Debounce adalah hook untuk mengelola banyak inputan yang akan dibuat asyncronos (debounce) pada perubahan inputan sesuai waktu yang ditentukan yang bentuk object.

## Features

- Mempermudah melakukan set, update dan delete value
- Bisa membuat banyak inputan menggukan object

## Installation

```
npm install query-debounce
```

## Quickstart

```jsx
import { useQueryDebounce } from "query-debounce";
const App = () => {
  const { setValues, getValues, watch } = useQueryDebounce({
    initialData: {
      id: 0,
      name: "",
    },
  });

  console.log("Gell all values", getValues());

  console.log("Gell value by key", watch("name"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues("name", event.currentTarget.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />;
    </div>
  );
};
```
