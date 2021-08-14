import knex from "../database/connection";
import IItems from "../interfaces/items";
import ILocations from "../interfaces/location";

export default class LocationModel {
  public async getAll() {
    const location = await knex("locations").select();

    return location;
  }

  public async create(location: ILocations, items: IItems[]) {
    const transaction = await knex.transaction();

    //
    const locationExist = await transaction("locations")
      .select()
      .where({ name: location.name })
      .first();

    if (locationExist) {
      transaction.rollback();
      return { message: "Location já cadastrada" };
    }

    const [id] = await transaction("locations").insert(location);

    let error = 0;

    const locationItens = items.map(async (item_id: any) => {
      const validateItem = await transaction("items")
        .where({ id: item_id })
        .first();
      if (!validateItem) {
        error += 1;
        return;
      } else {
        return {
          item_id: validateItem.id,
          location_id: id,
        };
      }
    });

    if ((await Promise.all(locationItens)) && error > 0) {
      transaction.rollback();
      return { message: "Algum item enviado , não existe na base de dados" };
    }
    await transaction("locations_items").insert(
      await Promise.all(locationItens)
    );
    await transaction.commit();

    return {
      ...location,
      id,
    };
  }
}
