import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(lat: number, lon: number){
    const weatherAPIKey = process.env.OPENWEATHERMAP_API
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${weatherAPIKey}`;

    const response = await firstValueFrom (this.httpService.get(url))
    return response.data
  }
}
