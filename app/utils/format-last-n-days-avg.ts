import { GetAggregatesResponse } from "@/typings/api/aggregates";

/**
  @description Helper function to calculate last N days average for each day's stock prices.
  @param response Array of responses from API `AGGREGATES`
  @param n Number of days in average window, positive integer
  @returns Formatted response with average prices
**/
export function formatLastNDaysAverage(
  response: GetAggregatesResponse[],
  n: number
): GetAggregatesResponse[] {
  // For every ticker, loop through res.results to calculate average of last n indices for "o","c","h","l"
  const formattedResponse = response.map((ticker) => {
    let sumOfC = 0;
    let sumOfO = 0;
    let sumOfH = 0;
    let sumOfL = 0;
    for (let i = 0; i < ticker.results.length; i++) {
      if (i - n >= 0) {
        sumOfC -= ticker.results[i - n].c;
        sumOfO -= ticker.results[i - n].o;
        sumOfH -= ticker.results[i - n].h;
        sumOfL -= ticker.results[i - n].l;
      }
      sumOfC += ticker.results[i].c;
      sumOfO += ticker.results[i].o;
      sumOfH += ticker.results[i].h;
      sumOfL += ticker.results[i].l;
      // Denominator is dependent on how many days are in the current window
      ticker.results[i].averageC = sumOfC / Math.min(i + 1, n);
      ticker.results[i].averageO = sumOfO / Math.min(i + 1, n);
      ticker.results[i].averageH = sumOfH / Math.min(i + 1, n);
      ticker.results[i].averageL = sumOfL / Math.min(i + 1, n);
    }
    return ticker;
  });
  return formattedResponse;
}
