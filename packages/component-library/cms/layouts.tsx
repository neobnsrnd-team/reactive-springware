/**
 * @file layouts.tsx
 * @description CMS LayoutRenderer 구현.
 * CMS 빌더의 캔버스·미리보기 영역에서 페이지 크롬(헤더·푸터)을 렌더링한다.
 *
 * 지원 layoutType:
 * - "home"  : HomePageLayout 헤더 + BottomNav 푸터
 * - "page"  : PageLayout 헤더 + 선택적 하단 버튼 바 푸터
 * - "blank" : 헤더·푸터 없이 콘텐츠만 렌더링
 *
 * @example
 * // your-cms-app/src/main.tsx
 * import { layoutRenderer } from "@reactivespringware/component-library/cms/layouts";
 * <CMSApp blocks={blocks} layoutRenderer={layoutRenderer} />
 */
import React from 'react';
import type { LayoutRenderer } from "@neobnsrnd-team/cms-core";
import type {
  LayoutState,
  PageHeaderProps,
  HomeHeaderProps,
  FooterProps,
} from "@neobnsrnd-team/cms-core";
import {
  ChevronLeft,
  User,
  Bell,
  Menu,
  Home,
  Wallet,
  ShoppingBag,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@lib/cn';
import { Button } from '../core/Button';
import { Inline } from '../layout/Inline';

// ─────────────────────────────────────────────────────────────────────────────
// HomePageLayout 헤더
// ─────────────────────────────────────────────────────────────────────────────

/**
 * HomePageLayout의 상단 헤더 전용 컴포넌트.
 * CMS 캔버스에서 header 슬롯으로 렌더링된다.
 *
 * @param appName - 헤더 타이틀 (예: '하나은행')
 * @param hasNotification - 알림 벨 배지 표시 여부
 */
function HomeHeader({ appName, hasNotification }: HomeHeaderProps) {
  return (
    <header className="sticky top-0 z-[20] backdrop-blur-sm bg-white/80 border-b border-border-subtle">
      <div className="flex items-center h-14 px-standard gap-sm">
        {/* 좌측: 앱 이름 타이틀 */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-xl font-bold text-brand leading-none">
            {appName ?? "하나은행"}
          </h1>
        </div>

        {/* 우측: 프로필·알림·메뉴 아이콘 버튼 그룹 */}
        <div className="shrink-0 flex items-center gap-1">
          <button
            type="button"
            aria-label="프로필"
            className="flex items-center justify-center size-9 rounded-full text-text-muted"
          >
            <User className="size-4" aria-hidden="true" />
          </button>

          {/* 알림 버튼: hasNotification 시 빨간 뱃지 표시 */}
          <button
            type="button"
            aria-label="알림"
            className="relative flex items-center justify-center size-9 rounded-full text-text-muted"
          >
            <Bell className="size-4" aria-hidden="true" />
            {hasNotification && (
              <span
                aria-hidden="true"
                className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger-badge border-2 border-white"
              />
            )}
          </button>

          <button
            type="button"
            aria-label="메뉴"
            className="flex items-center justify-center size-9 rounded-full text-text-muted"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HomePageLayout 푸터 (BottomNav)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CMS 미리보기용 BottomNav 정적 렌더링.
 * 클릭 이벤트 없이 시각적 구조만 제공한다.
 * 홈(3번째) 탭을 기본 활성 상태로 표시한다.
 */
function HomeFooter() {
  const tabs = [
    { id: 'asset',   icon: <Wallet className="size-5" />,        label: '자산'  },
    { id: 'product', icon: <ShoppingBag className="size-5" />,   label: '상품'  },
    { id: 'home',    icon: <Home className="size-6" />,          label: '홈'    },
    { id: 'card',    icon: <CreditCard className="size-5" />,    label: '카드'  },
    { id: 'chat',    icon: <MessageSquare className="size-5" />, label: '챗봇'  },
  ] as const;

  return (
    <nav
      aria-label="하단 메뉴"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[20]',
        'flex items-end justify-around',
        'pt-sm pb-2 px-standard',
        'backdrop-blur-sm bg-surface/95 border-t border-border-subtle',
      )}
    >
      {tabs.map((tab, i) => {
        // 홈(index 2)을 기본 활성 탭으로 고정
        const isActive = i === 2;
        return (
          <div
            key={tab.id}
            className={cn(
              'relative flex flex-col items-center gap-xs',
              'min-w-[50px] pt-xs pb-3 px-md rounded-lg',
              isActive ? 'text-brand-text' : 'text-text-muted',
            )}
          >
            {tab.icon}
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-brand"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageLayout 헤더
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PageLayout의 상단 헤더 전용 컴포넌트.
 * CMS 캔버스에서 header 슬롯으로 렌더링된다.
 *
 * @param title    - 헤더 타이틀
 * @param showBack - true이면 좌측에 뒤로가기(<) 버튼 표시
 */
function PageHeader({ title, showBack }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-[20] bg-surface border-b border-border-subtle">
      {/* relative: 타이틀 absolute 포지셔닝의 기준점 */}
      <div className="relative flex items-center h-14 px-standard">
        {showBack && (
          <button
            type="button"
            aria-label="이전 페이지로 이동"
            className={cn(
              'flex items-center justify-center size-9 rounded-lg -ml-sm',
              'text-text-muted',
            )}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* 타이틀: absolute로 헤더 전체 너비 기준 진짜 중앙 정렬.
            pointer-events-none: 절대 위치 타이틀이 버튼 클릭을 막지 않도록 처리 */}
        <h1 className="absolute inset-x-0 px-14 text-center text-base font-bold text-text-heading truncate pointer-events-none">
          {title ?? ""}
        </h1>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PageLayout 푸터 (하단 고정 버튼 바)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PageLayout의 하단 고정 버튼 바 전용 컴포넌트.
 * buttonCount에 따라 1개(primary) 또는 2개(secondary + primary) 버튼을 렌더링한다.
 *
 * @param footer - FooterProps (primaryLabel, secondaryLabel, buttonCount)
 */
function PageFooter({ footer }: { footer: FooterProps }) {
  const {
    primaryLabel   = "확인",
    secondaryLabel = "취소",
    buttonCount    = 1,
  } = footer;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[20]',
        'backdrop-blur-sm bg-surface/80 border-t border-border-subtle',
        'px-standard pt-standard pb-2xl',
      )}
    >
      <Inline gap="sm">
        {/* 2버튼 모드: secondary(outline) + primary 순서 */}
        {buttonCount === 2 && (
          <Button variant="outline" size="lg" fullWidth>
            {secondaryLabel}
          </Button>
        )}
        <Button variant="primary" size="lg" fullWidth>
          {primaryLabel}
        </Button>
      </Inline>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LayoutRenderer
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CMS 빌더에 제공하는 레이아웃 렌더러.
 * layoutType에 따라 적합한 헤더·푸터 ReactNode를 반환한다.
 *
 * | layoutType | 헤더              | 푸터                     |
 * |------------|-------------------|--------------------------|
 * | "home"     | HomeHeader        | HomeFooter (BottomNav)   |
 * | "page"     | PageHeader        | PageFooter (footer.show 시) |
 * | "blank"    | 없음              | 없음                     |
 */
export const layoutRenderer: LayoutRenderer = (layoutType, layoutProps) => {
  // layoutProps는 CMS 레이아웃 에디터에서 입력한 LayoutState 구조
  const state = layoutProps as LayoutState;

  // ── home 레이아웃 ─────────────────────────────────────────────
  if (layoutType === "home") {
    const header = (state.header ?? {}) as HomeHeaderProps;
    return {
      header: <HomeHeader {...header} />,
      // BottomNav는 홈 레이아웃에 항상 포함
      footer: <HomeFooter />,
    };
  }

  // ── page 레이아웃 ─────────────────────────────────────────────
  if (layoutType === "page") {
    const header = (state.header ?? {}) as PageHeaderProps;
    const footer = state.footer as FooterProps | undefined;
    return {
      header: <PageHeader {...header} />,
      // footer.show가 true인 경우에만 하단 버튼 바 렌더링
      footer: footer?.show ? <PageFooter footer={footer} /> : undefined,
    };
  }

  // ── blank 레이아웃 ────────────────────────────────────────────
  // 로그인·온보딩 전용. 헤더·푸터 없이 콘텐츠만 전체 화면으로 표시
  return {};
};
