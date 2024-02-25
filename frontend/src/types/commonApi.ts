export type ApiResponse = {
  success: boolean;
  errors: Array<{
    message: string;
  }>;
};

export type FetchResponse<Data> = {
  loading: boolean;
  data: Data | null;
  error: ApiResponse['errors'] | null | unknown;
};

export type FetchOptions<Data> = {
  path: string;
  onCompleted?: (result: Data) => void;
  onError?: (error: unknown) => void;
};
