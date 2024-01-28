import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ResponseModel } from 'app/Core/Models/ResponseModels/ResponseModel';
import { CommonCrudService } from 'app/Core/Services/CommonCrudService';


interface TreeNode {
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-test-priv',
  templateUrl: './test-priv.component.html',
  styleUrls: ['./test-priv.component.scss']
})
export class TestPrivComponent implements OnInit {

  constructor(private _commonCrudService: CommonCrudService) { }

  ngOnInit(): void {
    this.getPrivileges()
  }

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;
  responseModel: ResponseModel<any> = {
    message: '',
    statusCode: 0,
    executionDate: undefined,
    succeeded: false,
    data: [],
    total: 0
  }

  jsonToTree(json: any): TreeNode[] {
    let tree: TreeNode[] = json.modules.map((module) => {
      let moduleNode: TreeNode = { name: module.moduleName };
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
    return tree;
  }

  getPrivileges(){
    this._commonCrudService.get('Authentication/moduleswithpages', this.responseModel).subscribe({
      next: res => {
        //this.privilegesData = res.data
        this.dataSource.data = [{name: res.data.parent, children: this.jsonToTree(res.data)}] 
        //console.log(this.TREE_DATA)
        //this.dataSource.data = this.TREE_DATA || [];
        console.log(this.dataSource)
      },
      error: err => console.log(err)
    })
  }

}
