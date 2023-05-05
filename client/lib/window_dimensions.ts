import * as React from "react";

type windowDimensionType = {
  width: number;
  height: number;
};

const getWindowDimensions = (): windowDimensionType => {
  const [windowDimensions, setWindowDimensions] =
    React.useState<windowDimensionType>({
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
