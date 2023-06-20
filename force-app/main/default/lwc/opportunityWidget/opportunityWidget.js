import { LightningElement, track, wire } from 'lwc';
import getOpenOpportunities from '@salesforce/apex/OpportunityWidgetController.getOpenOpportunities';

export default class OpportunityWidget extends LightningElement {
    @track data;
    @track columns = [
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Amount', fieldName: 'Amount', type: 'text' },
        { label: 'Close-Won', fieldName: 'Stage', type: 'text' }
    ]

    @wire (getOpenOpportunities) oppRecords ({error,data}){
        if(data){
            this.data=data;
        }
        else if(error){
            this.data = undefined;
        }
    }
}