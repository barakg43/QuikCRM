package main.server.http;

import main.server.logger.ServerLogManager;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.function.Supplier;

@Service
public class HttpRequestExecutor {

	final private ServerLogManager logManager;

	public HttpRequestExecutor(ServerLogManager logManager) {
		this.logManager = logManager;
	}

	public void executeHttpRequest(Runnable requestRunner, String resourceName, HttpMethod httpMethod) {
		logManager.addLogRecordToRequestLoggerInfoLevel(resourceName, httpMethod);
		Instant startTime = Instant.now();
		requestRunner.run();
		Instant endTime = Instant.now();

	}

	public <T> T executeHttpRequest(Supplier<T> requestSupplier, String resourceName, HttpMethod httpMethod) {
		logManager.addLogRecordToRequestLoggerInfoLevel(resourceName, httpMethod);
		Instant startTime = Instant.now();
		T result = requestSupplier.get();
		Instant endTime = Instant.now();
		return result;
	}
}
