import * as React from "react";
import WindowDimensionType from "./types/window-dimensions";

const getWindowDimensions = (): WindowDimensionType => {
  const [windowDimensions, setWindowDimensions] =
    React.useState<WindowDimensionType>({
      width: 0,
      height: 0,
    });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      handleResize;

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowDimensions;
};

export default getWindowDimensions;
