import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {Quest} from "../model/quest";
import {QuestPhase} from "../model/questPhase";
import {Script} from "../model/script";

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

  checkQuestIdAvailable_questDatabaseId(questDatabaseId: string, questId: string) {
    return this.http.get<CustomResponse>(`${this.baseUrl}/checkIdAvailable/${questDatabaseId}/${questId}`);
  }

  saveQuest(quest: Quest): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveQuest`, quest);
  }

  getQuestById(questDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getById/${questDatabaseId}`);
  }

  testSave(): Observable<CustomResponse> {
    let quest = new class implements Quest {
      id: string = "";
      questId: string = "test_quest";
      title: string = "test quest title";
      phases: QuestPhase[] = [new class implements QuestPhase {
        comment: string = "test phase comment";
        description: string = "test phase description";
        id: string = "";
        phaseId: string = "test_phase_1";
        script: Script[] = [];
        zOrder: number= 0;
      }];
      comment: string = "test quest comment";
    }
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveQuest`, quest);
  }
}
