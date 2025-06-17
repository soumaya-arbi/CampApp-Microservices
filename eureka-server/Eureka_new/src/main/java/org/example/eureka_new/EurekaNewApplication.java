package org.example.eureka_new;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class EurekaNewApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaNewApplication.class, args);
    }

}
