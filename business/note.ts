type NoteCallback = (note: number) => void;

let listeners = new Set<NoteCallback>();

// add a listener to the set listening for changes to the 'songs' database
export function addNoteListener(callback: NoteCallback) {
    listeners.add(callback);
}

// If the 'songs' database is modified then anywhere in app that uses the data (i.e. play_songs
// page when it calls getSong) needs to be notified
export function notifyNoteListener(note: number) {
    for (const cb of listeners) {
        cb(note);
    }
}
