/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react-resizable" {
  import * as React from "react";
  import { CSSProperties } from "react";

  export interface ResizableBoxProps {
    width?: number;
    height?: number;
    minConstraints?: [number, number];
    maxConstraints?: [number, number];
    axis?: "x" | "y" | "both";
    resizeHandles?: Array<"n" | "e" | "s" | "w" | "ne" | "se" | "sw" | "nw">;
    onResize?: (e: React.MouseEvent, data: any) => void;
    style?: CSSProperties;
    className?: string;
  }

  export class ResizableBox extends React.Component<ResizableBoxProps> {}
}
