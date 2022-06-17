import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";

@Injectable({
  providedIn: 'root'
})
export class ScriptService {
  private readonly baseUrl = environment.backendUrl + "/api/script";

  constructor(private http: HttpClient) {
  }

  getScripts(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }
}
