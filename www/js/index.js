document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(cordova.file);
    alert('teste');
createFile();









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