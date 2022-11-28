import "./Tooltip.css";
import React from "react";
export default function Tooltip({ children }) {
  const [ isVisible, setIsVisible ] = React.useState(false);
  return (
    <div
      className="tooltip"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div
        className={`tooltip__card ${isVisible && "tooltip__card--visible"}`}
      />
      {children}
    </div>
  );
}
