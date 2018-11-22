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
        this.indicators= {
            health: {icon: '❤️', value: '100'},
            fullness:{icon: '🍔', value: '100'},
            strength: {icon: '💪', value: '100'},
            happiness️️: {icon: '🎈', value: '101'},
        }
        this.action = {
            sleep: false,
            feed: false,
            play: false,
            work: false,
        }
        this.tamiShow();   
      }
    tamiShow(){        
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
        this.lifeTimer(1);
    }  
   
    lifeTimer(params) {
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

    dieTami(){
        if(this.id==activeTami){            
            Tami.setActive();
        }        
        clearTimeout();
        document.getElementById(this.id).remove();        
    }
    switchAction(active){
        Object.keys(this.action).map(function(objectKey, index) {
            this.action[objectKey]=false;
        });
        this.action[active] = true;
    }
    
    static health(sec,id){
        if(typeof tami[id] === 'object'){
            if(sec%3===0 &&  !tami[id].action.sleep){
                let clon = document.getElementById(id);
                if(clon){
                    tami[id].indicators.health.value -= 3;
                    if(tami[id].indicators.health.value<0){
                        Tami.killTami(id);
                    }
                    else{
                        Tami.emoji(id);
                        clon.childNodes[3].childNodes[0].innerHTML=tami[id].indicators.health.icon+tami[id].indicators.health.value;
                    }                
                }           
            }      
        }
        
    }

    static emoji (id){
        let clon = document.getElementById(id);
        if(clon){
            if(tami[id].indicators.health.value>=100 && tami[id].indicators.fullness.value>=100 && tami[id].indicators.strength.value>=100 && tami[id].indicators.happiness️️.value>100  ) {
                clon.childNodes[1].innerHTML= '😻'; //Heart Eyes Cat
            }
            if(tami[id].indicators.health.value<100 && tami[id].indicators.health.value>80 ){
                clon.childNodes[1].innerHTML= '😸';  //    Smiling Eyes         
            }
            if(tami[id].indicators.health.value<=80 && tami[id].indicators.health.value>40 ){
                clon.childNodes[1].innerHTML= '🐱';  // Cat Face            
            }
            if(tami[id].indicators.health.value<=40 && tami[id].indicators.health.value>20 ){
                clon.childNodes[1].innerHTML= '🙀';
            }
            if(tami[id].indicators.health.value<=20 && tami[id].indicators.health.value>3 ){
                clon.childNodes[1].innerHTML= '😿';
            }
            if(tami[id].indicators.health.value<=3){
                clon.childNodes[1].innerHTML= '💀';
            }
            if(tami[id].action.sleep) {
                clon.childNodes[1].innerHTML= '🛏️';
            }
            
        }
    }

    static setActive(id){
        if(id){           
             activeTami = id;
        document.getElementById('active-name').innerHTML=tami[id].name;
        }
        else{
            activeTami = ' ';
            document.getElementById('active-name').innerHTML=' ';
        }
    }

    static goSleep(id){          
        tami[id].action.sleep = !tami[id].action.sleep;       
        Tami.emoji (id);
    }

    static killTami(name){        
        tami[name].dieTami();
        delete tami[name];     
    }
}
// document.getElementsByClassName('tami').addEventListener("click", function(){

//     console.log(this);
    
   
// });

document.getElementById('add').addEventListener("click", function(){

    var person = prompt("Please enter tami name:", "Harry Potter");
    if (person !== null && person !== "") {
        tami.push( new Tami(person));
        console.log(tami.length);
        
    } 
   
});
document.getElementById('kill').addEventListener("click", function(){
    if(activeTami!== ''){
    Tami.killTami(activeTami);
}
});

document.getElementById('sleep').addEventListener("click", function(){
    if(activeTami!== ''){
        Tami.goSleep(activeTami);
    }
    
});

tami = [new Tami('11 ')];

