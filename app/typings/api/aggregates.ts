export interface GetAggregatesParams {
  stocksTickers: string[];
  fromDate: string;
  toDate: string;
}

export interface AggregatesData {
  c: number; // Close price for symbol in given time period
  h: number; // Highest price for symbol in given time period
  l: number; // Lowest price for the symbol in the given time period
  o: number; // Open price for symbol in given time period
  n: number; // Number of txn in aggregate window
  t: number; // Unix Msec timestamp for the start of the aggregate window
  v: number; // Trading volume of the symbol in the given time period
  vw: number; // Volume weighted average price
  otc?: boolean; // Whether or not this aggregate is for an OTC ticker. This field will be left off if false.
  averageC?: number;
  averageO?: number;
  averageH?: number;
  averageL?: number;
}

export interface GetAggregatesResponse {
  ticker: string;
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  resultsCount: number;
  status: string;
  results: AggregatesData[];
}
