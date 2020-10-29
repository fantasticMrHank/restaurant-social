const setActiveTab =(id) =>{

    let tabs = document.getElementsByClassName("nav-tab");
    for(var i=0; i < tabs.length; i++){
      tabs[i].style.color = "#000000";
      tabs[i].style.borderBottom = "none";
    }
    document.getElementById(id).style.color = "#800000";
    document.getElementById(id).style.borderBottom = "2px solid #800000";
}


export default setActiveTab;