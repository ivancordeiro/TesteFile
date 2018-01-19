/*

document.addEventListener("online", onOnline, false);

function onOnline() {
    // Handle the online event
//checkConnection();
}



function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}



*/



document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() {
//nav5b();
//nav5c();
//
//nav5c2();
//nav5d();
//nav5e();

//testeDir();
//checkConnection();

inf();

}


function inf(){

alert('testando inf');

var tx = 'cordova: ' + device.cordova;
tx = ', model: ' += device.model;
tx = ', platform: ' += device.platform;
tx = ', uuid: ' += device.uuid;
tx = ', version: ' += device.version;
tx = ', manufacturer: ' += device.manufacturer;
tx = ', isVirtual: ' += device.isVirtual;
tx = ', serial: ' += device.serial;

alert(tx);

checkConnection();

}




function checkConnection() {

alert('testando conexao:');
    var networkState = navigator.connection.type;

alert('networkState:' + networkState );

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}



function up(){

   alert('upando ' );

window.requestFileSystem(window.PERSISTENT, 2 * 1024 * 1024, function (fs) {

    alert('file system open: ' + fs.name);

    // Make sure you add the domain name to the Content-Security-Policy <meta> element.
    var url = 'http://www.ivanprogramador.com.br/btn_home.png';
    // Parameters passed to getFile create a new file or return the file if it already exists.
    fs.root.getFile('downloaded-image.png', { create: true, exclusive: false }, function (fileEntry) {
        //download(fileEntry, url, true);
 download(fileEntry, url, false);

    }, errorHandler);

}, errorHandler);






function download(fileEntry, uri, readBinaryData) {

    var fileTransfer = new FileTransfer();
    var fileURL = fileEntry.toURL();

alert("fileURL:" + fileURL);

    fileTransfer.download(
        uri,
        fileURL,
        function (entry) {
            alert("Successful download...");
            alert("download complete: " + entry.toURL());
            if (readBinaryData) {
              // Read the file...
              readBinaryFile(entry);
            }
            else {
              // Or just display it.
              displayImageByFileURL(entry);
            }
        },
        function (error) {
            alert("download error source " + error.source);
            alert("download error target " + error.target);
            alert("upload error code" + error.code);
        },
        false, // or, pass false
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );



}





function displayImageByFileURL(fileEntry) {
    var elem = document.getElementById('imageElement');
    elem.src = fileEntry.toURL();
}




}








function cria1(){
window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);//1mb
}

function cria2(){
window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs2, errorHandler);
}



function cria3(){

window.requestFileSystem(window.PERSISTENT, 1024*1024, function(fs) {
  fs.root.getDirectory('MyPictures', {create: true}, function(dirEntry) {

  }, errorHandler);
}, errorHandler);


}





function cria4(){

window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
  fs.root.getDirectory('MyPictures2', {create: true}, function(dirEntry) {

  }, errorHandler);
}, errorHandler);


}


function onInitFs(fs) {

  fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'

  }, errorHandler);

}



function onInitFs2(fs) {

  fs.root.getFile('log2.txt', {create: true, exclusive: true}, function(fileEntry) {

    // fileEntry.isFile === true
    // fileEntry.name == 'log.txt'
    // fileEntry.fullPath == '/log.txt'

  }, errorHandler);

}


function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  alert('Error: ' + msg);
}








function fechar(){
alert('fechando app');
navigator.app.exitApp();
}

function testeDir(){ 

	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath - externalRootDirectory dados externos cartao:' + myPath);

	var myPath2 = cordova.file.externalDataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath2 externalDataDirectory dados especificos externos:' + myPath2);

	var myPath3 = cordova.file.dataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath3 dataDirectory Armazenamento de dados persistente e privado dentro do sandbox do aplicativo usando a memória interna :' + myPath3);

}






function testeDirDow(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq2 = "test19janb2.zip";
var arq3 = "test19janb3.zip";
var arq4 = "test19janb4.zip";
var arq5 = "test19janb5.zip";
var arq6 = "test19janb6.zip";

	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath - externalRootDirectory dados externos cartao:' + myPath);

	var myPath2 = cordova.file.externalDataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath2 externalDataDirectory dados especificos externos:' + myPath2);

	var myPath3 = cordova.file.dataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath3 dataDirectory Armazenamento de dados persistente e privado dentro do sandbox do aplicativo usando a memória interna :' + myPath3);

	var myPath4 ="file:///data/Android/data/br.com.testefile/files/"; 
	alert('myPath4:' + myPath4);

	var myPath5 ="file:///data/br.com.testefile/files/"; 
	alert('myPath5:' + myPath5);



		var ft = new FileTransfer();
		
		ft.download(

		  arq, // what u download
		myPath + arq2, // this is the filename as well complete url
		  function(entry) {
			alert("success 1");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 1'+ err);
			alert(JSON.stringify(err));
		  }	
		);


		var ft = new FileTransfer();
		
		ft.download(

		  arq, // what u download
		myPath2 + arq3, // this is the filename as well complete url
		  function(entry) {
			alert("success 2");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 2'+ err);
			alert(JSON.stringify(err));
		  }	
		);
		var ft = new FileTransfer();
	

	
		ft.download(

		  arq, // what u download
		myPath3 + arq4, // this is the filename as well complete url
		  function(entry) {
			alert("success 3");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 3'+ err);
			alert(JSON.stringify(err));
		  }	
		);
 


		ft.download(

		  arq, // what u download
		myPath4 + arq5, // this is the filename as well complete url
		  function(entry) {
			alert("success 4");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 4'+ err);
			alert(JSON.stringify(err));
		  }	
		);



		ft.download(

		  arq, // what u download
		myPath5 + arq6, // this is the filename as well complete url
		  function(entry) {
			alert("success 6");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 5'+ err);
			alert(JSON.stringify(err));
		  }	
		);



}















function createDirectory(){
var rootDirEntry = cordova.file.externalDataDirectory; 
    rootDirEntry.getDirectory('RadioNorth', { create: true }, function (dirEntry) {

    }, errorHandler);
}


function createDirectory2(){
var rootDirEntry = "file:///storage/emulated/0/"; 
    rootDirEntry.getDirectory('RadioNorth2', { create: true }, function (dirEntry) {

    }, errorHandler);
}


function createDirectory3(){
var rootDirEntry = "file:///storage/emulated/0/Download/"; 
    rootDirEntry.getDirectory('RadioNorth3', { create: true }, function (dirEntry) {

    }, errorHandler);
}


function createDirectory4(){
var rootDirEntry = "file:///storage/emulated/0/DCIM/"; 
    rootDirEntry.getDirectory('RadioNorth4', { create: true }, function (dirEntry) {

    }, errorHandler);
}


function createDirectory5(){
var rootDirEntry = "file:///storage/emulated/0/DCIM/Camera/"; 
    rootDirEntry.getDirectory('RadioNorth5', { create: true }, function (dirEntry) {

    }, errorHandler);
}


function createDirectory6(){
alert('chamou');
var rootDirEntry = "file:///storage/sdcard0/"; 
    rootDirEntry.getDirectory('RadioNorth6', { create: true }, function (dirEntry) {
alert('ok');
    }, errorHandler);
}








function DirArq(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq2 = "test19janC1.zip";

	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath - externalRootDirectory dados externos cartao:' + myPath);


		var ft = new FileTransfer();
		
		ft.download(

		  arq, // what u download
		myPath + "RadioNorth/" + arq2, // this is the filename as well complete url
		  function(entry) {
			alert("success 1");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 1'+ err);
			alert(JSON.stringify(err));
		  }	
		);



}





function testeDirDow1(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq2 = "test19janb2.zip";

	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath - externalRootDirectory dados externos cartao:' + myPath);


		var ft = new FileTransfer();
		
		ft.download(

		  arq, // what u download
		myPath + arq2, // this is the filename as well complete url
		  function(entry) {
			alert("success 1");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 1'+ err);
			alert(JSON.stringify(err));
		  }	
		);



}





function testeDirDow2(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq3 = "test19janb3.zip";


	var myPath2 = cordova.file.externalDataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath2 externalDataDirectory dados especificos externos:' + myPath2);



		var ft = new FileTransfer();
		
		ft.download(

		  arq, // what u download
		myPath2 + arq3, // this is the filename as well complete url
		  function(entry) {
			alert("success 2");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 2'+ err);
			alert(JSON.stringify(err));
		  }	
		);
	

}








function testeDirDow3(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq4 = "test19janb4.zip";

	var myPath3 = cordova.file.dataDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder
	alert('myPath3 dataDirectory Armazenamento de dados persistente e privado dentro do sandbox do aplicativo usando a memória interna :' + myPath3);



		var ft = new FileTransfer();
		

		ft.download(

		  arq, // what u download
		myPath3 + arq4, // this is the filename as well complete url
		  function(entry) {
			alert("success 3");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 3'+ err);
			alert(JSON.stringify(err));
		  }	
		);
 


}






function testeDirDow4(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq5 = "test19janb5.zip";

	var myPath4 ="file:///data/Android/data/br.com.testefile/files/"; 
	alert('myPath4:' + myPath4);


		var ft = new FileTransfer();
		


		ft.download(

		  arq, // what u download
		myPath4 + arq5, // this is the filename as well complete url
		  function(entry) {
			alert("success 4");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 4'+ err);
			alert(JSON.stringify(err));
		  }	
		);



}





function testeDirDow5(){ 

alert('chamou funcao dowload');

var arq = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.zip";
var arq6 = "test19janb6.zip";


	var myPath5 ="file:///data/br.com.testefile/files/"; 
	alert('myPath5:' + myPath5);



		var ft = new FileTransfer();
		

		ft.download(

		  arq, // what u download
		myPath5 + arq6, // this is the filename as well complete url
		  function(entry) {
			alert("success 6");
			alert(JSON.stringify(entry));		
		  },
		  function(err) {
			alert('erro 5'+ err);
			alert(JSON.stringify(err));
		  }	
		);



}




function onDeviceReadyBkp() { 

 //alert('console: Received Event');

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
alert("Returned rows = " + results.rows.length);
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
function nav4b(){
cordova.InAppBrowser.open(encodeURI('https://www.ivanprogramador.com.br/teste/hadaya/cliente'), '_self', 'location=no,hidden=yes');
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