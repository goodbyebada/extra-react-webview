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
#DesignCSS: 등 사용자 UI 디자인 변경
#!BREAKING: CHANGE|커다란 API 변경의 경우
#!HOTFIX: 급하게 치명적인 버그를 고쳐야하는 경우
#Style: 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우
#Refactor: 프로덕션 코드 리팩토링
#Comment: 필요한 주석 추가 및 변경
#Docs: 문서를 수정한 경우
#Test: 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
#Chore: 빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
#Rename: 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
#Remove: 파일을 삭제하는 작업만 수행한 경우
################
```

메시지 입력 후 저장, 닫기를 누르면 자동으로 commit됨

> type(Optinoal): [#issueNumber - ]Subject
> body(Optional)
> footer(Optional)

- type: 어떤 의도로 커밋했는지 명시
- subject
  - 최대 50글자, 마침표 x
  - 영문: 첫 글자가 대문자로 된 동사(원형)을 가장에 배치
- body
  - 긴 설명이 필요한 경우
  - 무엇을 왜 했는지 작성
  - 최대 75글자
- footer
  - issue tracker ID를 명시하고 싶은 경우 작성

<table>
	<thead>
		<tr>
			<th>기능</th>
			<th>태그 이름</th>
			<th>설명</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>기능</td>
			<td>Feat</td>
			<td>새로운 기능을 추가할 경우</td>
		</tr>		
		<tr>
			<td></td>
			<td>Fix</td>
			<td>버그를 고친 경우</td>
		</tr>		
		<tr>
			<td></td>
			<td>Design</td>
			<td>CSS 등 사용자 UI 디자인 변경</td>
		</tr>		
		<tr>
			<td></td>
			<td>!BREAKING CHANGE</td>
			<td>커다란 API 변경의 경우</td>
		</tr>		
		<tr>
			<td></td>
			<td>!HOTFIX</td>
			<td>급하게 치명적인 버그를 고쳐야하는 경우</td>
		</tr>		
		<tr>
			<td>개선</td>
			<td>Style</td>
			<td>코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우</td>
		</tr>		
		<tr>
			<td></td>
			<td>Refactor</td>
			<td>프로덕션 코드 리팩토링</td>
		</tr>		
		<tr>
			<td></td>
			<td>Comment</td>
			<td>필요한 주석 추가 및 변경</td>
		</tr>		
		<tr>
			<td>그 외</td>
			<td>Docs</td>
			<td>문서 수정</td>
		</tr>		
		<tr>
			<td></td>
			<td>Docs</td>
			<td>문서 수정</td>
		</tr>		
		<tr>
			<td></td>
			<td>Test</td>
			<td>테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 x)</td>
		</tr>		
		<tr>
			<td></td>
			<td>Chore</td>
			<td>빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)</td>
		</tr>		
		<tr>
			<td></td>
			<td>Rename</td>
			<td>파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우</td>
		</tr>		
		<tr>
			<td></td>
			<td>Remove</td>
			<td>파일을 삭제하는 작업만 수행한 경우</td>
		</tr>		
	</tbody>
</table>

## Branch Convention
