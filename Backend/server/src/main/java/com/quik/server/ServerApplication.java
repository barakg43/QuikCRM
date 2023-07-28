package com.quik.server;

import com.quik.server.sql.SqlClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.SQLException;

@SpringBootApplication()
public class ServerApplication {
    public static void main(String[] args) {

            SqlClient sqlClient=new SqlClient("server\\src\\main\\resources\\config\\sql-config.yaml");
            sqlClient.createSqlConnection();

        //   SqlConfiguration sql=new SqlConfiguration("SQL-CRM\\quikcrm",1433,"dbLitosComputers","sa","Sa-752");

//        try {
//            ObjectMapper om = new ObjectMapper(new YAMLFactory());
//
//
////            DumperOptions options=new DumperOptions();
////            options.setIndent(2);
////            options.setPrettyFlow(true);
////            options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
////            Representer representer=new Representer(options);
////            representer.addClassTag(SqlConfiguration.class, Tag.MAP);
//////            Yaml yaml=new Yaml(new Constructor(SqlConfiguration.class),representer,options);
////            Yaml yaml=new Yaml(representer,options);
//            PrintWriter writer=new PrintWriter(new File("server/src/main/resources/config/sql-config3.yaml"));
//            om.writeValue(writer,sql);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//      SqlClient sqlClient=new SqlClient("server/src/main/resources/config/sql-config.yaml");

        SpringApplication.run(ServerApplication.class, args);
    }
    private static void printPWD() throws IOException{
        String currentPath = new java.io.File(".").getCanonicalPath();
        System.out.println("Current dir:" + currentPath);
    }
}
