package com.hamon;

import com.hamon.main.CarExample;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Created by Leeyouje on 2020-12-08.
 */
@Component
@Order(1)
public class TestRunner implements ApplicationRunner {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    CarExample car;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        logger.info("name : " + car.getName() + " /// wheel: " + car.getWheel());
    }
}
