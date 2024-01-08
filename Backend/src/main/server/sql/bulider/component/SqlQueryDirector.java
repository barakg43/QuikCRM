package main.server.sql.bulider;

import java.util.Optional;
import java.util.function.Supplier;

public class SqlQueryDirector {
    private final Supplier<String> queryBuilder;

    public SqlQueryDirector(Supplier<String> queryBuilder) {
        this.queryBuilder = queryBuilder;
    }

    public String build(){
        return queryBuilder != null ? queryBuilder.get() : "";

    }
}
