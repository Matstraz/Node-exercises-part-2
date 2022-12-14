//TERRà TEMPORANEMANETE IN MEMORIA I DATI DI UNO SPECIFICO USER

import session from "express-session";
import config from "../../config";

export function initSessionMiddleware() {
    //ritorna una nuova istanza di sessionMiddleware
    return session({
        secret: config.SESSION_SECRET, //è ciò che usiamo per CRITTOGRAFARE la nostra session coockies
        resave: false,
        saveUninitialized: false,
    });
}
