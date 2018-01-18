document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 

 //console.log('console: Received Event');

alert('ok 1');
//arq();

/*

window.localStorage.setItem("ivan", "42");
window.localStorage.setItem("william", "44");
window.localStorage.setItem("nilson", "46");



var value = window.localStorage.getItem("44");
alert(value);

window.localStorage.myname = "Greg";
alert( window.localStorage.myname );

localStorage.setItem('someSetting', 'off');
var someSetting = localStorage.getItem('someSetting');
alert( 'someSetting: ' + someSetting );

*/

       db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(populateDB, errorCB, successCB);

 



 // Populate the database 
    //
    function populateDB(tx) {
 alert("populatizando ");

         tx.executeSql('DROP TABLE IF EXISTS DEMO');
         tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
         tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        alert("success!");
    }





}






function arq() {

alert('chamou funcao dowload');


		var ft = new FileTransfer();
		
		ft.download(
		  "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf", // what u download
		 // "/sdcard/test.pdf", // this is the filename as well complete url
		"/sdcard/arquivos/test17jan.pdf", // this is the filename as well complete url
		  // fileSystem.root.toURL() + "test.zip",  use ios and others
		
		  function(entry) {
			alert("success");
			alert(JSON.stringify(entry));
		
		  },
		  function(err) {
			alert(err);
			alert(JSON.stringify(err));
		  }
		
		);
 


}




function arq2(){
cordova.InAppBrowser.open(encodeURI('http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf'), '_blank', 'location=yes,hidden=no');
	   
    }


function arq3(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php?id=121'), '_blank', 'location=yes,hidden=no');
	   
    }
