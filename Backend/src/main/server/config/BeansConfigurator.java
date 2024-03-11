package main.server.config;

import main.server.sql.function.SqlFunctionExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeansConfigurator {
	@Bean
	SqlFunctionExecutor sqlFunctionExecutor() {
//        System.out.println("sqlFunctionExecutor bean");
		return new SqlFunctionExecutor();
	}
}
