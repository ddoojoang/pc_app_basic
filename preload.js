const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
  openExternal: (url) => {
    shell.openExternal(url);
  },
  openInNewWindow: (url) => {
    ipcRenderer.send('open-in-new-window', url);
  }
});
