import { User } from '../../models/user.model';
import { NgModel } from '@angular/forms/src/directives';
import * as console from 'console';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component,Inject, OnInit } from '@angular/core';
@Component({
    selector: 'confirm-dialog',
    templateUrl: './changeProfilePictureDialog.component.html',
    styles: [`
    label > input{ /* HIDE RADIO */
        visibility: hidden; /* Makes input not-clickable */
        position: absolute; /* Remove input from document flow */
    }
    label > input + img{ /* IMAGE STYLES */
        cursor:pointer;
        border:2px solid transparent;
    }
    label > input:checked + img{ /* (RADIO CHECKED) IMAGE STYLES */
        border:2px solid #f00;
    }
    .picOption{
        margin: 1.66%;
        font-size: 150px;
        max-height: 150px;
        max-width: 150px; 
        font-family: 'Material Icons';           
    }
    #optionTable{
        text-align: center;
    }
    #chosenPic{
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 11px;
        font-size: 150px;
        max-height: 150px;
        max-width: 150px; 
        font-family: 'Material Icons';   
    }
    .img-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        text-align: center;
    }
    #dialogH1{
        text-align: center;
        margin-top: auto;
    }
    `]
})
export class ChangeProfilePictureDialogComponent {

    public title: string;
    public message: string;
    public profPic: string;
    array = [
        {src : "./assets/profilePic/dropouts_dream.jpg"},
        {src : "./assets/profilePic/ecrypted_dreams.jpg"},
        {src : "./assets/profilePic/nUTT.jpg"},
        {src : "./assets/profilePic/software_dreams.jpg"},
        {src : "./assets/profilePic/wake_me_up.jpg"},
        {src : " "}
    ];
    constructor(@Inject(MD_DIALOG_DATA) private data: { user: User },
    public dialogRef: MdDialogRef<ChangeProfilePictureDialogComponent>) {
        this.profPic = this.data.user.profilePic;
    }
    OnInit(){}
    switch(x){
        this.profPic = x;
    }
    onSubmit(){
        this.dialogRef.close(this.profPic);
    }
}