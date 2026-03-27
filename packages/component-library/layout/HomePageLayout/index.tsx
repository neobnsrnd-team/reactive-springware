/**
 * @file index.tsx
 * @description 홈/메인 대시보드 전용 레이아웃 컴포넌트.
 * layoutType: 'home' (component-map.md §1.3)
 *
 * PageLayout과의 차이:
 * - 뒤로가기 버튼 없음 (홈은 루트 화면)
 * - 인사말(greeting) 영역 지원
 * - 하단 글로벌 탭바 여백(pb-nav) 자동 처리
 * - 우측 기본 액션: Bell(알림) 아이콘
 *
 * @example
 * <HomePageLayout title="하나은행" greeting="홍길동님, 안녕하세요">
 *   <BannerCarousel items={banners} />
 *   <QuickMenuGrid items={menus} />
 * </HomePageLayout>
 */
import React from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@lib/cn';
import type { HomePageLayoutProps } from './types';

export type { HomePageLayoutProps } from './types';

export function HomePageLayout({
  title,
  logo,
  greeting,
  rightAction,
  withBottomNav = true,
  className,
  children,
  ...props
}: HomePageLayoutProps) {
  return (
    <div className={cn('flex flex-col min-h-dvh', className)} {...props}>
      {/* ── 상단 고정 헤더 ────────────────────────────── */}
      <header className="sticky top-0 z-sticky bg-surface border-b border-border-subtle">
        <div className="flex items-center h-14 px-standard gap-sm">
          <div className="flex-1 flex flex-col justify-center">
            {/* 인사말 — greeting 전달 시만 노출 */}
            {greeting && <p className="text-xs text-text-muted leading-none mb-0.5">{greeting}</p>}
            <div className="flex items-center gap-xs">
              {/* 로고 아이콘 — logo 전달 시만 노출 */}
              {logo && <span aria-hidden="true">{logo}</span>}
              <h1 className="text-base font-bold text-text-heading leading-none">{title}</h1>
            </div>
          </div>

          {/* 우측 액션 슬롯 — 미전달 시 기본 Bell 아이콘 버튼 */}
          <div className="shrink-0">
            {rightAction ?? (
              <button
                type="button"
                aria-label="알림"
                className={cn(
                  'flex items-center justify-center size-9 rounded-lg',
                  'text-text-muted hover:bg-surface-raised hover:text-text-heading',
                  'transition-colors duration-150',
                )}
              >
                <Bell className="size-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── 스크롤 가능한 본문 영역 ────────────────────── */}
      <main
        className={cn(
          'flex-1 overflow-y-auto',
          /* 하단 탭바(80px) 높이만큼 여백 확보 — 탭바가 콘텐츠를 가리지 않도록 */
          withBottomNav && 'pb-nav',
        )}
      >
        {children}
      </main>
    </div>
  );
}
