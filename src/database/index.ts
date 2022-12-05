import { Client } from 'pg';

let db: Client;

export function connect() {
    db = new Client('postgres://nlvrixrx:mp8OuKoQoP8IXti81BibBJgwupuNBEfP@surus.db.elephantsql.com/nlvrixrx');
    return db.connect();
}

export async function query(queryString: string, parameters?: any) {
    if (!db) await connect();
    const result = await db.query(queryString, parameters);
    return result;
}
