//package com.familytree.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
//                .anyRequest().authenticated()
//        );
//        http.csrf(csrf -> csrf.ignoringRequestMatchers(new AntPathRequestMatcher("/h2-console/**")));
//        http.headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));
//        http.httpBasic(withDefaults());
//        return http.build();
//    }
//}