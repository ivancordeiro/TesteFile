document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
//nav5b();
//nav5c();
//
nav5c2();
//nav5d();
//nav5e();
}

function onDeviceReadyBkp() { 

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









show();







    function show(){
db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
//db.transaction(queryDB, errorCB2);


db.executeSql("select * from DEMO;", [], function(tx,res) {
    for(var i=0; i<res.rows.length;i++) {
        alert("i:"+i);
    }
}, function(e){
    alert("ERROR: " + e.message);
});



    }




function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB2b);
}






function querySuccess(tx, results) {
console.log("Returned rows = " + results.rows.length);
// this will be true since it was a select statement and so rowsAffected was 0
if (!resultSet.rowsAffected) {
  alert('No rows affected!');
  return false;
}
// for an insert statement, this property will return the ID of the last inserted row
alert("Last inserted row ID = " + results.insertId);
}

function errorCB2(err) {
    alert("Error processing SQL 2: "+err.code);
}


function errorCB2b(err) {
    alert("Error processing SQL 2b: "+err.code);
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


function nav(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), '_blank', 'location=yes,hidden=no');
	   
    }


function nav2(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), 'ifr', 'location=yes,hidden=yes');
 }

function nav2b(){
window.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), 'ifr', 'location=yes,hidden=yes');
 }

function nav2c(){
alert('nav2c');
ifr.location.href = 'https://www.ivanprogramador.com.br/teste/hadaya/cliente';
 }

function nav3(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), '_blank', 'location=yes,hidden=yes');
 }

function nav4(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), '_self', 'location=yes,hidden=yes');
 }

function nav5(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/pedido_teste.php'), '_system', 'location=yes,hidden=yes');
 }


function nav5b(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/'), '_system', 'location=yes,hidden=yes');
 }

function nav5c(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/'), '_system', 'location=no,hidden=yes');
 }
function nav5c2(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/'), '_self', 'location=no,hidden=yes');
 }

function nav5d(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/'), '_system', 'location=yes,hidden=no');
 }

function nav5e(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/'), '_system', 'location=no,hidden=no');
 }

function bx(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip'), '_system', 'location=yes,hidden=yes');
 }

function bx2(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip'), '_system', 'location=no,hidden=yes');
 }

function bx3(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip'), '_system', 'location=yes,hidden=no');
 }

function bx4(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip'), '_system', 'location=no,hidden=no');
 }


function cons() {
  alert('teste alert');
console.log('teste console ');
}