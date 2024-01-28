export interface TreeNode {
    id: string;
  name: string;
  children?: TreeNode[];
  expanded?: boolean;
  checked?: boolean;
}
