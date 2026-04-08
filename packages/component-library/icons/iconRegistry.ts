import * as LucideIcons from "lucide-react";
import type React from "react";


// 아이콘(SVG)이 공통으로 받는 속성 정의
export type BaseIconProps = React.ComponentPropsWithoutRef<'svg'>;

// 1. 이름 정규화 함수 (예: ChevronRight -> chevron-right, ArrowLeftRight -> arrow-left-right)
const normalizeIconName = (name: string) => {
  return name
    .replace(/([a-z])([A-Z])/g, "$1-$2") // CamelCase를 kebab-case로 변환
    .toLowerCase();
};

// 2. 동적 레지스트리 생성
export const ICON_REGISTRY = (Object.entries(LucideIcons) as [string, unknown][])
  .filter(([originalName, val]) =>
    /^[A-Z]/.test(originalName) &&
    typeof val === 'object' &&
    val !== null &&
    '$$typeof' in (val as object) &&
    typeof (val as Record<string, unknown>).displayName === 'string'
  )
  .reduce((acc, [originalName, Component]) => {
    const cleanName = normalizeIconName(originalName);
    acc[cleanName] = Component as React.ComponentType<BaseIconProps>;
    return acc;
  }, {} as Record<string, React.ComponentType<BaseIconProps>>);

// 여기서 타입을 바로 추출해서 내보냅니다.
export type IconName = keyof typeof ICON_REGISTRY;
