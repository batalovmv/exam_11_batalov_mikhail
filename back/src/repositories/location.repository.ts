import { Location } from '../entities/location.entity';
import { AppDataSource } from '../data-source';

export const locationRepository = AppDataSource.getRepository(Location);