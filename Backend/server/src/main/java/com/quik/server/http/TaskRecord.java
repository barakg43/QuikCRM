package com.quik.server.http;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.sql.Date;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class TaskRecord {
    private int taskID;
    private int customerID;
    private String taskShortDescription;
    private Date dateOfTaskOpen;
    private int performanceStatusID;
    private Date dateOfTaskClose;
    private String taskOpenRemarks;
    private String performancesStatus;
    private boolean checked;

    public TaskRecord() {
    }

    public TaskRecord(int taskID, int customerID, String taskShortDescription, Date dateOfTaskOpen, int performanceStatusID, Date dateOfTaskClose, String taskOpenRemarks, String performancesStatus, boolean checked) {
        this.taskID = taskID;
        this.customerID = customerID;
        this.taskShortDescription = taskShortDescription;
        this.dateOfTaskOpen = dateOfTaskOpen;
        this.performanceStatusID = performanceStatusID;
        this.dateOfTaskClose = dateOfTaskClose;
        this.taskOpenRemarks = taskOpenRemarks;
        this.performancesStatus = performancesStatus;
        this.checked = checked;
    }


    public void setTaskID(int taskID) {
        this.taskID = taskID;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }

    public void setTaskShortDescription(String taskShortDescription) {
        this.taskShortDescription = taskShortDescription;
    }

    public void setDateOfTaskOpen(Date dateOfTaskOpen) {
        this.dateOfTaskOpen = dateOfTaskOpen;
    }

    public void setPerformanceStatusID(int performanceStatusID) {
        this.performanceStatusID = performanceStatusID;
    }

    public void setDateOfTaskClose(Date dateOfTaskClose) {
        this.dateOfTaskClose = dateOfTaskClose;
    }

    public void setTaskOpenRemarks(String taskOpenRemarks) {
        this.taskOpenRemarks = taskOpenRemarks;
    }

    public void setPerformancesStatus(String performancesStatus) {
        this.performancesStatus = performancesStatus;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
