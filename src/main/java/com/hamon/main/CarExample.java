package com.hamon.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * Created by Leeyouje on 2020-12-08.
 */

public class CarExample {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private String name = "";
    private int wheel = 0;

    public CarExample(){
        logger.info("CarExample Constructor");
    }

    public Logger getLogger() {
        return logger;
    }

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getWheel() {
        return wheel;
    }

    public void setWheel(int wheel) {
        this.wheel = wheel;
    }

    public void carRun(){
        logger.info("Run!!");
    }
}
