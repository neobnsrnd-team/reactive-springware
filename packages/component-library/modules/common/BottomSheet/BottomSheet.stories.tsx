/**
 * @file BottomSheet.stories.tsx
 * @description BottomSheet 컴포넌트 스토리.
 * Modal과 달리 뷰포트 크기와 무관하게 항상 하단 고정.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { BottomSheet } from './index';

const meta = {
  title: 'Modules/Common/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: { brand: 'hana', domain: 'banking', layout: 'centered' },
  argTypes: {
    snap:                 { control: 'select', options: ['auto', 'half', 'full'] },
    open:                 { control: 'boolean' },
    title:                { control: 'text' },
    disableBackdropClose: { control: 'boolean' },
  },
  args: { open: true, title: '이체 확인', snap: 'auto', disableBackdropClose: false },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <BottomSheet
      {...args}
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontWeight: 700 }}>
            취소
          </button>
          <button style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: 'none', background: 'var(--color-brand, #00857a)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>
            이체 확인
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
        {[['받는 분', '홍길동'], ['계좌번호', '123-456-789012'], ['이체 금액', '50,000원'], ['메모', '점심값']].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>{label}</span>
            <span style={{ fontWeight: label === '이체 금액' ? 700 : 400 }}>{value}</span>
          </div>
        ))}
      </div>
    </BottomSheet>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{ background: 'var(--color-brand, #00857a)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}
        >
          시트 열기
        </button>
        <BottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="옵션 선택"
          footer={
            <button
              onClick={() => setOpen(false)}
              style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: 'var(--color-brand, #00857a)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
            >
              확인
            </button>
          }
        >
          <p style={{ fontSize: 14, color: '#64748b' }}>시트 본문 콘텐츠 영역입니다.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const HalfSnap: Story = {
  args: { snap: 'half', title: '날짜 선택' },
  render: (args) => (
    <BottomSheet {...args} footer={<button style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: 'var(--color-brand, #00857a)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>선택 완료</button>}>
      <p style={{ fontSize: 14, color: '#64748b' }}>snap="half" — 화면 절반 높이 고정</p>
    </BottomSheet>
  ),
};

export const DisabledBackdrop: Story = {
  args: { disableBackdropClose: true, title: '필수 약관 동의' },
  render: (args) => (
    <BottomSheet
      {...args}
      footer={
        <button style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', background: 'var(--color-brand, #00857a)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>
          모두 동의하고 계속
        </button>
      }
    >
      <p style={{ fontSize: 14, color: '#64748b' }}>백드롭 클릭으로 닫을 수 없는 필수 액션 시트입니다.</p>
    </BottomSheet>
  ),
};