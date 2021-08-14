import { Request, Response } from 'express';
import ILocation from '../interfaces/location';
import LocationModel from '../models/LocationModel';


export default class LocationController{
    public async index(request: Request, response: Response){

        const locationModel = new LocationModel();

        const location: any[] = await locationModel.getAll();
        const parsedLocaiton = location.map((item: any)=> ({
            id: item.id,
            name: item.name,
            image: `http://127.0.0.1:3333/items/upload/${item.image}`
        }));
        response.json(location);
    }

    public async create(request: Request, response: Response){

        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            image,
            items
        } = request.body;

        const location = {
            name,
            email,
            whatsapp,
            city,
            uf,
            image: 'default.png',
        } as ILocation;

        const locationModel = new LocationModel();

        const newLocation = await locationModel.create(location, items);

        response.json(newLocation);

    }
}