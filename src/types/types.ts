export interface UseQueryDebounceOptions<TDefaultValue> {
  defaultValues:
    | Partial<TDefaultValue>
    | (() => Partial<TDefaultValue> | undefined);
  onSuccess: (data: Partial<TDefaultValue>) => void;
  onProgress: (status?: "loading" | "success", totalTimer?: number) => void;
  wait: number;
}
