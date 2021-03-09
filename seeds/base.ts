import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("fed").del();

    // Inserts seed entries
    for(let x = 0; x < 100; x++) {
        const start = new Date(2021, 1, 1)
        const end = new Date()

        let date = new Date(+ start + Math.random() * (end.getTime() - start.getTime()));
        const hour = 0 + Math.random() * (0 - 23) | 0;
        date.setHours(hour);
        
        await knex("fed").insert({ 
            where: "Somewhere over the rainbow", 
            how_many_ducks: Math.floor(Math.random() * 10) + 1, 
            food: 'Hotdog',
            food_kind: 'Trash Food',
            food_amount: Math.floor(Math.random() * 10) + 1,
            feed_at: date
        });
    }
};
