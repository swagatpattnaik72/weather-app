package com.weatherapp.controller;

import com.weatherapp.service.WeatherApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherRecordController {

    @Autowired
    private WeatherApiService weatherApiService;

    @GetMapping("/current/{location}")
    public String getCurrentWeather(@PathVariable String location) {
        return weatherApiService.getCurrentWeather(location);
    }
}
