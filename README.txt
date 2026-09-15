YHT 관리장부 PWA
=================

이 패키지는 기존 Google Apps Script + Google Sheets 장부를 그대로 두고,
별도의 PWA 실행 껍데기에서 기존 웹앱을 띄우는 방식입니다.

구성
- index.html
- manifest.json
- service-worker.js
- icons/icon-192.png
- icons/icon-512.png

중요
1. 이 폴더를 HTTPS로 서비스해야 Chrome/Edge에서 PWA 설치가 가능합니다.
2. index.html에는 현재 사용 중인 Apps Script 배포 URL이 연결되어 있습니다.
3. 기존 Code.gs / Index.html / Google Sheets 데이터 구조는 변경하지 않습니다.
4. 서비스 워커는 PWA 껍데기만 캐시하고 Google Apps Script 데이터는 온라인 상태에서 가져옵니다.

추천 배포
- GitHub Pages
- Cloudflare Pages
- Netlify
- 사내 HTTPS 웹서버

설치
PC: Chrome/Edge로 배포된 index.html 주소 접속 → 주소창의 설치 아이콘 또는 메뉴의 '설치'
모바일: Chrome/Safari의 '홈 화면에 추가' 또는 '앱 설치' 사용

주의
Google Apps Script 자체 URL을 직접 PWA 호스트로 만드는 것이 아니라,
HTTPS 정적 호스트에 이 PWA 껍데기를 올리는 방식입니다.
