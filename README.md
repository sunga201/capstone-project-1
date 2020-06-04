# Capstone-project

실행방법
==================
1. manage.py가 위치한 폴더(`./app`)에 `googleAccount.txt` 추가 (카톡방에 올려드릴게요)
2. docker-compose.yml이 위치한 폴더(`.`)에서 `./udco up`
3. 아래에 적혀있는 URL 사용방법대로 사용하면 됩니다.

6/4 수정사항
-----------------
오늘 작업한 내용은 아래와 같습니다.

    1. 파일 다운로드, 파일 아이콘 표시, 이미지 및 동영상 미리보기, 디렉터리 기능을 연결했습니다.  
    2. 리액트 코드에서 몇몇 비효율적인 부분들을 수정하였습니다.
    3. 파일 목록을 불러오는 시간동안 보여줄 로딩 스피너를 추가했습니다.
    4. File 모델에 is_video 필드를 추가했습니다. 이 값을 통해 동영상 파일을 확인할 수 있으며, 동영상 미리보기에 활용할 수 있습니다.
    5. 홈 화면에 새로운 폴더를 생성하는 기능을 추가했습니다. 홈에서 폴더 생성을 눌러 추가할 수 있습니다.
    6. 업로드 버튼을 통해 설정되는 기본 경로(폴더 아무것도 클릭 안했을 때)를 현재 폴더로 설정했습니다. 별도로 경로를 설정하지 않고 결정 버튼을 누르면 바로 현재 폴더에 파일을 업로드 할 수 있습니다.

앞으로 할 일은 다음과 같습니다.

    1. Amazon AWS 서버를 통한 배포 테스트
    2. 도메인 연결 및 HTTPS 연동
    3. 대용량 동영상 미리보기 테스트
    4. 업로드중 업로드 창을 닫았을 때 오른쪽 아래에 남은 시간 보여주기
    5. 공유 폴더 기능 구현
    6. 즐겨찾기, 휴지통 기능 추가
    7. 파일을 오른쪽 클릭했을 때 나오는 메뉴인 이동, 공유 설정, 삭제, 이름변경 기능 구현    
    

6/2 수정사항
-----------------
   1. 프로필 확인 및 수정, 회원탈퇴 UI를 만들었습니다. 작동과정은 아래와 같습니다.
      
      1. 상단 메뉴바에서 사람 모양 버튼을 클릭한 뒤, 프로필 확인 버튼을 누릅니다.
      2. 사용자 확인을 위해 소셜 계정으로 로그인 했을 경우 이메일 주소를, 일반 계정으로 로그인 했을 경우 비밀번호를 입력합니다.
      3. 올바르게 입력했다면 다음 화면에서 프로필을 확인할 수 있으며, 이 화면에서 닉네임과 전화번호를 변경할 수 있습니다. 일반 계정은 추가로 비밀번호를 변경할 수 있습니다.
      4. 아래의 회원탈퇴 버튼을 누르면 modal을 통해 회원탈퇴 창이 나타납니다. 이 창에서 '지금탈퇴' 를 입력하면 회원 탈퇴가 진행됩니다.
      5. 돌아가기 버튼을 누르면 홈 화면으로 톨아갑니다.
      
   2. 소셜 계정의 아이디를 google_<구글 ID>, facebook_<페이스북 ID>와 같은 형식으로 변경했습니다. 만일 기존에 테스트를 위해 만들어 놓은 소셜 계정이 있었을 경우, /api/deleteAll을 통해 모든 계정을
      삭제한 뒤 다시 진행해주세요.
      
   3.  
6/1 수정사항
-----------------
   1. 프로필 수정 및 회원 탈퇴 API를 만들었습니다. 사용 방법은 아래와 같습니다.
   
      1. 프로필 수정
        - /api/user로 PUT 요청을 보내면 현재 사용자의 프로필(비밀번호, 닉네임)을 수정할 수 있습니다. PUT 요청의 body는 curPassword(현재 비밀번호), newPassword(바꿀 비밀번호),
          nickname(닉네임)으로 이루어지며, 현재 비밀번호와 바꿀 비밀번호는 8자 이상 15자 이하의 영어 대소문자 및 숫자, 닉네임은 2자 이상 15자 이하의 한글 및 영어 대소문자, 숫자로 구성되어야 합니다.
          소셜 계정은 curPassword와 newPassword를 빈칸으로 보내면 되고, 일반 계정은 curPassword는 필수, 나머지 두 필드는 바꿀 부분만 값을 넣고 바꾸지 않을 부분은 빈칸으로 해서 요청 보내주시면 됩니다.
      
      2. 회원 탈퇴
        - /api/user로 DELETE 요청을 보내면 현재 사용자 계정을 서버에서 제거할 수 있습니다. body에는 password(현재 비밀번호) 필드가 필요합니다. 
          
   2. 동작하지 않던 버튼 스피너를 정상적으로 고쳤습니다.
   3. 메일 재발송 화면에 로그아웃 버튼을 추가하였습니다.
   4. "shared-dir" branch의 업데이트 내역을 추가했습니다. 디버깅이 필요합니다.
5/31 수정사항
-----------------
   1. 파일 브라우저의 디렉토리 및 파일 삭제 버튼 디자인을 수정했습니다,
   2. 파일명 및 디렉토리명 중복 체크를 한 디렉토리 안에서만 체크하도록 수정했습니다.
   3. React 코드의 모든 fetch 및 axios 문에 현재의 로그인 상태를 체크하는 함수를 넣었습니다. 이제 시간이 지나 로그인 토큰이 만료되면 안내 메시지와 함께 로그인 화면으로 이동합니다.
   4. 사이드바에 있는 남은 공간을 표시하는 기능을 구현했습니다. 막대의 색도 3단계로 나누었는데, 남은공간이 40% 이하일 때는 파란색, 40%이상 70% 이하일 때는 노란색, 그 이상일 때는 빨간색으로 표시하도록 하였습니다.
   5. 업로드 파일 브라우저에서 파일 및 폴더를 여러 개씩 선택하여 삭제하는 기능을 구현했습니다.
   
   앞으로 해야할 일들은 아래와 같습니다.
   
      1. 휴지통 기능
      2. 파일 즐겨찾기 기능
      3. 파일 검색기능
      4. 회원 탈퇴 및 비밀번호 변경 기능
      5. 이미지 파일을 더블클릭 했을 때 미리보기 할 수 있는 기능
      6. 동영상 파일 더블클릭 했을 때 스트리밍 기능 제공
      7. 서버 테스트
      
5/30 수정사항
-----------------
  업로드 UI에 업로드 경로를 설정할 수 있는 기능을 추가했습니다.
   1. 업로드 경로 설정창
   ![파일 브라우저](https://user-images.githubusercontent.com/49271247/83332871-97b3cc80-a2d8-11ea-9aa0-a6a716c51c0d.png)
   
   
   업로드할 폴더를 선택한 뒤 완료 버튼을 누르면 업로드 창으로 이동합니다.
    
   2. 디렉토리 생성
   ![디렉토리 생성](https://user-images.githubusercontent.com/49271247/83332868-96829f80-a2d8-11ea-9111-a949521fd03a.png)
   
   
   root 디렉토리 아래로 새 디렉토리들을 생성할 수 있으며, 그 디렉토리에 업로드할 수 있습니다. 한 폴더 내에 동일한 이름의 폴더는 생성할 수 없도록 설정했습니다.
   
   3. 디렉토리 삭제
    ![디렉토리 삭제](https://user-images.githubusercontent.com/49271247/83332866-94b8dc00-a2d8-11ea-81b2-b4fb8975bdbe.png)
    
    
   현재 사용자가 가지고 있는 디렉토리들을 삭제할 수 있습니다. root 디렉토리는 삭제가 제한되며, 디렉토리 삭제시 하위 디렉토리 및 파일들도 같이 삭제됩니다.
   
   4. 파일 삭제
   ![파일 삭제](https://user-images.githubusercontent.com/49271247/83332874-97b3cc80-a2d8-11ea-867b-77d610953c84.png)
   
   
   현재 저장하고 있는 파일을 삭제할 수 있습니다.
   
   5. 업로드 확인
   ![업로드 파일 확인](https://user-images.githubusercontent.com/49271247/83332870-96829f80-a2d8-11ea-9d25-e2d24adc1955.png)
   
   
   업로드가 끝난 뒤 다시 업로드 버튼을 누르면 설정한 경로에 저장된 파일들을 확인할 수 있습니다.
   
   그외에 다른 작업사항들은 아래와 같습니다.
   
    1. 로그인시 제공하는 정보에 루트 dir의 id 추가. 이는 추가적인 서버 요청을 방지하기 위함임.
    2. 업로드 UI의 파일 브라우저 상에서 현재 저장중인 파일 및 폴더 확인 가능.
    3. 파일 브라우저 상에서 새 폴더 만들기 가능.
    4. 폴더 이름 변경 가능.
    5. 파일 및 폴더 삭제 가능. 폴더 삭제하면 폴더 안에 있던 하위 파일 및 폴더들도 같이 삭제.
       루트 디렉터리는 삭제 못하게 막음(React, django 양쪽으로 체크).
    6. 파일 업로드 시간 표시
    7. 파일 브라우저의 검색창을 통해 현재 사용자가 저장중인 파일들을 검색할 수 있음.
    8. directoryEntry의 file_count에 dir_count 값까지 합쳐서 계산되는 현상이 발생하여 directory 모델의 
       add 메소드의 파라미터인 file_count의 기본값을 0으로 변경, 그에 따라 FlowUploadStartView에서 사용하는 add 메소드에 file_count=1 파라미터 추가
    
    
  앞으로 해야할 일들은 아래와 같습니다.
  
    1. 폴더명에 특수문자 못들어가게 막아야함. (문자열 파싱 과정에서 오류 생김.)
    2. 동일이름 제한을 한 폴더 안에서만 체크하는게 좋을것 같음. 현재는 서로 다른폴더에 있는 파일들도 이름이 같으면 안됨.
    3. 기능 테스트
    

5/29 수정사항
-----------------
  master 브랜치 및 team-content 브랜치와 병합하였습니다.  과정에서, 아래와 같은 수정사항들이 있었습니다.
        
        1. Home.js에서 TeamContent.js로 username이 아닌 props 넘기는 것으로 변경
        2. 팀 목록의 팀장항목에 닉네임과 아이디를 같이 표시하도록 변경
        3. 팀을 새로 만들었을 때, 페이지를 다시 로드하지 않고 loadTeamList()를 이용하여 바로 로드하도록 변경 -> 이는 toast 메시지를 적용하기 위함입니다.
        4. 초대메세지에 나오는 팀 아이디 팀명으로 변경
        5. 사용자 정보창 아래에 괄호치고 아이디 같이 보이게 설정
        6. 아이디 검색시, 이미 팀에 가입되어 있는 사용자는 검색 안되게 변경
        7. 초대메시지 알림창에 초대 메시지 갯수 표시
        8. 팀 수정 창에서 팀장 및 팀원 이름 닉네임으로 표시되도록 수정, 닉네임은 중복 가능하므로 괄호치고 아이디도 같이 표시하게 함.
        9. 모든 경고 메시지를 toast 메시지(우하단에 나오는 메시지)로 변경. toast 메시지를 웹페이지 모든 곳에서 사용할 수 있게 하기 위해 위치를 App.js로 옮김.
        10. Toast 메시지 개선
        11. settings.py DATABASE에서 serializable 옵션 제거.

5/28 수정사항
-----------------
  1. 5월 27일 발견한 업로드 관련 UI 문제들을 해결했습니다.
    
     1. 업로드 도중 업로드 창을 닫았을 때 업로드가 계속 지속되게 할 것인가? 멈출것인가? -> 업로드가 지속되도록 변경, 수행중이던 업로드 진행사항은 업로드 버튼을 다시 눌러 확인할 수 있음.
                                                                                  백그라운드에서 업로드가 수행된 뒤 업로드가 끝나면 오른쪽 아래에 업로드 완료 알림이 뜸.
     2. 모든 업로드를 취소하면 다시 업로드를 할 수 있는 창으로 바뀌는데, 이게 작동을 안함. -> 해결
     3. UI 다듬기 -> 스크롤바를 구현하여 많은 수의 파일을 업로드할 때 가시성을 높임. 각 업로드 파일들을 리스트의 형태로 정리함.
     4. 한 디렉토리 안에 있는 동일한 파일 이름 처리해야함. -> 해결
   
  2. readme의 기록 방식을 최신 업데이트 내용이 위로 가게 변경했습니다.
  
  3. 닉네임 일부를 통해 사용자를 검색하는 기능을 추가했습니다. 로그인한 사용자 자신 및 이메일 인증하지 않은 사용자는 검색대상에서 제외됩니다. URL은 /api/search-user/<검색내용> 입니다.
     
  앞으로 구현해야 할 기능은 아래와 같습니다.
    1. 파일 업로드시 디렉토리를 지정하여 업로드할 수 있도록 해야합니다. 
    2. 업로드 완료 알림에 CSS를 적용해야 합니다.
     
  업로드 예시
  ![업로드-UI](https://user-images.githubusercontent.com/49271247/83158391-b0d54580-a13f-11ea-9a4a-abfe69116dd0.gif)


5/27 수정사항
------------------
   1. 업로드 UI를 구현했습니다. 메인 페이지 업로드 버튼을 눌러 확인할 수 있으며, 파일 탐색기를 통한  다중 업로드 및 드래그 앤 드롭을 통한 다중 업로드를    지원합니다.
   각 파일 업로드는 일시정지하거나 재시작, 업로드 목록에서 삭제할 수 있습니다. 추후 생각해 볼 점들은 아래와 같은 것들이 있습니다.
   
     1. 업로드 도중 업로드 창을 닫았을 때 업로드가 계속 지속되게 할 것인가? 멈출것인가?
     2. 모든 업로드를 취소하면 다시 업로드를 할 수 있는 창으로 바뀌는데, 이게 작동을 안함.
     3. UI 다듬기
     4. 한 디렉토리 안에 있는 동일한 파일 이름 처리해야함.
     
1. 파일 등록 modal

![파일 등록](https://user-images.githubusercontent.com/49271247/83047515-6ee6c980-a083-11ea-88f5-3d4607ca1477.png)

2. 업로드 진행

![진행 1](https://user-images.githubusercontent.com/49271247/83047504-6bebd900-a083-11ea-90db-a11b85854f4d.png)

3. 완료

![완료](https://user-images.githubusercontent.com/49271247/83047503-6b534280-a083-11ea-921b-2f31bf9ba986.png)



5/26 수정사항
------------------
1. Storage 앱에 새로 업데이트된 내역들을 적용하고, 디버깅을 수행했습니다. 디버깅 과정에서 수정한 코드들은 아래와 같습니다.
    1. Partial_upload 모델 is_expired 메소드 안에 있는 time_since_upload 수정 => now와 self.last_receive_time 형식 달라서 빼기가 안됨.
    2. PartialUpload 모델 is_complete => is_completed로 수정. signals.py와 맞춤.
    3. 썸네일 생성부분(287번 줄)에서 완성 파일 경로로 file_path 재설정

5/25 수정사항
------------------
1. 다중 업로드시에 발생하던 asynchronous call 문제가 계속 발생하여 다시 수정했습니다. 테스트를 수행했을 때 오류가 발생하지 않았긴 했지만, 또다시 동일한 문제가 발생할 수 있습니다.
2. 다중 다운로드 기능을 구현했습니다. 구현을 위해 nginx docker base image를 levelonestl/nginx-mod-zip으로 변경했습니다. 작동 과정은 아래와 같습니다.

   1. 로그인한 뒤 /file-test로 들어갑니다.
   2. 업로드 버튼을 이용하여 파일들을 업로드합니다.
   3. 다운로드 아래의 입력창에 파일들의 ID를 공백으로 구분하여 입력합니다. ID가 하나일때는 기존 방식으로, 여러 개일 때는 downloadFiles.zip 으로 다운로드됩니다. 아이디 확인은 /api/file-list
      로 가시면 각 파일들의 정보가 나오는데, 여기서 _id 값을 쌍따옴표 빼고 사용하시면 됩니다.실제로 사용할 때는 {file1 : <file1 ID>, file2 : <file2 ID>, file3 : <file3 ID>, ...} 형식으로 /api/download에 POST 요청을 보내주시면 됩니다.
   
   4. downloadFiles.zip 파일을 통해 입력했던 ID들을 가지고 있는 파일들을 확인하실 수 있습니다.
   
   수정과정에서 기존에 파일을 다운로드 하기 전 fetch call을 통해 해당 id를 가지는 파일 이름을 불러오는 기능을 제거했는데, 이는 디렉토리에 들어갔을 때 해당 디렉토리 내부에 있는
   파일들의 이름 및 썸네일 정보를 한번에 받아오므로 다운로드 과정에서 굳이 다시 받아올 필요가 없다고 생각했기 때문입니다. 지금은 filename_here라는 이름으로 통일시켜 놓았고,
   메인페이지와 결합할 때 이 부분에 파일의 실제 이름을 넣어주시면 됩니다.

   1. 업로드 창
   
   ![업로드창](https://user-images.githubusercontent.com/49271247/82777601-89ede980-9e89-11ea-8106-5874119bfcbf.png)

   2. 다운로드 입력창
   
   ![다운로드 입력창](https://user-images.githubusercontent.com/49271247/82777596-878b8f80-9e89-11ea-9604-3a5fb666cbef.png)

   3. 압축 파일
   
   ![압축파일](https://user-images.githubusercontent.com/49271247/82777597-88242600-9e89-11ea-98bf-39c5ded972a8.png)

5/23 수정사항
----------------
1. DB를 mongoDB에서 postgreSQL로 변경했습니다. 변경한 이유는 아래와 같습니다.
    1. 각 사용자가 UserStoarge를 생성할 때 발생했던 race condition 문제를 해결하기 위해서는 transaction.atomic() 함수가 필요했는데, django와 mongoDB를 연결해주는 모듈들은 이 함수를 지원하지 않습니다.
    2. django에서 mongoDB를 지원하지 않기 때문에 transaction.atomic() 함수 이외에도 추후에 또 다른 문제가 발생할 수 있습니다.
    
   이에 따라, docker DB단의 수정이 필요합니다.
    
2. React의 flow.js에서 발생했던 asynchronous call 문제를 해결했습니다.

5/21 수정사항
----------------
1. 업로드 테스트 페이지에 다운로드 버튼을 추가했습니다. 다운로드는 다음과 같은 방법으로 테스트해볼 수 있습니다.
    
    1. 로그인을 한 뒤, localhost/file-test로 이동합니다.
    2. '업로드' 버튼을 눌러 업로드를 수행합니다.
    3. localhost/api/file-list 로 이동하여 업로드한 파일의 모델을 확인한 뒤, 다운로드 받을 파일의 _id 부분을 복사합니다(쌍따옴표 빼고).
    4. 다시 localhost/file-test로 이동하여 입력창에 복사한 _id를 입력한 뒤, 다운로드 버튼을 누릅니다.
    5. 다운로드가 수행되는 것을 확인할 수 있습니다.
    
2. 다운로드 기능을 기존의 Download 앱에서 Storage 앱으로 이동시켰습니다. 그에 따라 download 앱은 삭제하였습니다.

3. 사용자가 저장하고 있는 모든 파일들의 정보를 반환하는 API를 만들었습니다. /api/file-list에서 확인하실 수 있습니다.

4. /api/users에서 사용자 정보에 추가로 각 사용자에게 연결된 UserStorage 정보를 보여주게 변경했습니다. 이 값을 통해서 루트 디렉토리의 ID를 알 수 있습니다.

개발 과정에서 발견한 문제점은 아래와 같은 것들이 있습니다.

1. 파일 업로드 창에서 여러 개의 파일을 선택하여 업로드했을 때, 파일 업로드와 파일 모델 생성은 정상적으로 수행되지만 UserStorage 모델의 file_count 값이 제대로 업데이트 되지 않습니다.
   이에 따라 이 값에 영향을 받는 file_size_total도 제대로 업데이트 되지 않습니다.
   
앞으로 개발할 것들은 아래와 같은 것들이 있습니다.

1. 드래그 앤 드롭을 통한 파일 업로드 -> flow.js에서 지원하는 기능이기 때문에, 쉽게 제작 가능할 것 같습니다.

5/20 수정사항
-----------------
1. 업로드 기능을 구현했습니다. 로그인을 한 뒤 localhost/upload-test로 이동하시면 업로드 테스트를 해볼 수 있습니다. 업로드된 파일은 django 상의 /file/complete/<사용자 이름>/ 폴더 밑에 저장되며,
   썸네일은 /file/complete/<사용자 이름>/thumbnail/ 폴더 밑에 파일 명과 동일한 이름.jpg의 형태로 저장됩니다. 실제 서버 기준으로는 capstone-project/file 폴더 아래에 파일들이 저장됩니다.
   현재 2GB까지의 파일들도 정상적으로 업로드되는 것을 확인했으며, 생각해볼 점으로는 아래와 같은 것들이 있습니다.
   
   1. 업로드 속도 문제
     chunk 크기를 기존 설정값인 1MB로 했을 떄 업로드 속도가 너무 느려 chunk 크기를 100MB로 늘렸습니다. chunk 크기가 늘어나면 속도는 늘어나겠지만, 그만큼 서버 메모리 부하량이 많아진다는 의미이므로
     적절한 값으로 조정이 필요해보입니다.
   
   2. 파일 삭제 및 각 사용자들의 현재 저장 용량, 남은 용량 등을 확인할 수 있는 API 필요
   
   3. 개발단계에서 React 단에서 서버가 보내주는 헤더를 읽지 못해 body에 담아 URL을 보내는데, 실제 서버에서 구동할 떈 원래대로 돌려놓아야 합니다.

5/19 수정사항
-----------------
1. 동영상 썸네일 기능을 구현했습니다. 사용방법은 이미지 파일 썸네일 기능과 같습니다. 동영상 썸네일 기능을 위해 moviepy 모듈을 사용했으며, 이를 위해
   django dockerfile에 apk add ffmpeg를 추가했습니다.
   
2. 다운로드 테스트를 보완했습니다. 다운로드 테스트 창으로 이동하면 파일 이름을 입력할 수 있고, 해당 파일 이름을 가진 파일 모델이 존재하면 그 모델의 id를 파일 이름으로 가지는 파일을 다운로드하게 해줍니다.
   테스트를 위해서는 로그인한 뒤 /api/download/aaa로 이동하여 파일 이름을 등록해주는 과정이 필요합니다. 또한 /file/complete/<사용자 아이디>/ 아래에 해당 파일의 id와 확장자를 이름으로 가지는 파일을 추가해야 합니다.
   모든 과정을 마친 뒤, /download-test로 이동하여 파일 이름을 적고 다운로드 버튼을 누르면 다운로드가 수행됩니다. 현재 다운로드 여부만 테스트 하는 중이기 때문에 위와 같은 사전작업이 필요하며,
   업로드 구현이 완료되면 그때 생성되는 파일 모델을 사용하여 위의 작업이 자동적으로 수행되게 구현할 예정입니다.

5/18 수정사항
------------------
1. 썸네일 기능을 구현했습니다. 작동 로직은 아래와 같습니다.
   1. storage/views.py에서 파일 업로드를 마친 뒤, 해당 파일이 이미지 파일인지 확인합니다.
   2. 이미지 파일이 아니라면 그대로 나머지 업로드 로직을 진행하고, 맞다면 thumbnail.py의 MakeThumbnail 클래스를 이용하여 썸네일을 제작한 뒤, 
      해당 파일을 file/complete/사용자명/thumbnail/ 에 파일ID.jpg의 형태로 저장합니다(Nginx 상에서는 media/files/사용자명/thumbnail 디렉토리에 저장됩니다.).
      MakeThumbnail 클래스를 생성할 때, width와 height 값을 넘겨줌으로써 썸네일 크기를 조정할 수 있습니다.
   3. 썸네일이 저장된 경로를 업로드 response의 body에 thumbnail_url : {url} 형태로 실어서 response를 전송합니다.
   4. 해당 url로 접속하면 서버에 저장된 썸네일 아이콘이 보이게 됩니다. 이것을 이용해 리액트쪽에서 썸네일 이미지를 보여주면 됩니다.
   
   storage앱의 view.py에 있는 ThumbnailTestAPI와 thumbnail 앱은 테스트용으로, 제거할 예정입니다.
   썸네일 이미지 테스트 페이지는 localhost/thumb-test에 가시면 확인할 수 있으며, 사용자 아이디를 sungs201로 설정하셔야 합니다
   (이는 테스트용 설정으로, 추후에 업로드 구현이 완료되면 업로드한 계정으로 로그인 하시면 됩니다.).

5/16 수정사항
------------------
1. 팀에 초대받은 사용자가 초대를 수락하는 기능 및 거절하는 기능을 추가했습니다.
2. 공유폴더 설정 및 해제 기능을 추가했습니다. 

5/15 수정사항
------------------
1. 팀 관련 API를 만들었습니다. API가 제공하는 기능은 아래와 같습니다.
   1. 새로운 팀을 생성하고, 전체 팀의 정보를 확인할 수 있습니다.
   2. 팀 id를 통해 해당 팀의 정보를 출력하고, 팀을 삭제할 수 있으며(팀장만), 팀 이름을 변경할 수 있습니다(팀장만).
   3. 새로운 팀원을 초대할 수 있습니다(팀장만). 추후에 팀원에게 초대권한을 주는 기능을 만드는 것도 좋을 것 같습니다. 각 사용자는 자신을 초대한 팀들의 이름을 확인할 수 있습니다. 아직 초대를 수락하여 팀에 들어가는 기능은 미구현 상태입니다.
   4. 각 팀원들은 공유폴더를 설정하고 해제할 수 있습니다. 미구현 상태이며 디렉토리 모델이 만들어지는 대로 구현할 예정입니다.

5/14 수정사항
----------------
1. 동명이인 문제를 해결했습니다. User 모델에 닉네임 필드가 새로 생겼으며, 소셜 로그인을 할 떄는 닉네임에 이름을, id에는 해당 소셜 서비스에서 제공하는 API에서 받아온 id값을 저장하게 됩니다. 
   비밀번호는 social로 통합시켰습니다. 일반 사용자는 15자 이상의 아이디를 만들 수 없으므로 소셜 로그인으로 만들어지는 아이디와 중복될 수 없게 됩니다(소셜 로그인 아이디는 15자보다 깁니다.).

2. 로그인 필드에 유효성 검사를 추가했습니다. 일반 로그인을 진행할 때는 아이디와 비밀번호의 글자 수를    8~15자로 제한하고, 영어, 숫자를 포함하도록 했습니다.

3. 소셜로그인을 했을 때 기존 가입 회원 중 동일한 이메일을 쓰는 회원이 있을 경우, 자동으로 계정이 연동되도록 수정했습니다. 회원 정보는 기존에 가입했던 계정 정보를 따라가게 됩니다.

  팀 구성 관련해서 아래와 같이 생각해볼 점들이 있었습니다.
  
    팀원을 초대할 때 
      - 닉네임으로 초대하게 할 것인가? -> 이 경우, 닉네임이 중복 가능하기 때문에 검색했을 때 해당 사용자의 이메일 주소와 함께 보여줘야 함.
      - 아이디로 초대하게 할 것인가? -> 이 경우, 소셜로그인으로 가입한 회원 추가가 힘들 수 있음. -> 각 사용자가 자신의 아이디를
                                   확인할 수 있도록 해야 함. 이를 팀장에게 알려줘서 팀장이 아이디를 통해 초대를 보낼 수 있게 하는 식으로 구현

5/13 수정사항
-----------------
1. 버튼 로딩 스피너를 만들었습니다. 서버로 보낸 fetch 명령이 끝날 동안, 버튼은 로딩 상태가 되어 눌리지 않게 됩니다. fetch 명령이 끝나면 버튼은 다시 활성화 상태로 돌아갑니다.
2. 페이스북 로그인 연동을 완료했습니다. 구현 과정에서 GoogleAccount.txt의 내용이 바뀌었습니다.(카톡방에 다시 올려드릴게요)
   페이스북 연동 과정에서 아래와 같은 문제점들이 발생했습니다.
     1. 동명이인 문제 
         1-1. 한 사용자가 구글 로그인과 페이스북 로그인을 동시에 사용할 때, 이 사용자가 동일한 사용자라는 것을 어떻게 구별할 것인가?
         1-2. 이름이 같은 사용자가 로그인 할 때, 이 사람을 다른 동명이인들과 어떻게 구별할 것인가?
         -> 동명이인 사용자를 구별할 수 있는 방안이 필요함.
         
     2. 구글 로그인과 페이스북 로그인을 동시에 사용할 때, 비밀번호를 어떻게 알아내어 로그인을 해야할까?
        -> 기존 구글 로그인은 구글 API에서 보내주는 id를 비밀번호로 사용했기 때문에, 페이스북으로 로그인하는것이 불가능했습니다. User 모델에서 비밀번호를 알아내어 로그인하는 방법도 생각해봤지만,
           비밀번호가 암호화되어있어 django 내에서도 확인이 불가능합니다. 일단 모든 소셜 로그인의 비밀번호를 'social' 로 설정하여 임시로 문제를 해결했지만, 로그인 창에 이름과 social만 입력해도
           로그인이 가능해졌기 때문에 다른 방안이 필요할 것 같습니다. (비밀번호를 2개 저장한다던가, 새로운 비밀번호를 생성한다던가)

5/12 수정사항
-----------------
아이디/비밀번호 찾기 구현을 완료했습니다. 아래와 같은 문제점들이 발생했습니다.
1. 이메일 재전송이나 회원가입, 비밀번호 찾기 수행 시 서버에서 fetch할 동안 버튼이 눌리는 문제가 발생합니다. fetch하는 동안에는 버튼이 비활성화되게 하는    방안이 필요합니다. (로딩 스피너라던가)
2. 아이디 찾기를 수행할 때 간헐적으로 페이지가 다운되는 현상이 있습니다.

5/8 수정사항
-----------------
 아이디/비밀번호 찾기에 사용할 API를 만들었습니다. api/forgot으로 POST 명령을 보내면 ID나 비밀번호를 찾을 수 있습니다. 형식은 다음과 같이 해주세요.
 {'IDorPassword' : 'id' 또는 'password', username : 사용자 닉네임(비밀번호 찾을 때만, ID 찾을땐 빈칸으로), email : 사용자 이메일}
 아이디 찾기는 response의 id필드에서 꺼내쓰면 되고, 비밀번호 찾기는 이메일주소로 임시 비밀번호가 적힌 메일이 발송됩니다. 해당 비밀번호로 로그인하여 
 추후에 비밀번호를 바꾸던가 하면 될것같습니다.


5/7 수정사항
------------------
1. 구글 로그인을 구현하여 로그인 폼에 추가하였습니다. 구현 과정에서 몇 가지 어려웠던 점들이 있었습니다.
    1. Django 서버 내부의 특정 view에서 다른 view로 리퀘스트를 전달하는 문제 - 구글 로그인을 수행했을 때 서버에 동일한 이메일을 가진 사용자가 존재한다면 그 사용자로 로그인시키고, 아니면 회원가입시키는 방식으로 구현했는데, 이를 위해서는 계정이 존재하는지 판정한 뒤 login view 또는 registration view로 request를 전달해야 했습니다. 이를 위해 새롭게 GoogleLoginAPI라는 view를 새로 만들고, /api/google URL과 연결했습니다. 또한 LoginAPI와 RegistrationAPI를 상속받게 하여 판정 후에 적절한 view에서 처리할 수 있도록 하였습니다.
      
    2. 구글 계정으로 로그인했을 때 로그아웃을 수행해도 다시 로그인이 되던 문제 - 기존에 구글에서 제공하는 gapi.auth2.render()를 통해 로그인 버튼을 만들면 로그인 버튼이 렌더링 될 때마다 구글 계정 로그인 여부를 체크하고, 구글계정이 로그인 되어 있는 경우 자동으로 로그인이 되던 문제가 발생했습니다. 이를 해결하기 위해 직접 custom button을 만들고, onClick 이벤트를 통해 렌더링 될 때가 아닌 버튼을 클릭했을 때 로그인 이벤트를 발생시키도록 했습니다. 버튼을 클릭하면 gapi.auth2.getAuthInstance()를 통해 사용자 계정 객체를 생성하고, gapi.auth2.signIn()을 통해 구글 서버에 로그인을 요청합니다. 이를 통해 googleUser 객체를 받아 이 객체의 메소드인 getAuthResponse를 통해 access token을 뽑아내고, /api/google로 POST 요청을 보내 서버에서 유효성을 판정한 뒤 사용자에 대한 정보를 이용할 수 있도록 구현했습니다.
2. 도커 서비스의 프로세스 유저가 root 대신 현재 사용자가 되도록 했습니다. 이를 위해, `docker-compose` 명령 대신 `./udco`를 사용해야 합니다.

5/5 수정사항
------------------
1. 회원가입 폼의 각 입력 필드의 입력값을 검증하고, 유효하지 않을 경우 입력 필드 아래에 조건을 표시하도록 구현했습니다
.
![signup](https://user-images.githubusercontent.com/49271247/81073996-5facaa00-8f23-11ea-9c50-b52dee452ee5.gif)

2. 메일 재전송 페이지 및 인증 페이지와 서버를 연결했습니다.

5/4 수정사항
------------------
1. 로그인한 사용자가 새로고침 했을 때, 로그인 화면으로 이동하는 현상을 수정했습니다.
2. 로그인 확인 페이지를 /로 수정했습니다. 해당 페이지에서 로그인한 사용자의 아이디를 확인할 수 있습니다.

5/3 수정사항
------------------
1. 메일 인증을 받지 않은 사용자가 로그인 했을 때, 메일 인증을 받게 하는 안내 페이지를 제작했습니다. 여기서 인증 메일을 다시 전송받을 수 있습니다.
2. JWT 토큰 저장 방식을 local storage에서 httponly cookie로 변경했습니다.
   - 보안상 httponly cookie로 저장하는 것이 더 안전하기 때문입니다. local storage에 저장하면 xss공격에 취약해지고, httponly cookie에 저장하면 xss 공격은 막을 수 있지만 csrf 공격에 취약해집니다. 하지만 csrf 공격이 상대적으로 더 막기 쉬우므로, 상용 서비스에서는 일반적으로 httponly cookie에 JWT 토큰을 저장합니다. 

URL 사용법
------------------
리액트 폼

|URL          | 설명   |
|:--------------:|:-------:|
|/|메인 페이지, 로그인한 사용자의 아이디를 확인할 수 있습니다.|
|/login|로그인 페이지, 로그인 성공 시 /login-test로 리다이렉트됩니다.|
|/signup|회원가입 페이지입니다.|
|/mail-resend|메일인증을 받지 않은 계정으로 로그인했을 때, 이 페이지로 이동합니다. 이 페이지에서 가입 시에 등록한 이메일을 확인할 수 있고, 인증 메일을 다시 전송받을 수 있습니다.|
|/mail-validation/*|등록한 이메일에 써있는 URL 통해 이동할 수 있는 메일 인증 관련 페이지입니다.|
|/forgot-id|아이디 찾기 페이지입니다. 메일 주소를 입력한 뒤 확인 버튼을 누르면 /display-id 페이지로 리다이렉트됩니다.|
|/display-id|아이디 찾기 결과를 보여주는 페이지입니다.|
|/forgot-password|비밀번호 찾기 페이지입니다. 아이디와 이메일 주소를 입력하면 이메일 주소로 임시 비밀번호를 받을 수 있습니다. /return-to-login 페이지로 리다이렉트됩니다.|
|/return-to-login|로그인 페이지로 돌아갈 수 있는 버튼이 있는 페이지입니다.|
|/thumb-test|썸네일 테스트 페이지로, 사용자 아이디가 sungs201인 계정으로 로그인한 뒤 접속해야 합니다(테스트용). 해당 아이디를 가진 계정으로 접속한 뒤 접속해보면 이미지 썸네일과 동영상 썸네일을 확인하실 수 있습니다.|
|/file-test|업로드/다운로드 테스트 페이지입니다. 로그인을 한 뒤 접근해야 합니다.|

API

127.0.0.1/api 뒤에 아래의 URL을 붙이면 됩니다.

사용자 계정 관련 API
---------------------
|           | POST    | GET        | DELETE  |PUT
|:--------------:|:-------:|:--------------------------: |:-------:|:---:|
| /users | - | 전체 사용자 출력 |      -     |-|
| /user| - | 해당 회원의 정보 출력 | 해당 회원의 정보 제거 |프로필 변경(비밀번호, 닉네임)|
| /registration | 회원가입 |-|-|-|
| /jwt-login | 로그인 |-|-|-|
| /logout | 로그아웃 |-|-|-|
| /send-auth-email | 인증 메일 보내기 |-|-|-|
| /jwt-refresh | JWT 토큰 재발급|-|-|-|
| /jwt-verify | JWT 토큰 유효성 확인 |-|-|-|
| /active/<str:uidb64>/<str:token> |-| 인증메일에 사용하는 URL |-|-|

* GET /api/user와 DELETE /api/user를 통해서 사용자의 정보를 확인하거나, 삭제할 수 있습니다. DELETE 요청의 body에는 password(현재 비밀번호)가 들어갑니다.
  PUT 요청을 보내면 현재 사용자의 프로필(비밀번호, 닉네임)을 수정할 수 있습니다.
  PUT 요청의 body는 curPassword(현재 비밀번호), newPassword(바꿀 비밀번호), nickname(닉네임)으로 이루어지며, 현재 비밀번호와 바꿀 비밀번호는 8자 이상 15자 이하의 영어 대소문자 및 숫자,
  닉네임은 2자 이상 15자 이하의 한글 및 영어 대소문자, 숫자로 구성되어야 합니다. 소셜 계정은 curPassword와 newPassword를 빈칸으로 보내면 되고, 일반 계정은 curPassword는 필수, 나머지 두 필드는
  바꿀 부분만 값을 넣고 바꾸지 않을 부분은 빈칸으로 해서 요청 보내주시면 됩니다.

* POST /api/register 는 HTTP body에 json 형식으로 username, password, email 필드를 필수로 넘겨줘야 하며, phone_num 필드는 선택사항입니다.

* POST /api/jwt-login은 HTTP body에 json 형식으로 username, password를 넘겨줘야 하며, 서버는 response로 HttpOnly 속성을 지닌 쿠키에 JWT 토큰을 담아서 보내줍니다.
   한번 로그인했을 때 토큰의 유효시간은 30분입니다.

* POST /api/jwt-refresh는 HTTP body에 json 형식으로 token : <발급받은 토큰>을 넣어주면 유효 시간이 갱신된 새로운 토큰을 받을 수 있습니다.
  발급받은 토큰이 만료되면 새로운 토큰을 받을 수 없으니, 만료 되기 전에 이 URL을 통해 새로운 토큰을 발급받으면 됩니다(페이지에 버튼을 따로 만들거나 하면 될것같아요).
  
* POST /api/jwt-verify는 현재 클라이언트 브라우저에 저장되어 있는 HttpOnly 쿠키 안에 있는 jwt 토큰의 유효성을 확인합니다. 

* POST /api/logout을 통해 로그아웃을 수행할 수 있으며, 클라이언트 브라우저에서 JWT 토큰이 저장된 쿠키를 삭제합니다.
   
* /active/<str:uidb64>/<str:token>은 인증메일용 URL로, 이메일 인증에만 사용됩니다.

팀 관련 API
--------------------
|           | POST    | GET        | DELETE  | PUT |
|:--------------:|:-------:|:--------------------------: |:-------:|:------:|
| /team | 새로운 팀 생성 |전체 팀 정보 확인|-|-|
| /team-management/<팀 id>|-|팀 정보 출력(팀명, 팀장, 팀원목록, 공유폴더 목록)|팀 삭제(팀장만 가능)|팀 이름 변경|
| /team/<팀 id>/invitation|-|-|-|새로운 팀원 초대 (팀장만 가능)|
| /team/<팀 id>/acceptance|-|-|초대 거부|초대 수락|
| /team/<팀 id>/secession |-|-|-|팀에서 탈퇴|
| /team/<팀 id>/sharing | 공유폴더 설정 |-|공유폴더 해제|-|
| /join-team|-| 현재 사용자가 속한 팀 목록 출력|-|-|
| /serach-user/<팀 id>/<검색단어>|-|검색 단어에 닉네임에 포함되어 있는 사용자를 검색하여 pk, 닉네임, 이메일 반환|-|-|

* /team으로의 POST 요청을 통해 새로운 팀을 생성할 수 있으며, GET 요청을 통해 현재 생성되어 있는 전체 팀의 정보를 확인할 수 있습니다. POST요청의 body에는 teamName(팀 이름), teamLeader(팀 만든사람)이 포함되어야 합니다.

* /team/<팀 id>으로의 GET 요청을 통해 해당 팀의 정보를 확인할 수 있으며, DELETE 요청을 통해 해당 팀을 제거할 수 있습니다.

* /team/<팀 id>/invitation으로의 PUT 요청을 통해 새로운 사용자를 팀으로 들어오도록 초대할 수 있습니다. 초대받은 사용자는 아래의 /team/<팀 id>/acceptance URL을 통하여 초대를 수락하거나 거부할 수 있습니다.

* /team/<팀 id>/acceptance으로의 PUT 요청을 통해 초대를 수락할 수 있으며, DELETE 요청을 통해 초대를 거부할 수 있습니다.

* /team/<팀 id>/secession으로의 PUT 요청을 통해 소속된 팀에서 탈퇴할 수 있습니다.

* /team/<팀 id>/sharing으로의  POST 요청을 통해 공유폴더를 설정할 수 있으며, DELETE 요청을 통해 설정된 공유폴더를 해제할 수 있습니다. POST 요청 body에는 공유 폴더로 설정할 디렉토리의 ID가 포함되어야 합니다.

* /team/join-team으로의 GET 요청을 통해 현재 사용자가 속한 팀 목록을 확인할 수 있습니다.

* /search-user/<팀 id>/<검색단어>로의 GET 요청을 통해 검색단어가 닉네임에 포함되어 있는 사용자를 검색하여 pk, 닉네임, 이메일을 반환합니다. 팀장 및 이미 팀에 속해있는 사용자는 검색되지 않습니다.
파일 관련 API
--------------------
|           | POST    | GET        | DELETE  | PUT |
|:--------------:|:-------:|:--------------------------: |:-------:|:------:|
| /file/<str:file_id>|-|현재 로그인한 사용자가 가지고 있는 특정 파일의 정보 출력|파일 삭제|-|
| /file-list|-|현재 로그인한 사용자가 가지고 있는 전체 파일 정보 출력|-|-|
| /upload/flow$|파일 업로드 시작 전에 파일 크기를 서버로 전송|-|-|-|
| /upload/flow/(?P<pk>[0-9a-z-]{36})|chunk 전송|특정 chunk를 이미 전송받았는지 확인|-|-|
| /download/<str:file_id> |-|파일 다운로드|-|-|
| /mkdir |디렉토리 생성|-|-|-|
| /directory/<id>|-|특정 디렉터리 하위 폴더 및 파일 정보 출력|디렉토리 삭제|디렉토리명 변경|

* /file/<str:file_id>로 GET 요청을 보내면, 현재 로그인한 사용자가 가지고 있는 특정 파일의 정보를 받을 수 있습니다. 사용자가 웹페이지에서 특정 아이콘을 클릭하면, 그 아이콘이 가지고 있는
  파일 ID를 통해서 파일의 상세 정보를 받을 수 있습니다. DELETE 요청을 보내면 해당 파일을 삭제할 수 있습니다.
  
* /file-list로 GET 요청을 보내면 현재 로그인한 사용자가 가지고 있는 전체 파일 정보를 받을 수 있습니다.

* /upload/flow$는 업로드 시작 전에 파일의 크기를 서버로 보내어 사용자에게 할당된 공간에 파일을 저장할 수 있는지 확인합니다. POST 요청을 사용합니다.

* /upload/flow/(?P<pk>[0-9a-f]{24})는 chunk를 전송하거나 특정 chunk를 이미 전송받았는지 확인합니다. 이는 flow.js에서 담당하므로 직접 요청을 보낼 필요는 없습니다.

* /download/<str:file_id>로 GET 요청을 보내면 그 파일 ID를 가진 파일을 다운로드 받을 수 있습니다.

* /mkdir에 POST 요청을 보내면 현재 사용자가 소유한 새 디렉토리를 생성합니다. HTTP body는 다음 필드를 포함해야합니다:
  * `parent`: 디렉토리가 생성될 상위 디렉토리. 상위 디렉토리의 경로나(`/`, `/parent_dir` 등) ID(`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) 형식으로 지정 가능합니다.
  * `name`: 새 디렉토리의 이름. 상위 디렉토리에 같은 이름의 디렉토리나 파일이 없어야 합니다.

* /directory/<id>에 GET 요청을 보내면 해당 id를 가진 디렉토리의 정보를 반환합니다. 반환되는 정보의 형식은 다음과 같습니다.
  * 'pk`: 현재 디렉토리의 ID.
  * 'owner': 디렉토리 소유자의 ID.
  * 'name': 디렉토리의 이름.
  * 'parent': 상위 디렉토리의 ID.
  * `subdirectories`: 하위 디렉토리의 이름을 키, id를 값으로 하는 딕셔너리.
  * `files`: 디렉토리에 든 파일의 목록; 이름을 키로 하며, /file/ 엔드포인트가 반환하는 것과 같은 값을 값으로 하는 딕셔너리.
  * `partial_uploads`: 해당 디렉토리에 진행중인 업로드의 목록; 이름을 키로 하며, id를 값으로 하는 딕셔너리.
   
  예를 들어, 다음과 같은 형식으로 반환됩니다.
  ```json
  {
    "pk": "12f79f24-5521-4274-9de4-a77eda8a1fa5",
    "owner": "aca27a1e-c940-4f91-b490-92a404209848",
    "name": "Pictures",
    "parent": "86882148-dba7-46ad-814b-ce6389a1c1d0",
    "subdirectories": {
      "2020-03": "5de3a6a2-58ea-4385-9d6f-6d898e610279",
      "2020-04": "88063b0f-7cf6-4829-b949-0353c725ca81"
    },
    "files": {
      "wallpaper.png": {
        "pk": "f840d10f-1149-4919-ba4b-895a9ca5df98",
        "size": 253952,
        "uploaded_at": "2020-01-29T12:34:56.000000Z",
        "has_thumbnail": true
      }
    },
    "partial_uploads": {
      "cat.jpeg": "df66ea02-61bf-405f-85ea-94ee497089d5"
    }
  }
  ```
* /directory/<id>에 GET 요청을 보내면 해당 디렉토리에 저장되어 있는 하위 폴더 및 파일의 정보를 확인할 수 있으며, DELETE 요청을 보내면 해당 디렉토리를 삭제합니다.
  PUT 요청을 보내면 해당 디렉토리의 이름을 변경할 수 있습니다.


사용예
------------------
1. 전체 유저 목록 출력
![1  전체 유저 목록 출력](https://user-images.githubusercontent.com/49271247/79839313-4f5ae200-83ef-11ea-99c1-f62e9c794d90.png)

2. 회원가입
![2  회원 가입](https://user-images.githubusercontent.com/49271247/79839454-7e715380-83ef-11ea-960f-f6f6b253f71d.png)

3. 메일 인증 하지 않고 로그인 시도할 때
![3  메일 인증 미수행](https://user-images.githubusercontent.com/49271247/79839458-803b1700-83ef-11ea-95b4-e2621776ed8f.png)

4. 인증 메일
![4  인증 메일](https://user-images.githubusercontent.com/49271247/79839460-80d3ad80-83ef-11ea-80e3-db72271c51e4.png)

5. 메일에 있는 URL을 통한 계정 활성화
![5  메일 활성화](https://user-images.githubusercontent.com/49271247/79839461-80d3ad80-83ef-11ea-88d7-b6b76a149746.png)

6. 로그인 성공
![6  로그인 성공](https://user-images.githubusercontent.com/49271247/79839464-816c4400-83ef-11ea-887c-9c60394b3556.png)

7. 프로필 보기
![프로필 보기](https://user-images.githubusercontent.com/49271247/79839466-8204da80-83ef-11ea-8699-96fc944bd702.png)

8. 회원 탈퇴
![회원 탈퇴](https://user-images.githubusercontent.com/49271247/79839467-8204da80-83ef-11ea-8607-150b67794d55.png)


