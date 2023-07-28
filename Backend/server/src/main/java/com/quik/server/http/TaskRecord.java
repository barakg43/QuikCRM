package com.quik.server.http;

import java.sql.Date;

public class TaskRecord {
   private int TaskID;
    private int CustomerID;

    public TaskRecord(int taskID, int customerID, String taskShortDescription, Date dateOfTaskOpen, int performanceStatusID, Date dateOfTaskClose, String taskOpenRemarks, String performancesStatus, boolean checked) {
        TaskID = taskID;
        CustomerID = customerID;
        TaskShortDescription = taskShortDescription;
        DateOfTaskOpen = dateOfTaskOpen;
        PerformanceStatusID = performanceStatusID;
        DateOfTaskClose = dateOfTaskClose;
        TaskOpenRemarks = taskOpenRemarks;
        PerformancesStatus = performancesStatus;
        Checked = checked;
    }

    private String TaskShortDescription;
    private Date DateOfTaskOpen;
    private int PerformanceStatusID;
    private Date DateOfTaskClose;
    private String TaskOpenRemarks;
    private String PerformancesStatus;
    private boolean Checked;

    public int getTaskID() {
        return TaskID;
    }

    public void setTaskID(int taskID) {
        TaskID = taskID;
    }

    public int getCustomerID() {
        return CustomerID;
    }

    public void setCustomerID(int customerID) {
        CustomerID = customerID;
    }

    public String getTaskShortDescription() {
        return TaskShortDescription;
    }

    public void setTaskShortDescription(String taskShortDescription) {
        TaskShortDescription = taskShortDescription;
    }

    public Date getDateOfTaskOpen() {
        return DateOfTaskOpen;
    }

    public void setDateOfTaskOpen(Date dateOfTaskOpen) {
        DateOfTaskOpen = dateOfTaskOpen;
    }

    public int getPerformanceStatusID() {
        return PerformanceStatusID;
    }

    public void setPerformanceStatusID(int performanceStatusID) {
        PerformanceStatusID = performanceStatusID;
    }

    public Date getDateOfTaskClose() {
        return DateOfTaskClose;
    }

    public void setDateOfTaskClose(Date dateOfTaskClose) {
        DateOfTaskClose = dateOfTaskClose;
    }

    public String getTaskOpenRemarks() {
        return TaskOpenRemarks;
    }

    public void setTaskOpenRemarks(String taskOpenRemarks) {
        TaskOpenRemarks = taskOpenRemarks;
    }

    public String getPerformancesStatus() {
        return PerformancesStatus;
    }

    public void setPerformancesStatus(String performancesStatus) {
        PerformancesStatus = performancesStatus;
    }

    public boolean isChecked() {
        return Checked;
    }

    public void setChecked(boolean checked) {
        Checked = checked;
    }
}
