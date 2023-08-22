# Query Debounce

Query Debounce is a custom hook designed to facilitate the management of multiple inputs that can be debounced in the form of an object, making it easier to manage numerous query parameters to avoid unnecessary repeated calls to the server (API).

[![licence](https://img.shields.io/npm/l/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![minzip](https://img.shields.io/bundlephobia/minzip/query-debounce)](https://www.npmjs.com/package/query-debounce)
[![npm downloads](https://img.shields.io/npm/dm/query-debounce)](https://www.npmjs.com/package/query-debounce)

## Features

- Facilitates debouncing for multiple inputs (state object).
- Can retrieve values without debounce (callback on set value).
- Provides progress status for change, loading, or success.
- Returns are available for set, get, watch, clear, and register.

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
      <label htmlFor="name">Name: </label>
      <input id="name" type="text" {...register("name")} />
    </div>
  );
};
export default App;
```

## Documentation

### `useQueryDebounce: (options) => Return`

Query Debounce is a custom hook for creating debounced states.

### Options

The options for `useQueryDebounce` are as follows:

#### `- defaultValues: DefaultValue | () => TDefaultValue>`

`defaultValues` is used to set default values for an object or a function that returns data.

#### `- onProgress: (status, totalTimer) => void`

`onProgress` is used to capture the progress during the debounce wait process.

#### Props

##### `- status: loading | success`

Fetching the value of progress status.

##### `- totalTimer`

Fetching the total wait timer.

#### `- onSuccess: (data) => void`

`onSuccess` will be called when the setValue process succeeds.

#### Props

##### `- data: Partial<TDefaultValue>`

Fetching data in the form of an object.

#### `- wait: number`

`wait` is used to set the waiting time before the setValue is executed.

### Returns

The return from `useQueryDebounce` is as follows:

#### `- getValues: () => Partial<TDefaultValue>`

`getValues` is used to fetch all values of the object.

#### `- setValue: (key, value, callback) => void`

`setValue` is used to set a value.

#### Props

##### `- key: keyof TDefaultValue`

key is the key of the object for which you want to set a value.

##### `- value: Partial<TDefaultValue>[keyof TDefaultValue]`

value is the value you want to set according to the key.

##### `- callback?: (data: Partial<TDefaultValue>) => void`

callback is used to fetch all values before setting a new value.

#### `- clearValues: (key) => void`

`clearValues` is used to delete values that have been stored based on the key.

#### Props

##### `- key: keyof TDefaultValue | Array<keyof TDefaultValue>`

key is the key of the object that you want to delete.

#### `- register: (key) => { onChange}`

`register` is used to associate this registration with the returned onChange object for the registered input

#### Props

##### `- key: keyof TDefaultValue>`

key is the key of the object you want to register.

##### `- Return`

##### `- onChange: (event: React.ChangeEvent<HTMLInputElement>) => void`

onChange is used to perform a value change

#### `- watch: (key, calback) => void`

watch is used to fetch values based on the key.

#### Props

##### `- key: keyof TDefaultValue>`

key is the key of the object you want to retrieve.

##### `- calback?: ((data: Partial<TDefaultValue>) => void) | undefined)`

callback is used to fetch all values within the watch function.

#### `- reset: () => void`

`reset` is used to reset the value to the default values.
