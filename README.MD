# Query Debounce

Query Debounce adalah hook untuk mengelola banyak inputan yang akan dibuat asyncronos (debounce) pada perubahan status inputan sesuai waktu yang ditentukan yang disimpan dalam bentuk object.

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

  console.log("Get all values", getValues());

  console.log("Get value by key", watch("name"));

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
