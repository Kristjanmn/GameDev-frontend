import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomResponse} from "../model/customResponse";
import {Project} from "../model/project";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl = environment.backendUrl + "/api/project"

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getByProjectId(projectId: string): Project {
    let project;
    this.http.get<CustomResponse>(`${this.baseUrl}/getByProjectId/${projectId}`)
      .subscribe(response => {
        if (!response.success || response.object == null)
          this.router.navigate(['']);
        project = <Project>response.object;
      });
    return <Project><unknown>project;
  }

  getProjectDialogs(projectDatabaseId: string): void {
    //
  }

  saveProject(project: Project): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveProject/`, project);
  }
}
