/**
 * @file AccountSummaryCard.cms.tsx
 * @description AccountSummaryCard 컴포넌트의 CMS BlockDefinition.
 * 예금·적금·대출·외화예금·퇴직연금·증권 계좌 유형을 단일 컴포넌트로 대응한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountSummaryCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountSummaryCard",
    category: "biz",
    domain: "banking",
    defaultProps: {
      type: "deposit",
      accountName: "급여 통장",
      accountNumber: "123-456-789012",
      balance: 3000000,
      balanceDisplay: "",
      balanceLabel: "",
      badgeText: "",
      moreButton: "chevron",
    },
    propSchema: {
      type: {
        type: "select",
        label: "계좌 유형",
        // 유형에 따라 금액 레이블·색상·배지 용도가 달라짐
        default: "deposit",
        options: ["deposit", "savings", "loan", "foreignDeposit", "retirement", "securities"],
      },
      accountName: {
        type: "string",
        label: "계좌명",
        default: "급여 통장",
      },
      accountNumber: {
        type: "string",
        label: "계좌번호",
        default: "123-456-789012",
      },
      balance: {
        type: "number",
        label: "잔액 (원화 숫자)",
        // 내부에서 Intl.NumberFormat('ko-KR')으로 포맷 처리
        default: 0,
      },
      balanceDisplay: {
        type: "string",
        label: "잔액 표시 문자열 (포맷 override)",
        // 전달 시 balance의 내부 포맷 변환을 건너뜀 (외화·이미 포맷된 값)
        default: "",
      },
      balanceLabel: {
        type: "string",
        label: "금액 레이블 (기본: 유형별 자동)",
        default: "",
      },
      badgeText: {
        type: "string",
        label: "배지 텍스트 (미입력 시 미노출)",
        default: "",
      },
      moreButton: {
        type: "select",
        label: "더보기 버튼 종류",
        // chevron: 다음 화면 이동 / ellipsis: 추가 옵션 메뉴
        default: "chevron",
        options: ["chevron", "ellipsis"],
      },
      onMoreClick: {
        type: "event",
        label: "더보기 버튼 클릭",
      },
      onClick: {
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <AccountSummaryCard {...(p as any)} />,
};

export default definition;
