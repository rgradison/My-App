import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Notebook} from "../notes/model/notebook";
import {FeedbackViewModel} from "../feedback/feedback.component";
import {Note} from "../notes/model/Note";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private BASE_URL = 'http://localhost:8082/api';
  private ALL_NOTEBOOKS_URL = '${BASE_URL}\\notebooks\\all';
  private SEND_FEEDBACK_URL = '${BASE_URL}\\feedback';
  private SAVE_UPDATE_NOTEBOOK = '${BASE_URL}\\notebooks';
  private DELETE_NOTEBOOK_URL = '${BASE_URL}\\notebooks\\';
  private ALL_NOTES_URL = '${BASE_URL}\\notes\\all';
  private NOTES_BY_NOTEBOOK_URL = '${BASE_URL}\\notes\\byNotebook';
  private SAVE_UPDATE_NOTE_URL = '${BASE_URL}\\notes';
  private DELETE_NOTE_URL = '${BASE_URL}\\notes\\'

  constructor(private http: HttpClient) {
    this.getAllNotebooks();
  }
  getAllNotebooks(): Observable<Notebook[]> {
    return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
  }
  postFeedback(feedback: FeedbackViewModel): Observable<any> {
    return this.http.post(this.SEND_FEEDBACK_URL,feedback);
  }
  postNotebook(notebook: Notebook): Observable<Notebook> {
    return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK,notebook);
  }
  deleteNotebook(id: string): Observable<any> {
    return this.http.delete(`${this.DELETE_NOTEBOOK_URL}/${id}`);
  }
  public getAllNotes() : Observable<Note[]> {
    return this.http.get<Note[]>(this.ALL_NOTES_URL);
  }
  public getNotesByNotebook(notebookId: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
  }
  saveNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.SAVE_UPDATE_NOTE_URL, note);
  }

  deleteNote(noteId: string): Observable<any> {
    return this.http.delete(this.DELETE_NOTE_URL + noteId );
  }

}
