"use client";

import { useState } from "react";
import TreeView from "../components/TreeView";
import { Counts, TreeNode, TreeWithCount } from "@/interfaces/entities";
import { formatSize } from "@/utils/formatters";
import DragDropArea from "../components/DragDropArea";

export default function Home() {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processMethod, setProcessMethod] = useState<"client" | "server">("client");
  const [showIcons, setShowIcons] = useState(true);
  const [counts, setCounts] = useState<Counts>({
    directories: 0,
    files: 0,
    totalSize: 0,
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setError(null);

    try {
      if (processMethod === "client") {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        const { createTreeFromZip } = await import("@/utils/zip-utils");
        const jsZipTree = await createTreeFromZip(contents);
        setTreeData(jsZipTree.tree);
        setCounts(jsZipTree.counts);
        return;
      }
      const controller = new AbortController();
      const response = await fetch("/api/tree", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to process the ZIP file");
      }

      const data: TreeWithCount = await response.json();
      setTreeData(data.tree);
      setCounts(data.counts);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Error processing the ZIP file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeProcessMethod = () => {
    setProcessMethod((prevProcessMethod) => (prevProcessMethod === "client" ? "server" : "client"));
  };

  const handleToggleShowicons = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">ZIP Tree Viewer</h1>
      {!treeData && (
        <>
          <div className="px-2 md:px-0">
            <DragDropArea onFileDrop={handleFileUpload} accept=".zip" disabled={isLoading} />
          </div>
          <div className="flex items-center justify-center mt-4">
            <label className="mr-2" htmlFor="server-side" title="Offloads processes to the server. No data is stored on the server">
              Server-side{" "}
            </label>
            <input
              type="checkbox"
              id="server-side"
              onChange={handleChangeProcessMethod}
              checked={processMethod === "server"}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <label className="mr-2" htmlFor="show-icons">
              Show Icons
            </label>
            <input
              type="checkbox"
              id="show-icons"
              onChange={handleToggleShowicons}
              checked={showIcons}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
          </div>
        </>
      )}
      {isLoading && <p className="text-center mt-4">Processing file...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="mt-8 overflow-x-auto">{treeData && <TreeView node={treeData} showIcons={showIcons} />}</div>
      {treeData && (
        <div className="mt-4 text-center">
          <div className="flex justify-center items-center space-x-2">
            <span>{counts.directories} directories</span>
            <span>,</span>
            <span>{counts.files} files</span>
          </div>
          <div className="mt-1">
            total size: {formatSize(counts.totalSize)} ({counts.totalSize} bytes)
          </div>
        </div>
      )}
    </div>
  );
}
