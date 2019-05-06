export interface FetchingState {
  isFetching: string[];
  results: {
      [key: string]: {
          success: boolean;
          message: string;
      }
  }
}
