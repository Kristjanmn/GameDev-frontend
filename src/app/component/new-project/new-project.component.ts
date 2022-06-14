import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {Project} from "../../model/project";

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

  constructor(private router: Router,
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
    this.newProject.projectId = this.projectForm.value.projectId;
    this.newProject.title = this.projectForm.value.title;
    this.newProject.description = this.projectForm.value.description;
    if (this.newProject.title != "")
      this.projectService.saveProject(this.newProject)
        .subscribe(response => {
          if (!response.success)
            // Error
            return;
        });
  }
}
