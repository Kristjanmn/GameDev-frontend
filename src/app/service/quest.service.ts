import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private readonly baseUrl = environment.backendUrl + "/api/quest";

  constructor(private http: HttpClient) {
  }

  getQuests(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }
}
