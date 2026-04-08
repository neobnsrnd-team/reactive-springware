/**
 * @file HomeDashboardPage.cms.tsx
 * @description HomeDashboardPage 컴포넌트의 CMS BlockDefinition.
 * 홈 화면. 해당금융·다른금융·자산관리 3개 탭으로 구성된다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { HomeDashboardPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "HomeDashboardPage",
    category: "pages",
    domain: "common",
    defaultProps: {
      activeTab: "mine",
    },
    propSchema: {
      activeTab: {
        type: "select",
        label: "초기 활성 탭",
        // mine: 해당금융 / other: 다른금융 / asset: 자산관리
        default: "mine",
        options: ["mine", "other", "asset"],
      },
      onTabChange: {
        type: "event",
        label: "탭 전환",
      },
    },
  },
  component: (p) => <HomeDashboardPage {...(p as any)} />,
};

export default definition;
