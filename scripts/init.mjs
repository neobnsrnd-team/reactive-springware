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

/** vite.config.{ts,js} 에 @tailwindcss/vite 플러그인 자동 등록.
 *  이미 등록되어 있으면 건너뛴다. */
injectTailwindPlugin();

/** src/**/*.css 에서 중복 Tailwind import를 자동 주석 처리.
 *  dist/index.css에 Tailwind가 이미 번들링되어 있으므로 중복 시 스타일이 깨진다. */
commentOutDuplicateTailwindImports();

/** src/main.{tsx,jsx,ts,js} 또는 src/index.{tsx,jsx,ts,js} 에 CSS import 자동 주입.
 *  이미 import가 존재하면 건너뛴다. */
injectCssImports();

console.log('\n[rs-init] ✨ 초기화 완료. 이제 Reactive-Springware를 사용할 수 있습니다.');
console.log('[rs-init] 📖 다음 단계는 rs-docs/setup-guide.md 를 확인하세요.');

/**
 * 고객사 프로젝트의 진입 파일을 찾아 컴포넌트 라이브러리 CSS import를 주입한다.
 *
 * 주입 대상 import:
 *   import '@reactive-springware/component-lib/dist/index.css';
 *
 * dist/index.css 안에 Tailwind 유틸리티 · 디자인 토큰 · 브랜드 변수가 모두 번들링되어 있으므로
 * 고객사 프로젝트에 Tailwind를 별도 설치·설정할 필요 없이 이 한 줄만으로 스타일이 적용된다.
 * (design-tokens/globals.css는 `@import "tailwindcss"`를 포함하므로 직접 import하면
 *  고객사 프로젝트에 Tailwind가 없을 경우 에러가 발생한다 — 절대 주입하지 않는다.)
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
    console.warn('[rs-init]   아래 한 줄을 진입 파일 상단에 직접 추가하세요:');
    console.warn("            import '@reactive-springware/component-lib/dist/index.css';");
    return;
  }

  const PKG = '@reactive-springware/component-lib';
  const CSS_IMPORT = `import '${PKG}/dist/index.css';`;

  let content = readFileSync(entryFile, 'utf8');

  if (content.includes(`${PKG}/dist/index.css`)) {
    console.log('[rs-init] CSS import가 이미 존재합니다. 건너뜁니다.');
    return;
  }

  writeFileSync(entryFile, CSS_IMPORT + '\n' + content, 'utf8');
  console.log(`[rs-init] ✔ CSS import 주입 완료 → ${entryFile.replace(cwd, '.')}`);
}

/**
 * 고객사 프로젝트의 vite.config.{ts,js}를 찾아 @tailwindcss/vite 플러그인을 자동 등록한다.
 *
 * design-tokens/globals.css는 `@import "tailwindcss"`를 사용하므로
 * Vite 빌드 파이프라인에 tailwindcss() 플러그인이 등록되어 있어야 스타일이 정상 처리된다.
 * @tailwindcss/vite는 패키지 설치 시 dependencies로 함께 설치되므로 별도 설치 불필요.
 *
 * 처리 방식:
 *   1) `import tailwindcss from '@tailwindcss/vite'` import 구문을 파일 상단에 추가
 *   2) plugins 배열 첫 번째 자리에 `tailwindcss()` 삽입
 *      - `plugins: [` 패턴을 찾아 바로 뒤에 삽입 (기존 플러그인 앞에 위치시켜 CSS 처리 우선순위 확보)
 */
function injectTailwindPlugin() {
  const candidates = ['vite.config.ts', 'vite.config.js', 'vite.config.mts', 'vite.config.mjs'];
  const configFile = candidates.map(p => resolve(cwd, p)).find(existsSync);

  if (!configFile) {
    console.warn('[rs-init] ⚠ vite.config 파일을 찾지 못했습니다.');
    console.warn('[rs-init]   vite.config.ts의 plugins 배열에 tailwindcss()를 직접 추가하세요:');
    console.warn("            import tailwindcss from '@tailwindcss/vite';");
    console.warn("            plugins: [tailwindcss(), ...]");
    return;
  }

  let content = readFileSync(configFile, 'utf8');

  if (content.includes('@tailwindcss/vite')) {
    console.log('[rs-init] tailwindcss 플러그인이 이미 등록되어 있습니다. 건너뜁니다.');
    return;
  }

  // import 구문 추가 — 기존 import 블록 마지막 줄 뒤에 삽입
  const importLine = "import tailwindcss from '@tailwindcss/vite';";
  const lastImportMatch = content.match(/^import .+$/gm);
  if (lastImportMatch) {
    const lastImport = lastImportMatch[lastImportMatch.length - 1];
    content = content.replace(lastImport, lastImport + '\n' + importLine);
  } else {
    // import 구문이 하나도 없으면 파일 맨 앞에 추가
    content = importLine + '\n' + content;
  }

  // plugins 배열 첫 번째 자리에 tailwindcss() 삽입
  // `plugins: [` 또는 `plugins: [\n` 패턴 모두 처리
  if (content.includes('plugins:')) {
    content = content.replace(/plugins\s*:\s*\[/, 'plugins: [tailwindcss(), ');
  } else {
    console.warn('[rs-init] ⚠ vite.config에서 plugins 배열을 찾지 못했습니다.');
    console.warn('[rs-init]   plugins 배열에 tailwindcss()를 직접 추가하세요.');
  }

  writeFileSync(configFile, content, 'utf8');
  console.log(`[rs-init] ✔ tailwindcss 플러그인 등록 완료 → ${configFile.replace(cwd, '.')}`);
}

/**
 * 고객사 프로젝트의 src/ 하위 CSS 파일을 재귀 탐색하여
 * `@import "tailwindcss"` 또는 `@import 'tailwindcss'` 구문을 주석 처리한다.
 *
 * dist/index.css에 Tailwind 유틸리티·테마가 이미 번들링되어 있으므로
 * 고객사 CSS에 Tailwind가 중복 import되면 preflight(CSS reset)가 중복 적용되어
 * 버튼 곡선·폰트 크기 등 컴포넌트 스타일이 덮어써지는 문제가 발생한다.
 *
 * 처리 대상 패턴 (변형 모두 포함):
 *   @import "tailwindcss";
 *   @import 'tailwindcss';
 *   @import "tailwindcss/preflight";  (preflight만 단독 import한 경우)
 */
function commentOutDuplicateTailwindImports() {
  const srcDir = resolve(cwd, 'src');
  if (!existsSync(srcDir)) return;

  /** CSS 파일을 재귀 탐색하여 경로 목록 반환 */
  function collectCssFiles(dir) {
    const files = [];
    for (const entry of readdirSync(dir)) {
      const fullPath = resolve(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        files.push(...collectCssFiles(fullPath));
      } else if (entry.endsWith('.css')) {
        files.push(fullPath);
      }
    }
    return files;
  }

  // @import "tailwindcss" / @import 'tailwindcss' 및 preflight 단독 import 패턴
  const TAILWIND_IMPORT_RE = /^(\s*@import\s+['"]tailwindcss(?:\/preflight)?['"]\s*;)/gm;

  let totalCommented = 0;

  for (const cssFile of collectCssFiles(srcDir)) {
    let content = readFileSync(cssFile, 'utf8');

    // 이미 주석 처리된 줄은 건너뜀 (/* ... */ 안에 있는 패턴 무시)
    const updated = content.replace(TAILWIND_IMPORT_RE, (match) => {
      totalCommented++;
      return `/* [rs-init] Tailwind가 dist/index.css에 번들링되어 있으므로 중복 import를 비활성화합니다.\n   ${match.trim()} */`;
    });

    if (updated !== content) {
      writeFileSync(cssFile, updated, 'utf8');
      console.log(`[rs-init] ✔ Tailwind 중복 import 주석 처리 → ${cssFile.replace(cwd, '.')}`);
    }
  }

  if (totalCommented === 0) {
    console.log('[rs-init] Tailwind 중복 import 없음. 건너뜁니다.');
  }
}
