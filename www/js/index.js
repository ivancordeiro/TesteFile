/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		//app.inapp();
//app.arq();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
/*
,
	inapp: function() {

//cordova.InAppBrowser.open(encodeURI('http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.php?app=s'), '_self', 'location=no,hidden=no');
cordova.InAppBrowser.open(encodeURI('http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.php?app=s'), '_system', 'location=no,hidden=no');	   
    }
*/

,
	arq: function() {



var ft = new FileTransfer();

ft.download(
  "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf", // what u download
 // "/sdcard/test.pdf", // this is the filename as well complete url
"/files/test.pdf", // this is the filename as well complete url
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



,
	arq2: function() {



var ft = new FileTransfer();

ft.download(
  "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf", // what u download
 // "/sdcard/test.pdf", // this is the filename as well complete url
"/files-external/test2.pdf", // this is the filename as well complete url
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


,
	arq3: function() {



var ft = new FileTransfer();

ft.download(
  "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf", // what u download
 // "/sdcard/test.pdf", // this is the filename as well complete url
"/documents/test3.pdf", // this is the filename as well complete url
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
,

arq4: function() {
   var fileTransfer = new FileTransfer();
   var uri = encodeURI("http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf");
   var fileURL =  "///storage/emulated/0/DCIM/myFile";

   fileTransfer.download(
      uri, fileURL, function(entry) {
         console.log("download complete: " + entry.toURL());
      },
		
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
		
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}



,

arq5: function() {
   var fileTransfer = new FileTransfer();
   var uri = encodeURI("http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf");
   var fileURL =  "///storage/DCIM/myFile";

   fileTransfer.download(
      uri, fileURL, function(entry) {
         console.log("download complete: " + entry.toURL());
      },
		
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
		
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}

,

arq6: function() {
   var fileTransfer = new FileTransfer();
   var uri = encodeURI("http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf");
   var fileURL =  "///storage/DCIM/teste";

   fileTransfer.download(
      uri, fileURL, function(entry) {
         console.log("download complete: " + entry.toURL());
      },
		
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
		
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}


,

arq7: function() {
   var fileTransfer = new FileTransfer();
   var uri = encodeURI("http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf");
   var fileURL =  "///storage/emulated/0/DCIM/myFile";

   fileTransfer.download(
      uri, fileURL, function(entry) {
         console.log("download complete: " + entry.toURL());
      },
		
      function(error) {
         console.log("download error source " + error.source);
         console.log("download error target " + error.target);
         console.log("download error code" + error.code);
      },
		
      false, {
         headers: {
            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
         }
      }
   );
}

,

arq8: function()) {
        var remoteFile = "http://www.ivanprogramador.com.br/teste/hadaya/cliente/teste.pdf";
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                var localPath = fileEntry.fullPath;
                if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
                }
                var ft = new FileTransfer();
                ft.download(remoteFile,
                    localPath, function(entry) {
                        var dwnldImg = document.getElementById("dwnldImg");
                        dwnldImg.src = entry.fullPath;
                        dwnldImg.style.visibility = "visible";
                        dwnldImg.style.display = "block";
                    }, fail);
            }, fail);
        }, fail);
    }


,     fail: function (error) {
        console.log(error.code);
    }

};
