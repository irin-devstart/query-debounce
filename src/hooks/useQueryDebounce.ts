import { useState, useCallback, useRef, useMemo } from "react";
import { UseQueryDebounceOptions } from "./types";

const useQueryDebounce = <TData = unknown>(
  options?: Partial<UseQueryDebounceOptions<TData>>
): {
  getValues: () => Partial<TData>;
  setValues: (
    key: keyof TData,
    value: Partial<TData>[keyof TData],
    callback?: (data: Partial<TData>) => void
  ) => void;
  clearValues: (key: keyof TData | Array<keyof TData>) => void;
  watch: (key: keyof TData) => Partial<TData>[keyof TData];
  reset: () => void;
} => {
  const initialData = useMemo(() => {
    if (typeof options?.initialData === "function") {
      return options?.initialData?.();
    }
    return options?.initialData;
  }, [options]);

  const [data, setData] = useState<Partial<TData>>(initialData ?? {});
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouce = useCallback(
    (callback: () => void) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback();
      }, options?.wait ?? 500);
    },
    [options?.wait]
  );

  const setValues = useCallback(
    (
      key: keyof TData,
      value: Partial<TData>[keyof TData],
      callback?: (value: Partial<TData>) => void
    ) => {
      options?.onProgress?.("loading", options?.wait ?? 500);
      callback?.(data);
      debouce(() => {
        setData((prev) => {
          return { ...prev, [key]: value };
        });
        options?.onSuccess?.(data);
        options?.onProgress?.("success");
      });
    },
    [debouce, data, options]
  );

  const reset = useCallback(() => {
    setData(initialData ?? {});
  }, [initialData]);

  const watch = (key: keyof TData) => {
    return data[key];
  };

  const getValues = useCallback(() => {
    return data;
  }, [data]);

  const clearValues = useCallback((key: keyof TData | Array<keyof TData>) => {
    setData((prev) => {
      if (typeof key === "object") {
        key.forEach((key) => {
          return { ...prev, [key]: undefined };
        });
      }
      return { ...prev, [key as string]: undefined };
    });
  }, []);

  return { getValues, setValues, reset, watch, clearValues };
};

export default useQueryDebounce;
