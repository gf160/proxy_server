package com.hamon.main;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MainConfiguration {

    @Bean
    public CarExample CarExample(){
        System.out.println("CONFIGURATION car");
        CarExample car = new CarExample();
        car.setName("K5");
        car.setWheel(4);
        return car;
    }
}
