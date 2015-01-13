var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var fs = require('fs');
var YAML = require('yamljs');
var ipc = require('ipc');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

var sendToDo = function(sender, todo) {
    sender.send('todo', todo);
};

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});
    
    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    
    var todosFolderPath = __dirname + '/todos/';
    
    mainWindow.webContents.on('did-finish-load', function() {
        fs.readdir(todosFolderPath, function(err, list) {
            if (err)
                console.error(err);
            list.forEach(function(todoFile){
                fs.readFile(todosFolderPath + todoFile, {encoding : 'utf8' }, function(err, data) {
                   if (err)
                       console.error(err);
                    var splittedData = data.split("---");
                    
                    if (splittedData.length === 3){

                        var markdownContent = splittedData[2];
                        var yamlContent = splittedData[1];
                        
                        var todo = {
                            metadata: YAML.parse(yamlContent),
                            content: markdownContent
                        };

                        sendToDo(mainWindow.webContents, todo);
                    }
                });
            });
        });
        
        ipc.on('newtodo', function(event, arg) {
            var todo = {
                metadata: {
                    title: "plop"
                },
                content: arg
            };
            sendToDo(event.sender, todo);
        });
    });
    

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
