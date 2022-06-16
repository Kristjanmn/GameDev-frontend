import {Component, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";
import {Dialog} from "../../model/dialog";

@Component({
  selector: 'project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit{
  project?: Project;
  dialogs?: Dialog[];

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
