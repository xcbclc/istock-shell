export type TFetchSSEMessage = {
  id: number;
  data: string;
  event?: string;
  retry?: number;
};

export type TFetchWrapOptions = {
  requestOptions?: RequestInit;
  prefixUrl?: string;
};
