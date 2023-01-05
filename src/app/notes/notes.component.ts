import {Component, OnInit} from '@angular/core';
import {Notebook} from "./model/notebook";
import {ApiService} from "../Shared/api.service";
import {Note} from "./model/Note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  public getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      err => {
        alert(err);
      }
    );
  }

  public getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res;
      },
      err => {
        alert(err);
      }
    );
  }

  createNotebook() {
    let newNotebook: Notebook = {
      id: '',
      name: 'New notebook',
      nbOfNotes: 0
    };

    this.apiService.postNotebook(newNotebook).subscribe(
      res => {
        newNotebook.id = res.id;
        this.notebooks.push(newNotebook);
      },
      err => {
        alert("An error has occured while saving the notebook");
      }
    );
  }

  updateNotebook(updatedNotebook: Notebook) {
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res => {
        alert("updated notebook successfully")
      },
      err => {
        alert("An error has occured while saving the updating notebook");
      }
    );
  }

  deleteNotebook(notebook: Notebook) {
    if (confirm("Are you sure you want to delete this notebook")) {
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        err => {
          alert("Could not delete notebook");
        });
    }
  }

  deleteNote(note: Note) {
    if (confirm("Are you sure you want to delete this note?")) {
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        }, error1 => {
          alert("An error has occured while deleting the note");
        }
      );
    }
  }

  public createNote(notebookId: string) {
    let newNote: Note = {
      id: null || '',
      title: 'New Note',
      text: 'Write some text in here',
      lastModifiedOn: null || '',
      notebookId: notebookId,
    }
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
      },
      err => {
        alert("An error has occured while saving the note");
      }
    );
  }

  selectNotebook(notebook:Notebook) {
    this.selectedNotebook = notebook;
    //TODO:grab all the notes for this notebook only.

  }

  updateNote(updatedNote: Note) {
    this.apiService.saveNote(updatedNote).subscribe(
      res => {
      },
      err => {
        alert("An error has occured while saving the note");
      }
    );

  }

  selectallNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }
}
