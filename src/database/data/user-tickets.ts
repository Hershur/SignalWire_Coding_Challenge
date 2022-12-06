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
        const response = await query(`
            WITH insert_tags_data AS (
                INSERT INTO tags (user_id, tag)
                VALUES ( $1, UNNEST($2::text[]) ) 
                RETURNING * 
            )
            
            SELECT tag, (COUNT(tag) + (SELECT COUNT(tag) FROM insert_tags_data)) AS count 
            FROM tags GROUP BY tag ORDER BY count DESC LIMIT 1`, 
            values
        );

        return { success: true, response: response.rows?.[0] };
    } catch (error) {
        console.log((error as any).stack);
        return { success: false, error };
    }
};

