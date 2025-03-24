package com.weatherapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class WeatherApiService {

    private final String API_KEY = "934d3a5f74268d6c4fd2bec41c6c2608"; // Replace with your OpenWeatherMap API Key

    @Autowired
    private RestTemplate restTemplate;

    public String getCurrentWeather(String location) {
        String url = "http://api.openweathermap.org/data/2.5/weather?q=" + location +
                "&appid=" + API_KEY + "&units=metric";

        try {
            String response = restTemplate.getForObject(url, String.class);

            // Parse JSON response
            JSONObject json = new JSONObject(response);
            String weatherDescription = json.getJSONArray("weather").getJSONObject(0).getString("description");
            double temperature = json.getJSONObject("main").getDouble("temp");

            return "Weather in " + location + ": " + weatherDescription + ", Temp: " + temperature + "°C";

        } catch (Exception e) {
            return "Error fetching weather data for " + location + ": " + e.getMessage();
        }
    }
}
