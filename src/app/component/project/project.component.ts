import {Component, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../service/project.service";

@Component({
  selector: 'project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit{
  project?: Project;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params["projectId"]) {
          this.getProject(params["projectId"]);
        } //else this.router.navigate(['error/404']);
      });
  }

  getProject(projectId: string): void {
    this.project = this.projectService.getByProjectId(projectId);
  }
}
