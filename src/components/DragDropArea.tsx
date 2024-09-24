import { RiFileZipLine } from "@remixicon/react";
import React, { useState, useCallback } from "react";
import ZipFileIcon from "./ZipFileIcon";

interface DragDropAreaProps {
  onFileDrop: (file: File) => void;
  accept: string;
  disabled: boolean;
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ onFileDrop, accept, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const zipFile = files.find((file) => file.type === "application/zip" || file.name.endsWith(".zip"));
      if (zipFile) {
        onFileDrop(zipFile);
      }
    },
    [onFileDrop, disabled]
  );

  return (
    <div
      className={`
        flex items-center justify-center w-full max-w-xl min-h-96 mx-auto mt-4 p-6 border-2 border-dashed rounded-lg
        text-center cursor-pointer transition-all duration-300 ease-in-out
        ${isDragging ? "border-blue-500 bg-blue-50 text-gray-600" : "border-gray-300 hover:border-gray-400"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `.trim()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileDrop(file);
        }}
        disabled={disabled}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <span className="flex items-center justify-center mb-2">
          <ZipFileIcon />
        </span>
        <p className="mt-1 text-sm text-gray-400">
          <span className="font-medium hover:text-blue-400">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1 text-xs text-gray-500">ZIP files only</p>
      </label>
    </div>
  );
};

export default DragDropArea;
