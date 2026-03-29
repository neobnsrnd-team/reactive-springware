#!/usr/bin/env node
/**
 * @file cleanup.mjs
 * @description rs-cleanup CLI 스크립트.
 *
 * `npx rs-cleanup` 으로 실행하면 rs-init이 복사한 파일·폴더를
 * 현재 프로젝트 루트(cwd)에서 삭제한다.
 *
 * 삭제 대상:
 *   CLAUDE.md
 *   .claude.rules
 *   rs-rules/
 *   rs-docs/
 *
 * npm uninstall 전에 수동으로 실행한다.
 *
 * @example
 * npx rs-cleanup
 * npm uninstall @reactive-springware/component-lib
 */
import { existsSync, rmSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const cwd = process.cwd();

/**
 * 단일 파일을 삭제한다.
 * @param {string} relPath - 프로젝트 루트 기준 상대경로
 */
function removeFile(relPath) {
  const target = resolve(cwd, relPath);
  if (!existsSync(target)) {
    console.log(`[rs-cleanup] ${relPath}가 존재하지 않습니다. 건너뜁니다.`);
    return;
  }
  unlinkSync(target);
  console.log(`[rs-cleanup] ✔ ${relPath} 삭제 완료`);
}

/**
 * 디렉터리를 삭제한다.
 * @param {string} relPath - 프로젝트 루트 기준 상대경로
 */
function removeDir(relPath) {
  const target = resolve(cwd, relPath);
  if (!existsSync(target)) {
    console.log(`[rs-cleanup] ${relPath}/ 폴더가 존재하지 않습니다. 건너뜁니다.`);
    return;
  }
  rmSync(target, { recursive: true, force: true });
  console.log(`[rs-cleanup] ✔ ${relPath}/ 삭제 완료`);
}

removeFile('CLAUDE.md');
removeFile('.claude.rules');
removeDir('rs-rules');
removeDir('rs-docs');

console.log('\n[rs-cleanup] 🧹 정리 완료. 이제 npm uninstall을 실행하세요.');
