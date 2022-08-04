import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {Script} from "../model/script";

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private readonly baseUrl = environment.backendUrl + "/api/script";

  constructor(private http: HttpClient) {
  }

  getAllByProjectId_Cookie(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/`);
  }

  getScripts(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }

  saveScript(script: Script): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveScript`, script);
  }

  getScriptById(scriptDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getById/${scriptDatabaseId}`);
  }

  checkScriptNameAvailable(scriptName: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/checkIdAvailable/${scriptName}`);
  }
}
