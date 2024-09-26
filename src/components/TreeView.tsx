import React, { useState } from "react";
import styles from "./TreeView.module.scss";
import { TreeNode } from "@/interfaces/entities";
import {
  RiFolderOpenFill,
  RiFolderFill,
  RiFileLine,
  RiFileCodeLine,
  RiFileTextLine,
  RiImageLine,
  RiFileExcel2Line,
  RiFilePpt2Line,
  RiFileWord2Line,
  RiFileZipLine,
  RiMarkdownLine,
  RiFilePdfLine,
  RiVideoLine,
  RiMusicLine,
  RiDatabase2Line,
  RiTerminalBoxLine,
} from "@remixicon/react";
import { formatSize } from "@/utils/formatters";

interface TreeViewProps {
  node: TreeNode;
  showIcons?: boolean;
}

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
    case "html":
    case "css":
    case "py":
    case "java":
    case "cpp":
    case "c":
      return <RiFileCodeLine color="#9cdcfe" size={15} />;
    case "txt":
      return <RiFileTextLine color="#9cdcfe" size={15} />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      return <RiImageLine color="#9cdcfe" size={15} />;
    case "xlsx":
    case "xls":
    case "csv":
      return <RiFileExcel2Line color="#9cdcfe" size={15} />;
    case "ppt":
    case "pptx":
      return <RiFilePpt2Line color="#9cdcfe" size={15} />;
    case "doc":
    case "docx":
      return <RiFileWord2Line color="#9cdcfe" size={15} />;
    case "zip":
    case "rar":
    case "7z":
      return <RiFileZipLine color="#9cdcfe" size={15} />;
    case "md":
      return <RiMarkdownLine color="#9cdcfe" size={15} />;
    case "pdf":
      return <RiFilePdfLine color="#9cdcfe" size={15} />;
    case "mp4":
    case "avi":
    case "mov":
      return <RiVideoLine color="#9cdcfe" size={15} />;
    case "mp3":
    case "wav":
      return <RiMusicLine color="#9cdcfe" size={15} />;
    case "sql":
    case "db":
      return <RiDatabase2Line color="#9cdcfe" size={15} />;
    case "sh":
    case "bat":
      return <RiTerminalBoxLine color="#9cdcfe" size={15} />;
    default:
      return <RiFileLine color="#9cdcfe" size={15} />;
  }
};

const TreeView: React.FC<TreeViewProps> = ({ node, showIcons }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <div className={`${styles.treeNode} select-none`}>
      <span
        className="flex items-center py-0.5"
        onClick={node.isDirectory ? handleToggleCollapse : undefined}
      >
        {showIcons && (
          <span className={`inline-flex mr-1 ${node.isDirectory ? "folder-icon cursor-pointer" : "file-icon"}`.trim()}>
            {node.isDirectory ? (
              isCollapsed ? (
                <RiFolderFill className="ri-folder" size={15} />
              ) : (
                <RiFolderOpenFill className="ri-folder" size={15} />
              )
            ) : (
              getFileIcon(node.name)
            )}
          </span>
        )}
        <span className={`node-name text-xs ${node.isDirectory ? "cursor-pointer" : ""}`.trim()}>
          {node.name} [{formatSize(node.size)}]
        </span>
      </span>
      {node.isDirectory &&
        !isCollapsed &&
        node.children.map((child, index) => <TreeView key={index} node={child} showIcons={showIcons} />)}
    </div>
  );
};

export default TreeView;
