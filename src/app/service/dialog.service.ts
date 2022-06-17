import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly baseUrl = environment.backendUrl + "/api/dialog";

  constructor(private http: HttpClient) {}

  getDialogs(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }
}
