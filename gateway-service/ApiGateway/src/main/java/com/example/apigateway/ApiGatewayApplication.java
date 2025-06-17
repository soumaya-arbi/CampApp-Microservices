package com.example.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
@EnableDiscoveryClient
@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
    @Bean
public RouteLocator gateawayRoutes(RouteLocatorBuilder builder){
        return builder.routes().
                route("condidat",r->r.path("/candidats/**").uri("lb://Candidat2AL4")).
                route("job",r->r.path("/jobs/**").uri("lb://JobALT4"))
                .build();
}
}
