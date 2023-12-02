package main.server;

import main.server.logger.ServerLogManager;
import main.server.sql.SqlClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicLong;

import static main.server.ServerConstants.SQL_YAML_CONFIG_LOCATION;

@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
//        testFunction();
        SpringApplication.run(ServerApplication.class, args);
    }

    private static void testFunction() {
        SqlClient sqlClient = new SqlClient(SQL_YAML_CONFIG_LOCATION, new ServerLogManager());
        sqlClient.createSqlConnection();
        int loopAmount = 50;
        Instant start, end;

        final AtomicLong closedTaskTotalTime = new AtomicLong(0), supplierTotal1 = new AtomicLong(0), supplierTotal2 = new AtomicLong(0);
        for (int i = 0; i < loopAmount; i++) {
//            new Thread(()->{
            Instant start1 = Instant.now();
            sqlClient.getSupplierNameByID(10);
            Instant end1 = Instant.now();
            supplierTotal1.addAndGet(Duration.between(start1, end1).toMillis());
//            }).start();
//            new Thread(()->{

//            }).start();
//            new Thread(()->{
            Instant start3 = Instant.now();
            sqlClient.getClosedTaskForCustomer(10);
            Instant end3 = Instant.now();
            closedTaskTotalTime.addAndGet(Duration.between(start1, end1).toMillis());
//            }).start();
        }
//        try {
//            Thread.sleep(20000);
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }

        System.out.format("avg closed: %dms ## avg supplier1: %dms avg supplier2: %dms  loop amount:%d", closedTaskTotalTime.get() / loopAmount, supplierTotal1.get() / loopAmount, supplierTotal2.get() / loopAmount, loopAmount);
//        System.out.format("customer name:%d\n",sqlClient.getClosedTaskForCustomer(10).size());

    }

    private static void printPWD() throws IOException {
        String currentPath = new java.io.File(".").getCanonicalPath();
        System.out.println("Current dir:" + currentPath);
    }
}
