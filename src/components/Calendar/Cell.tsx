import React, { memo, ReactNode } from "react";

type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
  isToday?: boolean;
};

// Calendar blocks
const Cell = ({ children, isToday }: PropsWithOptionalChildren) => {
  return (
    <li
      className={`text-center border-b border-r border-green-450 p-2 ${isToday ? "bg-green-450" : ""}`}
    >
      {children}
    </li>
  );
};

export default memo(Cell);
