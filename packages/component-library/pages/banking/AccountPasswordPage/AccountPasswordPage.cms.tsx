/**
 * @file AccountPasswordPage.cms.tsx
 * @description AccountPasswordPage 컴포넌트의 CMS BlockDefinition.
 * 계좌 비밀번호 입력 BottomSheet 화면.
 * pin 문자열과 digits 배열은 Hook에서 관리하므로 defaultProps에 초기값만 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { AccountPasswordPage } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "AccountPasswordPage",
    category: "pages",
    domain: "banking",
    defaultProps: {
      open: true,
      pin: "",
      // 셔플 전 기본 숫자 배열 (Hook에서 셔플하여 교체)
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    },
    propSchema: {
      open: {
        type: "boolean",
        label: "BottomSheet 열림 여부",
        default: true,
      },
      onClose: {
        type: "event",
        label: "닫기 (X 버튼·백드롭 클릭 공통)",
      },
      onDigitPress: {
        type: "event",
        label: "숫자 버튼 클릭",
      },
      onDelete: {
        type: "event",
        label: "지우기(⌫) 버튼 클릭",
      },
      onShuffle: {
        type: "event",
        label: "재배열 버튼 클릭",
      },
    },
  },
  component: (p) => <AccountPasswordPage {...(p as any)} />,
};

export default definition;
