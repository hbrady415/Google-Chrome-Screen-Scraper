
var delim = "<hr>";

var br = " <br>";
   
function sendChunk(){
    //Signal that content ran on page
    console.log("test");
    
    //Get URL add to test.txt
    chrome.runtime.sendMessage("URL = "+window.location.href + br);


    //Get all divs
    var target = document.getElementsByTagName("div");


    //Cycle through all divs and query selector whatevr element you want to see for example get the text of all labels
    //or get all divs that have a label and an input text
    for(i=0; i<target.length; i++){

        if(target.item(i).querySelector("label")  && target.item(i).querySelector(".input-text")){
            fld = target.item(i).querySelector("label").textContent;
            val =  target.item(i).querySelector(".input-text").textContent;

            
            //if you want to send this to an html just take out the &s or it will break
            /*while(v.includes("&")){
                v = v.substring(0, v.indexOf("&"))  + v.substring(v.indexOf("&")+1, v.length);
            }
            while(fld.includes("&")){
                fld = fld.substring(0, fld.indexOf("&")) + fld.substring(fld.indexOf("&")+1, fld.length);
            }*/



            //This is just a template above you have scraped the data, now do something with it
            

        }
    }

    
    
  
    
    //This is how the other file knows you are done
    chrome.runtime.sendMessage("DONE");
    
}

//Only send data back if we are on *webpageName* webpage, its blank because this is an edited file...

//This file sends data whenever you click on the webpage specified between the ""s
//if(window.location.href.indexOf("example")>-1){

  //  document.body.addEventListener("click", sendChunk);

    
//}
