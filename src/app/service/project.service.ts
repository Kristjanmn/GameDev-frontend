import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CustomResponse} from "../model/customResponse";
import {Project} from "../model/project";
import {Observable} from "rxjs";
import {Dialog} from "../model/dialog";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projectUrl = environment.backendUrl + "/api/project"
  private readonly dialogUrl = environment.backendUrl + "/api/dialog"
  private readonly questUrl = environment.backendUrl + "/api/quest"
  private readonly scriptUrl = environment.backendUrl + "/api/script"
  private readonly cueUrl = environment.backendUrl + "/api/cue"

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getByProjectId(projectId: string): Observable<CustomResponse> {
    //let project;
    return this.http.get<CustomResponse>(`${this.projectUrl}/getByProjectId/${projectId}`);
      /*.subscribe(response => {
        if (!response.success || response.object == null)
          this.router.navigate(['']);
        project = <Project>response.object;
      });*/
    //return <Project><unknown>project;
  }

  saveProject(project: Project): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.projectUrl}/saveProject`, project);
  }

  // Dialogs and the rest should be in Project Service, as they are always part project
  getProjectDialogs(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.dialogUrl}/getByProject/${projectDatabaseId}`);
  }
}
