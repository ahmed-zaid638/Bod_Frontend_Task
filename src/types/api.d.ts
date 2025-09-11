// TMeta can be null if the API not get all
interface ApiResponse<TData = undefined, TMeta = Meta> {
  status: number;
  message: string;
  meta: TMeta;
  data: TData;
}

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
