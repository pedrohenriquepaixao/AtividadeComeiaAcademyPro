import Knex from 'knex';

export async function up(Knex: Knex){
    return Knex.schema.createTable('locations_employees', table => {
        table.increments('id').primary();
        table.integer('location_id')
            .notNullable()
            .references('id')
            .inTable('locations');
        table.integer('employee_id')
            .notNullable()
            .references('id')
            .inTable('employees');
        })
}

export async function down(Knex: Knex){
    return Knex.schema.dropTable('locations_employees');
}
