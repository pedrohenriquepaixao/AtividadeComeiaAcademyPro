import Knex from 'knex';

export async function up(Knex: Knex){
    return Knex.schema.createTable('locations', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf',2).notNullable();
        table.string('image').notNullable();
    })
}

export async function down(Knex: Knex){
    return Knex.schema.dropTable('locations');
}