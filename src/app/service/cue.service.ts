import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {Cue} from "../model/cue";

@Injectable({
  providedIn: 'root'
})
export class CueService {
  private readonly baseUrl = environment.backendUrl + "/api/cue";

  constructor(private http: HttpClient) {
  }

  getAllByProjectId_Cookie(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/`);
  }

  getCues(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }

  checkCueIdAvailable(cueId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/checkIdAvailable/${cueId}`);
  }

  saveCue(cue: Cue): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveCue`, cue);
  }
}
