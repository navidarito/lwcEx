public with sharing class OpportunityWidgetController {
    public OpportunityWidgetController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpenOpportunities(String keyword){

            String searchWord='%'+keyword+'%';
            List<Opportunity> opp = new List<Opportunity>();
            if(keyword!=null && !String.isBlank(keyword)){
                if(Opportunity.SObjectType.getDescribe().isAccessible()) {
                    opp =  [select Id, Name, Amount, StageName from Opportunity where StageName!='Closed Won' AND Name LIKE : searchWord];
                }
            }else {
                if(Opportunity.SObjectType.getDescribe().isAccessible()) {
                    
                    opp =  [select Id, Name, Amount, StageName from Opportunity where StageName!='Closed Won'];
                }
            }
            return opp;
            
    
    }

    @AuraEnabled(cacheable=true)
    public static void closeOpportunity(String id){

        List<Opportunity> opp = new List<Opportunity>();
        if(id != null){
            opp = [select Id, StageName from Opportunity where Id = :id ];
            for(Opportunity oppItem : opp) {
                oppItem.StageName='Closed Won';
            }
            
            update opp;
        }
    }

}