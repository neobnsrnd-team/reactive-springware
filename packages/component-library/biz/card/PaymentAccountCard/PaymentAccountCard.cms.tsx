/**
 * @file PaymentAccountCard.cms.tsx
 * @description PaymentAccountCard 컴포넌트의 CMS BlockDefinition.
 * 카드 결제 계좌 정보(명칭·출금 가능 시간·당행/타행 아이콘)를 표시하는 카드.
 * icon prop은 CMS에서 아이콘 이름(Lucide)으로 지정한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { PaymentAccountCard } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "PaymentAccountCard",
    category: "biz",
    domain: "card",
    defaultProps: {
      title: "하나은행 결제계좌",
      hours: "365일 06:00~23:30",
      // icon은 ReactNode이므로 CMS에서 아이콘 피커로 선택
      icon: "Building2",
    },
    propSchema: {
      title: {
        type: "string",
        label: "결제 계좌 명칭 (예: 하나은행 결제계좌)",
        default: "하나은행 결제계좌",
      },
      hours: {
        type: "string",
        label: "출금 가능 시간 (예: 365일 06:00~23:30)",
        default: "365일 06:00~23:30",
      },
      icon: {
        type: "icon-picker",
        label: "아이콘 (당행/타행 구분)",
        // Building2: 당행, Building: 타행 등 Lucide 아이콘 이름 사용
      },
    },
  },
  component: (p) => <PaymentAccountCard {...(p as any)} />,
};

export default definition;
