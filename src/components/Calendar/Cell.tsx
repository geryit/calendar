import React, { memo, ReactNode } from "react";

type PropsWithOptionalChildren<P = unknown> = P & {
  children?: ReactNode;
  isToday?: boolean;
};

/**
 * Cell Component - Renders a cell in the calendar. It highlights the cell if it represents today's date.
 *
 * Props:
 * - children (ReactNode): Optional. Content to be rendered inside the cell.
 * - isToday (boolean): Optional. If true, applies a special style to denote today's date.
 */

const Cell = ({ children, isToday }: PropsWithOptionalChildren) => {
  const cellClass = `text-center border-b-2 border-r-2 border-green-450 p-2 ${isToday ? "bg-green-450" : ""}`;
  return <li className={cellClass}>{children}</li>;
};

export default memo(Cell);
