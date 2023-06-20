public with sharing class OpportunityWidgetController {
    public OpportunityWidgetController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpenOpportunities(){

            List<Opportunity> opp = new List<Opportunity>();
            if(Opportunity.SObjectType.getDescribe().isAccessible()) {
            opp =  [select Id, Name, Amount, StageName from Opportunity where StageName!='Closed Won'];
            }
            return opp;
            
    
    }
}