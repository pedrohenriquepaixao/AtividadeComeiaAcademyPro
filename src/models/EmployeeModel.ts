import knex from "../database/connection";
import IEmployee from "../interfaces/employee";
import ILocations from "../interfaces/location";

export default class LocationModel {
  public async getAll() {
    const location = await knex("employees").select();

    return location;
  }

  public async create(employee: IEmployee, locations: ILocations[]) {
    const transaction = await knex.transaction();

    const employeeExist = await transaction("employees")
      .select()
      .where({ name: employee.name })
      .first();

    if (employeeExist) {
      transaction.rollback();
      return { message: "Empregado já cadastrado" };
    }

    const [id] = await transaction("employees").insert(employee);

    let error = 0;

    const locationEmployee = locations.map(async (location_id: any) => {
      const validateLocations = await transaction("locations")
        .where({ id: location_id })
        .first();
      if (!validateLocations) {
        error += 1;
        return;
      } else {
        return {
          employee_id: validateLocations.id,
          location_id: id,
        };
      }
    });

    if ((await Promise.all(locationEmployee)) && error > 0) {
      transaction.rollback();
      return { message: "Algum item enviado , não existe na base de dados" };
    }

    await transaction("locations_employees").insert(
      await Promise.all(locationEmployee)
    );
    await transaction.commit();

    return {
      ...locations,
      id,
    };
  }
}
