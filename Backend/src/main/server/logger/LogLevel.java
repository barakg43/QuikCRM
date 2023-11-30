package main.server.logger;

public enum LogLevel {
    DEBUG("DEBUG"),
    INFO("INFO"),
    ERROR("ERROR");
    private final String name;

    LogLevel(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }

}
