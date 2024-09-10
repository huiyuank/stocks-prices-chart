import * as d3 from "d3";
import React from "react";

export interface GenericPlotData {
  x: number; // time dimension
  y: number; // price dimension
  z: string; // identifier of data
}

export const lineColors = ["steelblue", "maroon", "orange"];

export default function LinePlot({
  rawData,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 40,
  marginBottom = 50,
  marginLeft = 40,
}: {
  rawData?: GenericPlotData[][];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}) {
  const data = rawData?.reduce((accum, point) => accum.concat(point), []) ?? [];
  const [minX = 0, maxX = 10] = d3.extent(data, (d) => d.x);
  const xScale = d3.scaleUtc([minX, maxX], [marginLeft, width - marginRight]);
  const [minY = 0, maxY = 100] = d3.extent(data, (d) => d.y);
  const yScale = d3.scaleLinear(
    [minY, maxY],
    [height - marginBottom, marginTop]
  );

  const xTicks = React.useMemo(() => {
    const pixelsPerTick = 120;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [width, xScale]);

  const yTicks = React.useMemo(() => {
    const pixelsPerTick = 40;
    const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick));
    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [height, yScale]);

  const line = d3
    .line<GenericPlotData>()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y));

  return (
    <svg className="m-auto" width={width} height={height}>
      {/* y-axis */}
      <g
        transform={`translate(${marginLeft},0)`}
        fontSize="12px"
        fontFamily="san-serif"
        textAnchor="end"
      >
        <path
          d={[
            "M",
            -6,
            height - marginBottom,
            "H",
            0,
            "V",
            marginTop,
            "H",
            -6,
          ].join(" ")}
          fill="none"
          stroke="currentColor"
        />
        {yTicks.map(({ value, yOffset }) => (
          <g key={String(value)} transform={`translate(0,${yOffset})`}>
            <line x2="-6" stroke="currentColor" />
            <text key={String(value)} fill="currentColor" x={-8} dy="0.23em">
              {value}
            </text>
          </g>
        ))}
      </g>
      {/* x-axis */}
      <g
        transform={`translate(0,${height - marginBottom})`}
        fontSize="12px"
        fontFamily="san-serif"
        textAnchor="middle"
      >
        <path
          d={[
            "M",
            marginLeft,
            6,
            "v",
            -6,
            "H",
            width - marginRight,
            "v",
            6,
          ].join(" ")}
          fill="none"
          stroke="currentColor"
        />
        {xTicks.map(({ value, xOffset }) => (
          <g key={String(xOffset)} transform={`translate(${xOffset},0)`}>
            <line y2="6" stroke="currentColor" />
            <text
              key={String(value)}
              fill="currentColor"
              y={20}
              suppressHydrationWarning
            >
              {new Date(value).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </text>
          </g>
        ))}
      </g>

      {/* Plotted line(s) */}
      {rawData &&
        rawData.map((data, i) => (
          <>
            <path
              fill="none"
              stroke={lineColors[i]}
              strokeWidth="1.5"
              d={line(data) ?? ""}
            />
            <g fill={lineColors[i]} stroke={lineColors[i]} strokeWidth="1.5">
              {data.map(({ x, y }) => (
                <circle
                  key={`${x}-${y}`}
                  cx={xScale(x)}
                  cy={yScale(y)}
                  r="2.5"
                />
              ))}
              {/* Legend */}
              <rect
                x={
                  (width - marginLeft - marginRight) / 2 -
                  10 +
                  (i - rawData.length / 2) * 80
                }
                y={height - marginBottom / 2 + 10}
                width={9}
                height={9}
              />
              <text
                x={
                  (width - marginLeft - marginRight) / 2 +
                  35 +
                  (i - rawData.length / 2) * 80
                }
                y={height - marginBottom / 2 + 10}
                dy={".75em"}
                dx={".2em"}
                textAnchor="end"
                fontSize={12}
                strokeWidth=".5"
              >
                {rawData[i][0].z}
              </text>
            </g>
          </>
        ))}
    </svg>
  );
}
