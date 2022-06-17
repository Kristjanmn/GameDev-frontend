import {Component, Inject, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {Dialog} from "../../model/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Quest} from "../../model/quest";
import {Script} from "../../model/script";
import {Cue} from "../../model/cue";

@Component({
  selector: 'project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit{
  project?: Project;
  dialogs?: Dialog[];
  quests?: Quest[];
  scripts?: Script[];
  cues?: Cue[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        if (params["id"]) {
          this.getProject(params["id"]);
        } //else this.router.navigate(['error/404']);
      });
  }

  getProject(projectId: string): void {
    this.projectService.getByProjectId(projectId)
      .subscribe(response => {
        if (!response.success) {
          // display error
          // redirect
        } else {
          this.project = <Project>response.object;
          this.getDialogs(this.project.id);
        }
      });
  }

  /**
   * Project's database ID, NOT projectId
   *
   * @param projectId project's database ID
   */
  getDialogs(projectId: string): void {
    this.projectService.getProjectDialogs(projectId)
      .subscribe(response => {
        if (response.success) this.dialogs = <Dialog[]>response.object;
        else this.dialogs = [];
      });
  }
}

// Dialog

export interface NewDialogData {
  dialogId: string;
  comment: string;
}

@Component({
  selector: 'new-dialog-dialog',
  templateUrl: './new-dialog-dialog.html'
})
export class NewDialogDialog {
  constructor(
    public dialogRef: MatDialogRef<NewDialogDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Quest

export interface NewQuestData {
  dialogId: string;
  comment: string;
}

@Component({
  selector: 'new-quest-dialog',
  templateUrl: './new-quest-dialog.html'
})
export class NewQuestDialog {
  constructor(
    public dialogRef: MatDialogRef<NewQuestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewQuestData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Script

export interface NewScriptData {
  name: string;
  comment: string;
}

@Component({
  selector: 'new-script-dialog',
  templateUrl: './new-script-dialog.html'
})
export class NewScriptDialog {
  constructor(
    public dialogRef: MatDialogRef<NewScriptDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewScriptData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Cue

export interface NewCueData {
  dialogId: string;
  comment: string;
}

@Component({
  selector: 'new-cue-dialog',
  templateUrl: './new-cue-dialog.html'
})
export class NewCueDialog {
  constructor(
    public dialogRef: MatDialogRef<NewCueDialog>,
    @Inject(MAT_DIALOG_DATA) public data: NewCueData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
