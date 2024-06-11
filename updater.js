const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
const path = require('path');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

const tokenPath = path.join(__dirname, 'private', 'GH_TOKEN.txt');
const token = fs.readFileSync(tokenPath, 'utf8').trim();

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'ddoojoang',
  repo: 'test',
  token: token,
  // private: true,
});

module.exports = () => {
  console.log('업데이터 함수 호출됨');
  autoUpdater.checkForUpdates();

  // 기존 코드 주석 처리
  // autoUpdater.on('update-available', () => {
  //   dialog.showMessageBox({
  //     type: 'info',
  //     title: '업데이트 가능',
  //     message: '새로운 버전이 있습니다. 지금 업데이트하시겠습니까?',
  //     buttons: ['업데이트', '나중에']
  //   }).then(result => {
  //     let buttonIndex = result.response;
  //     if (buttonIndex === 0) autoUpdater.downloadUpdate();
  //   });
  // });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: '업데이트 준비 완료',
      message: '업데이트가 다운로드되었습니다. 지금 설치하고 다시 시작하시겠습니까?',
      buttons: ['지금 설치', '나중에']
    }).then(result => {
      let buttonIndex = result.response;
      if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
    });
  });

  // 새로운 자동 업데이트 코드
  autoUpdater.on('update-available', () => {
    // 자동으로 업데이트를 다운로드
    autoUpdater.downloadUpdate();
  });

  // autoUpdater.on('update-downloaded', () => {
  //   // 다운로드 완료 후 자동으로 설치 및 재시작
  //   autoUpdater.quitAndInstall(false, true);
  // });
};
