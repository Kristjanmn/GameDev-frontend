import {Component, Inject, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {Dialog} from "../../model/dialog";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Quest} from "../../model/quest";
import {Script} from "../../model/script";
import {Cue} from "../../model/cue";
import {DialogService} from "../../service/dialog.service";
import {QuestService} from "../../service/quest.service";
import {ScriptService} from "../../service/script.service";
import {CueService} from "../../service/cue.service";
import {QuestPhase} from "../../model/questPhase";

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
              private projectService: ProjectService,
              private dialogService: DialogService,
              private questService: QuestService,
              private scriptService: ScriptService,
              private cueService: CueService,
              private dialog: MatDialog) {
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
          console.log(response.message);
          // redirect
          this.router.navigate(['error/404']);
        } else {
          this.project = <Project>response.object;
          this.getDialogsWithProjectIdCookie();
          this.getQuestsWithProjectIdCookie();
          this.getScriptsWithProjectIdCookie();
          this.getCuesWithProjectIdCookie();
        }
      });
  }

  getDialogsWithProjectIdCookie(): void {
    this.dialogService.getAllByProjectId_Cookie()
      .subscribe(response => {
        if (response.success) this.dialogs = <Dialog[]>response.object;
        else this.dialogs = [];
      });
  }

  getQuestsWithProjectIdCookie(): void {
    this.questService.getAllByProjectId_Cookie()
      .subscribe(response => {
        if (response.success) this.quests = <Quest[]>response.object;
        else this.quests = [];
      });
  }

  getScriptsWithProjectIdCookie(): void {
    this.scriptService.getAllByProjectId_Cookie()
      .subscribe(response => {
        if (response.success) this.scripts = <Script[]>response.object;
        else this.scripts = [];
      });
  }

  getCuesWithProjectIdCookie(): void {
    this.cueService.getAllByProjectId_Cookie()
      .subscribe(response => {
        if (response.success) this.cues = <Cue[]>response.object;
        else this.cues = [];
      });
  }

  /**
   * Project's database ID, NOT projectId
   *
   * @param projectDatabaseId project's database ID
   */
  getDialogs(projectDatabaseId: string): void {
    this.dialogService.getDialogs(projectDatabaseId)
      .subscribe(response => {
        if (response.success) this.dialogs = <Dialog[]>response.object;
        else this.dialogs = [];
      });
  }

  /**
   * Project's database ID, NOT projectId
   *
   * @param projectDatabaseId project's database ID
   */
  getQuests(projectDatabaseId: string): void {
    this.questService.getQuests(projectDatabaseId)
      .subscribe(response => {
        if (response.success) this.quests = <Quest[]>response.object;
        else this.dialogs = [];
      });
  }

  /**
   * Project's database ID, NOT projectId
   *
   * @param projectDatabaseId project's database ID
   */
  getScripts(projectDatabaseId: string): void {
    this.scriptService.getScripts(projectDatabaseId)
      .subscribe(response => {
        if (response.success) this.scripts = <Script[]>response.object;
        else this.dialogs = [];
      });
  }

  /**
   * Project's database ID, NOT projectId
   *
   * @param projectDatabaseId project's database ID
   */
  getCues(projectDatabaseId: string): void {
    this.cueService.getCues(projectDatabaseId)
      .subscribe(response => {
        if (response.success) this.cues = <Cue[]>response.object;
        else this.dialogs = [];
      });
  }

  // Dialog windows

  openNewDialogDialog(): void {
    const dialogRef = this.dialog.open(NewDialogDialog, {
      data: {
        dialogId: '',
        comment: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openNewQuestDialog(): void {
    const dialogRef = this.dialog.open(NewQuestDialog, {
      data: {
        questId: '',
        title: '',
        comment: ''
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      let quest = new class implements Quest {
        questId: string = data.questId;
        title: string = data.title;
        phases: QuestPhase[] = [];
        comment: string = data.comment;
      }
      console.log(quest);
      this.questService.saveQuest(quest)
        .subscribe(result => {
          if (!result.success)
            alert(result.message);
          else this.getQuestsWithProjectIdCookie();
        });
    });
  }

  openNewScriptDialog(): void {
    const dialogRef = this.dialog.open(NewScriptDialog, {
      data: {
        name: '',
        comment: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openNewCueDialog(): void {
    const dialogRef = this.dialog.open(NewCueDialog, {
      data: {
        cueId: '',
        comment: ''
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
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
  questId: string;
  title: string;
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
  cueId: string;
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
