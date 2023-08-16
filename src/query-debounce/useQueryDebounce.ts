import React, { useState } from "react";
import { debounce } from "lodash";

const useQueryDebounce = <T extends object>({
  defaultValues = {},
  wait = 500,
}: Partial<{
  defaultValues: Partial<T>;
  wait: number;
}>): {
  getValues: () => Partial<T>;
  setValues: (
    key: keyof T,
    value: Partial<T>[keyof T],
    callback?: (value: Partial<T>) => void
  ) => void;
  reset: () => void;
  watch: (key: keyof T) => Partial<T>[keyof T];
} => {
  const [queries, setQueries] = useState<Partial<T>>(defaultValues);

  const queriesDebounce = debounce(
    (key: keyof T, value: Partial<T>[keyof T]) => {
      setQueries((prev) => {
        return { ...prev, [key]: value };
      });
    },
    wait
  );

  const setValues = (
    key: keyof T,
    value: Partial<T>[keyof T],
    callback?: (value: Partial<T>) => void
  ) => {
    callback?.(queries);
    queriesDebounce(key, value);
  };

  const reset = () => {
    setQueries((prev) => {
      return { ...prev, defaultValues };
    });
  };

  const watch = (key: keyof T) => {
    return queries[key];
  };

  const getValues = () => {
    return queries;
  };

  return { getValues, setValues, reset, watch };
};

export default useQueryDebounce;
