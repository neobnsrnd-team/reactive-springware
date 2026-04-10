/**
 * @file BrandBanner.cms.tsx
 * @description BrandBanner 컴포넌트의 CMS BlockDefinition.
 * 브랜드 컬러 배경의 단일 고정 프로모션 배너.
 * BannerCarousel(복수 슬라이더)과 달리 단독 배너로 사용한다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BrandBanner } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BrandBanner",
    category: "biz",
    domain: "common",
    defaultProps: {
      title: "나만을 위한 특별한 혜택",
      subtitle: "개인 맞춤 혜택",
    },
    propSchema: {
      title: {
        type: "string",
        label: "배너 주요 타이틀",
        default: "나만을 위한 특별한 혜택",
      },
      subtitle: {
        type: "string",
        label: "배너 소제목 (타이틀 위 작은 텍스트)",
        default: "개인 맞춤 혜택",
      },
      onClick: {
        // 전달 시 button 태그로 렌더링되어 클릭 가능 배너가 됨
        type: "event",
        label: "배너 클릭",
      },
    },
  },
  component: (p) => <BrandBanner {...(p as any)} />,
};

export default definition;
