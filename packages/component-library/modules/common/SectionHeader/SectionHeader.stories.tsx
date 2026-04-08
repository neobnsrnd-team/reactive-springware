/**
 * @file SectionHeader.stories.tsx
 * @description SectionHeader 컴포넌트 스토리.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SectionHeader } from './index';

const meta = {
  title: 'Modules/Common/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: { brand: 'hana', domain: 'banking', layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <div style={{ width: 340, padding: '16px 0' }}><Story /></div>],
  argTypes: {
    title:       { control: 'text' },
    badge:       { control: 'number' },
    actionLabel: { control: 'text' },
    onAction:    { action: '액션 클릭' },
  },
  args: { title: '보유 계좌', actionLabel: '전체보기', onAction: () => {} },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { actionLabel: undefined },
};

/** 제목 우측에 계좌 수 배지 표시 */
export const WithBadge: Story = {
  args: { title: '예금', badge: 2, actionLabel: undefined },
};

/** 배지 + 액션 버튼 함께 사용 */
export const WithBadgeAndAction: Story = {
  args: { title: '보유 계좌', badge: 3, actionLabel: '전체보기' },
};

export const Usages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 340 }}>
      <SectionHeader title="보유 계좌" actionLabel="전체보기" onAction={() => {}} />
      <SectionHeader title="최근 거래" actionLabel="더보기" onAction={() => {}} />
      <SectionHeader title="이번달 지출" />
      <SectionHeader title="예금" badge={2} />
      <SectionHeader title="외화예금" badge={1} />
    </div>
  ),
};