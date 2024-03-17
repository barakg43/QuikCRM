package main.server.http.controlles;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class GlobalEndpointsController {
	private final String healthResponse = String.format("{\"boot-time\":\"%s\"}",
			LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm:ss")));

	@RequestMapping(value = "/{path:[^\\.]*}")
	public String forward(@PathVariable String path) {
		return getSpaApplication();
	}

	@GetMapping("/")
	public String getSpaApplication() {
		return "forward:/index.html";
	}

	@GetMapping("api/health")
	public ResponseEntity<String> getServerHealth() {
		return new ResponseEntity<>(healthResponse, null, 200);
	}

	@GetMapping("/get-pwd")
	public String getTest() {
		System.out.println("test!");
		return printPWD();
	}

	private String printPWD() {
		String currentPath = null;
		try {
			currentPath = new java.io.File(".").getCanonicalPath();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return "Current dir:" + currentPath;
	}

}