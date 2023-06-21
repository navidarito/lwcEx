import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpenOpportunities from '@salesforce/apex/OpportunityWidgetController.getOpenOpportunities';
import closeOpportunity from '@salesforce/apex/OpportunityWidgetController.closeOpportunity';
import lwcpic from '@salesforce/resourceUrl/lwcpic';

export default class OpportunityWidget extends LightningElement {
    sfimage = lwcpic;
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

    handleTodoChange(event) {
        this.value = event.target.checked;        
        this.selectedRecordId=event.target.value;
        //console.log(this.selectedRecordId);
        closeOpportunity(this.selectedRecordId);
        getOpenOpportunities(this.oppName);
    }

    handleSingleCheckboxSelect(event) {
        const boxes = this.template.querySelectorAll('lightning-input[data-key="singleSelectColumnCheckbox"]');
        boxes.forEach(box => box.checked = event.target.value === box.value);
        console.log(boxes);
        
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Toast message',
            message: 'Congratulations!! '+this.selectedRecordId,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

}