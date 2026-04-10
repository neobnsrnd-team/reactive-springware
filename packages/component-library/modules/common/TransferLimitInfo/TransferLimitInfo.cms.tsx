/**
 * @file TransferLimitInfo.cms.tsx
 * @description TransferLimitInfo 컴포넌트의 CMS BlockDefinition.
 * 이체 한도 정보(1회·1일 한도, 오늘 누적 이체액·잔여 한도)를 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { TransferLimitInfo } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "TransferLimitInfo",
    category: "modules",
    domain: "common",
    defaultProps: {
      perTransferLimit: 1000000,
      dailyLimit: 5000000,
      usedAmount: 0,
    },
    propSchema: {
      perTransferLimit: {
        type: "number",
        label: "1회 이체 한도 (원)",
        default: 1000000,
      },
      dailyLimit: {
        type: "number",
        label: "1일 이체 한도 (원)",
        default: 5000000,
      },
      usedAmount: {
        type: "number",
        label: "오늘 누적 이체액 (원). 전달 시 잔여 한도 함께 표시",
        // 0이면 잔여 한도 표시 없음
        default: 0,
      },
    },
  },
  component: (p) => <TransferLimitInfo {...(p as any)} />,
};

export default definition;
