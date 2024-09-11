/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import "./common.css"; // Import CSS for styling

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Type for a partition
interface Partition {
  id: string;
  color: string;
  children: Partition[];
  orientation: "vertical" | "horizontal";
}

// Utility function to snap to closest ratio
const snapToRatio = (value: number, max: number): number => {
  const ratios = [0.25, 0.5, 0.75];
  const snapped = ratios.reduce(
    (prev, ratio) =>
      Math.abs(value - ratio * max) < Math.abs(prev - ratio * max)
        ? ratio * max
        : prev,
    value
  );
  return Math.min(Math.max(snapped, 100), max); // Ensure within bounds
};

// Recursive rendering function
const renderPartitions = (
  partition: Partition,
  handleRemove: (id: string) => void,
  handleResize: (id: string, size: { width: number; height: number }) => void
): JSX.Element => {
  if (partition.children.length === 0) {
    return (
      <ResizableBox
        key={partition.id}
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[600, 600]}
        style={{
          backgroundColor: partition.color,
          border: "1px solid #ccc",
          position: "relative",
        }}
        resizeHandles={["se"]}
        onResizeStop={(
          _e: any,
          data: { size: { width: number; height: number } }
        ) => handleResize(partition.id, data.size)}
        // Setting resizable props for snapping
        onResize={(_e, data) => {
          const snappedWidth = snapToRatio(data.size.width, 600); // Use 600 or the container width
          const snappedHeight = snapToRatio(data.size.height, 600); // Use 600 or the container height
          data.size.width = snappedWidth;
          data.size.height = snappedHeight;
        }}
      >
        <button
          className="remove-button"
          onClick={() => handleRemove(partition.id)}
        >
          &ndash;
        </button>
      </ResizableBox>
    );
  }

  return partition.orientation === "vertical" ? (
    <div style={{ display: "flex", height: "100%" }}>
      {partition.children.map((child) => (
        <div key={child.id} style={{ flex: 1 }}>
          {renderPartitions(child, handleRemove, handleResize)}
        </div>
      ))}
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {partition.children.map((child) => (
        <div key={child.id} style={{ flex: 1 }}>
          {renderPartitions(child, handleRemove, handleResize)}
        </div>
      ))}
    </div>
  );
};

const LayoutBuilder: React.FC = () => {
  const [partitions, setPartitions] = useState<Partition[]>([
    {
      id: "root",
      color: getRandomColor(),
      children: [],
      orientation: "vertical",
    },
  ]);

  // Handle splitting a partition
  const handleSplit = (orientation: "vertical" | "horizontal") => {
    const splitPartition = (
      partitions: Partition[],
      id: string
    ): Partition[] => {
      return partitions.map((partition) => {
        if (partition.id === id) {
          const newId = `partition-${Date.now()}`;
          return {
            ...partition,
            children: [
              ...partition.children,
              {
                id: newId,
                color: getRandomColor(),
                children: [],
                orientation,
              },
            ],
            orientation:
              partition.orientation === "vertical" &&
              orientation === "horizontal"
                ? "horizontal"
                : partition.orientation === "horizontal" &&
                  orientation === "vertical"
                ? "vertical"
                : partition.orientation,
          };
        }
        return {
          ...partition,
          children: splitPartition(partition.children, id),
        };
      });
    };
    setPartitions((prevPartitions) => splitPartition(prevPartitions, "root")); // Always split from the root for simplicity
  };

  // Handle removing a partition
  const handleRemove = (id: string) => {
    const removePartition = (
      partitions: Partition[],
      id: string
    ): Partition[] => {
      return partitions
        .filter((partition) => partition.id !== id)
        .map((partition) => ({
          ...partition,
          children: removePartition(partition.children, id),
        }));
    };
    setPartitions((prevPartitions) => removePartition(prevPartitions, id));
  };

  // Handle resizing a partition
  const handleResize = (
    id: string,
    _size: { width: number; height: number }
  ) => {
    setPartitions((prevPartitions) => {
      const updatePartitionSize = (partitions: Partition[]): Partition[] => {
        return partitions.map((partition) => {
          if (partition.id === id) {
            return {
              ...partition,
              // You can update partition sizes here if needed
              children: updatePartitionSize(partition.children),
            };
          }
          return {
            ...partition,
            children: updatePartitionSize(partition.children),
          };
        });
      };
      return updatePartitionSize(prevPartitions);
    });
  };

  return (
    <div className="layout-builder">
      <div className="controls">
        <button onClick={() => handleSplit("vertical")}>V</button>
        <button onClick={() => handleSplit("horizontal")}>H</button>
      </div>
      <div className="partitions-container">
        {renderPartitions(
          {
            id: "root",
            color: "",
            children: partitions,
            orientation: "vertical",
          },
          handleRemove,
          handleResize
        )}
      </div>
    </div>
  );
};

export default LayoutBuilder;
