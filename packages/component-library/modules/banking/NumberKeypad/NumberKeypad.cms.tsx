/**
 * @file NumberKeypad.cms.tsx
 * @description NumberKeypad 컴포넌트의 CMS BlockDefinition.
 * 계좌 비밀번호 등 PIN 입력 화면에서 사용하는 보안 키패드.
 * 숫자 재배열(셔플)로 화면 녹화 기반 비밀번호 탈취를 방지한다.
 * digits 배열은 Hook에서 셔플 상태로 관리하므로 defaultProps에 기본값만 제공한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { NumberKeypad } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "NumberKeypad",
    category: "modules",
    domain: "banking",
    defaultProps: {
      // 0~9 순서 기본값 (셔플 전 초기 상태)
      digits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    },
    propSchema: {
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
  component: (p) => <NumberKeypad {...(p as any)} />,
};

export default definition;
