import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getOpenOpportunities from '@salesforce/apex/OpportunityWidgetController.getOpenOpportunities';
import sfpic from '@salesforce/resourceUrl/sfpic';


export default class OpportunityWidget extends LightningElement {
    sfimage = sfpic;
    @track selectedRecordId = [];
    @track data;
    @track columns = [
        { label: 'Id', fieldName: 'Id', type: 'Id' },
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

    handleSingleCheckboxSelect(event) {
        const boxes = this.template.querySelectorAll('lightning-input[data-key="singleSelectColumnCheckbox"]');

        boxes.forEach(box =>{
            if(box.type =='checkbox' && box.checked){
                
                this.selectedRecordId(box.value);
                
            }

            
        });

        if(this.selectedRecordId!=null){
            console.log(this.selectedRecordId);
            try {
                this.showToast();
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'Toast message',
            message: 'Congratulations!! '+this.selectedRecordId,
            variant: 'success',
            mode: 'dismissable'
        });
        console.log(this.sfimage);
        this.dispatchEvent(event);
    }
}