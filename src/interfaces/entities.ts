export interface TreeNode {
  name: string;
  children: TreeNode[];
  isDirectory: boolean;
  size: number;
}

export interface TreeWithCount {
  tree: TreeNode;
  counts: Counts;
}

export interface Counts {
  directories: number;
  files: number;
  totalSize: number;
}
