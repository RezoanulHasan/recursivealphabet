/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./a.css";

type Partition = {
  id: string;
  color: string;
  orientation: "vertical" | "horizontal" | null;
  children?: Partition[];
};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const LayoutBuilder: React.FC = () => {
  const [partitions, setPartitions] = useState<Partition[]>([
    { id: "0", color: getRandomColor(), orientation: null },
  ]);

  const splitPartition = (
    id: string,
    orientation: "vertical" | "horizontal"
  ) => {
    const split = (partitions: Partition[]): Partition[] => {
      return partitions.map((part) => {
        if (part.id === id) {
          return {
            ...part,
            orientation,
            children: [
              { id: `${id}-1`, color: part.color, orientation: null },
              { id: `${id}-2`, color: getRandomColor(), orientation: null },
            ],
          };
        }
        if (part.children) {
          return {
            ...part,
            children: split(part.children),
          };
        }
        return part;
      });
    };

    setPartitions(split(partitions));
  };

  const removePartition = (id: string) => {
    const remove = (partitions: Partition[]): Partition[] => {
      return partitions
        .filter((part) => part.id !== id)
        .map((part) => ({
          ...part,
          children: part.children ? remove(part.children) : undefined,
        }));
    };

    setPartitions(remove(partitions));
  };

  const handleResize = (
    _e: React.SyntheticEvent,
    _data: { size: { width: number; height: number }; handle: string }
  ) => {
    // Implement custom resize logic if needed
  };

  const renderPartition = (partition: Partition) => {
    const isVertical = partition.orientation === "vertical";

    return (
      <div
        key={partition.id}
        style={{
          width: isVertical ? "100%" : "50%",
          height: isVertical ? "50%" : "100%",
          backgroundColor: partition.color,
          position: "relative",
          display: "flex",
          flexDirection: isVertical ? "column" : "row",
        }}
        className={`partition ${isVertical ? "vertical" : "horizontal"}`}
      >
        <ResizableBox
          width={300}
          height={300}
          minConstraints={[100, 100]}
          maxConstraints={[Infinity, Infinity]}
          axis={isVertical ? "y" : "x"}
          resizeHandles={isVertical ? ["e"] : ["s"]}
          className={`resizable-box ${isVertical ? "vertical" : "horizontal"}`}
          onResize={handleResize}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            className="partition-content"
          >
            <button
              className="btn"
              onClick={() => splitPartition(partition.id, "vertical")}
            >
              V
            </button>
            <button
              className="btn"
              onClick={() => splitPartition(partition.id, "horizontal")}
            >
              H
            </button>
            <button
              className="btn"
              onClick={() => removePartition(partition.id)}
            >
              -
            </button>
            {partition.children && partition.children.map(renderPartition)}
          </div>
        </ResizableBox>
      </div>
    );
  };

  return <div className="Layout">{partitions.map(renderPartition)}</div>;
};

export default LayoutBuilder;
