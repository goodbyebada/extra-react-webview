# EXTRA

## Commit Convention

커밋 템플릿 사용법

```bash
$ git config --global commit.template .gitmessage.txt
```

이후 git commit 시

```bash
$ git commit
```

```markdown
# <타입> : <제목> 형식으로 작성하며 제목은 최대 50글자 정도로만 입력

# 제목을 아랫줄에 작성, 제목 끝에 마침표 금지, 무엇을 했는지 명확하게 작성

################

# 본문(추가 설명)을 아랫줄에 작성

################

# 꼬릿말(footer)을 아랫줄에 작성 (관련된 이슈 번호 등 추가)

################
#Feat: 새로운 기능을 추가할 경우
#Fix: 버그를 고친 경우
#CSS: 등 사용자 UI 디자인 변경
#Docs: 문서를 수정한 경우
#Chore: 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
#Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
#Remove: 파일을 삭제하는 작업만 수행한 경우
#Refactor: 프로덕션 코드 리팩토링
#Test: 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
#!BREAKING: CHANGE|커다란 API 변경의 경우
#!HOTFIX: 급하게 치명적인 버그를 고쳐야하는 경우
################
```

메시지 입력 후 저장, 닫기를 누르면 자동으로 commit됨

## Branch Convention

### 브랜치 타입

- main: 메인 브랜치
- feature: 기능 개발 브랜치

### 설명 규칙

- 소문자로 작성합니다
- 공백 대신 하이픈(-)을 사용합니다
- 간결하고 명확하게 작성합니다

예시:

- feature/user-authentication
- feature/add-calendar-page

## Pull Request Guideline

main branch와 merge 전에 PR 진행

1. 원격 저장소에 브랜치 푸시합니다.
2. 'New Pull Request' 버튼으로 PR 생성합니다.

### 작성 가이드

1. 제목

- 커밋컨벤션에 맞춰서 간결하고 명확하게 작성합니다.
- 예: "feat: Add user authentication feature"

2. 설명

- 주요 변경사항에 대해서만 간략하게 나열합니다.
<<<<<<< HEAD
=======

## Code convention

### Package Structure

- src
  - api
  - assets
  - components
    - custom
    - modal
  - pages
  - redux
  - utills

### 주석
- 주석으로 어떤 UI 혹은 기능에 대한 설명 간단하게 작성합니다.

```bash
/**
 * 보조출연자 달력
 */
```
>>>>>>> d4b43e5e1bad0fbc529e1c9004daa172a732b614
