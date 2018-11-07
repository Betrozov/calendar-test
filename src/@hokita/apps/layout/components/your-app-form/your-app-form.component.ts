import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MatColors } from '@fuse/mat-colors';

import { SampleModel } from '@hokita/model/sample.model';

@Component({
    selector     : 'your-app-form-dialog',
    templateUrl  : './your-app-form.component.html',
    styleUrls    : ['./your-app-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class YourAppFormDialogComponent
{
    action: string;
    formData: SampleModel;
    sampleForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<KidAbsenceFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<YourAppFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        this.formData = _data.formData;
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'edit'; // this.absence.title;
        }
        else
        {
            this.dialogTitle = 'new';
            this.formData = new SampleModel(/*{
                attr1: _data.attr1,
                attr2  : _data.attr2
            }*/);
        }

        this.sampleForm = this.createForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the form
     *
     * @returns {FormGroup}
     */
    createForm(): FormGroup
    {
        return new FormGroup({
            //title : new FormControl(this.absence.title),
            attr1 : new FormControl(this.formData.attr1),
            attr2   : new FormControl(this.formData.attr2),
        });
    }
}
