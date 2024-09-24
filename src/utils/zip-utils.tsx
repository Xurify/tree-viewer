import { TreeNode, TreeWithCount } from "@/interfaces/entities";
import AdmZip from "adm-zip";
import JSZip from "jszip";

type ZipEntry = {
  name: string;
  isDirectory: boolean;
  size: number;
};

export const createTreeFromZip = async (zipContent: JSZip | AdmZip.IZipEntry[]): Promise<TreeWithCount> => {
  const root: TreeNode = { name: "root", children: [], isDirectory: true, size: 0 };
  let directoryCount = 0;
  let fileCount = 0;
  let totalSize = 0;

  const entries: ZipEntry[] = Array.isArray(zipContent)
    ? zipContent.map((entry) => ({
        name: entry.entryName,
        isDirectory: entry.isDirectory,
        size: entry.header.size,
      }))
    : await Promise.all(
        Object.entries(zipContent.files).map(async ([name, file]) => ({
          name,
          isDirectory: file.dir,
          size: file.dir ? 0 : await file.async('uint8array').then(data => data.length),
        }))
      );

  const addNode = (node: TreeNode, parts: string[], isDirectory: boolean, size: number) => {
    if (parts.length === 0) return;

    const [currentPart, ...remainingParts] = parts;
    let child = node.children.find((childNode) => childNode.name === currentPart) as TreeNode;

    if (!child) {
      child = { name: currentPart, children: [], isDirectory: isDirectory || remainingParts.length > 0, size: 0 };
      node.children.push(child);
      if (child.isDirectory) directoryCount++;
      if (!child.isDirectory) {
        fileCount++;
        child.size = size;
        totalSize += size;
      }
    }

    if (remainingParts.length > 0) {
      addNode(child, remainingParts, isDirectory, size);
    } else if (!isDirectory) {
      child.size = size;
    }

    node.size += size;
  };

  for (const entry of entries) {
    const parts = entry.name.split("/").filter(Boolean);
    addNode(root, parts, entry.isDirectory, entry.size);
  }

  // Sort function to put directories first, then sort alphabetically
  const sortNodes = (a: TreeNode, b: TreeNode) => {
    if (a.isDirectory === b.isDirectory) {
      return a.name.localeCompare(b.name);
    }
    return a.isDirectory ? -1 : 1;
  };

  // Recursively sort the tree
  const sortTree = (node: TreeNode) => {
    node.children.sort(sortNodes);
    node.children.forEach(sortTree);
  };

  sortTree(root);

  return {
    tree: root.children.length === 1 ? root.children[0] : root,
    counts: {
      directories: directoryCount,
      files: fileCount,
      totalSize,
    },
  };
};