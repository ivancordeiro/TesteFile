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
