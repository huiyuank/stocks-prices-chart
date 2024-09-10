import { MutableRefObject, useEffect, useRef, useState } from "react";

type ResponsivePlotDimensions = {
  plotWidth: number;
  plotHeight: number;
  containerRef: MutableRefObject<HTMLElement | null>;
};

/***
 * @description useResponsivePlot uses a resize observer to respond to changes in container size (ie width, height) to fit content into container.
 ***/
export function useResponsivePlot(
  widthPercentage: number,
  heightPercentage: number
): ResponsivePlotDimensions {
  const chartsContainerRef = useRef<HTMLElement | null>(null);
  const [plotWidth, setPlotWidth] = useState<number>(0);
  const [plotHeight, setPlotHeight] = useState<number>(0);

  useEffect(() => {
    if (!chartsContainerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPlotWidth(
          Math.max(240, Number(entry.contentRect.width) * widthPercentage)
        );
        setPlotHeight(
          Math.max(240, Number(entry.contentRect.height) * heightPercentage)
        );
      }
    });
    resizeObserver.observe(chartsContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [chartsContainerRef, heightPercentage, widthPercentage]);

  return { plotWidth, plotHeight, containerRef: chartsContainerRef };
}
