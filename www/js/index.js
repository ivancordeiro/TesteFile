document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 

alert('ok 1');
arq();

} 







arq: function() {

alert('ok 2');


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






/*

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(cordova.file);
    alert('teste');
createFile();
createDir();
createDir2();
fileTempor();








window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);
alert('file system open: ' + fs.name);
    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        writeFile(fileEntry, null);

    }, onErrorCreateFile);

}, onErrorLoadFs);











}



function createFile() { // PERSISTENT
  // var type = window.TEMPORARY;
   var type = LocalFileSystem.PERSISTENT;
   var size = 5*1024*1024;
alert( 'type:' + type );
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

 alert('teste 2');
	
}




function createDir() { // PERSISTENT
  var type = window.TEMPORARY;
  // var type = LocalFileSystem.PERSISTENT;
var size = 5*1024*1024;
alert( 'type dir:' + type );
   window.requestFileSystem(type, size, createDirectory, errorCallback)



function createDirectory(rootDirEntry) {
    rootDirEntry.getDirectory('NewDirInRoot', { create: true }, function (dirEntry) {
        dirEntry.getDirectory('images', { create: true }, function (subDirEntry) {

alert( 'ok dir:'  );

            createFile(subDirEntry, "fileInNewSubDir.txt");

        }, errorCallback);
    }, errorCallback);
}

   function errorCallback(error) {
      alert("ERROR dir: " + error.code)
   }

 alert('teste 2');
	
}





function createDir2() { // PERSISTENT
  var type = window.TEMPORARY;
  // var type = LocalFileSystem.PERSISTENT;
var size = 5*1024*1024;
alert( 'type dir:' + type );
   window.requestFileSystem(type, size, createDirectory, errorCallback)



function createDirectory(rootDirEntry) {
    rootDirEntry.getDirectory('NewDirInRoot', { create: true }, function (dirEntry) {

        dirEntry.getDirectory('images', { create: true }, function (subDirEntry) {

alert( 'ok dir 2:'  );

            createFile(subDirEntry, "fileInNewSubDir.txt");

        }, errorCallback);
    }, errorCallback);//onErrorGetDir
}

   function errorCallback(error) {
      alert("ERROR dir 2: " + error.code)
   }

 alert('teste 2 c');
	
}






function fileTempor() { 

alert(' teste ftemp ');

window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

    console.log('file system open: ' + fs.name);
    createFile(fs.root, "newTempFile.txt", false);

}, onErrorLoadFs);


}

*/

/*

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

console.log(cordova.file);

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
   fileSystem.root.getDirectory("foo", {create: true}, gotDir);
}

function gotDir(dirEntry) {
    dirEntry.getFile("bar.txt", {create: true, exclusive: true}, gotFile);
}

function gotFile(fileEntry) {
    // manipule o arquivo aqui da forma que você quiser
}

*/




/*
document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail); 
} 

function gotFS(fileSystem) {
 
	alert('teste');
	
var dataDir = fileSystem.root.getDirectory("dirteste", {create: true}); 
var file = dataDir.getFile("lockfile.txt", {create: true, exclusive: true}); 

}

   function fail(error) {
      alert("faiô: " + error.code)
   }
   
   */

/*

document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 
	console.log(cordova.file);
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail); 
		alert('ok 1');
			 } 

function gotFS(fileSystem) { 	
	fileSystem.root.getDirectory("dirteste2", {create: true}, gotDir); 
		alert('ok 2');
} 

function gotDir(dirEntry) { 
	dirEntry.getFile("lockfile.txt", {create: true, exclusive: true}, gotFile); 
		alert('ok 3');
} 

function gotFile(fileEntry) { 
	// Do something with fileEntry here 
	alert('ok 4');
} 


   function fail(error) {
      alert("faiô: ")
   }
   
   */



/* 17jan
document.addEventListener("deviceready", onDeviceReady, false); 

function onDeviceReady() { 
	//console.log(cordova.file);
		alert('ok 1');
	
	
	
	var myPath = cordova.file.externalRootDirectory; // We can use the default externalRootDirectory or use a path : file://my/custom/folder

	alert('myPath:' + myPath);
	
window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
	
	alert('ok 2');
	
     var directoryReader = dirEntry.createReader();
     directoryReader.readEntries(onSuccessCallback,onFailCallback);
});




function onSuccessCallback(entries){
  // The magic will happen here, check out entries with :
  // 
	////////console.log(entries);
	alert('sucesso 2');
	alert('entries:' + entries);
	
}


function onFailCallback(){
  // In case of error
	alert('faia 2');
}
	
	







function listPath(myPath){
	
	alert('ok 3');
  window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
       var directoryReader = dirEntry.createReader();
       directoryReader.readEntries(onSuccessCallback,onFailCallback);
  });

  function onSuccessCallback(entries){
	  
	  alert('sucesso 3');
	  
       for (i=0; i<entries.length; i++) {
           var row = entries[i];
           var html = '';         
           if(row.isDirectory){
                 // We will draw the content of the clicked folder
                 html = '<li onclick="listPath('+"'"+row.nativeURL+"'"+');">'+row.name+'</li>';
		   alert('row-name-dir' + row.name);
           }else{
                 // alert the path of file
                 html = '<li onclick="getFilepath('+"'"+row.nativeURL+"'"+');">'+row.name+'</li>';
		    alert('row-name-file' + row.name);
           }
       
       }
                
        document.getElementById("select-demo").innerHTML = html;
  }

  function onFailCallback(e){
    console.error(e);
	  alert('erro 5');
    // In case of error
  }
}

function getFilepath(thefilepath){
        alert(thefilepath);
	alert('getFilepath');
}
	
	

	
			 } 
17jan */
