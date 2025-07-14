package com.example.apigat;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity serverHttpSecurity) {
        // Configuration temporaire pour les tests - Désactive la sécurité
        return serverHttpSecurity.csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange.anyExchange().permitAll())
                .build();
        
        // Configuration avec OAuth2 (à réactiver plus tard)
        // return serverHttpSecurity.csrf(ServerHttpSecurity.CsrfSpec::disable)
        //         .authorizeExchange(exchange -> exchange.pathMatchers("/eureka/**")
        //                 .permitAll()
        //                 .anyExchange().authenticated()
        //         ).oauth2ResourceServer((oauth) -> oauth
        //                 .jwt(Customizer.withDefaults()))
        //         .build();
    }
} 