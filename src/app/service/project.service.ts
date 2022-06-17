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
  private readonly baseUrl = environment.backendUrl + "/api/project";

  constructor(private http: HttpClient) {
  }

  getByProjectId(projectId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProjectId/${projectId}`);
  }

  saveProject(project: Project): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveProject`, project);
  }
}
