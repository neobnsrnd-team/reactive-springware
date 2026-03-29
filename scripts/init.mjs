#!/usr/bin/env node
/**
 * @file init.mjs
 * @description rs-init CLI 스크립트.
 *
 * npm install 후 `npx rs-init` 으로 실행하면 아래 파일·폴더를 현재 프로젝트 루트(cwd)로 복사한다.
 *
 * 복사 결과:
 *   <project-root>/
 *     CLAUDE.md          ← docs/CLAUDE.md
 *     .claude.rules      ← .claude.rules  (Claude Code 자동 로드 위해 루트 필수)
 *     rs-rules/          ← rules/         (CLAUDE.md가 rs-rules/*.md 경로로 참조)
 *     rs-docs/
 *       component-map.md ← docs/component-map.md
 *       setup-guide.md   ← docs/setup-guide.md
 *
 * @example
 * npx rs-init
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/** 패키지 루트 (scripts/ 기준 한 단계 위) */
const pkgRoot = resolve(__dirname, '..');
const cwd     = process.cwd();

/**
 * 단일 파일을 복사한다.
 * @param {string} src        - 복사 원본 절대경로
 * @param {string} dest       - 복사 대상 절대경로
 * @param {string} label      - 로그 출력용 파일명
 */
function copyFile(src, dest, label) {
  if (!existsSync(src)) {
    console.error(`[rs-init] ${label} 파일을 찾을 수 없습니다.`);
    process.exit(1);
  }
  if (existsSync(dest)) {
    console.warn(`[rs-init] ${label}가 이미 존재합니다. 덮어씁니다...`);
  }
  mkdirSync(resolve(dest, '..'), { recursive: true }); // 상위 디렉터리 보장
  copyFileSync(src, dest);
  console.log(`[rs-init] ✔ ${label} 복사 완료`);
}

/**
 * 디렉터리를 재귀적으로 복사한다. (cpSync 대신 사용)
 * cpSync가 일부 Node.js 버전·환경에서 무음 종료되는 문제가 있어 수동 구현으로 대체.
 * @param {string} src  - 복사 원본 디렉터리 절대경로
 * @param {string} dest - 복사 대상 디렉터리 절대경로
 */
function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath  = resolve(src, entry);
    const destPath = resolve(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * 디렉터리를 복사한다.
 * @param {string} srcDir  - 패키지 내 원본 디렉터리명
 * @param {string} destDir - 프로젝트 루트 기준 대상 디렉터리명
 * @param {string} label   - 로그 출력용 이름
 */
function copyDir(srcDir, destDir, label) {
  const src  = resolve(pkgRoot, srcDir);
  const dest = resolve(cwd, destDir);

  if (!existsSync(src)) {
    console.error(`[rs-init] ${label} 폴더를 찾을 수 없습니다.`);
    process.exit(1);
  }
  if (existsSync(dest)) {
    console.warn(`[rs-init] ${label} 폴더가 이미 존재합니다. 덮어씁니다...`);
  }
  copyDirRecursive(src, dest);
  console.log(`[rs-init] ✔ ${label} 복사 완료`);
}

/** docs/CLAUDE.md → <project-root>/CLAUDE.md
 *  기존 CLAUDE.md가 있으면 덮어쓰지 않고 CLAUDE.md.bak으로 이름을 바꿔 보존한다. */
const claudeDest = resolve(cwd, 'CLAUDE.md');
if (existsSync(claudeDest)) {
  const bakPath = resolve(cwd, 'CLAUDE.md.bak');
  renameSync(claudeDest, bakPath);
  console.log('[rs-init] 기존 CLAUDE.md → CLAUDE.md.bak 으로 백업합니다.');
}
copyFile(resolve(pkgRoot, 'docs/CLAUDE.md'), claudeDest, 'CLAUDE.md');

/** docs/.claude.rules → <project-root>/.claude.rules (Claude Code가 루트에서만 자동 로드) */
copyFile(resolve(pkgRoot, 'docs/.claude.rules'), resolve(cwd, '.claude.rules'), '.claude.rules');

/** rules/ → <project-root>/rs-rules/ */
copyDir('rules', 'rs-rules', 'rs-rules/');

/** docs/component-map.md → <project-root>/rs-docs/component-map.md */
copyFile(
  resolve(pkgRoot, 'docs/component-map.md'),
  resolve(cwd, 'rs-docs/component-map.md'),
  'rs-docs/component-map.md',
);

/** docs/setup-guide.md → <project-root>/rs-docs/setup-guide.md */
copyFile(
  resolve(pkgRoot, 'docs/setup-guide.md'),
  resolve(cwd, 'rs-docs/setup-guide.md'),
  'rs-docs/setup-guide.md',
);

/** src/main.{tsx,jsx,ts,js} 또는 src/index.{tsx,jsx,ts,js} 에 CSS import 2줄 자동 주입.
 *  이미 import가 존재하면 건너뛴다. */
injectCssImports();

console.log('\n[rs-init] ✨ 초기화 완료. 이제 Reactive-Springware를 사용할 수 있습니다.');

/**
 * 고객사 프로젝트의 진입 파일을 찾아 컴포넌트 라이브러리 CSS import를 주입한다.
 *
 * 주입 대상 import:
 *   import '@reactive-springware/component-lib/dist/index.css';
 *   import '@reactive-springware/component-lib/design-tokens';
 *
 * Tailwind CSS는 컴포넌트 빌드 시 dist/index.css로 추출되므로
 * 고객사 프로젝트에 별도 Tailwind 설정 없이 이 파일 하나만 import하면 스타일이 적용된다.
 */
function injectCssImports() {
  /** 탐색할 진입 파일 후보 목록 (우선순위 순) */
  const candidates = [
    'src/main.tsx', 'src/main.jsx', 'src/main.ts', 'src/main.js',
    'src/index.tsx', 'src/index.jsx', 'src/index.ts', 'src/index.js',
  ];

  const entryFile = candidates.map(p => resolve(cwd, p)).find(existsSync);

  if (!entryFile) {
    console.warn('[rs-init] ⚠ 진입 파일(src/main.* 또는 src/index.*)을 찾지 못했습니다.');
    console.warn('[rs-init]   아래 두 줄을 진입 파일 상단에 직접 추가하세요:');
    console.warn("            import '@reactive-springware/component-lib/dist/index.css';");
    console.warn("            import '@reactive-springware/component-lib/design-tokens';");
    return;
  }

  const PKG = '@reactive-springware/component-lib';
  const CSS_IMPORT    = `import '${PKG}/dist/index.css';`;
  const TOKENS_IMPORT = `import '${PKG}/design-tokens';`;

  let content = readFileSync(entryFile, 'utf8');

  const alreadyHasCss    = content.includes(`${PKG}/dist/index.css`);
  const alreadyHasTokens = content.includes(`${PKG}/design-tokens`);

  if (alreadyHasCss && alreadyHasTokens) {
    console.log('[rs-init] CSS import가 이미 존재합니다. 건너뜁니다.');
    return;
  }

  /** 이미 없는 항목만 prepend */
  const lines = [];
  if (!alreadyHasCss)    lines.push(CSS_IMPORT);
  if (!alreadyHasTokens) lines.push(TOKENS_IMPORT);

  writeFileSync(entryFile, lines.join('\n') + '\n' + content, 'utf8');
  console.log(`[rs-init] ✔ CSS import 주입 완료 → ${entryFile.replace(cwd, '.')}`);
}
