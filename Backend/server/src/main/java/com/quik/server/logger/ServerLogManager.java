package com.quik.server.logger;
import com.quik.server.ServerConstants;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.config.Configurator;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;

import static com.quik.server.ServerConstants.*;
import static java.lang.System.Logger.Level.TRACE;



@RestController
@RequestMapping("/logs")
@Component("logManager")
public class ServerLogManager {
    private final Logger requestLogger;
    private final Logger sqlLogger;

    private final String requestLoggerInfoLevelFormat = "Incoming request | #%d | resource: %s | HTTP Verb %s";
    private final String requestLoggerDebugLevelFormat = "request #%d duration: %dms";

    private final String LOG_RECORD_FORMAT="%s | request #%d";
    static private long requestCounter=1L;

    public static long getRequestCounter() {
        return requestCounter;
    }

    public ServerLogManager() {
        requestLogger = LogManager.getLogger(REQUEST_LOGGER_NAME);
        sqlLogger = LogManager.getLogger(SQL_CLIENT_LOGGER_NAME);

    }

    public void incrementRequestCounter() {
        ++requestCounter;
    }


    public void addLogRecordToRequestLoggerInfoLevel(String resourceName, HttpMethod method){
        String record=String.format(requestLoggerInfoLevelFormat,requestCounter,resourceName,method);
        requestLogger.info(getFormattedLogRecord(record));


    }

    public void addLogRecordToRequestLoggerDebugLevel(Duration durationTime){
        String record=String.format(requestLoggerDebugLevelFormat,requestCounter,durationTime.toMillis());
        requestLogger.debug(getFormattedLogRecord(record));
    }
    private String getFormattedLogRecord(String logMassage){

        return String.format(LOG_RECORD_FORMAT,logMassage,requestCounter);
    }

    public void addLogRecordToTodoLogger(LogLevel logLevel,String logMassage){
        sqlLogger.log(Level.getLevel(logLevel.toString()),getFormattedLogRecord(logMassage));
    }

    @GetMapping("/level")
    public ResponseEntity<String> getLogsLevel(@RequestParam("logger-name") String loggerName){
        Instant startTime=Instant.now();
        String response;
        HttpStatus statusCode=HttpStatus.OK;
        addLogRecordToRequestLoggerInfoLevel("/logs/level",HttpMethod.GET);
        if(loggerName.equals(REQUEST_LOGGER_NAME)) {
            response = requestLogger.getLevel().toString();
        }
        else if(loggerName.equals(SQL_CLIENT_LOGGER_NAME)){
            response = sqlLogger.getLevel().toString();
        }
        else{
            response="Error: logger not exist!";
            statusCode=HttpStatus.CONFLICT;
        }
        addLogRecordToRequestLoggerDebugLevel(Duration.between(startTime,Instant.now()));
        incrementRequestCounter();
        return ResponseEntity
                .status(statusCode)
                .body(response);
    }
    @PutMapping("/level")
    public ResponseEntity<String> setLogsLevel(@RequestParam("logger-name") String loggerName,
                                               @RequestParam("logger-level") String loggerLevel){
        Instant startTime=Instant.now();
        String response="";
        HttpStatus statusCode=HttpStatus.OK;
        try{
            LogLevel logLevel=LogLevel.valueOf(loggerLevel);
            addLogRecordToRequestLoggerInfoLevel("/logs/level",HttpMethod.PUT);
            response=loggerLevel;
            if(loggerName.equals(REQUEST_LOGGER_NAME)) {
                Configurator.setLevel(requestLogger.getName(), Level.getLevel(logLevel.name()));
            }
            else if(loggerName.equals(SQL_CLIENT_LOGGER_NAME)){
                Configurator.setLevel(sqlLogger.getName(), Level.getLevel(logLevel.name()));
            }
            else{
                response="Error: logger not exist!";
                statusCode=HttpStatus.CONFLICT;
            }

            addLogRecordToRequestLoggerDebugLevel(Duration.between(startTime,Instant.now()));
            incrementRequestCounter();
        }catch (IllegalArgumentException|NullPointerException  e){
            response="Error: logger level doesn't exist!";
            statusCode=HttpStatus.BAD_REQUEST;
        }

        return ResponseEntity
                .status(statusCode)
                .body(response);

    }
}
