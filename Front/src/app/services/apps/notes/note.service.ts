import { Injectable, signal } from '@angular/core';
import { Note } from 'src/app/pages/apps/notes/note';
import { notes } from 'src/app/pages/apps/notes/notesData';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = signal<Note[]>(notes);

  public getNotes(): Note[] {
    return this.notes();
  }

  public addNote(note: Note) {
    this.notes.update((currentNotes) => [note, ...currentNotes]);
  }

  public removeNote(note: Note) {
    this.notes.update((currentNotes) => currentNotes.filter((n) => n !== note));
  }

  public updateNote(updatedNote: Note): void {
    this.notes.update(
      (currentNotes) =>
        currentNotes.map((n) =>
          n.title === updatedNote.title ? updatedNote : n
        )
    );
  }
}
