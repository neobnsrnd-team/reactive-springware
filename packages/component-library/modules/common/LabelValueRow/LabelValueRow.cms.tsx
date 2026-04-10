/**
 * @file LabelValueRow.cms.tsx
 * @description LabelValueRow 컴포넌트의 CMS BlockDefinition.
 * 레이블(좌) / 값(우) 한 행 배치 패턴.
 * "잔액 ··· 3,000,000원" 같이 두 정보를 좌우로 나란히 표시한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { LabelValueRow } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "LabelValueRow",
    category: "modules",
    domain: "common",
    defaultProps: {
      label: "잔액",
      value: "3,000,000원",
    },
    propSchema: {
      label: {
        type: "string",
        label: "좌측 레이블 (caption 크기, muted 색상)",
        default: "잔액",
      },
      value: {
        type: "string",
        label: "우측 값 텍스트",
        // 스타일이 복잡한 경우(금액 강조 등)에는 실제 앱에서 ReactNode로 주입
        default: "0원",
      },
    },
  },
  component: (p) => <LabelValueRow {...(p as any)} />,
};

export default definition;
