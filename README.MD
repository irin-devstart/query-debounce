#Query Debounce

## Features

- Features 1
- Features 2
- Features 3
- Features 4
- Features 5

## Install

npm install query-debounce

## Quickstart

```jsx
import { useEffect } from "react";
import { useQueryDebounce } from "query-debounce";
const App = () => {
  const { setValues, getValues, watch } = useQueryDebounce({
    initialData: {
      id: 0,
      name: "",
    },
  });

  console.log(getValues());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues("name", event.currentTarget.value);
  };

  useEffect(() => {
    console.log("Render if u change name");
  }, [watch("name")]);

  const handleChange

  return <input type="text" onChange={handleChange} />;
};
```
