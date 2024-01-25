import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { FileUploadModule } from 'ng2-file-upload';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FormsRoutes } from './forms.routing';
import { WizardComponent } from './wizard/wizard.component';
import { ReusableTableComponent } from './reusable-table/reusable-table.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    QuillModule.forRoot(),
    FileUploadModule,
    SharedMaterialModule,
    RouterModule.forChild(FormsRoutes),
  ],
  declarations: [RichTextEditorComponent, FileUploadComponent, WizardComponent, BasicFormComponent, ReusableTableComponent],
  exports: [ReusableTableComponent]
})
export class AppFormsModule {}
