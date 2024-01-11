package main.server;

import main.server.sql.bulider.SqlQueryBuilder;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;

@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer {
	public static void main(String[] args) {
//        testFunction();
		testSqlBuilder();
//        SpringApplication.run(ServerApplication.class, args);
	}

	private static void testSqlBuilder() {
		SqlQueryBuilder sqlQueryBuilder = new SqlQueryBuilder();
		String query1 = sqlQueryBuilder.from("tb1")
				.select("1", "2", "5", "4")
				.where().greaterThan("id", 1)
				.having().equal("customerName", "moshe1")
				.orderBy(new String[]{"t1", "te"})
				.limit(5)
				.build();
		System.out.println(query1);
	}

	private static void testFunction() {

//        SqlClient sqlClient = new SqlClient(SQL_YAML_CONFIG_LOCATION, new ServerLogManager());
//        sqlClient.createSqlConnection();
		int loopAmount = 50;
		Instant start, end;

		final AtomicLong closedTaskTotalTime = new AtomicLong(0), supplierTotal1 = new AtomicLong(0), supplierTotal2 =
				new AtomicLong(0);
		for (int i = 0; i < loopAmount; i++) {
//            new Thread(()->{
			Instant start1 = Instant.now();
//            sqlClient.getSupplierNameByID(10);
			Instant end1 = Instant.now();
			supplierTotal1.addAndGet(Duration.between(start1, end1).toMillis());
//            }).start();
//            new Thread(()->{

//            }).start();
//            new Thread(()->{
			Instant start3 = Instant.now();
//            sqlClient.getClosedTaskForCustomer(10);
			Instant end3 = Instant.now();
			closedTaskTotalTime.addAndGet(Duration.between(start1, end1).toMillis());
//            }).start();
		}
//        try {
//            Thread.sleep(20000);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }

		System.out.format("avg closed: %dms ## avg supplier1: %dms avg supplier2: %dms  loop amount:%d",
				closedTaskTotalTime.get() / loopAmount, supplierTotal1.get() / loopAmount,
				supplierTotal2.get() / loopAmount, loopAmount);
//        System.out.format("customer name:%d\n",sqlClient.getClosedTaskForCustomer(10).size());

	}

	private static void printPWD() throws IOException {
		String currentPath = new java.io.File(".").getCanonicalPath();
		System.out.println("Current dir:" + currentPath);
	}
}
