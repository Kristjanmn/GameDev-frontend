import {AfterContentInit, AfterViewInit, Component, Inject, Input, OnInit, Output, EventEmitter} from "@angular/core";
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
import {GlobalService} from "../../service/global.service";
import {ScriptVariable} from "../../model/scriptVariable";
import {DialogLine} from "../../model/dialogLine";
import {MatTableDataSource} from "@angular/material/table";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {LoadingService} from "../../service/loading.service";
import {BehaviorSubject} from "rxjs";

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

  newDialog: Dialog = new class implements Dialog {
    dialogId: string = "";
    lines: DialogLine[] = [];
    comment: string = "";
  }

  newQuest: Quest = new class implements Quest {
    id: string = "";
    questId: string = "";
    title: string = "";
    phases: QuestPhase[] = [new class implements QuestPhase {
      id: string = "";
      phaseId: string = "INIT";
      description: string = "";
      script: Script[] = [];
      comment: string = "INIT must be first line and is only used for running scripts.";
      zOrder: number = 0;
    }];
    comment: string = "";
  }

  newScript: Script = new class implements Script {
    id: string = "";
    global: boolean = false;
    name: string = "";
    variables: ScriptVariable[] = [];
    comment: string = "";
  }

  newCue: Cue = new class implements Cue {
    cueId: string = "";
    comment: string = "E.g. audio word by word";
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private globalService: GlobalService,
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
        }
      });
  }

  getProject(projectId: string): void {
    //this.loadingService.isLoading.next(true);
    this.projectService.getByProjectId(projectId)
      .subscribe(response => {
        if (!response.success) {
          // display error
          console.log(response.message);
          // redirect
          //this.loadingService.isLoading.next(false);
          this.router.navigate(['error/404']);
        } else {
          this.project = <Project>response.object;
          this.getDialogsWithProjectIdCookie();
          this.getQuestsWithProjectIdCookie();
          this.getScriptsWithProjectIdCookie();
          this.getCuesWithProjectIdCookie();
          this.globalService.setTitle(this.project.title);
          //this.loadingService.isLoading.next(false);
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

  /**
   * Get quest by quest' DatabaseId
   */
  getQuestById(questDatabaseId: string): void {
    console.log("EVENT_questDatabaseId: " + questDatabaseId);
    this.questService.getQuestById(questDatabaseId)
      .subscribe(response => {
        if (response.success) this.quests?.unshift(<Quest>response.object);
        console.log("ERROR: " + response.message);
      });
  }

  onNewQuestSaved(questDatabaseId: string): void {
    console.log("onNewQuestSaved::INIT");
    console.log("questDatabaseId " + questDatabaseId)
    if (this.globalService.isBlank(questDatabaseId))
      return;
    //console.log("EVENT_questDatabaseId: " + questDatabaseId);
    this.questService.getQuestById(questDatabaseId)
      .subscribe(response => {
        console.log(response.success);
        if (response.success) this.quests?.unshift(<Quest>response.object);
        //console.log("ERROR: " + response.message);
      });
    this.resetNewQuest();
  }

  /**
   * Reset newQuest back to it's default values.
   * Used when previous new quest is saved.
   */
  resetNewQuest(): void {
    console.log("resetting new quest");
    this.newQuest = new class implements Quest {
      id: string = "";
      questId: string = "";
      title: string = "";
      phases: QuestPhase[] = [new class implements QuestPhase {
        id: string = "";
        phaseId: string = "INIT";
        description: string = "";
        script: Script[] = [];
        comment: string = "INIT must be first line and is only used for running scripts.";
        zOrder: number = 0;
      }];
      comment: string = "";
    }
  }

  onNewScriptSaved(scriptDatabaseId: string): void {
    //console.log("onNewQuestSaved::INIT");
    if (this.globalService.isBlank(scriptDatabaseId))
      return;
    //console.log("EVENT_questDatabaseId: " + questDatabaseId);
    this.scriptService.getScriptById(scriptDatabaseId)
      .subscribe(response => {
        if (response.success) this.scripts?.unshift(<Script>response.object);
        //console.log("ERROR: " + response.message);
      });
    this.resetNewScript();
  }

  resetNewScript(): void {
    console.log("resetting new script");
    this.newScript = new class implements Script {
      id: string = "";
      global: boolean = false;
      name: string = "";
      variables: ScriptVariable[] = [];
      comment: string = "";
    }
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
        id: '',
        questId: '',
        title: '',
        comment: ''
      }
    });
    dialogRef.beforeClosed().subscribe(data => {
      let quest = new class implements Quest {
        id: string = data.id;
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

// Project

@Component({
  selector: 'project-form',
  templateUrl: './project-form.html'
})
export class ProjectFormComponent implements AfterContentInit {
  @Input() project!: Project;
  idAvailable: boolean = true;

  inputProjectId: string = "";
  inputTitle: string = "";
  inputDescription: string = "";

  constructor(private router: Router,
              private globalService: GlobalService,
              private projectService: ProjectService) {
  }

  ngAfterContentInit(): void {
    this.inputProjectId = this.project.projectId;
    this.inputTitle = this.project.title;
    this.inputDescription = this.project.description;
  }

  updateIdAvailable(): void {
    this.inputProjectId = this.globalService.oneWord(this.inputProjectId);
    if (this.inputProjectId.trim().length == 0)
      this.idAvailable = false;
    else if (this.project.projectId === this.inputProjectId)
      this.idAvailable = true;
    else
      this.projectService.checkProjectIdAvailable(this.inputProjectId)
        .subscribe(result => {
          this.idAvailable = result.success;
        });
  }

  saveProject(): void {
    // Make sure user can't post incorrect data from form.
    this.updateIdAvailable();
    if (this.idAvailable) {
      // Update project variables
      this.project.projectId = this.inputProjectId;
      this.project.title = this.inputTitle;
      this.project.description = this.inputDescription;
      this.projectService.saveProject(this.project)
        .subscribe(result => {
          if (result.success)
            this.router.navigate([this.project.projectId]);
        });
    }
    //dont do it
  }

  revertChanges(): void {
    this.inputProjectId = this.project.projectId;
    this.inputTitle = this.project.title;
    this.inputDescription = this.project.description;
    this.updateIdAvailable();
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

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.html'
})
export class DialogFormComponent implements AfterContentInit {
  @Input() dialog!: Dialog;

  constructor(private globalService: GlobalService,
              private dialogService: DialogService) {
  }

  ngAfterContentInit(): void {
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

@Component({
  selector: 'quest-form',
  templateUrl: './quest-form.html'
})
export class QuestFormComponent implements AfterContentInit {
  @Input() quest!: Quest;
  @Output() onNewQuestSaved = new BehaviorSubject<string>("");
  //@Output() onNewQuestSaved = new EventEmitter<string>();
  idAvailable: boolean = true;

  inputQuestId: string = "";
  inputTitle: string = "";
  inputComment: string = "";
  inputPhases: QuestPhase[] = [];
  displayedColumns: string[] = ["id", "description", "script", "comment"];
  dataSource: MatTableDataSource<QuestPhase> = new MatTableDataSource<QuestPhase>();

  constructor(private globalService: GlobalService,
              private questService: QuestService,
              private loadingService: LoadingService) {
  }

  ngAfterContentInit(): void {
    this.inputQuestId = this.quest.questId;
    this.inputTitle = this.quest.title;
    this.inputComment = this.quest.comment;
    this.inputPhases = Object.assign([], this.quest.phases);
    this.updateTable();

    // Attempt to check for duplicate IDs.
    //this.updateIdAvailable();
  }

  drop(event: CdkDragDrop<QuestPhase[]>) {
    /*if (event.previousIndex != 0 && event.currentIndex != 0) {
      moveItemInArray(this.inputPhases, event.previousIndex, event.currentIndex);
      this.inputPhases[event.currentIndex].zOrder = event.currentIndex;
    }
    if (event.currentIndex == 0)
      moveItemInArray(this.inputPhases, event.previousIndex, 1);*/
    //if (event.currentIndex != 0) {
    if (!this.globalService.stringEquals(this.inputPhases[event.currentIndex].phaseId, "INIT")) {
      //moveItemInArray(this.inputPhases, event.previousIndex, 1);
      moveItemInArray(this.inputPhases, event.previousIndex, event.currentIndex);
      this.inputPhases[event.currentIndex].zOrder = event.currentIndex;
    }
    /*else {
      moveItemInArray(this.inputPhases, event.previousIndex, event.currentIndex);
      this.inputPhases[event.currentIndex].zOrder = event.currentIndex;
      console.log(this.inputPhases[event.currentIndex].zOrder);
    }*/
    this.updateTable();
  }

  addPhase(): void {
    this.inputPhases.push(new class implements QuestPhase {
      id: string = "";
      comment: string = "";
      description: string = "";
      phaseId: string = "newPhase";
      script: Script[] = [];
      zOrder: number = 0;
    });
    this.updateTable();
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<QuestPhase>(this.inputPhases);
  }

  updateIdAvailable(): void {
    this.inputQuestId = this.globalService.oneWord(this.inputQuestId);
    if (!this.globalService.isBlank(this.inputQuestId)) {
      // is new quest
      if (this.globalService.isBlank(this.quest.id))
        this.questService.checkQuestIdAvailable(this.inputQuestId)
          .subscribe(response => {
            this.idAvailable = response.success;
          });
      // is existing quest
      else this.questService.checkQuestIdAvailable_questDatabaseId(this.quest.id, this.inputQuestId)
        .subscribe(response => {
          this.idAvailable = response.success;
        });
    }
  }

  save(): void {
    this.loadingService.isLoading.next(true);
    this.quest.questId = this.globalService.oneWord(this.inputQuestId);
    this.quest.title = this.inputTitle;
    this.quest.comment = this.inputComment;
    this.quest.phases = this.inputPhases;
    this.questService.saveQuest(this.quest)
      .subscribe(response => {
        this.loadingService.isLoading.next(true);
        if (!response.success)
          alert(response.message);
        else if (this.globalService.isBlank(this.quest.id)) {
          console.log("SAVE")
          let newQuest = <Quest>response.object;
          console.log("new id " + newQuest.id);
          this.onNewQuestSaved.next(newQuest.id);
          this.onNewQuestSaved.subscribe(response => {
            console.log("onNewQuestSaved response " + response);
          });
          //this.onNewQuestSaved.emit(newQuest.id);
        }
        this.loadingService.isLoading.next(false);
      });
  }

  /**
   * Send pre-filled Quest object to backend.
   */
  testSave(): void {/*
    this.questService.testSave()
      .subscribe(response => {
        console.log(response.message);
      });*/
    this.onNewQuestSaved.next(this.quest.id);
    this.onNewQuestSaved.subscribe(response => {
      console.log("TESTSAVE::RESPONSE " + response);
    });
  }

  /**
   * Reverts any changes to last saved parameters.
   */
  revertChanges(): void {
    this.reload();
    // this.inputQuestId = this.quest.questId;
    // this.inputTitle = this.quest.title;
    // this.inputComment = this.quest.comment;
    // this.inputPhases = Object.assign([], this.quest.phases);
    // //this.inputPhases = this.quest.phases;
    // this.updateTable();
  }

  /**
   * Reload quest from server.
   * This is pretty much same as revertChanges function,
   * so one will probably be removed in near future.
   */
  reload(): void {
    // To be implemented. Will be used to re-fetch current
    // quest from backend and discarding any unsaved changes.
    // Can be useful when another person has just edited same
    // quest and you don't want to reload entire page.
    this.loadingService.isLoading.next(true);
    this.questService.getQuestById(this.quest.id)
      .subscribe(response => {
        if (response.success) {
          this.quest = <Quest>response.object;
          this.inputQuestId = this.quest.questId;
          this.inputTitle = this.quest.title;
          this.inputComment = this.quest.comment;
          this.inputPhases = Object.assign([], this.quest.phases);
          this.updateTable();
        }
        this.loadingService.isLoading.next(false);
      });
  }

  onTableIdChanged(index: number, oldId: string): void {
    if (this.globalService.stringEquals(this.inputPhases[index].phaseId, "INIT")) {
      this.inputPhases[index].phaseId = oldId;
      return;
    }
    // Force upper case, which is current standard for this system
    this.inputPhases[index].phaseId = this.globalService.oneWord(this.inputPhases[index].phaseId).toUpperCase();
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

@Component({
  selector: 'script-form',
  templateUrl: './script-form.html'
})
export class ScriptFormComponent implements AfterContentInit {
  @Input() script!: Script;
  @Output() onNewScriptSaved = new BehaviorSubject<string>("");
  scriptNameAvailable: boolean = true;

  inputName: string = "";
  inputComment: string = "";
  inputVariables: ScriptVariable[] = [];
  displayedColumns: string[] = ["type", "name"];
  dataSource: MatTableDataSource<ScriptVariable> = new MatTableDataSource<ScriptVariable>();
  currentScript: string = "";

  constructor(private globalService: GlobalService,
              private scriptService: ScriptService) {
  }

  ngAfterContentInit() {
    this.inputName = this.script.name;
    this.inputComment = this.script.comment;
    this.inputVariables = Object.assign([], this.script.variables);
    this.updateTable();
  }

  drop(event: CdkDragDrop<ScriptVariable[]>) {
    moveItemInArray(this.inputVariables, event.previousIndex, event.currentIndex);
    this.updateTable();
  }

  addVariable(): void {
    this.inputVariables.push(new class implements ScriptVariable {
      name: string = "";
      type: string = "";
    });
    this.updateTable();
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource<ScriptVariable>(this.inputVariables);
    this.updateCurrentScript();
  }

  updateScriptNameAvailable(): void {
    this.inputName = this.globalService.oneWord(this.inputName)
    if (this.inputName.trim().length == 0)
      this.scriptNameAvailable = false;
    else if (this.script.name != this.inputName)
      this.scriptService.checkScriptNameAvailable(this.inputName)
        .subscribe(result => {
          this.scriptNameAvailable = result.success;
        });
    this.updateCurrentScript()
  }

  updateCurrentScript(): void {
    let vars = "";
    for (let i = 0; i < this.inputVariables.length; i++) {
      vars += this.inputVariables[i].type + " " + this.inputVariables[i].name;
      if (i != this.inputVariables.length - 1)
        vars += ", ";
    }
    this.currentScript = "void " + this.inputName + "(" + vars + ")";
  }

  save(): void {
    this.script.name = this.globalService.oneWord(this.inputName);
    this.script.comment = this.inputComment;
    this.script.variables = this.inputVariables;
    this.scriptService.saveScript(this.script)
      .subscribe(response => {
        if (!response.success)
          alert(response.message);
        else if (this.globalService.isBlank(this.script.id)) {
          console.log("saved new script");
        }
      });
  }

  revertChanges(): void {
    // consider using "reload" function as in QuestFormComponent
    this.inputName = this.script.name;
    this.updateScriptNameAvailable();
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

@Component({
  selector: 'cue-form',
  templateUrl: './cue-form.html'
})
export class CueFormComponent implements AfterContentInit {
  @Input() cue!: Cue;

  constructor(private globalService: GlobalService,
              private cueService: CueService) {
  }

  ngAfterContentInit(): void {
  }
}
