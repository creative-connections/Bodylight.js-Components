export class QuizSchema3 {
    @bindable title1;
    @bindable title2;
    @bindable title3;
    cell1='';cell2='';cell3='';
    currentCell=1;
    show1=true;show2=true;show3=true;
    constructor() {

    }
    setCurrentCell(content){
        if (this.currentCell==1) this.cell1 = content;
        else if (this.currentCell==2) this.cell2 = content;
        else this.cell3=content;
        if (this.currentCell<3) this.currentCell++;
    }

    unsetlast() {
        if (this.currentCell==3) {this.show3=true;this.cell3='';}
        else if (this.currentCell==2) {this.show2=true;this.cell2='';}
        else if (this.currentCell==1) {this.show1=true;this.cell1='';}
        if (this.currentCell>1) this.currentCell--;
    }

    settitle1(){ if (this.show1) setCurrentCell(this.title1); this.show1=false;}
    settitle2(){ if (this.show2) setCurrentCell(this.title2); this.show2=false;}
    settitle3(){ if (this.show3) setCurrentCell(this.title3); this.show3=false;}

}
