import React, { ReactNode } from "react";
import "./Tooltip.css";
import { useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, className }) => {
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
