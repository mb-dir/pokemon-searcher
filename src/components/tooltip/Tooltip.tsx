import React from "react";
import "./Tooltip.css";
import { useState } from "react";

const Tooltip = ({ children, content, className }) => {
  const [ isVisible, setIsVisible ] = useState(false);
  return (
    <div
      className="tooltip"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={`tooltip__card ${className} ${isVisible &&
          "tooltip__card--visible"}`}
      >
        {content}
      </div>
      {children}
    </div>
  );
};

export { Tooltip };
