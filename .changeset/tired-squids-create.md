---
'@neobnsrnd-team/reactive-springware': patch
---

\## figma-plugin 컴포넌트 폴더 분기 및 Typography 리네임

\- \\`figma-plugin/src/components/\\` 평탄 구조 → \\`core\\` / \\`module/banking\\` / \\`module/common\\` / \\`layout\\` / \\`biz\\` 분기 (git mv 히스토리 보존)

\- \\`createBizComponents.ts\\` → 컴포넌트별 파일 6개로 분리

\- \\`createCard.ts\\`, \\`createTabNav.ts\\` async 버그 수정 후 \\`main.ts\\` 등록 (38개 → 40개)

\- \\`packages/component-library/core/Text\\` → \\`core/Typography\\` 리네임, \\`Text\\` alias 제거 및 전체 참조 통일

\- figma-plugin async 반환 타입 오기재 및 \\`await\\` 누락 일괄 수정
