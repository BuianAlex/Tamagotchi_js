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
            happiness️️: {icon: '🎈', value: '100'},
        }
        this.tamiShow();

      }
    tamiShow(){        
        

        let main = document.getElementById("app");
        var tamiView = document.createElement("div");
        tamiView.className = "tami";
        ///set active
        tamiView.addEventListener("click", function(){
            activeTami = this.getAttribute("id")
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
                setTimeout(timer.bind(), 1000);
            }                         
        }
        setTimeout(timer, 1000);
              
    }

    dieTami(){
        
        clearTimeout();
        document.getElementById(this.id).remove();
        
    }
    static health(sec,id){
        if(sec%3===0){
            let clon = document.getElementById(id);console.log(clon);
            if(clon){
                tami[id].indicators.health.value -= 3;
                if(tami[id].indicators.health.value<90){
                    Tami.killTami(id);
                } 
            
            
                clon.childNodes[3].childNodes[0].innerHTML=tami[id].indicators.health.icon+tami[id].indicators.health.value;
            }
            
        }      
    }

    static killTami(name){
        
        
        
            tami[name].dieTami();
            delete tami[name];
           // tami.splice(name, 1);        
      
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
    Tami.killTami(activeTami);
});

tami = [new Tami('11 ')];

