let calcTami =0;
let activeTami = '';

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
        calcTami++;
        this.name = name;
        this.id = calcTami;
        this.tamiShow();

      }
    tamiShow(){        
        let indicators= {
            health: {icon: '❤️', value: '100'},
            fullness:{icon: '🍔', value: '100'},
            strength: {icon: '💪', value: '100'},
            happiness️️: {icon: '🎈', value: '100'},
        }

        let main = document.getElementById("app");
        var tamiView = document.createElement("div");
        tamiView.className = "tami";
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

        tamiView.setAttribute("id", `tami${this.id }`);
        
        var tamiName = document.createElement("h2");
        tamiName.innerText = this.name;

        var face = document.createElement("div");
        face.className = "emoji";

        var lifeTimer = document.createElement("span");
        lifeTimer.setAttribute("id", `timer${this.id }`);
        lifeTimer.innerHTML='00:00:00';


        var indicatorsList = document.createElement("ul");
        indicatorsList.className = "indicators";
        for (let key in indicators) {
            var indicator = document.createElement("li");
            indicator.innerHTML = indicators[key].icon + indicators[key].value;
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
        let id = this.id
        function timer(){
            sec ++;           
            document.getElementById(`timer${id}`).innerHTML= sec.toHHMMSS();
            setTimeout(timer, 1000);
        }
        setTimeout(timer, 1000);        
    }
   get killTami(name){
       delete name;

    }
}
// document.getElementsByClassName('tami').addEventListener("click", function(){

//     console.log(this);
    
   
// });

document.getElementById('add').addEventListener("click", function(){

    var person = prompt("Please enter tami name:", "Harry Potter");
    if (person !== null && person !== "") {
        new Tami(person);
    } 
   
});
document.getElementById('kill').addEventListener("click", function(){

    var person = prompt("Please enter tami name:", "Harry Potter");
    if (person !== null && person !== "") {
        new Tami(person);
    } 
   
});


let tami = new Tami('11 ');
