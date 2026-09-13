import React from "react";

type ColumnComponentProps = {
  title: string;
  numberTasks: number;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
  children: React.ReactNode;
};

function ColumnComponent({
  title,
  numberTasks,
  onDragOver,
  onDrop,
  children,
}: ColumnComponentProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="mt-4 border border-gray-300 bg-white min-h-100 h-fit rounded-sm w-full lg:flex-1 lg:min-w-72"
    >
      {/* Cabeçalho */}
      <div className="flex justify-between p-2 rounded-sm lg:text-sm">
        <h1>{title}</h1>

        <p className="border border-gray-300 w-6 h-6 text-center pt-1 rounded-sm text-xs">
          {numberTasks}
        </p>
      </div>

      {/* Conteúdo da coluna */}
      {children}
    </div>
  );
}

export default ColumnComponent;
