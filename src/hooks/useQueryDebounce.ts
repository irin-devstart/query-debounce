import { useState, useCallback, useRef, useMemo } from "react";
import { TUseQueryDebounceReturn, UseQueryDebounceOptions } from "../types";

const useQueryDebounce = <TDefaultValue = unknown>(
  options?: Partial<UseQueryDebounceOptions<TDefaultValue>>
): TUseQueryDebounceReturn<TDefaultValue> => {
  const defaultValues = useMemo(() => {
    if (typeof options?.defaultValues === "function") {
      return options?.defaultValues?.();
    }
    return options?.defaultValues;
  }, [options]);

  const [state, setState] = useState<Partial<TDefaultValue>>(
    defaultValues ?? {}
  );

  const [actualValue, setActualValue] = useState<Partial<TDefaultValue>>(
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

  const setValue = useCallback(
    (
      key: keyof TDefaultValue,
      value: Partial<TDefaultValue>[keyof TDefaultValue],
      callback?: (value: Partial<TDefaultValue>) => void
    ) => {
      options?.onProgress?.("loading", options?.wait ?? 500);
      callback?.(state);
      setActualValue((prev) => {
        return { ...prev, [key]: value };
      });
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

  const setBulkValues = useCallback(
    (
      values: Partial<TDefaultValue>,
      callback?: (value: Partial<TDefaultValue>) => void
    ) => {
      options?.onProgress?.("loading", options?.wait ?? 500);
      callback?.(state);
      setActualValue((prev) => {
        return { ...prev, ...values };
      });
      debouce(() => {
        setState((prev) => {
          return { ...prev, ...values };
        });
        options?.onSuccess?.(state);
        options?.onProgress?.("success");
      });
    },
    [debouce, state, options]
  );

  const register = (key: keyof TDefaultValue) => {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setValue(key, value as Partial<TDefaultValue>[keyof TDefaultValue]);
      },
    };
  };

  const reset = useCallback(() => {
    setState(defaultValues ?? {});
  }, [defaultValues]);

  const watch = (
    key: keyof TDefaultValue,
    calback?: (data: Partial<TDefaultValue>) => void
  ) => {
    calback?.(state);
    return state[key];
  };
  const actualWatch = (
    key: keyof TDefaultValue,
    calback?: (data: Partial<TDefaultValue>) => void
  ) => {
    calback?.(actualValue);
    return actualValue[key];
  };

  const getValues = useCallback(() => {
    return state;
  }, [state]);

  const getActualValues = useCallback(() => {
    return actualValue;
  }, [actualValue]);

  const getValidValues = useCallback(() => {
    let tempValues: Partial<TDefaultValue> = {};
    Object.keys(state).forEach((key) => {
      if (state[key as keyof Partial<TDefaultValue>]) {
        tempValues = {
          ...tempValues,
          [key]: state[key as keyof Partial<TDefaultValue>],
        };
      }
    });
    return tempValues;
  }, [state]);

  const clearValues = useCallback(
    (key: keyof TDefaultValue | Array<keyof TDefaultValue>) => {
      setState((prev) => {
        const tempValues = { ...prev };
        if (Array.isArray(key)) {
          key.forEach((key) => {
            tempValues[key] = undefined;
          });
          return tempValues;
        }
        tempValues[key] = undefined;
        return tempValues;
      });
    },
    []
  );

  return {
    getValues,
    getValidValues,
    getActualValues,
    setValue,
    setBulkValues,
    reset,
    register,
    watch,
    actualWatch,
    clearValues,
  };
};

export default useQueryDebounce;
