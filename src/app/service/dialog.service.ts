import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/customResponse";
import {HttpClient} from "@angular/common/http";
import {Dialog} from "../model/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly baseUrl = environment.backendUrl + "/api/dialog";

  constructor(private http: HttpClient) {}

  getAllByProjectId_Cookie(): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/`);
  }

  getDialogs(projectDatabaseId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/getByProject/${projectDatabaseId}`);
  }

  checkDialogIdAvailable(dialogId: string): Observable<CustomResponse> {
    return this.http.get<CustomResponse>(`${this.baseUrl}/checkIdAvailable/${dialogId}`);
  }

  saveDialog(dialog: Dialog): Observable<CustomResponse> {
    return this.http.post<CustomResponse>(`${this.baseUrl}/saveDialog`, dialog);
  }
}
