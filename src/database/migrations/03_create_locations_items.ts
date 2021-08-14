import Knex from 'knex';

export async function up(Knex: Knex){
    return Knex.schema.createTable('locations_items', table => {
        table.increments('id').primary();
        table.integer('location_id')
            .notNullable()
            .references('id')
            .inTable('locations');
        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    })
}

export async function down(Knex: Knex){
    return Knex.schema.dropTable('locaitons_items');
}