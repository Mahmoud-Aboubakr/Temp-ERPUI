import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonCrudService } from './CommonCrudService';

export class TreeNode {
  name: string;
  children?: TreeNode[];
}

export class FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistDatabaseService {

  dataChange = new BehaviorSubject<TreeNode[]>([]);

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  constructor(private _commonCrudService: CommonCrudService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    //const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    //this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TreeNode[] {
    return Object.keys(obj).reduce<TreeNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TreeNode();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.name = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  
  
}
