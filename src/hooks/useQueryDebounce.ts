import { useState, useCallback, useRef, useMemo } from "react";
import { UseQueryDebounceOptions } from "../types";

const useQueryDebounce = <TDefaultValue = unknown>(
  options?: Partial<UseQueryDebounceOptions<TDefaultValue>>
): {
  getValues: () => Partial<TDefaultValue>;
  setValues: (
    key: keyof TDefaultValue,
    value: Partial<TDefaultValue>[keyof TDefaultValue],
    callback?: (data: Partial<TDefaultValue>) => void
  ) => void;
  clearValues: (key: keyof TDefaultValue | Array<keyof TDefaultValue>) => void;
  watch: (
    key: keyof TDefaultValue
  ) => Partial<TDefaultValue>[keyof TDefaultValue];
  reset: () => void;
} => {
  const defaultValues = useMemo(() => {
    if (typeof options?.defaultValues === "function") {
      return options?.defaultValues?.();
    }
    return options?.defaultValues;
  }, [options]);

  const [state, setState] = useState<Partial<TDefaultValue>>(
    defaultValues ?? {}
  );

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
      key: keyof TDefaultValue,
      value: Partial<TDefaultValue>[keyof TDefaultValue],
      callback?: (value: Partial<TDefaultValue>) => void
    ) => {
      options?.onProgress?.("loading", options?.wait ?? 500);
      callback?.(state);
      debouce(() => {
        setState((prev) => {
          return { ...prev, [key]: value };
        });
        options?.onSuccess?.(state);
        options?.onProgress?.("success");
      });
    },
    [debouce, state, options]
  );

  const reset = useCallback(() => {
    setState(defaultValues ?? {});
  }, [defaultValues]);

  const watch = (key: keyof TDefaultValue) => {
    return state[key];
  };

  const getValues = useCallback(() => {
    return state;
  }, [state]);

  const clearValues = useCallback(
    (key: keyof TDefaultValue | Array<keyof TDefaultValue>) => {
      setState((prev) => {
        if (Array.isArray(key)) {
          key.forEach((key) => {
            return { ...prev, [key]: undefined };
          });
        }
        return { ...prev, [key as string]: undefined };
      });
    },
    []
  );

  return { getValues, setValues, reset, watch, clearValues };
};

export default useQueryDebounce;
