import React from "react";

const Spinner = ({ width, height, color }) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderColor: color,
          borderTopColor: "transparent"
        }}
        className={`border-2 border-solid rounded-full animate-spin `}
      ></div>
    </div>
  );
};

export default Spinner;
