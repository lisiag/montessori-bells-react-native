// Business interface that can be called on by the UI and that in turn calls on the songs
// database, thus keeping the UI and songs data separated

import { addNoteListener, removeNoteListener } from "./note";

// units of song
export interface NoteTime {
    note: number;
    time: number;
}

// format in which a song is stored in database
export interface SongData {
    title: string;
    song: NoteTime[];
}

// SongCallback, songLoadListeners, addSongLoadListeners and notifySongLoadListeners are not
// currently being used. In the Ionic version of this app, they were used for listening to changes
// in the songs database. I am keeping them here as they may be useful here in the future, for
// example when the saving and loading of songs is modified to allow the user to save more than one
// song.
type SongCallback = (song: SongData | null) => void;

// listeners that are called when the 'songs' database changes, i.e. the logged in user's saved song changes
let songLoadListeners = new Set<SongCallback>();

// add a listener to the set listening for changes to the 'songs' database
export function addSongLoadListener(callback: SongCallback) {
    songLoadListeners.add(callback);
}

// If the 'songs' database is modified then anywhere in app that uses the data (i.e. play_songs
// page when it calls getSong) needs to be notified
export function notifySongLoadListeners(currentSong: SongData) {
    for (const cb of songLoadListeners) {
        cb(currentSong);
    }
}

export function recordSong(): () => NoteTime[] {
    const song: NoteTime[] = [];
    const callback = (note: number) => {
        song.push({ note, time: Date.now() });
    };
    addNoteListener(callback);
    return () => {
        removeNoteListener(callback);
        return song;
    };
}

export interface SongDB {
    saveSong(title: string, song: NoteTime[]): Promise<void>;
    loadSong(title: string): Promise<NoteTime[] | null>;
}
export let songDB: SongDB | null = null;

// set the songs database
export function setSongDB(v: SongDB) {
    songDB = v;
}

export function getSongDB(): SongDB {
    if (songDB == null) {
        throw new Error("songDB not configured!");
    }
    return songDB;
}
