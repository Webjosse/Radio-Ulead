//ANIMATION HIGHLIGHT

async function animH(element){
  if (element.style.border === ""){
    return;
  };
  if (element.style.borderWidth === "4px") {
    element.style.borderWidth = "2px";
  } else{
    element.style.borderWidth = "4px";
  };
  await setTimeout(animH,1000,element);
};

window.resizing = false

window.adsnames = ["Levovo", "NessPressé", "LJ", "Noki", "Ochamps", "Kasinope", "Escrocmania", "LaReRedoute"];

function ad(){
  if (window.waited == "pub"){
    if (window.tutoFrame.parentNode == window.BODY) hideTuto();
    window.tutoFrame.firstChild.innerHTML = "Plus qu'à attendre de faire de l'argent, tu peux aussi passer les programmes en cliquant sur le temps restant";
    window.BODY.appendChild(window.tutoFrame);
    stopHighlight(document.getElementsByClassName('program')[0]);
    window.waited = undefined;
  };
  new Program("Pub "+random_choice(window.adsnames),"ad",-5,10);
};

function highlight(el){
  el.style.border = "2px solid #bb89ec";
  animH(el);
};
function stopHighlight(el){
  el.style.border = "";
};

window.playing = false;

//TEMPS DE DIFFUSION
async function time2diff(span,sec){
  if (sec == 0){
    span.Program.remove();
    window.theme.play();
    var P = Program.list[0];
    if (P==undefined){
      window.playing = false;
      playpause(false);
      return;
    };
    if (window.playing && !P.diff) P.diffuse();
  }else{
    showProgram();
    span.innerHTML = "["+sec.toString(10)+"s"+"]";
    span.style.color = "#60FF97";
    var s = sec;
    if (span.Program.skip) s = 1;
    await setTimeout(time2diff, 1000,span,s-1);
  }
};

function playpause(play){
  var Butt = document.getElementById('differ');
  if (play){
    var P = Program.list[0];
    if (P !== undefined){
      window.playing = true;
      Butt.innerHTML = "Arrêter";
      Butt.onclick = function(){
        playpause(false);
      };
      if (!P.diff) P.diffuse();
    }else alert("Aucun Programme n'est en attente");
  }else{
    window.playing = false;
    Butt.innerHTML = "Diffuser";
    Butt.onclick = function(){
      playpause(true);
    };
  };
};

//AJOUT RENAME ET CREATE
function add_nav_forms(node,cmd1,employ,dflt,text1,classe,cmd2=undefined,text2=undefined){
  var Entry = document.createElement("INPUT");
  Entry.setAttribute("type", "text");
  var Valid = document.createElement("BUTTON");
  Valid.setAttribute("type", "button");
  Entry.defaultValue = dflt;
  Entry.size = 16;
  Entry.className = classe;
  Valid.innerHTML = text1;
  Valid.onclick = cmd1;
  Valid.className = "rename";
  Valid.Employ = employ;
  var Form = document.createElement("h5");
  Form.appendChild(Entry);
  if (text2 == undefined){
    Form.appendChild(Valid);
  }else {
    var Valid2 = document.createElement("BUTTON");
    Valid2.setAttribute("type", "button");
    Valid2.innerHTML = text2;
    Valid2.onclick = cmd2;
    Valid2.className = "rename";
    Valid2.Employ = employ;
    var Validiv = document.createElement("div");
    Validiv.appendChild(Valid);
    Validiv.appendChild(Valid2);
    Form.appendChild(Validiv);
  };
  node.appendChild(Form);
};





//Pour capter quand fini de redimensionner

function write(obj,ok,nb){
  if (ok !== window.tutoText[window.nbTuto]){
    return;
  };
  if (nb == 0){
    obj.innerHTML = "";
    obj.appendChild(window.KomiName);
  };
  if (ok.length <= nb){
    return;
  };
  obj.innerHTML += ok[nb];
  setTimeout(function(){ write(obj,ok,nb+1); }, 30);
};

function setstats(){
  var R = document.getElementById("emplois");
  R.innerHTML = '<button class="add" style="background-color:#60FF97;border-color:#60FF97;width:50%;" type="button" name="button" onclick="recruit();">Recruter</button><span class="emplois">'+Employ.list.length.toString(10)+"/"+window.studioplaces[window.studio.toString(10)].toString(10)+'</span>';
  if (window.statsNAV == undefined){
    window.statsNAV = document.createElement("nav");
  };
  var r = Math.floor(Math.random()*10);
  if (window.aud ==  0) r = 0;
  r = (window.aud*10)+r;
  var S = "<div class='flex'><h6>"+window.radioname+"</h6><h2>Studio: "+window.studio.toString(10)+" m²";
  if (window.studio !== 203) S += " <span class='deploy' onclick='upgrade_studio();'>["+window.studioprices[window.studio.toString(10)][1]+"&#11008;]</span>";
  S += "</h2></div><div class='flex'><p>Fonds: "+window.money.toString(10)+"</p><p>Revenus: "+window.rev.toString(10)+"</p><p>Audience: "+r.toString(10)+"</p></div>";
  window.statsNAV.innerHTML = S;
  window.BODY.appendChild(window.statsNAV)
};
window.studioprices = {
  "19": [50,5000],
  "50": [102,15000],
  "102": [203,50000]
};
window.studioplaces = {
  "19": 2,
  "50": 4,
  "102": 10,
  "203": 30
};
function upgrade_studio(){
  if (window.studio === 203) return;
  var L = window.studioprices[window.studio.toString(10)];
  if (window.money > L[1]){
    if (window.studio.toString(10) === "19") add_theme("OTR","On The Rails Theme");
    window.money -= L[1];
    window.studio = L[0];
  }else {
    alert("Il vous faut plus d'argent")
  };
  setstats();
};
window.tutoText = [
  "Bonjour, je m'appelle Komi, je serais votre assistant dans la création de votre Radio.",
  "Sur Votre gauche se trouve le programme actuellement diffusé et celui à venir, c'est celui-ci qui va faire votre audience, et donc, vos revenus",
  "Au centre, se trouve les employés, pour l'instant vous êtes seul mais vous pourrez en recruter",
  "À droite, il y a vos contrats, vous permettant d'utiliser une bande-son, tel qu'un extrait de spectacle ou une musique",
  "Enfin, en bas se trouve vos statistiques: nom de Radio, audience actuelle, revenus ..."
];

//Les programmes selon la fonction
window.progs = {
  "dir": "divert",
  "pres": "show",
  "singer": "song",
  "musician": "song",
  "humor": "divert",
  "report": "show"
};

function act_money(){
  for (c in Contrat.list){
    if (Contrat.list[c].price <= window.money){
      Contrat.list[c].embed.lastChild.style.color = "#bb89ec";
    }else {
      Contrat.list[c].embed.lastChild.style.color = "#60FF97";
    };
  };
};
function close_shop(){
  var SHOP = document.getElementsByClassName('shop')[0];
  if (SHOP !== undefined){
    SHOP.parentNode.removeChild(SHOP);
    var article = document.getElementsByTagName("article")[0];
    article.appendChild(window.contrdiv);
  };
}
function shop(){
  close_shop();
  var article = document.getElementsByTagName("article")[0];
  window.contrdiv = article.lastElementChild;
  article.removeChild(window.contrdiv);
  var SHOP = document.createElement("div");
  SHOP.innerHTML = "<h3 class='shopEl' style='cursor: pointer;color: #60FF97;' onclick='close_shop();'>RETOUR</h3>";
  SHOP.className = "shop";
  for (c in Contrat.list){
    SHOP.appendChild(Contrat.list[c].embed);
  };
  article.appendChild(SHOP);
  act_money();
};
class Contrat{
  constructor(name,type,price,fame,len,rec=true,audio=undefined,own=0,bought=false){
    if (audio !== undefined && audio !== null) this.audio = new Audio(audio);
    this.lenght = len;
    this.name = name;
    this.type = type;
    this.price = price;
    this.unit = price;
    this.bought = bought
    this.form = document.createElement("h3");
    this.own = own;
    if (!bought) {
      this.unit = Math.floor(price/5);
    }else if (this.own > 0){
      var C = document.getElementsByClassName("contrats")[0];
      if (this.form.parentNode !== C){
        C.appendChild(this.form);
      };
    };
    this.pop = fame+Math.floor(Math.random() * 2)-1;
    this.embed = document.createElement("h3");
    this.embed.className = "shopEl";
    this.embed.innerHTML = this.name + "    <span class='deploy'>["+this.price.toString(10)+"]</span>";
    this.embed.lastChild.onclick = this.buy;
    this.embed.lastChild.Contrat = this;
    if (price == 0){
      this.embed.oncontextmenu = function(){
        if (confirm('Supprimer le contrat "'+this.lastChild.Contrat.name+'"?')) Contrat.list.splice(Contrat.list.indexOf(this.lastChild.Contrat),1);
      };
    };
    this.form.innerHTML = this.name + "    <span class='deploy'>["+this.own.toString(10)+"]</span>";
    this.form.lastChild.onclick = this.add;
    this.form.lastChild.Contrat = this;
    if(rec) Contrat.list.push(this);
    act_money();
  };
  add(){
    var self = this.Contrat;
    if (window.waited == "add_prog"){
      if (window.tutoFrame.parentNode == window.BODY) hideTuto();
      window.tutoFrame.firstChild.innerHTML = 'Cliques sur "Diffuser"';
      window.BODY.appendChild(window.tutoFrame);
      highlight(document.getElementsByClassName('program')[0]);
      window.waited = "diff"
    };
    new Program(self.name,self.type,self.pop,self.lenght,self.audio);
    self.own -= 1;
    if (self.price == 0){
      self.pop = Math.floor(self.pop*0.7);
    };
    if (self.own <= 0){
      self.form.parentNode.removeChild(self.form);
    }else {
      this.innerHTML = '['+self.own.toString(10)+']';
    };
  };
  buy(){
    var self = this.Contrat;
    if (window.waited == "buy_prog"){
      if (window.tutoFrame.parentNode == window.BODY) hideTuto();
      window.tutoFrame.firstChild.innerHTML = 'Tu peux diffuser le programme en fermant la boutique et en cliquant à droite du contrat';
      window.BODY.appendChild(window.tutoFrame);
      window.waited = "add_prog"
    };
    if (window.money >= self.price){
        window.money -= self.price;
        if (!self.bought) {
          self.price = self.unit;
          self.embed.lastChild.innerHTML = "["+self.price.toString()+"]"
          if (self.name == "New Comedy") update_contrats(0);
          if (self.name == "Caedes (Mountamare remix)") update_contrats(1);
          if (self.name == "Final Game") update_contrats(3);
          if (self.name == "HELL") update_contrats(5);
          if (self.name == "One Man Chaud") add_theme("Reb","RythmBeca");
          if (self.name == "Old Dream") add_theme("Air","Airborne");
        };
        self.bought = true;
        self.own ++;
        var C = window.contrdiv
        if (self.form.parentNode !== C){
          C.appendChild(self.form);
        };
        self.form.lastChild.innerHTML = '['+self.own.toString(10)+']';
        act_money();
    };
    setstats();
  };
};
function reset_order(){
  for (p in Program.list){
    Program.list[p].order = p;
  };
};
Contrat.list = []
class Program{

  constructor(name,type,fame,len,audio=undefined){
    this.lenght = len;
    this.audio = audio;
    this.diff = false;
    this.name = name;
    this.type = type;
    this.pop = fame;
    this.skip = false;
    this.order = Program.list.length;
    Program.list.push(this);
    this.embed = document.createElement("h3");
    this.embed.innerHTML = this.name + "    <span class='deploy'>[X]</span>";
    this.embed.onclick = this.swap;
    this.embed.lastChild.onclick = this.delete;
    this.embed.oncontextmenu = function(){
      this.lastChild.onclick();
    };
    this.embed.lastChild.Program = this;
    showProgram();
  };
  diffuse(){
    if (window.waited == "diff"){
      if (window.tutoFrame.parentNode == window.BODY) hideTuto();
      window.tutoFrame.firstChild.innerHTML = 'Cliques sur "PUB" pour ajouter une pub pour générer des revenus';
      window.BODY.appendChild(window.tutoFrame);
      window.waited = "pub";
    };
    this.embed.style.borderColor = "#bb89ec"
    if (Program.list[Program.click] == this) Program.click = null;
    if (!window.theme.paused) window.theme.pause();
    if (this.audio !== undefined) {
      this.audio.currentTime = 0;
      this.audio.play();
    }else window.theme.play();
    this.diff = true;
    this.embed.lastChild.onclick = function(){
      if (confirm("Passer le programme?")){
        this.Program.skip = true;
        if (this.Program.audio !== undefined){
          this.Program.audio.pause();
          this.Program.audio.currentTime = 0;
        };
      };
    };
    time2diff(this.embed.lastChild,this.lenght);
    if (this.pop > 0){
      if (window.aud > 0 && this.pop > 0) window.aud += 3;
      var c = 1;
      if (window.last == this.type) c = 0.7;
      window.aud += Math.floor(this.pop*c);
    }else{
      window.rev = window.aud*5;
      window.money += window.rev;
      window.aud = Math.floor(window.aud*0.6)-1;
      if (window.aud < 0) window.aud = 0;
    };
    setstats();
  };
  swap(){
    var Pro = this.lastChild.Program;
    if (Pro == undefined) return;
    if (Pro.diff) return;
    if (Program.click === null){
      Program.click = Pro.order;
      this.style.borderColor = "#60FF97";
      return
    };
    //ON INVERSE
    Program.list[Program.click].embed.style.borderColor = "#fff";
    Program.list[Pro.order] = Program.list[Program.click];
    Program.list[Program.click] = Pro;
    Program.click = null;
    reset_order();
    showProgram();
  };
  delete(){
    var self = this.Program;
    self.remove(false);
  };
  remove(pass=true){
    var ok = true;
    if (Program.list[Program.click] !== undefined) Program.list[Program.click].embed.style.borderColor = "#fff";
    if (!pass) ok = confirm("Voulez vous vraiment supprimer "+this.name+" ?");
    if (ok){
      this.embed.parentNode.removeChild(this.embed);
      Program.click = null;
      var Pindex = Program.list.indexOf(this);
      Program.list.splice( Pindex, 1 );
      reset_order()
    };
  };
};
Program.list = [];
Program.click = null;

function showProgram(){
  var Pro = document.getElementsByClassName('program')[0];
  var Butt = document.getElementById('differ');
  Pro.innerHTML = '<p><span id="pubH"><span id="pub" onclick="ad();">PUB</span><span></p>';
  Pro.lastChild.insertBefore(Butt,Pro.lastChild.firstChild);
  for (p in Program.list){
    Pro.appendChild(Program.list[p].embed);
  };
};
function change_theme(){
  var name = themesel.value;
  if (window.theme.paused){
    window.theme = new Audio(window.themes[name]);
  }else{
    window.theme.pause();
    window.theme = new Audio(window.themes[name]);
    window.theme.play();
  };
  window.theme.loop = true;
};
window.actualEdit = null;
window.themes = {
  "main": "musics/RadioUleadTheme.mp3",
  "kk": "musics/KKulead.mp3",
  "Iwatch": "musics/I_watch_them_grow_while_I_dont.ogg",
  "pullus": "musics/pullus.mp3",
  "OTR": "musics/OnTheRailsTheme.mp3",
  "Reb": "musics/RythmBeca.mp3",
  "Tokyo": "musics/Tokyovania.mp3",
  "Arac": "musics/Arachno.mp3",
  "Air": "musics/Airborne.mp3"
};
class Employ{

  constructor(name,fonction,salaire,fame,speed){
    Employ.list.push(this);
    this.name = name;
    this.func = fonction;
    this.sal = salaire;
    this.pop = fame;
    this.vit = speed;
    this.embed = document.createElement("h3");
    this.embed.innerHTML = this.name + "    <span class='deploy'>[+]</span>";
    this.embed.lastChild.onclick = this.openNav;
    this.embed.lastChild.Employ = this;
    this.embed.Employ = this;
    this.kill = false;
    if (this.func != "dir"){
      this.embed.oncontextmenu = this.fired;
    }
    this.plan = this.name + " - <span class='wait'>[]s</span>";
    this.show();
  };
  fired(){
    var self = this.Employ;
    if (!confirm('Licencier "'+self.name+'" ?')) return;
    if (self.name == "Migo") add_theme("Arac", "Arachno");
    Employ.list.splice(Employ.list.indexOf(self),1);
    self.kill = false;
    self.show(false);
  };
  //S'applique au [+]
  openNav(){
    if (window.waited == "openNav"){
      stopHighlight(document.getElementsByClassName("deploy")[0]);
      hideTuto();
      window.waited = "create_program";
    };
    if (window.actualEdit !== null){
      BODY.removeChild(window.actualEdit);
      window.actualEdit = null;
    };
    var self = this.Employ;
    var fen = document.createElement("div");
    fen.className = "fen";
    fen.innerHTML = "<p class='function'>"+window.emplois.full[self.func]+"</p>";
    add_nav_forms(fen,self.rename,self,self.name,"Renommer","renameEnt");
    fen.appendChild(document.createElement("center"));
    fen.lastChild.innerHTML = '<p class="title">Créer un programme à diffuser</p>';
    if (["singer", "musician", "humor"].includes(self.func)){
      add_nav_forms(fen,self.create_program,self,"Sans Nom","Créer","progname",self.sell_prog,"Vendre");
    }else {
      add_nav_forms(fen,self.create_program,self,"Sans Nom","Créer","progname");
    }
    if (self.func !== "dir"){
      var licencie = document.createElement("p");
      licencie.className = "title";
      licencie.style.textAlign = "center";
      licencie.innerHTML = "Clic droit sur l'employé pour le licencier";
      fen.appendChild(licencie);
    };
    window.BODY.appendChild(fen);
    fen.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    window.actualEdit = fen;
  };

  async time2create(name,s,sell=false){
    if (this.kill) return;
    if (s > this.vit){
      var r = Math.floor(Math.random() * 2)*2-1;
      if (sell){
        window.money += Math.floor(this.pop*8+(this.pop/3)*r);
        setstats();
      }else{
        if (name == "PUR PG") add_theme("pullus","Pullus");
        if (window.progs[this.func] == "song"){
          new Contrat(name,"song",0,this.pop+Math.floor(this.pop/3)*r,Math.floor(this.vit*0.4),true);
          if (window.tutoFrame.parentNode == window.BODY) hideTuto();
          window.tutoFrame.firstChild.innerHTML = 'Tu as un nouveau contrat GRATUIT. Cependant, sa popularité va baisser, tu peux le supprimer à tout moment avec un clic droit';
          window.BODY.appendChild(window.tutoFrame);
        }else{
          new Program(name,window.progs[this.func],this.pop+Math.floor(this.pop/3)*r,Math.floor(this.vit*0.7));
      };
      };
      this.embed.innerHTML = this.name + "    <span class='deploy'>[+]</span>";
      this.embed.lastChild.onclick = this.openNav;
      this.embed.lastChild.Employ = this;
    }else {
      var r = (this.vit-s);
      this.embed.innerHTML = this.plan.replace("[]",r.toString(10));
      await setTimeout(function(obj,n,s,sell){ obj.time2create(n,s+1,sell); }, 1000,this,name,s,sell);
    };
  };

  //Pour créer un programme
  create_program(){
    if (window.waited == "create_program"){
      window.waited = "Contrats";
      document.getElementsByClassName('contrats')[0].firstChild.click();
      if (window.tutoFrame.parentNode == window.BODY) hideTuto();
      window.tutoFrame.firstChild.innerHTML = 'En attendant la production, tu peux acheter un contrat, pourquoi pas "Fuzzy Game?"';
      window.BODY.appendChild(window.tutoFrame);
      window.waited = "buy_prog"
    };
    var self = this.Employ;
    self.embed.innerHTML = self.plan.replace("[]",self.vit.toString(10));
    name = document.getElementsByClassName('progname')[0].value;
    BODY.removeChild(window.actualEdit);
    window.actualEdit = null;
    self.time2create(name,0);
  };
  //Pour créer un programme
  sell_prog(){
    var self = this.Employ;
    self.embed.innerHTML = self.plan.replace("[]",self.vit.toString(10));
    name = document.getElementsByClassName('progname')[0].value;
    BODY.removeChild(window.actualEdit);
    window.actualEdit = null;
    self.time2create(name,0,true);
  };

  //S'applique à l'objet "renommer"
  rename(){
    var self = this.Employ;
    var Ent = document.getElementsByClassName("renameEnt")[0];
    self.plan = self.plan.replace(self.name,Ent.value)
    if (self.func == "singer" && self.name !== "DJ KK" && Ent.value == "DJ KK") add_theme("kk", "Kéké Ulead");
    self.name = Ent.value;
    self.embed.innerHTML = self.name + "    <span class='deploy'>[+]</span>";
    self.embed.lastChild.onclick = self.openNav;
    self.embed.lastChild.Employ = self;
    BODY.removeChild(window.actualEdit);
    window.actualEdit = null;
    self.show();
  };

  show(s=true){
    var DIV = document.getElementsByClassName('employes')[0];
    if (this.embed.parentNode == DIV){
      DIV.removeChild(this.embed);
    };
    if (s) DIV.appendChild(this.embed);
  };
};

Employ.list = [];

async function add_theme(variable,name){
  var S = '<option value ="'+variable+'">'+name+'</option>';
  if (window.themesel.innerHTML.search(S) === -1) window.themesel.innerHTML += S;
  S = document.createElement("p");
  S.className = "success";
  S.innerHTML = "<span class='themename'>"+name+"</span> Débloqué!";
  window.BODY.appendChild(S);
  await setTimeout(success_remove,4000);
};
async function success_remove(){
  var S = document.getElementsByClassName("success")[0];
  S.parentNode.removeChild(S);
}
async function five_mn(sal=true){
  for (c in Contrat.list){
    var variation = c.pop*0.1*(c.unit+1)*((Math.floor(Math.random()*200)/100-1));
    if (variation <= -c.pop) variation = 0;
    c.pop += variation;
  };
};
async function time2sal(){
  window.sec2sal -= 1;
  if (window.sec2sal <= 0) {
    await salaires();
    await five_mn();
    return;
  }else if (window.sec2sal == 5){
    five_mn();
  };
  await setTimeout(time2sal,60000);
  document.getElementById('sal_time').innerHTML = "Payes dans "+window.sec2sal+" mn";
  setstats();
}
//Prélevement
async function salaires(){
  if (window.sec2sal > 0) return;
  var P = 0;
  for (e in Employ.list){
    P += Employ.list[e].sal;
  };
  window.money -= P;
  if (window.money < 0){
    window.tutoFrame.firstChild.innerHTML = 'Vous êtes endettés, utilisez vos employés pour vendre des musiques, produisez des shows/reportages radios ou utilisez les contrats acquis pour regagner des fonds';
    if (window.tutoFrame.parentNode !== window.BODY) window.BODY.appendChild(window.tutoFrame);
  };
  if (window.sec2sal > -3) alert("Salaires:\n"+P.toString(10) + " prélevés");
  window.sec2sal = 11;
  await time2sal();
};

function recruit(){
  if (Employ.list.length >= window.studioplaces[window.studio.toString(10)]) return alert("Vous n'avez pas assez de places dans le studio");
  requit();
  var EMP = document.getElementsByClassName('employes')[0];
  var CH = document.createElement('div');
  CH.className = "choice";
  CH.innerHTML= '<center style="margin-bottom:2%;"><button type="button" class="rename" style="color:#262626;background-color:#fff;font-size:100%;" onclick="requit();">Quitter</button></center>';
  CH.innerHTML += '<input type="radio" name="type" id="pres" value="pres"><label for="pres">Présentateur [2000]</label><br>';
  CH.innerHTML += '<input type="radio" name="type" id="singer" value="singer"><label for="singer">Chanteur [10000]</label><br>';
  CH.innerHTML += '<input type="radio" name="type" id="musician" value="musician"><label for="musician">Musicien [10000]</label><br>';
  CH.innerHTML += '<input type="radio" name="type" id="humor" value="humor"><label for="humor">Humoriste [20000]</label><br>';
  CH.innerHTML += '<input type="radio" name="type" id="report" value="report"><label for="report">Reporter [50000]</label><br>';
  CH.innerHTML += '<center><button type="button" class="rename" style="font-size:150%;" onclick="addEmp();">Recruter</button></center>';
  EMP.appendChild(CH);
};
function requit(){
  var CH = document.getElementsByClassName('choice')[0];
  if (CH === undefined){
    return;
  }else{
    CH.parentNode.removeChild(CH);
  };
};
window.emplois = {
  names:{
    "pres": ["Michel Good", "Jacky Kate", "Amandine Delasoupe", "Fatima Abdennour"],
    "singer": ["Chang Li", "Micheal Sonson","John Lidé","Kanji Birac"],
    "musician": ["Mau Zar", "Guy Tariste", "Vico Loncelle", "Vanessa Xophone"],
    "humor": ["Josse De Oliveira", "Laure Anruki", "Marie Bent", "Adam Kevin"],
    "report": ["Jean-Paul Mernault", "Barry Rosenmac","Lise Noiret", "Claude Zalcha" ]
  },
  prices:{
    "pres": 2000,
    "singer": 10000,
    "musician": 10000,
    "humor": 20000,
    "report": 50000
  },
  speed:{
    "pres": 30,
    "singer": 300,
    "musician": 360,
    "humor": 500,
    "report": 60
  },
  fame:{
    "pres": 80,
    "singer": 400,
    "musician": 500,
    "humor": 1000,
    "report": 1000
  },
  full:{
    "dir": "Directeur (Salaire: 0)",
    "pres": "Présentateur (Salaire: 400)",
    "singer": "Chanteur (Salaire: 2000)",
    "musician": "Musicien (Salaire: 2000)",
    "humor": "Humoriste (Salaire: 4000)",
    "report": "Reporter (Salaire: 10000)",

    "cool": "Mec cool (Salaire:200)"
  }
};

//BOB COOL BOB COOL
function bob(){
  new Employ("Bob Cool", "cool", 200, 40, 30);
  setstats();
  act_money();
};
//Pour faire un choix
function random_choice(array){
  var l = array.length;
  var r = Math.floor(Math.random()*l);
  return array[r];
};

function hideTuto(){if (window.tutoFrame.parentNode !== undefined && window.tutoFrame.parentNode !== null) window.tutoFrame.parentNode.removeChild(window.tutoFrame);}

function addEmp(){
  var CH = document.getElementsByClassName('choice');
  if (CH == undefined) return;
    var Val;
    var buttons = document.getElementsByName('type');
    for (t in buttons){
      var b = buttons[t];
      if (b.checked){
        Val = b.value;
      };
    };
    if (Val === undefined) return;
    var P = window.emplois.prices[Val];
    if (window.money >= P){
      if (!confirm("Son salaire vous coûtera "+(P/5).toString(10)+" /10mn")) return;
      new Employ(random_choice(window.emplois.names[Val]),Val,P/5,window.emplois.fame[Val],window.emplois.speed[Val]);
      window.money -= P;
      setstats();
      act_money();
      requit();
    }else{
      alert("Vous n'avez pas assez d'argent");
    };
};

function start_tuto(){
  window.BODY.appendChild(window.tutoBG);
  var box = document.createElement("div");
  box.className = "tutobox";
  window.tutoBG.appendChild(box);
  box.appendChild(window.Komi);
  var P = document.createElement("div");
  box.appendChild(P);
  P.className = "tutotext"
  window.nbTuto = 0;
  window.tutoFrame = document.createElement("div")
  window.tutoFrame.id = "tutoframe";
  window.tutoFrame.innerHTML = "<div></div>";
  box.onclick = function(){
    if (window.theme.paused) window.theme.play();;
    window.nbTuto ++;
    var sl = document.getElementsByClassName("saveload")[0];
    if (sl !== undefined) sl.parentNode.removeChild(sl);
    if (window.nbTuto >= window.tutoText.length){
      window.BODY.removeChild(window.tutoBG);
      window.username = prompt("Quel est ton nom?").replace(/</g, "&lt;").replace(/>/g, "&gt;");;
      var Me = new Employ(window.username,"dir",0,5,20);
      Me.show();
      window.radioname = prompt("Quel est le nom de ta radio?").replace(/</g, "&lt;").replace(/>/g, "&gt;");;
      setstats();
      highlight(document.getElementsByClassName("deploy")[0]);
      window.Komi.className = "KomiFrame";
      window.tutoFrame.appendChild(window.Komi);
      window.tutoFrame.onclick = hideTuto;
      window.tutoFrame.firstChild.innerHTML = "Clique sur [+] pour produire un programme!";
      window.BODY.appendChild(window.tutoFrame);
      window.waited = "openNav";
      time2sal();
      if (window.location.search == "?Wolfenivania") add_theme("Tokyo","Tokyovania");
      return;
    }else{
      write(this.lastChild,window.tutoText[window.nbTuto],0);
    };
  };
  var loading = document.createElement("p");
  loading.className = "saveload";
  loading.innerHTML = "Charger";
  loading.onclick = load_json;
  window.BODY.appendChild(loading);
  write(P,window.tutoText[window.nbTuto],0);
};

//TOUS LES CONTRATS de base
new Contrat("Fuzzy Game","song",500,20,48,true,"musics/Fuzzy Game.mp3");
new Contrat("HALLOWEED","song",1000,35,71,true,"musics/HALLOWEED.mp3");
new Contrat("One Man Chaud","humor",1200,35,72,true,"musics/sketch1.mp3");
new Contrat("Infinity","song",2000,80,84,true,"musics/Infinity.mp3");
new Contrat("New Comedy","humor",2400,81,129,true,"musics/NewJokes.mp3");
new Contrat("Caedes (Mountamare remix)","song",3000,110,90,true,"musics/Caeles - CAEDES (Mountamare Remix).mp3");

function update_contrats(nb){
  if (nb ==0) {
    Contrat.list[0].embed.parentNode.removeChild(Contrat.list[0].embed);
    Contrat.list[0] = new Contrat("Final Game","song",4000,160,102,false,"musics/Zapdexio - Final Game.mp3");
  };
  if (nb ==1) {
    Contrat.list[1].embed.parentNode.removeChild(Contrat.list[1].embed);
    Contrat.list[1] = new Contrat("HELL","song",5666,240,102,false,"musics/Hell.mp3");
  };
  if (nb ==3) {
    Contrat.list[3].embed.parentNode.removeChild(Contrat.list[3].embed);
    Contrat.list[3] = new Contrat("Resurection","song",7500,360,136,false,"musics/Resurection.mp3");
  };
  if (nb ==5) {
    Contrat.list[5].embed.parentNode.removeChild(Contrat.list[5].embed);
    Contrat.list[5] = new Contrat("Old Dream","song",10000,500,167,false,"musics/Caeles X Mountamare X KiOm - Old Dream.mp3");
  };
};

function init(){
  //transition
  var Header = document.getElementsByTagName('header')[0];
  Header.firstElementChild.lastElementChild.style.transition = "1s";
  Header.lastElementChild.lastElementChild.style.transition = "1s";
  window.studio = 19;
  window.last = "ad";
  window.theme = new Audio("musics/RadioUleadTheme.mp3");
  window.theme.loop = true;
  window.theme.play();
  window.themesel = document.getElementById("muselect");
  window.money = 1000;
  window.rev = 0;
  window.aud = 0;
  window.sec2sal = -5;
  window.BODY = document.getElementsByTagName('body')[0];
  window.tutoBG = document.createElement("div");
  window.tutoBG.className = "tutoBG";
  window.Komi = document.createElement("img");
  window.Komi.src = "pictures/Komi.gif"
  window.Komi.className = "komi"
  window.KomiName = document.createElement("h4");
  window.KomiName.innerHTML = "Komi";
  start_tuto();
};
window.onload=init;
function load(Obj) {
  if (Program.click !== null){
  Program.list[Program.click].embed.style.borderColor = "#fff";
  Program.click = null;
  };
  Contrat.list = [];
  for (i in Obj.ContratsL) {
    C = Obj.ContratsL[i];
    new Contrat(C[0],C[1],C[2],C[3],C[4],true,C[5],C[6],C[7]);
  };
  for (i in Obj.ProgramL) {
    C = Obj.ProgramL[i];
    if (C[4] !== undefined) C[4] = new Audio(C[4]);
    new Program(C[0],C[1],C[2],C[3],C[4]);
  };
  for (i in Obj.EmployL) {
    C = Obj.EmployL[i];
    new Employ(C[0],C[1],C[2],C[3],C[4]);
  };
  window.themesel.innerHTML = Obj.unlock;
  window.studio = Obj.studio;
  window.money = Obj.money;
  window.aud = Obj.aud;
  window.rev = Obj.rev;
  if (!window.theme.paused) {
    window.theme.pause();
  };
  window.theme = new Audio(Obj.theme);
  window.theme.loop = true;
  window.radioname = Obj.radioname;
  Obj.sec2sal = window.sec2sal;
  playpause(false);
  window.theme.play();
  window.BODY.removeChild(window.tutoBG);
  time2sal();
  if (window.location.search == "?Wolfenivania") add_theme("Tokyo","Tokyovania");
  setstats();
};
function load_json(){
  this.innerHTML = '<input id="jsonload" type="file" />';
  function onChange(event){
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    var j = document.getElementById('jsonload');
    j.parentNode.removeChild(j);
    var sl = document.getElementsByClassName("saveload")[0];
    sl.parentNode.removeChild(sl);
  };
  function onReaderLoad(event){
        var obj = JSON.parse(event.target.result);
        load(obj);
  };
  this.lastChild.addEventListener('change', onChange);
};
function save_JSON(){
  var Obj = save();
  var link = document.createElement("a");
  link.download = "RadioUlead.json";
  link.href = "data:text/json;charset=utf-8,"+JSON.stringify(Obj);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}
function save(){
  var Obj = {};
  Obj.ContratsL = [];
  Obj.studio = window.studio;
  for (i in Contrat.list){
    var C = Contrat.list[i]
    var L = [C.name,C.type,C.price,C.pop,C.lenght,undefined,C.own,C.bought];
    if (C.audio !== undefined) L[5]= C.audio.currentSrc;
    Obj.ContratsL.push(L)
  };
  Obj.ProgramL = [];
  for (i in Program.list){
    var C = Program.list[i]
    var L = [C.name,C.type,C.pop,C.lenght];
    if (C.audio !== undefined) L[4]= C.audio.currentSrc;
    Obj.ProgramL.push(L)
  };
  Obj.EmployL = [];
  for (i in Employ.list){
    var C = Employ.list[i]
    var L = [C.name,C.func,C.sal,C.pop,C.vit];
    Obj.EmployL.push(L)
  };
  Obj.theme = window.theme.currentSrc;
  Obj.sec2sal = window.sec2sal;
  Obj.unlock = window.themesel.innerHTML;
  Obj.radioname = window.radioname
  Obj.aud = window.aud;
  Obj.rev = window.rev;
  Obj.money = window.money;
  return Obj;
};

window.running_on = true;
//FIN DU COIN SAUVEGARDE
