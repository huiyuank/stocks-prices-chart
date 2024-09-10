"use client";

import React, { useState, useRef, LegacyRef } from "react";
import { fetchStockData } from "@/actions";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";

import { MOCK_STOCKS_TICKER_SYMBOLS } from "@/mocks/aggregates-data";
import Button from "@/components/button";

import DatePicker from "./components/plot/date-picker";
import LinePlot, { GenericPlotData } from "./components/plot/line-plot";
import MultiSelect from "./components/plot/multi-select";
import Toggle from "./components/plot/toggle";
import { useResponsivePlot } from "@/hooks/use-responsive-plot";

const DISPLAY_PRICE_TYPE = [
  { name: "Open", value: "o" },
  { name: "Close", value: "c" },
  { name: "Low", value: "l" },
  { name: "High", value: "h" },
] as const;

type DisplayPriceType = (typeof DISPLAY_PRICE_TYPE)[number]["value"];

export default function Charts() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [displayPriceType, setDisplayPriceType] =
    useState<DisplayPriceType>("o");
  const queryDescription = useRef<string>(
    'Displaying stock prices for "" from "" to ""'
  );

  const {
    containerRef: chartsContainerRef,
    plotWidth,
    plotHeight,
  } = useResponsivePlot(0.95, 0.77);

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["charts"],
    queryFn: async (context) => {
      return await fetchStockData({
        stocksTickers: selectedStocks,
        fromDate: fromDate,
        toDate: toDate,
      });
    },
    enabled: false, // default: true
    refetchOnWindowFocus: false, // default: true
  });

  const plotData = React.useMemo((): GenericPlotData[][] => {
    return (
      data?.map((dt) =>
        dt.results.map((result) => ({
          x: result.t,
          y: result[displayPriceType],
          z: dt.ticker,
        }))
      ) ?? []
    );
  }, [data, displayPriceType]);

  const handleSubmitAction = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    refetch();
    queryDescription.current = `Displaying stock prices for "${selectedStocks.join(
      '","'
    )}" from ${fromDate} to ${toDate}`;
  };

  return (
    <div className="w-full h-full relative">
      <form className="flex flex-row" onSubmit={handleSubmitAction}>
        <div className="min-w-max w-1/5 pt-6 ps-8">
          <MultiSelect
            label="Query stocks:"
            options={MOCK_STOCKS_TICKER_SYMBOLS}
            selectedValue={selectedStocks}
            maximum={3}
            addValue={(symbol) => {
              setSelectedStocks([...selectedStocks, symbol]);
            }}
            removeValue={(symbol) => {
              setSelectedStocks((selectedStocks) =>
                selectedStocks.filter((currSymbol) => currSymbol !== symbol)
              );
            }}
          />
        </div>

        <div className="flex-1 relative min-w-min">
          <div className="flex flex-row gap-4 py-6 px-8 items-end">
            <DatePicker
              label="From date:"
              name="fromDate"
              required
              onChange={(e) => setFromDate(e.target.value)}
            />
            <DatePicker
              label="To date:"
              name="toDate"
              required
              min={fromDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <Button text="Query" isLoading={isFetching} />
            <div className="ms-auto">
              <Toggle
                options={DISPLAY_PRICE_TYPE}
                value={displayPriceType}
                selectValue={(type) => setDisplayPriceType(type)}
              />
            </div>
          </div>

          {isFetching && <Spinner />}

          <div className="px-8 font-semibold">{queryDescription.current}</div>
          {isError ? (
            <div className="w-full h-full flex justify-center items-center">
              <div>{error.message}</div>
            </div>
          ) : (
            <div
              className="w-full h-full"
              ref={chartsContainerRef as LegacyRef<HTMLDivElement>}
            >
              <LinePlot
                width={plotWidth}
                height={plotHeight}
                rawData={plotData}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
