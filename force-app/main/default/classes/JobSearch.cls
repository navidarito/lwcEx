public with sharing class JobSearch {
    
    public static List<Job__c> performSearch(String keyWord) {
        String searchWord = '%'+keyWord+'%';
        return [SELECT Name FROM Job__c WHERE Name like : searchWord];
    }
    
    public static List<List<sObject>> searchWithLuck(String keyWord) {
        return [FIND : keyWord IN ALL FIELDS RETURNING Job__c];
    }

}