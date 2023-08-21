export interface UseQueryDebounceOptions<TDefaultValue> {
  defaultValues:
    | Partial<TDefaultValue>
    | (() => Partial<TDefaultValue> | undefined);
  onSuccess: (data: Partial<TDefaultValue>) => void;
  onProgress: (status?: "loading" | "success", totalTimer?: number) => void;
  wait: number;
}

export interface TUseQueryDebounceReturn<TDefaultValue> {
  getValues: () => Partial<TDefaultValue>;
  setValue: (
    key: keyof TDefaultValue,
    value: Partial<TDefaultValue>[keyof TDefaultValue],
    callback?: (data: Partial<TDefaultValue>) => void
  ) => void;
  clearValues: (key: keyof TDefaultValue | Array<keyof TDefaultValue>) => void;
  register: (key: keyof TDefaultValue) => {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  watch: (
    key: keyof TDefaultValue,
    calback?: ((data: Partial<TDefaultValue>) => void) | undefined
  ) => Partial<TDefaultValue>[keyof TDefaultValue];
  reset: () => void;
}
