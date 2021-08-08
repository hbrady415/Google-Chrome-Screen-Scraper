/*
FORMAT:

URL
ICON
delim

LABEL + INPUT TEXT (ALL DATA YOU CAN TYPE IN)
delim

BOOLEAN CHECK BOXES
delim

SINGLE CHOICE BOXES
delim

MULTI CHOICE BOXES
delim

BOOLEAN DROP DOWNS
delim

COLORS
delim

ROLES
delim

FIELD LIST FROM THE CENTER COLUMN
delim

*/


//var delim = "#[%$%]#";
var delim = "<hr>";
var de = "~ ";
var br = " <br>";
//var startTime = new Date().getTime();                    // get the current time
   
function sendChunk(){
    //Signal that content ran
    console.log("test");
    
    //Get URL add to DOM
    chrome.runtime.sendMessage("URL = "+window.location.href + br);


    //For input texts
    var target = document.getElementsByTagName("div");
    var boolTar = document.getElementsByClassName("booleancheck");
    //choice box if visible
    var dropTar = document.getElementsByClassName("choice-menu-item");
    //Get fields from DOM
    var fieldsTar = document.querySelectorAll(".typeeditor-center .accordion-pane .t-columneditor-column");
    //Get icon from DOM
    var iconTar = document.querySelector(".choice-icon");
    var headTar = document.querySelector(".nx-backplane .head");
    var choiceTar = document.querySelectorAll(".choiceeditor-item");
    var switchTar = document.querySelectorAll(".editor-choice");
    var multiTar = document.querySelectorAll(".editor-multi");
    var boolHolder = document.querySelectorAll(".editor-boolean");
    var colorTar = document.querySelectorAll(".editor-color");
    var leftTar = document.querySelectorAll(".popupeditor .vieweditor-left .accordion-pane .t-columneditor-column");
    
    chrome.runtime.sendMessage(delim);
var arr = [];
    //Send all colors
    for(i=0; i<colorTar.length; i++){
        arr.push(colorTar.item(i).querySelector("label").textContent);
        var temp = colorTar.item(i).querySelector(".input-text").outerHTML.replace("<div class=\"input-text\" style=\"background-color: ", "");
        temp = temp.replace(";\"></div>", "");
        var switchMsg = colorTar.item(i).querySelector("label").textContent + " = " +temp+ br;
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }

        chrome.runtime.sendMessage(switchMsg);


    }
    //header info if visible
    chrome.runtime.sendMessage(delim);
     //Send the text inside all Divs that have an input-text and label in them to the content script delimited by an ' = '
     var prev = "";
     var curr = "";
     var fld = "";
     var v = "";
     var j=0;
     for(i=0; i<target.length; i++){
         
        if(target.item(i).querySelector("label")  && target.item(i).querySelector(".input-text")){
            fld = target.item(i).querySelector("label").textContent;
            v =  target.item(i).querySelector(".input-text").textContent;
            if(fld == "Icon" && v=="") fld ="";
            //if(fld == "Style") fld="";
            while(v.includes("&")){
                v = v.substring(0, v.indexOf("&"))  + v.substring(v.indexOf("&")+1, v.length);
            }
            while(fld.includes("&")){
                fld = fld.substring(0, fld.indexOf("&")) + fld.substring(fld.indexOf("&")+1, fld.length);
            }
             if(fld!="" && !arr.includes(fld)){
                curr = fld + " = " + v + br;
                //Remove duplicates from DOM
                if(curr!=prev){
                    j++;
                    if(j==1 && fld != "Table name"){
                        //Sorry sidepane is open
                        
                        chrome.runtime.sendMessage("ABORT");
                        return;
                    }
                    /*if(fld == "Table name" && j>3){
                        chrome.runtime.sendMessage("ABORT");
                        return;
                    }*/
                    if(j==10){
                        if(iconTar){
                            var icon = iconTar.outerHTML.replace("<div class=\"choice-icon ic ", "");
                            icon = icon.replace("\"></div>", "");
                            chrome.runtime.sendMessage("Icon = " + icon + br);
                        }
                        chrome.runtime.sendMessage(delim);
                    }
                    chrome.runtime.sendMessage(curr);
                }
                prev=curr;
            }
        }  
    }
    
    //make sure # of <hr> stays the same
    if(j<11){
        chrome.runtime.sendMessage(delim);
    }
    //Gets the class name of Icon so it can be stored in the DOM
    
 
    chrome.runtime.sendMessage(delim);
    v = "";
    fld = "";
    //Send the boolean text and its value to the dom
    for(i=0; i<boolTar.length; i++){
        var switchMsg = boolTar.item(i).querySelector(".booleancheck-text").textContent;
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        if(boolTar.item(i).querySelector(".booleancheck-text")  && boolTar.item(i).querySelector(".selected")){
            
            chrome.runtime.sendMessage(switchMsg+ " = " + "1" + br);
        }
        if(boolTar.item(i).querySelector(".booleancheck-text")  && !boolTar.item(i).querySelector(".selected")){
            chrome.runtime.sendMessage(switchMsg+ " = " + "0" + br);
        }
         
     }
     chrome.runtime.sendMessage(delim);
    //Send list of all editor choice boxes
    for(i=0; i<switchTar.length; i++){
        var switchMsg="";
        if(switchTar.item(i).querySelector(".choiceswitch")){
            
            var temp = switchTar.item(i).querySelectorAll(".choiceswitch-item");
            switchMsg +=switchTar.item(i).querySelector("label").textContent + " = ";
            var selections = switchTar.item(i).querySelectorAll(".selected");
            for(j=0; j<selections.length; j++){
                switchMsg += selections.item(j).textContent;
            }
            while(switchMsg.includes("&")){
                switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
            }
            
           
            switchMsg += br;
            chrome.runtime.sendMessage(switchMsg);
            switchMsg = "";
        }else{
            switchMsg = switchTar.item(i).querySelector("label").textContent + " = " +  switchTar.item(i).querySelector(".choice").textContent + br;
            while(switchMsg.includes("&")){
                switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
            }
            
            chrome.runtime.sendMessage(switchMsg);
            switchMsg = "";
        }
    }
    chrome.runtime.sendMessage(delim);
    //Multi choice
    for(i=0; i<multiTar.length; i++){
        var switchMsg="";
        var temp = multiTar.item(i).querySelectorAll(".choiceswitch-item");
        switchMsg +=multiTar.item(i).querySelector("label").textContent + " = ";
        var selections = multiTar.item(i).querySelectorAll(".selected");
        for(j=0; j<selections.length; j++){
            switchMsg += selections.item(j).textContent;
            if(j+1<selections.length){
                switchMsg+=de;
            }
        }

        /*for(h=0; h<temp.length; h++){
            var match = false;
            for(j=0; j<selections.length; j++){
                if(temp.item(h)==selections.item(j)){
                    match=true;
                }
            }
            if(match==false){
                switchMsg += temp.item(h).textContent;
                if(h+1<temp.length){
                    switchMsg+=", ";
                }
            }
            
        }*/
        switchMsg += br
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        chrome.runtime.sendMessage(switchMsg);
        switchMsg = "";
    }
    chrome.runtime.sendMessage(delim);


   
     //Boolean Drop downs
     for(i=0; i<boolHolder.length; i++){
        if(boolHolder.item(i).querySelector(".stringeditor")){
            chrome.runtime.sendMessage(boolHolder.item(i).querySelector("label").textContent + " = " + boolHolder.item(i).querySelector(".stringeditor").textContent + br);
        }

    }

    chrome.runtime.sendMessage(delim);
     
    var el = "";
    for(i=0; i<choiceTar.length; i++){
        el= (i+1)+ de;
        if(choiceTar.item(i).querySelector(".choiceeditor-item-color") && choiceTar.item(i).querySelector(".choiceeditor-item-icon") && choiceTar.item(i).querySelector(".choiceeditor-item-label") && choiceTar.item(i).querySelector(".choiceeditor-item-id")){
            var uh = choiceTar.item(i).querySelector(".choiceeditor-item-color").outerHTML.replace("<div class=\"choiceeditor-item-color  FastClickContainer_root\" style=\"background: ","");
            uh=uh.substring(0, uh.indexOf(")")+1);
            var jk = choiceTar.item(i).querySelector(".choiceeditor-item-icon").outerHTML.replace("<div class=\"choiceeditor-item-icon ", "");
            jk=jk.replace(" FastClickContainer_root\"><div class=\"FastClickContainer_rippleContainer\"></div>", "");
            jk=jk.replace("</div>", "");
            jk=jk.replace("ic ", "");
            el+=choiceTar.item(i).querySelector(".choiceeditor-item-id").textContent + de + uh + de + jk +de;
            el+=choiceTar.item(i).querySelector(".choiceeditor-item-label").textContent + br;
            while(el.includes("&")){
                el = el.substring(0, el.indexOf("&"))  + el.substring(el.indexOf("&")+1, el.length);
            }
            chrome.runtime.sendMessage(el);
        }
        

    }
    el="";
    //header info if visible
    chrome.runtime.sendMessage(delim);
    var headInfo="";
    if(headTar){
        if(headTar.querySelector(".i-field-string")){
            headInfo+="(String) ";
        }else if(headTar.querySelector(".i-field-fn")){
            headInfo+="(Function) ";
        }else if(headTar.querySelector(".i-field-br")){
            headInfo+="(Line Break) ";
        }else if(headTar.querySelector(".i-field-phone")){
            headInfo+="(Phone Number) ";
        }else if(headTar.querySelector(".i-field-date")){
            headInfo+="(Date) ";
        }else if(headTar.querySelector(".i-field-head")){
            headInfo+="(Header) ";
        }else if(headTar.querySelector(".i-field-tab")){
            headInfo+="(Tab) ";
        }else if(headTar.querySelector(".i-field-choice")){
            headInfo+="(Choice Box) ";
        }else if(headTar.querySelector(".i-field-number")){
            headInfo+="(Number) ";
        }else if(headTar.querySelector(".i-field-rev")){
            headInfo+="(Reverse Link) ";
        }else if(headTar.querySelector(".i-field-button")){
            headInfo+="(Button) ";
        }else if(headTar.querySelector(".i-field-view")){
            headInfo+="(View) ";
        }else if(headTar.querySelector(".i-field-boolean")){
            headInfo+="(Boolean) ";
        }else if(headTar.querySelector(".i-field-ref")){
            headInfo+="(Forward Link) ";
        }else if(headTar.querySelector(".i-field-chart")){
            headInfo+="(Chart) ";
        }else if(headTar.querySelector(".i-field-space")){
            headInfo+="(Space) ";
        }else if(headTar.querySelector(".i-field-html")){
            headInfo+="(Rich Text) ";
        }else if(headTar.querySelector(".i-field-multi")){
            headInfo+="(Multiple Choice) ";
        }else if(headTar.querySelector(".i-field-time")){
            headInfo+="(Time) ";
        }else if(headTar.querySelector(".i-field-timestamp")){
            headInfo+="(Date/Time) ";
        }else if(headTar.querySelector(".i-field-timeinterval")){
            headInfo+="(Time Interval) ";
        }else if(headTar.querySelector(".i-field-appointment")){
            headInfo+="(Appointment) ";
        }else if(headTar.querySelector(".i-field-file")){
            headInfo+="(Image) ";
        }else if(headTar.querySelector(".i-field-signature")){
            headInfo+="(Signature) ";
        }else if(headTar.querySelector(".i-field-link")){
            headInfo+="(URL) ";
        }else if(headTar.querySelector(".i-field-email")){
            headInfo+="(Email) ";
        }else if(headTar.querySelector(".i-field-location")){
            headInfo+="(Location) ";
        }else if(headTar.querySelector(".i-field-color")){
            headInfo+="(Color) ";
        }else if(headTar.querySelector(".i-field-icon")){
            headInfo+="(Icon) ";
        }else if(headTar.querySelector(".i-field-user")){
            headInfo+="(User) ";
        }else if(headTar.querySelector(".i-field-dchoice")){
            headInfo+="(Dynamic Choice) ";
        }else if(headTar.querySelector(".i-field-dmulti")){
            headInfo+="(Dynamic Multi Choice) ";
        }else if(headTar.querySelector(".i-field-text")){
            headInfo+="(Free Text) ";
        }
        var switchMsg = headInfo + headTar.textContent + br;
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }

        chrome.runtime.sendMessage(switchMsg);
        headInfo="";
    }
    chrome.runtime.sendMessage(delim);

    //Send a list of all permissions to the DOM as a comma seperated list
    var dropList = "";
    for(i=0; i<dropTar.length; i++){
        if(dropTar.item(i).querySelector(".booleancheck-text")){
            dropList+=dropTar.item(i).querySelector(".booleancheck-text").textContent;
            if(i+1<dropTar.length){
                dropList+=de;
            }
        }
    }if(dropList!=""){
        while(dropList.includes("&")){
            dropList = dropList.substring(0, dropList.indexOf("&"))  + dropList.substring(dropList.indexOf("&")+1, dropList.length);
        }
        chrome.runtime.sendMessage(dropList);
        dropList="";
    }
    //Send all fields and their types to the DOM (image class defines type)
    //Clunky will revise
    dropList="";
    chrome.runtime.sendMessage(delim);
    for(i=0; i<fieldsTar.length; i++){
        var switchMsg = fieldsTar.item(i).querySelector(".t-columneditor-label").textContent;
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        if(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-string")){
            chrome.runtime.sendMessage( "(String) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-fn")){
            chrome.runtime.sendMessage( "(Function) "+ switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-br")){
            chrome.runtime.sendMessage("(Line Break) " +  switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-phone")){
            chrome.runtime.sendMessage( "(Phone Number) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-date")){
            chrome.runtime.sendMessage( "(Date) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-head")){
            chrome.runtime.sendMessage( "(Header) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-tab")){
            chrome.runtime.sendMessage( "(Tab) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-choice")){
            chrome.runtime.sendMessage("(Choice Box) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-number")){
            chrome.runtime.sendMessage("(Number) "+  switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-rev")){
            chrome.runtime.sendMessage("(Reverse Link) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-button")){
            chrome.runtime.sendMessage("(Button) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-view")){
            chrome.runtime.sendMessage("(View) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-boolean")){
            chrome.runtime.sendMessage("(Boolean) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-ref")){
            chrome.runtime.sendMessage("(Forward Link) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-chart")){
            chrome.runtime.sendMessage("(Chart) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-space")){
            chrome.runtime.sendMessage("(Space) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-html")){
            chrome.runtime.sendMessage("(Rich Text) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-multi")){
            chrome.runtime.sendMessage("(Multiple Choice) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-time")){
            chrome.runtime.sendMessage("(Time) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-timestamp")){
            chrome.runtime.sendMessage("(Date/Time) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-timeinterval")){
            chrome.runtime.sendMessage("(Time Interval) " +  switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-appointment")){
            chrome.runtime.sendMessage("(Appointment) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-file")){
            chrome.runtime.sendMessage("(Image) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-signature")){
            chrome.runtime.sendMessage("(Signature) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-link")){
            chrome.runtime.sendMessage("(URL) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-email")){
            chrome.runtime.sendMessage("(Email) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-location")){
            chrome.runtime.sendMessage("(Location) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-color")){
            chrome.runtime.sendMessage("(Color) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-icon")){
            chrome.runtime.sendMessage("(Icon) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-user")){
            chrome.runtime.sendMessage("(User) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-dchoice")){
            chrome.runtime.sendMessage("(Dynamic Choice) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-dmulti")){
            chrome.runtime.sendMessage("(Dynamic Multiple Choice) " + switchMsg+ br );
        }else if(fieldsTar.item(i).querySelector(".t-columneditor-label")  && fieldsTar.item(i).querySelector(".i-field-text")){
            chrome.runtime.sendMessage("(Free Text) " + switchMsg+ br );
        }
    }
    
    //chrome.runtime.sendMessage(delim);
    //chrome.runtime.sendMessage(document.documentElement.innerHTML);
    //resolve("DONE");
    chrome.runtime.sendMessage(delim);
    //Check edit columns and try to read there
    fld = "";
    v="";
   // chrome.runtime.sendMessage("VISIBLE COLUMNS <br>");
    for(i=0; i<leftTar.length; i++){
        v =  leftTar.item(i).querySelector(".t-columneditor-icon");
        var switchMsg = leftTar.item(i).querySelector(".t-columneditor-label").textContent;
        while(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        if(switchMsg.includes("&")){
            switchMsg = switchMsg.substring(0, switchMsg.indexOf("&"))  + switchMsg.substring(switchMsg.indexOf("&")+1, switchMsg.length);
        }
        if(leftTar.item(i).querySelector(".i-field-string")){
            chrome.runtime.sendMessage( "(String) " + switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-fn")){
            chrome.runtime.sendMessage( "(Function) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-br")){
            chrome.runtime.sendMessage( "(Line Break) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-phone")){
            chrome.runtime.sendMessage( "(Phone Number) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-date")){
            chrome.runtime.sendMessage( "(Date) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-head")){
            chrome.runtime.sendMessage( "(Header) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-tab")){
            chrome.runtime.sendMessage( "(Tab) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-choice")){
            chrome.runtime.sendMessage( "(Choice Box) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-number")){
            chrome.runtime.sendMessage( "(Number) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-rev")){
            chrome.runtime.sendMessage( "(Reverse Link) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-button")){
            chrome.runtime.sendMessage( "(Button) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-view")){
            chrome.runtime.sendMessage( "(View) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-boolean")){
            chrome.runtime.sendMessage( "(Boolean) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-ref")){
            chrome.runtime.sendMessage( "(Forward Link) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-chart")){
            chrome.runtime.sendMessage( "(Chart) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-space")){
            chrome.runtime.sendMessage( "(Space) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-html")){
            chrome.runtime.sendMessage( "(Rich Text) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-multi")){
            chrome.runtime.sendMessage( "(Multiple Choice) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-time")){
            chrome.runtime.sendMessage( "(Time) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-timestamp")){
            chrome.runtime.sendMessage( "(Date/Time) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-timeinterval")){
            chrome.runtime.sendMessage( "(Time Interval) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-appointment")){
            chrome.runtime.sendMessage( "(Appointment) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-file")){
            chrome.runtime.sendMessage( "(Image) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-signature")){
            chrome.runtime.sendMessage( "(Signature) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-link")){
            chrome.runtime.sendMessage( "(URL) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-email")){
            chrome.runtime.sendMessage( "(Email) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-location")){
            chrome.runtime.sendMessage( "(Location) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-color")){
            chrome.runtime.sendMessage( "(Color) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-icon")){
            chrome.runtime.sendMessage( "(Icon) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-user")){
            chrome.runtime.sendMessage( "(User) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-dchoice")){
            chrome.runtime.sendMessage( "(Dynamic Choice Box) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-dmulti")){
            chrome.runtime.sendMessage( "(Dynamic Multiple Choice) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-text")){
            chrome.runtime.sendMessage( "(Free Text) "+ switchMsg+ br );
        }else if(leftTar.item(i).querySelector(".i-field-nid")){
            chrome.runtime.sendMessage( "(ID) "+ switchMsg+ br );
        }
    }
  
    chrome.runtime.sendMessage("DONE");
    
}

//Only send data back if we are on *ninoxdb.com* webpage
if(window.location.href.indexOf("ninoxdb.com")>-1){

    document.body.addEventListener("click", sendChunk);
    //while (new Date().getTime() < startTime + 500);
    
}
