import knex from "../database/connection";
import IEmployee from "../interfaces/employee";

export default class LocationModel {
  public async getAll() {
    const location = await knex("employees").select();

    return location;
  }

  public async create(employee: IEmployee, locations: number[]) {
    const transaction = await knex.transaction();

    const employeeExist = await transaction("employees")
      .select()
      .where({ name: employee.matricula })
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
      ...employee,
      id,
    };
  }

  public async getById(id: string){
    const employee = await knex('employees')
                            .select()
                            .where({id: id})
                            .first();
    if(!employee){
      return { message: 'Employee não encontrado'}
    }
    
    const locations = await knex('locations_employees as le')
      .join("locations as l","le.location_id",'=',"l.id")
      .where("le.employee_id",id)
      .groupBy('l.id')
      .select();

    return {
      ...employee,
      locations
    };
  }
}
