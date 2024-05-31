export type TFetchSSEMessage = {
  id: number;
  data: string;
  event?: string;
  retry?: number;
};
