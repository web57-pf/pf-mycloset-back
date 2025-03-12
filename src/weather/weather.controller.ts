import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ApiOperation } from '@nestjs/swagger';


@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @ApiOperation({
    summary: 'Devuelve caracteristicas del tiempo segun la latitud y longitud'
  })
  @Get()
  getWeather(@Query('lat') lat: number, @Query('lon') lon: number) {
    return this.weatherService.getWeather(lat, lon);
  }
}
