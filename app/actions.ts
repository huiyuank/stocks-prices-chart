"use server";

// import {
//   MOCK_AGGREGATES_AAPL_DATA,
//   MOCK_AGGREGATES_MSFT_DATA,
// } from "./mocks/aggregates-data";
import {
  GetAggregatesParams,
  GetAggregatesResponse,
} from "./typings/api/aggregates";
import { generateUrl } from "./utils";
import { formatLastNDaysAverage } from "./utils/format-last-n-days-avg";

const API_KEY = process.env.API_KEY;

const DOMAIN = "https://api.polygon.io";
// /v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}
const AGGREGATES_PATH =
  "/v2/aggs/ticker/{stocksTicker}/range/1/day/{from}/{to}";

const PRICES_AVERAGE_WINDOW_SIZE = 3;

export const fetchStockData = async (
  params: GetAggregatesParams
): Promise<GetAggregatesResponse[] | undefined> => {
  try {
    console.log(">>> fetch params", params);
    const { stocksTickers, fromDate, toDate } = params;
    const fetchAggregateUrlList = stocksTickers.map((stocksTicker) => {
      return generateUrl(
        DOMAIN,
        AGGREGATES_PATH,
        { stocksTicker, from: fromDate, to: toDate },
        {
          adjusted: "true",
          sort: "asc",
          apiKey: API_KEY || "",
        }
      );
    });
    console.log(">>> fetching stock data", fetchAggregateUrlList);
    const fetchPromises = fetchAggregateUrlList.map((aggregateUrl) =>
      fetch(aggregateUrl).then((response) => response.json())
    );
    const response: GetAggregatesResponse[] = await Promise.all(fetchPromises);
    console.log(">>> stock data response", JSON.stringify(response, null, 2));
    if (response.every((res) => res.status !== "ERROR")) {
      const formattedResponse = formatLastNDaysAverage(
        response,
        PRICES_AVERAGE_WINDOW_SIZE
      );
      console.log(
        ">>> formatted data response",
        JSON.stringify(formattedResponse, null, 2)
      );

      return formattedResponse;
    }
    throw new Error("Some stock data fetch failed.");
  } catch (e) {
    throw new Error("Fetch stock data failed.");
  }
};
