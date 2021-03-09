import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('fed', (table: Knex.CreateTableBuilder) => {
            table.increments('id')
            table.string('where').notNullable()             // Location - string
            table.integer('how_many_ducks').notNullable()   // Duck qnt - int
            table.string('food').notNullable()              // Food name - string Eg: corn
            table.string('food_kind').notNullable()         // Kind? - string
            table.integer('food_amount')                    // Food amount - int
            table.dateTime('feed_at')                       // Feed at time - datetime
            table.timestamps(false, true)
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('fed');
}

