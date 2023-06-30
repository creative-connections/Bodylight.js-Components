import localforage from "localforage";
import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';

@inject(I18N)
export class Language {
    showdialog = false;
    lang='';    

    constructor(i18n) {
        this.i18n = i18n;
    }

    async bind(){
        //check if lang is set if not showdialog
        try {
            const value = await localforage.getItem('bdl-lang');
            console.log(value);
            this.lang = value;
            if (!this.lang) 
            {
                this.selecten();
                this.showdialog = true;
            }
            else {
                this.i18n.setLocale(this.lang);
                this.i18n.updateTranslations(window.document);
            }
        } catch (err) {
            console.log(err);
        }
    }

    attached(){

    }

    switchlanguage(){
        this.showdialog=true;
        
    }

    selecten(){
        this.i18n.setLocale('en');
        this.i18n.updateTranslations(window.document);
        this.lang = 'en';
        localforage.setItem('bdl-lang',this.lang);
        this.closelanguage();        
    }

    selectcz(){
        this.i18n.setLocale('cs');
        this.i18n.updateTranslations(window.document);
        this.lang = 'cs';
        localforage.setItem('bdl-lang',this.lang);
        this.closelanguage();
    }

    closelanguage(){
        this.showdialog=false;
    }
}