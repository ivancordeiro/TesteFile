document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 

alert('ok 1');
//arq();

//var db = window.openDatabase("Database","1.0","BancoCodeAm",2000000);
//db.transaction(populateDB,errorDB,sucessDB);

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

} 


/*
function populateDB(tx){
tx.executeSql('DROP TABLE IF EXISTS codeAM');
tx.executeSql('CREATE TABLE codeAM(id INTEGER PRIMARY KEY AS, clubes)');
tx.executeSql('INSERT INTO codeAM(id, clubes) values(1,"Galo") ');
tx.executeSql('INSERT INTO codeAM(id, clubes) values(2,"Flamengo") ');
tx.executeSql('INSERT INTO codeAM(id, clubes) values(3,"Cruzeiro") ');
}


function errorDB(err){
alert("erro:" + er.code );
}

function sucessDB(){
alert("sucesso");
}


*/


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
