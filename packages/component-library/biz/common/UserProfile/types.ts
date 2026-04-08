/**
 * @file types.ts
 * @description UserProfile 컴포넌트의 TypeScript 타입 정의.
 *
 * 인증된 사용자의 아바타·이름·최근 접속 시각·설정 버튼을 표시하는
 * 금융 도메인 전용 컴포넌트.
 * 전체 메뉴 화면 상단 프로필 영역에 사용한다.
 */

export interface UserProfileProps {
  /** 표시할 사용자 이름 (예: '김하나님') */
  name: string;
  /**
   * 최근 접속 일시 문자열 (예: '2023.11.01 10:30:15').
   * 미전달 시 최근 접속 행 미표시.
   */
  lastLogin?: string;
  /**
   * 설정 버튼 클릭 핸들러.
   * 미전달 시 설정 버튼 미표시.
   */
  onSettingsClick?: () => void;
  /** 추가 Tailwind 클래스 */
  className?: string;
}
