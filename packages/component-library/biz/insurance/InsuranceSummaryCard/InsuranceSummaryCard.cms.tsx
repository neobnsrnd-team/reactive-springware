/**
 * @file InsuranceSummaryCard.cms.tsx
 * @description InsuranceSummaryCard 컴포넌트의 CMS BlockDefinition.
 * 생명·건강·자동차 보험 계약 정보를 공통 레이아웃으로 표시하는 보험 도메인 요약 카드.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { InsuranceSummaryCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "InsuranceSummaryCard",
    category: "biz",
    domain: "insurance",
    defaultProps: {
      type: "life",
      insuranceName: "하나생명 통합종신보험",
      contractNumber: "2024-001-123456",
      premium: 150000,
      nextPaymentDate: "2026.05.01",
      status: "active",
      badgeText: "",
    },
    propSchema: {
      type: {
        type: "select",
        label: "보험 유형",
        // 유형별 아이콘·레이블이 달라짐
        default: "life",
        options: ["life", "health", "car"],
      },
      insuranceName: {
        type: "string",
        label: "보험 상품명",
        default: "하나생명 통합종신보험",
      },
      contractNumber: {
        type: "string",
        label: "계약번호 / 증권번호",
        default: "2024-001-123456",
      },
      premium: {
        type: "number",
        label: "월 납입 보험료 (원화 숫자)",
        // 내부에서 Intl.NumberFormat('ko-KR')으로 포맷 처리
        default: 0,
      },
      nextPaymentDate: {
        type: "string",
        label: "다음 납입일 (예: 2026.05.01)",
        default: "",
      },
      status: {
        type: "select",
        label: "계약 상태",
        // 상태별 배지 색상: active→primary / pending→warning / expired→neutral
        default: "active",
        options: ["active", "pending", "expired"],
      },
      badgeText: {
        type: "string",
        label: "배지 텍스트 override (미입력 시 status 기반 기본값)",
        default: "",
      },
      onClick: {
        type: "event",
        label: "카드 클릭",
      },
    },
  },
  component: (p) => <InsuranceSummaryCard {...(p as any)} />,
};

export default definition;
