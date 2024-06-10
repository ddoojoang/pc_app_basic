const { app, BrowserWindow, ipcMain } = require('electron');
const updater = require('./updater')
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  setTimeout( updater, 500)
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    show: false, // 처음에 윈도우를 숨긴 상태로 생성
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));
    const appVersion = packageJson.version;

    mainWindow.webContents.send('version', appVersion);
    mainWindow.show(); // 콘텐츠가 로드된 후에 윈도우를 표시
  });

  // mainWindow.webContents.openDevTools(); //개발자 도구 바로 열기 (배포할때는 주석처리)

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

// 새 창을 생성하여 URL을 로드하는 기능
ipcMain.on('open-in-new-window', (event, url) => {
  const newWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  newWindow.loadURL(url);
});
