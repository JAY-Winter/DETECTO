package com.example.detecto;


import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Security;


@SpringBootApplication
public class DetectoApplication {

	public static void main(String[] args) {
		Security.addProvider(new BouncyCastleProvider());
		SpringApplication.run(DetectoApplication.class, args);
	}

//	@Bean
//	Hibernate5Module hibernate5Module(){
//		return new Hibernate5Module();
//	}
}
