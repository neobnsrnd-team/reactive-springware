/**
 * @file BillingPeriodLabel.cms.tsx
 * @description BillingPeriodLabel 컴포넌트의 CMS BlockDefinition.
 * 카드 이용내역 목록 상단 청구 기간 레이블. 이용기간 시작일~종료일을 시계 아이콘과 함께 한 줄로 표시.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BillingPeriodLabel } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BillingPeriodLabel",
    category: "biz",
    domain: "card",
    defaultProps: {
      startDate: "2025.03.01",
      endDate: "2025.03.31",
    },
    propSchema: {
      startDate: {
        type: "string",
        label: "이용기간 시작일",
        default: "2025.03.01",
      },
      endDate: {
        type: "string",
        label: "이용기간 종료일",
        default: "2025.03.31",
      }
    },
  },
  component: (p) => <BillingPeriodLabel {...(p as any)} />,
};

export default definition;
