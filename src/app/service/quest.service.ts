import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {Quest} from "../model/quest";
import {QuestPhase} from "../model/questPhase";

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private readonly baseUrl = environment.backendUrl + "/api/quest";

  constructor(private http: HttpClient) {
  }

  getAllByProjectId_Cookie(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/`);
  }

  getQuests(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }

  checkQuestIdAvailable(questId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/checkIdAvailable/${questId}`);
  }

  saveQuest(quest: Quest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveQuest`, quest);
  }
}
