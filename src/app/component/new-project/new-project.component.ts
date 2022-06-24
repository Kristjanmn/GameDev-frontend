import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/project";
import {GlobalService} from "../../service/global.service";

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements OnInit {
  projectForm!: FormGroup;
  newProject: Project = new class implements Project {
    description: string = "";
    id: string = "";
    projectId: string = "";
    title: string = "";
  }
  titleMinLength = 4;
  titleMaxLength = 6;
  projectIdMinLength = 4;
  projectIdMaxLength = 6;
  projectIdAvailable = true;

  constructor(private router: Router,
              private globalService: GlobalService,
              private projectService: ProjectService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm(): void {
    this.projectForm = this.formBuilder.group({
      projectId: [''/*, [
        Validators.minLength(this.projectIdMinLength),
        Validators.maxLength(this.projectIdMaxLength)]*/],
      title: ['', [
        /*Validators.minLength(this.titleMinLength),
        Validators.maxLength(this.titleMaxLength),*/
        Validators.required]],
      description: ['']
    });
  }

  errorHandling(control: string, error: string) {
    return this.projectForm.controls[control].hasError(error);
  }

  create(): void {
    this.newProject.projectId = this.globalService.oneWord(this.projectForm.value.projectId);
    this.newProject.title = this.projectForm.value.title.trim();
    this.newProject.description = this.projectForm.value.description.trim();
    if (this.newProject.title != "")
      this.projectService.saveProject(this.newProject)
        .subscribe(response => {
          if (!response.success)
            // Error
            window.alert(response.message);
          else {
            let project = <Project>response.object;
            this.router.navigate([project.projectId]);
          }
        });
  }

  updateProjectIdAvailable(): void {
    if (this.projectForm.value.projectId.trim() == "") this.projectIdAvailable = true;
    else this.projectService.checkProjectIdAvailable(this.projectForm.value.projectId)
      .subscribe(response => {
        this.projectIdAvailable = response.success;
      });
  }

  updateProjectIdValue(): void {
    this.projectForm.setValue({
      title: this.projectForm.value.title,
      projectId: this.globalService.oneWord(this.projectForm.value.projectId),
      description: this.projectForm.value.description
    });
    this.updateProjectIdAvailable();
  }
}
