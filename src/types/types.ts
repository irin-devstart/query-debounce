export interface UseQueryDebounceOptions<TDefaultValue> {
  defaultValues:
    | Partial<TDefaultValue>
    | (() => Partial<TDefaultValue> | undefined);
  onSuccess: (data: Partial<TDefaultValue>) => void;
  onProgress: (status?: "loading" | "success", totalTimer?: number) => void;
  wait: number;
}

export interface TUseQueryDebounceReturn<TDefaultValue> {
  getValues: UseQueryDebounceGetValues<TDefaultValue>;
  getValidValues: UseQueryDebounceGetUnbouncedValue<TDefaultValue>;
  getUnbouncedValue: UseQueryDebounceGetValidValues<TDefaultValue>;
  setValue: UseQueryDebounceSetValue<TDefaultValue>;
  setBulkValues: UseQueryDebounceSetBulkValues<TDefaultValue>;
  clearValues: UseQueryDebounceClearValues<TDefaultValue>;
  register: UseQueryDebounceRegister<TDefaultValue>;
  watch: UseQueryDebounceWatch<TDefaultValue>;
  reset: UseQueryDebounceReset;
}

export interface UseQueryDebounceGetValues<TDefaultValue> {
  (): Partial<TDefaultValue>;
}

export interface UseQueryDebounceGetUnbouncedValue<TDefaultValue> {
  (): Partial<TDefaultValue>;
}
export interface UseQueryDebounceGetValidValues<TDefaultValue> {
  (key: keyof TDefaultValue): Partial<TDefaultValue>;
}
export interface UseQueryDebounceSetValue<TDefaultValue> {
  (
    key: keyof TDefaultValue,
    value: Partial<TDefaultValue>[keyof TDefaultValue],
    callback?: (data: Partial<TDefaultValue>) => void
  ): void;
}
export interface UseQueryDebounceSetBulkValues<TDefaultValue> {
  (
    values: Partial<TDefaultValue>,
    callback?: ((value: Partial<TDefaultValue>) => void) | undefined
  ): void;
}
export interface UseQueryDebounceClearValues<TDefaultValue> {
  (key: keyof TDefaultValue | Array<keyof TDefaultValue>): void;
}
export interface UseQueryDebounceRegister<TDefaultValue> {
  (key: keyof TDefaultValue): {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
export interface UseQueryDebounceWatch<TDefaultValue> {
  (
    key: keyof TDefaultValue,
    calback?: ((data: Partial<TDefaultValue>) => void) | undefined
  ): Partial<TDefaultValue>[keyof TDefaultValue];
}
export interface UseQueryDebounceReset {
  (): void;
}
