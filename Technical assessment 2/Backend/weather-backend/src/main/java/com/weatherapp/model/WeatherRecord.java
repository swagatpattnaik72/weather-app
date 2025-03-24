package com.weatherapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class WeatherRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
    private Double latitude;
    private Double longitude;

    private LocalDate startDate;
    private LocalDate endDate;

    @Column(length = 1000)
    private String weatherDescription;

    private Double temperature;
}
