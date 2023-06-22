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

    @AuraEnabled
    public static List<Opportunity> closeOpportunity(String id){
       	
        System.debug('@@@@OpportunityId@@@'+id);
        if(id != null){
            
            Opportunity opp  = [select StageName, Id, Name from Opportunity where Id = :id ];
            opp.StageName='Closed Won';
            
            
            
            try{
           		update opp;
            }
            catch (Exception e) {
               System.debug('unable to update the record due to'+e.getMessage());
            }
            
        }
        return getOpenOpportunities('');
    }

  

}