import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpenOpportunities from '@salesforce/apex/OpportunityWidgetController.getOpenOpportunities';
import closeOpportunity from '@salesforce/apex/OpportunityWidgetController.closeOpportunity';
import lwcpic from '@salesforce/resourceUrl/lwcpic';
import { refreshApex } from '@salesforce/apex';

export default class OpportunityWidget extends LightningElement {
    sfimage = lwcpic;
    message=null;
    @track selectedRecordId 
    @track oppName=null;
    @track data;
    @track error;
    @track columns = [
        { label: 'Id', fieldName: 'Id', type: 'Id' },
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Amount', fieldName: 'Amount', type: 'text' },
        { label: 'Close-Won', fieldName: 'Stage', type: 'text' }
    ]

    @wire(getOpenOpportunities,{keyword:'$oppName'})
    wiredOpp({error,data}){
        if(data){
            this.data=data;
            this.error=undefined;
            // let showTable = this.template.querySelector(".showTable");
            // showTable.setAttribute("style","display:block");
            // let hideTable = this.template.querySelector(".hideTable");
            // hideTable.setAttribute("style","display:none");
        }
        else{
            this.error=error;
            this.data = undefined;
            // let showTable = this.template.querySelector(".showTable");
            // showTable.setAttribute("style","display:none");
            // let hideTable = this.template.querySelector(".hideTable");
            // hideTable.setAttribute("style","display:block");
        }
    }

    updateOpportunity(event){

        this.selectedRecordId=event.target.value;
        for (let index = 0; index < this.data.length; index++) {
            if(this.data[index].Id==event.target.value){
                this.message=this.data[index].Name;
            }
            
        } 
        closeOpportunity({
            id:this.selectedRecordId
        })
        .then(() => {
            console.log('SUCCESS');
            this.showToast();
        })
        .catch((error) => {
            this.errorMessage=error;
			console.log('unable to update the record due to'+JSON.stringify(this.errorMessage));
        });
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Toast message',
            message: 'Congratulations!! '+this.message,
            variant: 'success',
            mode: 'dismissable'
        });
        this.oppName=' ';
        this.dispatchEvent(event);
    }

    handleChange(event){
        this.oppName=event.target.value;
    }

}