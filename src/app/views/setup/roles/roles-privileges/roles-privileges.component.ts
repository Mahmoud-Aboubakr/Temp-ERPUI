import { RolePrivilegesModel } from './../../../../Core/Models/Roles/role-privileges-model';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { LookUp } from 'app/Core/Models/LookUp/LookUp';
import { PaginationParamWithSearch } from 'app/Core/Models/ResponseModels/PaginationParamWithSearch';
import { PaginationResponseModel } from 'app/Core/Models/ResponseModels/PaginationResponseModel';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { RolesModel } from 'app/Core/Models/Roles/RolesModel';
import { pagesModel } from 'app/Core/Models/applicationPages/pagesModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';
import { ChecklistDatabaseService } from 'app/Core/Services/checklist-database.service';
import { ModuleNode, PageNode, PrivilegeNode, TypeNode } from 'app/shared/interfaces/privileges';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

class TreeNode {
  id?: number;
  name: string;
  children?: TreeNode[];
  checked?: boolean;
}

class FlatNode {
  expandable: boolean;
  name: string;
  id: number;
  level: number;
  checked: boolean;
}

@Component({
  selector: 'app-roles-privileges',
  templateUrl: './roles-privileges.component.html',
  styleUrls: ['./roles-privileges.component.scss'],
})
export class RolesPrivilegesComponent implements OnInit{

  constructor(private _commonCrudService: CommonCrudService,
              private router: ActivatedRoute) {
                this.getRoleById()
               }

  ngOnInit() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
      
    );
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.getPrivileges()
  }

  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name ? existingNode : new FlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.id = node.id;
    flatNode.checked = node.checked;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeControl: FlatTreeControl<FlatNode>;

  treeFlattener: MatTreeFlattener<TreeNode, FlatNode>;

  dataSource: MatTreeFlatDataSource<TreeNode, FlatNode>;

  flatNodeMap = new Map<FlatNode, TreeNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeNode, FlatNode>();

  checklistSelection = new SelectionModel<FlatNode>(true);


  getLevel = (node: FlatNode) => node.level;
  getId = (node: TreeNode) => node.id;
  isChecked = (node: TreeNode) => node.checked;
  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: TreeNode): TreeNode[] => node.children;
  hasChild = (_: number, node: FlatNode) => node.expandable;
  hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.name === '';

  responseModel: ResponseModel<PrivilegeNode[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  roleResponseModel: ResponseModel<RolesModel[]> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  paginationResponseModel: PaginationResponseModel<PrivilegeNode[]> = {
    currentPage:0,
    errorMessage: '',
    lang:'',
    message:'',
    pageSize:0,
    statusCode:0,
    totalCount:0,
    totalPages: 0,
    data: undefined
  }

  paginationParamWithSearch : PaginationParamWithSearch = { 
    PageNumber : 1, 
    PageSize : environment.paginationList[0], 
    Term:'',
  }

  roleName: string = '';
  roleId: string;
  modules: ModuleNode[];
  filteredModules: TreeNode[];
  searchTerm: string = '';
  tree: TreeNode[];
  filteredTree: TreeNode[];
  //checkedModules: FlatNode[]; 
  selectedIds: number[] = [];
  checked: boolean = false;
  

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: FlatNode): void {
    //debugger;
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    this.onCheckboxChange(node)
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  async getRoleById(){
    /*this.router.paramMap.subscribe(params => {
      const id = params.get('id');
      this.roleId = id;
    });*/

    this.roleId = this.router.snapshot.paramMap.get('id')

    this._commonCrudService.get('Authentication/rolebyid?roleId=' + this.roleId, this.roleResponseModel).subscribe({
      next: res => this.roleName = res.data.name,
      error: err => console.log(err.error.message)
    })
  }

  modulesToTree(modules: ModuleNode[]): TreeNode[] {
    this.tree = modules?.map(module => {
      let moduleNode: TreeNode = { id: module.moduleId, name: module.moduleName };

      let typesNode: TreeNode[] = module.types.map((type) => {
        let typeNode: TreeNode = { name: type.pageType };

        let pagesNode: TreeNode[] = type.pages.map((page) => {
          let pageNode: TreeNode = { name: page.pageNameEn };
          return pageNode;
        });

        typeNode.children = pagesNode;
        return typeNode;
      });

      moduleNode.children = typesNode;
      return moduleNode;
    });

    this.filteredTree = [...this.tree];
    if(this.searchTerm.trim() == ''){
      return this.filteredTree;
    }
    return this.filteredTree.filter(m => m.name.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim()));
  }

  getPrivileges(){
    this._commonCrudService.get('Authentication/moduleswithpages', this.responseModel).subscribe({
      next: res => {
        this.dataSource.data = [{name: res.data.parent, children: this.modulesToTree(res.data.modules)}] 
        //console.log(this.dataSource)
        this.modules = res.data.modules;
        this.filteredModules = this.modulesToTree(res.data.modules)
        //console.log(this.filteredModules)
      },
      error: err => console.log(err)
    })
  }

  onCheckboxChange(node: FlatNode): void {
    // Handle checkbox change, update the state in the treeData
    //debugger;
    node.checked = !node.checked
    if (node.checked) {
      this.selectedIds.push(node.id);
    } else {
      const index = this.selectedIds.indexOf(node.id);
      if (index !== -1) {
        this.selectedIds.splice(index, 1);
      }
    }
    this.selectedIds = this.selectedIds.filter(x => x !== undefined)
    console.log(this.selectedIds)
  }

  saveModules(){
    let rolePrivileges = new RolePrivilegesModel();
    rolePrivileges.roleId = this.roleId;

    //this._commonCrudService.post('Authentication/roleprivilege')
  }

  filterTree(): void {
    this.getPrivileges()
  }

}
