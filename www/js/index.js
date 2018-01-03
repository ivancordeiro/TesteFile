document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 
alert('ok 1');
	
	var myPath = cordova.file.externalRootDirectory; 
	// We can use the default externalRootDirectory or use a path : file://my/custom/folder
	
	var myPath2 = cordova.file.dataDirectory; 

	alert('myPath:' + myPath);
	alert('myPath2:' + myPath2);
	
	var ft = new FileTransfer();

ft.download(
  "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf", // what u download
 // "/sdcard/test.pdf", // this is the filename as well complete url
myPath + "arquivos/test5.pdf", // this is the filename as well complete url
  // fileSystem.root.toURL() + "test.pdf",  use ios and others
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


/*
function onDeviceReady() { 
createFile();
alert('ok 1');
}



function createFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
	
}
*/
