import "./Tooltip.css";
import React from "react";
export default function Tooltip({ children, content }) {
  const [ isVisible, setIsVisible ] = React.useState(false);
  return (
    <div
      className="tooltip"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className={`tooltip__card ${isVisible && "tooltip__card--visible"}`}>
        {content}
      </div>
      {children}
    </div>
  );
}
