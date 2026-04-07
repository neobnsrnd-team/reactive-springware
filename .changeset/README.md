# Changesets

이 디렉터리는 changeset 파일을 저장합니다.

## 버전 릴리즈 방법

1. 기능 개발 완료 후 아래 명령어 실행:
   ```bash
   npx changeset
   ```
2. 변경 타입 선택: `major` / `minor` / `patch`
3. 변경 내용 입력 (CHANGELOG에 기록됨)
4. 생성된 `.changeset/*.md` 파일을 커밋 후 main에 머지
5. GitHub Actions이 자동으로 "Version Packages" PR 생성
6. PR 머지 시 → 버전 업데이트 + GitHub Packages 배포 + Release 생성
