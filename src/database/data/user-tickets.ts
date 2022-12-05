import { query } from "../index";

export const fetchTickets = async () => {
    try {
        const response = await query('SELECT * FROM tickets');
        return { success: true, response: response.rows?.[0] };
    } catch (error) {
        return { success: false, error };
    }
}

export const insertTickets = async (values: string[]) => {
    try {
        const response = await query(`INSERT INTO tickets (user_id, title) VALUES ( $1, $2) RETURNING *`, values);
        return { success: true, response: response.rows?.[0] };
    } catch (error) {
        return { success: false, error };
    }
};


export const insertTags = async (values: string[]) => {
    try {
        const response = await query(`INSERT INTO tags (user_id, tag) VALUES ( $1, UNNEST($2::text[]) )`, values);
        return { success: true, response: response.rows?.[0] };
    } catch (error) {
        console.log((error as any).stack);
        return { success: false, error };
    }
};


export const getHighestTagCount = async () => {
    try {
        const response = await query(`SELECT tag, count(tag) as count FROM tags GROUP BY tag ORDER BY count DESC LIMIT 1`);
        return { success: true, response: response.rows?.[0] };
    } catch (error) {
        console.log((error as any).stack);
        return { success: false, error };
    }
};