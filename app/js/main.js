let activeTami = '';
var tami = [];

Number.prototype.toHHMMSS = function () {
    var sec_num = this;
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}

class Tami{
    constructor(name) {
        this.name = name;
        this.id = tami.length;
        this.tamiView = '';
        this.indicators= {
            health: {icon: '❤️', value: '100'},
            fullness:{icon: '🍔', value: '100'},
            strength: {icon: '💪', value: '100'},
            happiness️️: {icon: '🎈', value: '100'},
        }
        this.action = {
            sleep: false,
            feed: false,
            play: false,
            work: false,
        }
        this.tamiCreate();   
      }
    tamiCreate(){        
        let main = document.getElementById("app");
        var tamiView = document.createElement("div");
        tamiView.className = "tami";
        ///set active
        tamiView.addEventListener("click", function(){
            let active = this.getAttribute("id");
            Tami.setActive(active);            
            let allTami = document.getElementsByClassName('tami');
                Array.from(allTami).forEach(function(element) {
                element.classList.remove("tami-active");
            });
            let  name = "tami-active";
            let arr = this.className.split(" ");
            if (arr.indexOf(name) == -1) {
                this.className += " " + name;
            }
            Tami.error('');       
        });

        tamiView.setAttribute("id", this.id );
        
        var tamiName = document.createElement("h2");
        tamiName.innerText = this.name;

        var face = document.createElement("div");
        face.className = "emoji";
        face.innerHTML='😸';

        var lifeTimer = document.createElement("span");
        lifeTimer.setAttribute("id", `timer${this.id }`);
        lifeTimer.innerHTML='00:00:00';


        var indicatorsList = document.createElement("ul");
        indicatorsList.className = "indicators";
        for (let key in  this.indicators) {
            var indicator = document.createElement("li");
            indicator.innerHTML =  this.indicators[key].icon +  this.indicators[key].value;
            indicatorsList.appendChild(indicator);
        };        
        tamiView.appendChild(tamiName);
        tamiView.appendChild(face);
        tamiView.appendChild(lifeTimer);
        tamiView.appendChild(indicatorsList);
        main.appendChild(tamiView);
        this.tamiView = document.getElementById(this.id);
        Tami.error('');
        this.lifeTimer();
    }
    
    emoji() {
        if (this.indicators.health.value > 99 && this.indicators.fullness.value >= 100 && this.indicators.strength.value >= 100 && this.indicators.happiness️️.value > 100) {
                this.tamiView.childNodes[1].innerHTML = '😻'; //Heart Eyes Cat
            }
        if (this.indicators.health.value < 100 && this.indicators.health.value > 80) {
                this.tamiView.childNodes[1].innerHTML = '😸';  //    Smiling Eyes         
            }
        if (this.indicators.health.value <= 80 && this.indicators.health.value > 40 || this.indicators.happiness️️.value<50) {
                this.tamiView.childNodes[1].innerHTML = '🐱';  // Cat Face            
            }
        if (this.indicators.health.value <= 40 && this.indicators.health.value > 20 || this.indicators.happiness️️.value < 30) {
                this.tamiView.childNodes[1].innerHTML = '🙀';
            }
        if (this.indicators.health.value <= 20 && this.indicators.health.value > 3) {
                this.tamiView.childNodes[1].innerHTML = '😿';
            }
        if (this.indicators.health.value <= 3) {
                this.tamiView.childNodes[1].innerHTML = '💀';
            }
        if (this.action.sleep) {
                this.tamiView.childNodes[1].innerHTML = '🛏️';
            }
    }
   
    lifeTimer() {
        let sec = 0;
        let id = this.id;
        let indicators =  this.indicators;
        function timer(){
            sec ++;
            Tami.health(sec,id,indicators.health);           
            let timerView = document.getElementById(`timer${id}`);
            if(timerView){
                timerView.innerHTML= sec.toHHMMSS();
                setTimeout(timer, 1000);
            }                         
        }
        setTimeout(timer, 1000);
    }

    sleep(){
        this.action.sleep = !this.action.sleep;
        this.emoji();
    }

    dieTami(){
        if(this.id==activeTami){          
            Tami.setActive();
        }        
        clearTimeout();
        this.tamiView.remove();
        delete tami[this.id];   
    }
    switchAction(active){
        Object.keys(this.action).map(function(objectKey, index) {
            this.action[objectKey]=false;
        });
        this.action[active] = true;
    }
    fullnessControl(val){    
        this.indicators.fullness.value -= val;
        if (this.indicators.fullness.value>=0) {            
            this.tamiView.childNodes[3].childNodes[1].innerHTML = this.indicators.fullness.icon + this.indicators.fullness.value;
        }
        if (this.indicators.fullness.value < 0){
            this.indicators.fullness.value = 0;
            this.tamiView.childNodes[3].childNodes[1].innerHTML = this.indicators.fullness.icon + 0;
            this.healthControl(1);
            this.happiness️️Control(10);
        }
    }
    healthControl(val){      
        this.indicators.health.value -= val;
         if (this.indicators.health.value>100){
             this.indicators.health.value = 100;
        }
        this.tamiView.childNodes[3].childNodes[0].innerHTML = this.indicators.health.icon + this.indicators.health.value;
        this.emoji();
        if (this.indicators.health.value==0){
            this.dieTami();
        } 
    }
    happiness️️Control(val){
        this.indicators.happiness️️.value -= val;
        if (this.indicators.happiness️️.value<=0){
            this.healthControl(1);
        }
        if (this.indicators.happiness️️.value >= 100) {
            this.emoji();
        }

        this.tamiView.childNodes[3].childNodes[3].innerHTML = this.indicators.happiness️️.icon + this.indicators.happiness️️.value;
    }
    strengthControl(val){
        this.indicators.strength.value -= val;
        if (this.indicators.strength.value <= 0) {
            this.healthControl(1);
            this.happiness️️Control(-1);
        }
        this.tamiView.childNodes[3].childNodes[2].innerHTML = this.indicators.strength.icon + this.indicators.strength.value;
    }

    work(){
        this.fullnessControl(-10);
        this.happiness️️Control(5);
        this.strengthControl(5);
        this.healthControl(5);
    }

    gym(){
        this.fullnessControl(5);
        this.healthControl(-1);
        this.happiness️️Control(-1);
        this.strengthControl(-5);
    }

    journey(){
        this.fullnessControl(5);
        this.healthControl(-3);
        this.happiness️️Control(-5);
        this.strengthControl(5);
    }

    
    static health(sec,id){
        if(typeof tami[id] === 'object'){
            if(sec%3===0 &&  !tami[id].action.sleep){//not sleeping
                tami[id].fullnessControl(3);
                if (typeof tami[id] === 'object') {
                    tami[id].happiness️️Control(1); 
                }   
                     
            }
            if (sec % 60 === 0 && tami[id].action.sleep) {
                tami[id].fullnessControl(1);  //sleeping 
                if (typeof tami[id] === 'object') {
                    tami[id].happiness️️Control(-5);
                    tami[id].strengthControl(-5);
                }
                     
            }      
        }
        
    }

    static setActive(id){
        if(id){           
             activeTami = id;
        document.getElementById('active-name').innerHTML=' whith '+ tami[id].name;
        }
        else{
            activeTami = '';
            document.getElementById('active-name').innerHTML=' ';
        }
    }

    static sleepTami(name){          
        tami[name].sleep();
    }
    static killTami(name){
        if (tami[name]){
            tami[name].dieTami();
            delete tami[name];
        }
        else{
            Tami.error('nobody to kill');
        }                   
    }

    static feedTami(name) {
        if (tami[name]) {
            tami[name].fullnessControl(-5);
        }
        else {
            Tami.error('Create a frend');
        } 
    }
    static cureTami(name) {
        if (tami[name]) {        
        tami[name].healthControl(-5);
        }
        else {
            Tami.error('Create a frend');
        } 
    }

    static gymTami(name) {
        if (tami[name]) {
            tami[name].gym();
        }
        else {
            Tami.error('Create a frend');
        } 
    }

    static journeyTami(name) {
        if (tami[name]) {
            tami[name].journey();
        }
        else {
            Tami.error('Create a frend');
        } 
    }

    static workTami(name) {
        if (tami[name]) {
            tami[name].work();
        }
        else {
            Tami.error('Create a frend');
        } 
    }

    

    static error(error){
        document.getElementById('error-handler').innerHTML = error;
    }

    
}


document.getElementById('add').addEventListener("click", function(){

    var person = prompt("Please enter tami name:", "Harry Potter");
    if (person !== null && person !== "") {
        tami.push( new Tami(person));  
    }
    
   
});
document.getElementById('kill').addEventListener("click", function(){
    if(activeTami!==''){
        Tami.killTami(activeTami);
    }
    else {
        Tami.error('nobody to kill');
    }
});

document.getElementById('sleep').addEventListener("click", function(){
    if(activeTami!== ''){
        Tami.sleepTami(activeTami);
    }
    else {
        Tami.error('select a frend');
    }  
});

document.getElementById('feed').addEventListener("click", function () {
    if (activeTami !== '') {
        Tami.feedTami(activeTami);
    }
    else {
        Tami.error('select a frend');
    }  
});

document.getElementById('cure').addEventListener("click", function () {
    if (activeTami !== '') {
        Tami.cureTami(activeTami);
    }
    else {
        Tami.error('select a frend');
    }  
});

document.getElementById('gym').addEventListener("click", function () {
    if (activeTami !== '') {
        Tami.gymTami(activeTami);  
    }
    else {
        Tami.error('select a frend');
    }
});

document.getElementById('journey').addEventListener("click", function () {
    if (activeTami !== '') {
        Tami.journeyTami(activeTami);
    }
    else {
        Tami.error('select a frend');
    }
});

document.getElementById('work').addEventListener("click", function () {
    if (activeTami !== '') {
        Tami.workTami(activeTami);
    }
    else {
        Tami.error('select a frend');
    }
});



