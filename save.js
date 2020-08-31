function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
function save(){
  if (window.playing) return alert("Vous devez attendre la fin de diffusion");
  if (!confirm("Les salaires seront prélevés maintenant!")) return alert("Sauvegarde impossible");
  var SaveObj = new Object();
  SaveObj.BODY = window.BODY;
};
};
