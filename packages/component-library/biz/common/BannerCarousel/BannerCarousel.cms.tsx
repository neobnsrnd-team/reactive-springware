/**
 * @file BannerCarousel.cms.tsx
 * @description BannerCarousel 컴포넌트의 CMS BlockDefinition.
 * 배너 수에 따라 단일/멀티 동작이 자동 결정된다.
 * items 배열로 배너를 추가·삭제·편집할 수 있다.
 */
import type { BlockDefinition } from "@neobnsrnd-team/cms-core";
import { BannerCarousel } from "./index";

const definition: BlockDefinition = {
  meta: {
    name: "BannerCarousel",
    category: "biz",
    domain: "common",
    defaultProps: {
      autoPlayInterval: 3000,
      items: [
        { id: "banner-1", variant: "promo", title: "배너 제목 1", description: "배너 설명" },
        { id: "banner-2", variant: "info",  title: "배너 제목 2", description: "배너 설명" },
      ],
    },
    propSchema: {
      autoPlayInterval: {
        type: "number",
        label: "자동 재생 간격 (ms)",
        // items가 1개 이하이면 자동 재생 비활성화. 기본: 3000
        default: 3000,
      },
      items: {
        type: "array",
        label: "배너 목록",
        default: [
          { id: "banner-1", variant: "promo", title: "배너 제목", description: "" },
        ],
        itemFields: {
          id: {
            type: "string",
            label: "고유 ID",
            default: "",
          },
          variant: {
            type: "select",
            label: "색상 변형",
            // promo: 기본 프로모션 / info: 안내 / warning: 경고
            default: "promo",
            options: ["promo", "info", "warning"],
          },
          title: {
            type: "string",
            label: "배너 제목",
            default: "배너 제목",
          },
          description: {
            type: "string",
            label: "배너 설명",
            default: "",
          },
        },
      },
    },
  },
  component: (p) => <BannerCarousel {...(p as any)} />,
};

export default definition;
