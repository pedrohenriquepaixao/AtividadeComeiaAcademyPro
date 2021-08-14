import Knex from 'knex';

export async function up(Knex: Knex){
    return Knex.schema.createTable('employees', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('matricula').notNullable();
    })
}

export async function down(Knex: Knex){
    return Knex.schema.dropTable('employees');
}
