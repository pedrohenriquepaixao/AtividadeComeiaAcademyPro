import { Request, Response } from "express";
import IEmployee from "../interfaces/employee";
import EmployeeModel from "../models/EmployeeModel";

export default class EmployeeController {
  public async index(request: Request, response: Response) {
    const employeeModel = new EmployeeModel();

    const employee: any[] = await employeeModel.getAll();
    const parsedEmployee = employee.map((item: any) => ({
      id: item.id,
      name: item.name,
      matricula: item.matricula,
    }));
    response.json(parsedEmployee);
  }

  public async create(request: Request, response: Response) {
    const { name, matricula, locations } = request.body;

    const employee = {
      name,
      matricula,
    } as IEmployee;

    const employeeModel = new EmployeeModel();

    const newLocation = await employeeModel.create(employee, locations);

    response.json(newLocation);
  }
}
