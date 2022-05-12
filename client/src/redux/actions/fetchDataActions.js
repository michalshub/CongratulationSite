export function setAllCategories(categories) {
    return { type: "SET_ALL_CATEGORIES", payload: categories }
}
export function setAllWallpapers(wallpapers) {
    return { type: "SET_ALL_WALLPAPERS", payload: wallpapers }
}

export function setPcSubject(sub) {
    return { type: "SET_PC_SUBJECT", payload: sub }
}

export function setPcEmail(email) {
    return { type: "SET_PC_EMAIL", payload: email }
}

export function setPcPicked(pick) {
    return { type: "SET_PC_PICKED", payload: pick }
}

export function setPcNote(note) {
    return { type: "SET_PC_NOTE", payload: note }
}
