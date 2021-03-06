function checkTime(i) {
	if (i < 10) {
	  i = "0" + i;
	}
	return i;
}

var s = "";
var prevS="";
//Whenever a page is fully loaded inject content.js
window.addEventListener('load', function (evt) {
	chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
		file: 'content.js'
	});;
});


// Listen to messages from the content.js script and write to a specified file
chrome.runtime.onMessage.addListener(function (message) {
	if(message=="ABORT"){
		s = "";
		return;
	}
	if(message=="DONE"){
		if(prevS==s){
			s="";
			return;
		}
		$.ajax({
			type: "POST",
            url : "test.txt",
			data: "a=" + s,
            success : function (data) {
				//alert("Success " + data);

				prevS=s;
				s = "";
                //alert(data);
				
        	},
			error:function(data) {
				
				s = "";
                //alert("Failure: " + data);              
            }          
        });	
	}else{
		s += message + "\n";
		console.log(" - " + message);
	}

});
