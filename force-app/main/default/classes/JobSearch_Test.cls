@isTest
public class JobSearch_Test {
    
	@testSetup
    static void makeData() {

        List<Job__c> jobs = new List<Job__c>();
        List<String> jobNames =  new List<String>{'Frontend-Developer','Backend-Developer','FullStack-Developer','Salesforce-Developer','React-Developer',
                'Software-Engineer','Salesforce-Administrator','Junior-Software-Engineer','Mid-Software-Engineer','Senior-Software-Engineer'};
        String jobDescription = 'A top-notch professional is needed';
        for(Integer count=0 ;count <10;count++){
                Job__c job = new Job__c();
                job.Name = jobNames[count];
                job.Job_Description__c = jobDescription;
                jobs.add(job);
        }        
        insert jobs;

        User u2 = [SELECT Id FROM User WHERE Profile.Name='Custom Standard User' limit 1];
        System.runAs(u2) {
            List<Job__c> jobs2 = new List<Job__c>();
            List<String> jobNames2 =  new List<String>{'Senior-Frontend-Developer','Senior-Backend-Developer','Senior-Software-Engineer','Salesforce-Architect','Senior-Salesforce-Administrator'};
            String jobDescription2 = 'A top-notch professional is needed';
            for(Integer count=0 ;count <5;count++){
                Job__c job = new Job__c();
                job.Name = jobNames2[count];
                job.Job_Description__c = jobDescription2;
                jobs2.add(job);
            }        
            insert jobs2;
        }      
        
    }
    
    static void fixedSearch(){
        
        List<Job__c> jobList = new List<Job__c>();
        jobList = [SELECT Id FROM Job__c];
        Id [] fixedSearchResults= new Id[jobList.size()];
        for(Integer count=0 ;count <jobList.size();count++){
            fixedSearchResults[count] = jobList[count].Id;
        }
     
        test.setFixedSearchResults(fixedSearchResults);  
    }
    
    @isTest 
    static void performSearch_Test() {
        
        List<Job__c> jobList = new List<Job__c>();
        
        test.startTest();
        
        jobList = JobSearch.performSearch('developer');
        
        test.stopTest();  

        System.assertEquals( jobList.size(), 7);
    }
    
    @isTest 
    static void performSearch_RestrictedUser_Test() {
        
        User u = [SELECT Id,Name FROM User WHERE Profile.Name='Custom Standard User' limit 1];
       
        System.runAs(u) {
            List<Job__c> jobList = new List<Job__c>();
            test.startTest();
            
            jobList = JobSearch.performSearch('developer');
            
            test.stopTest();  
            
            System.assertEquals( jobList.size(), 2);
        }
        
        
    }
    
    @isTest 
    static void searchWithLuck_Test() {
        List<List<sObject>> searchList = new List<List<sObject>>();
        fixedSearch();
        
        test.startTest();
        
        searchList = JobSearch.searchWithLuck('top-notch');
        
        test.stopTest();  

        System.assertEquals( searchList[0].size(), 15);
    }
    
    @isTest 
    static void searchWithLuck_RestrictedUser_Test() {
        
        User u = [SELECT Id,Name FROM User WHERE Profile.Name='Custom Standard User' limit 1];
 
        System.runAs(u) {
            List<List<sObject>> searchList = new List<List<sObject>>();
            fixedSearch();
            
            test.startTest();
            
            searchList = JobSearch.searchWithLuck('top-notch');
            
            test.stopTest();  

            System.assertEquals( searchList[0].size(), 5);
        }
    }
    
    
}