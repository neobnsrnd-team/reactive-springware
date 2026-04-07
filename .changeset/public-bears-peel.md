---
'@neobnsrnd-team/reactive-springware': patch
---

## @neobnsrnd-team/reactive-springware 패키지 배포 설정 및 changesets 적용

**`.github/workflows/publish.yml` — changesets/action 기반으로 변경 (버전 관리 + 배포 + Release 자동화)**

- 패키지명 @reactive-springware/component-lib → @neobnsrnd-team/reactive-springware 전면 변경
- `publish.yml` 워크플로우로 main 브랜치 push 시 GitHub Packages 자동 배포 추가
- `package.json` `"private": true` 제거 + `publishConfig` GitHub Packages 레지스트리 추가
- `README.md` `.npmrc`설정 추가 (토큰 발급 단계별 설명, 보안 주의사항)
- `docs/setup-guide.md` 설치 방법 업데이트
- `package.json` — `release` 스크립트 추가
- `@changesets/cli` devDependency 추가
- `.changeset/config.json` 생성 (changeset 설정)
