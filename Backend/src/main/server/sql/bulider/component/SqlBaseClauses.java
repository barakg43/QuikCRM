package main.server.sql.bulider.component;

public class SqlBaseClauses {
   private enum ClauseType{QUERY, NON_QUERY}
    private ClauseType currentClause=null;
    private String baseClause=null;

    public void select(String... columnNames) {
        baseDuplicateValidation();
        baseClause = "SELECT";
        currentClause=ClauseType.QUERY;
    }
    public void insert(){
        baseDuplicateValidation();
        baseClause = "INSERT";
        currentClause=ClauseType.NON_QUERY;
    }
    public void update(){
        baseDuplicateValidation();
        baseClause = "UPDATE";
        currentClause=ClauseType.NON_QUERY;
    }
    public void delete(){
        baseDuplicateValidation();
        baseClause = "DELETE";
        currentClause=ClauseType.NON_QUERY;
    }

    public String formattedBaseStatementFormat(){
        String
        switch (currentClause){
            case QUERY -> {
                return "";
            }
            case NON_QUERY -> {
                return "1";
            }
            default -> throw new RuntimeException("there are not selection for query clause");
        }
    }
    private  void baseDuplicateValidation(){
        if(currentClause!=null)
            throw new RuntimeException("Cant select 2 clause for same query");
    }
}
