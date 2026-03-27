#!/usr/bin/env node
/**
 * @file init.mjs
 * @description rpf-init CLI 스크립트.
 *
 * npm install 후 `npx rpf-init` 으로 실행하면
 * 패키지 내 docs/CLAUDE.md와 rules/ 폴더를 현재 프로젝트 루트(cwd)로 복사한다.
 *
 * CLAUDE.md가 참조하는 rules/*.md 파일들도 함께 복사해야
 * Claude Code가 올바른 경로로 규칙 파일을 읽을 수 있다.
 *
 * @example
 * npx rpf-init
 */
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/** 패키지 루트 (scripts/ 기준 한 단계 위) */
const pkgRoot = resolve(__dirname, '..');
const cwd     = process.cwd();

/** docs/CLAUDE.md → <project-root>/CLAUDE.md */
function copyClaude() {
  const src  = resolve(pkgRoot, 'docs/CLAUDE.md');
  const dest = resolve(cwd, 'CLAUDE.md');

  if (!existsSync(src)) {
    console.error('[rpf-init] docs/CLAUDE.md 파일을 찾을 수 없습니다.');
    process.exit(1);
  }
  if (existsSync(dest)) {
    console.warn('[rpf-init] CLAUDE.md가 이미 존재합니다. 덮어씁니다...');
  }
  copyFileSync(src, dest);
  console.log('[rpf-init] ✔ CLAUDE.md 복사 완료');
}

/**
 * rules/ → <project-root>/rules/
 * CLAUDE.md가 rules/01-architecture.md 형태의 상대경로로 규칙 파일을 참조하므로
 * 프로젝트 루트에 rules/ 폴더가 존재해야 Claude Code가 정상적으로 읽을 수 있다.
 */
function copyRules() {
  const src  = resolve(pkgRoot, 'rules');
  const dest = resolve(cwd, 'rules');

  if (!existsSync(src)) {
    console.error('[rpf-init] rules/ 폴더를 찾을 수 없습니다.');
    process.exit(1);
  }
  if (existsSync(dest)) {
    console.warn('[rpf-init] rules/ 폴더가 이미 존재합니다. 덮어씁니다...');
  }
  cpSync(src, dest, { recursive: true });
  console.log('[rpf-init] ✔ rules/ 복사 완료');
}

copyClaude();
copyRules();
console.log('\n[rpf-init] 초기화 완료. 이제 Claude Code를 사용할 수 있습니다.');
