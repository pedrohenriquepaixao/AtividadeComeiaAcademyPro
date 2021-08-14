import Knex from "knex";

export async function seed(Knex: Knex) {
    await Knex('items').insert([
        {name: 'Papéis',image: 'papel.png'},
        {name: 'Vidros',image: 'vidro.png'},
        {name: 'Óleos de cozinha',image: 'oleo.png'},
        {name: 'Bacterias',image: 'bateria.png'},
        {name: 'Orgânicos',image: 'organico.png'},
    ])
}