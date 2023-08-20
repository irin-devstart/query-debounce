export interface UseQueryDebounceOptions<TData> {
  initialData: Partial<TData> | (() => Partial<TData> | undefined);
  onSuccess: (data: Partial<TData>) => void;
  onProgress: (status?: "loading" | "success", totalTimer?: number) => void;
  wait: number;
}
