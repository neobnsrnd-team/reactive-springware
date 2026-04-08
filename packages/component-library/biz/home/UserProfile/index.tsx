/**
 * @file index.tsx
 * @description 인증 사용자 프로필 컴포넌트.
 *
 * 전체 메뉴 화면 상단에 위치하며, 아바타 원형 배지·이름·최근 접속 시각·설정 버튼으로 구성된다.
 * Figma 원본 node-id: 1:459 (User Profile 영역)
 *
 * @param name            - 표시할 사용자 이름
 * @param lastLogin       - 최근 접속 일시 (예: '2023.11.01 10:30:15'). 미전달 시 미표시
 * @param onSettingsClick - 설정 버튼 클릭 핸들러. 미전달 시 버튼 미표시
 * @param className       - 추가 Tailwind 클래스
 *
 * @example
 * <UserProfile
 *   name="김하나님"
 *   lastLogin="2023.11.01 10:30:15"
 *   onSettingsClick={() => navigate('/settings')}
 * />
 */
import React from 'react';
import { User, Settings } from 'lucide-react';
import { cn } from '@lib/cn';
import type { UserProfileProps } from './types';

export type { UserProfileProps } from './types';

export function UserProfile({
  name,
  lastLogin,
  onSettingsClick,
  className,
}: UserProfileProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-standard py-md',
        className,
      )}
    >
      {/* 좌측: 아바타 + 이름 + 최근 접속 */}
      <div className="flex items-center gap-md">
        {/* 아바타 원형 배지 — 브랜드 5% 배경, 브랜드 테두리, 사람 아이콘 */}
        <div
          className="flex items-center justify-center size-16 rounded-full bg-brand-5 border border-brand/20 shrink-0"
          aria-hidden="true"
        >
          <User className="size-6 text-brand" />
        </div>

        {/* 사용자 정보 */}
        <div className="flex flex-col gap-xs">
          {/* 이름 — 20px, 기본 폰트 웨이트 */}
          <span className="text-xl text-text-heading leading-tight">{name}</span>

          {/* 최근 접속 — lastLogin이 있을 때만 렌더링 */}
          {lastLogin && (
            <span className="text-xs text-text-muted">
              최근 접속: {lastLogin}
            </span>
          )}
        </div>
      </div>

      {/* 우측: 설정 버튼 — onSettingsClick이 있을 때만 렌더링 */}
      {onSettingsClick && (
        <button
          type="button"
          onClick={onSettingsClick}
          aria-label="설정"
          className={cn(
            'flex items-center justify-center size-10 rounded-full shrink-0',
            'bg-surface-raised border border-border',
            'transition-colors duration-150 hover:bg-surface',
          )}
        >
          <Settings className="size-4 text-text-muted" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
