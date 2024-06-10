window.myAPI.receive('version', (appVersion) => {
  document.querySelector('.version').textContent = `v${appVersion}`;
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('app').style.display = 'block';
});

function loadContent(url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector('.content').innerHTML = data;
    });
}

// 링크 클릭 시 새 일렉트론 창 또는 기본 브라우저에서 열기
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu a');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const url = link.getAttribute('href');
      if (link.classList.contains('internal')) {
        window.myAPI.openInNewWindow(url);
      } else {
        window.myAPI.openExternal(url);
      }
    });
  });
});
