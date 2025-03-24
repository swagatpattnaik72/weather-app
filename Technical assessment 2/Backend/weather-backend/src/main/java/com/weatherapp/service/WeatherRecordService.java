package com.weatherapp.service;

import com.weatherapp.model.WeatherRecord;
import com.weatherapp.repository.WeatherRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WeatherRecordService {

    @Autowired
    private WeatherRecordRepository repository;

    public List<WeatherRecord> getAll() {
        return repository.findAll();
    }

    public Optional<WeatherRecord> getById(Long id) {
        return repository.findById(id);
    }

    public WeatherRecord create(WeatherRecord record) {
        return repository.save(record);
    }

    public WeatherRecord update(Long id, WeatherRecord updatedRecord) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setLocation(updatedRecord.getLocation());
                    existing.setLatitude(updatedRecord.getLatitude());
                    existing.setLongitude(updatedRecord.getLongitude());
                    existing.setStartDate(updatedRecord.getStartDate());
                    existing.setEndDate(updatedRecord.getEndDate());
                    existing.setWeatherDescription(updatedRecord.getWeatherDescription());
                    existing.setTemperature(updatedRecord.getTemperature());
                    return repository.save(existing);
                }).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
