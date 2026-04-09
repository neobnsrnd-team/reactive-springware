/**
 * @file Modal.stories.tsx
 * @description Modal 컴포넌트 스토리.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './index';

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { brand: 'hana', domain: 'banking', layout: 'centered' },
  argTypes: {
    open:  { control: 'boolean' },
    title: { control: 'text' },
    disableBackdropClose: { control: 'boolean' },
  },
  args: {
    open: true,
    title: '이체 확인',
    disableBackdropClose: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Modal
      {...args}
      bottomBtnCnt="2"
      bottomBtn1Label="확인"
      bottomBtn2Label="취소"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>받는 분</span>
          <span style={{ fontWeight: 700 }}>홍길동</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>계좌번호</span>
          <span>123-456-789012</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>이체 금액</span>
          <span style={{ fontWeight: 700, color: 'var(--color-brand)' }}>50,000원</span>
        </div>
      </div>
    </Modal>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          style={{ background: 'var(--color-brand)', color: '#fff', border: 'none', borderRadius: 12, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}
        >
          모달 열기
        </button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="확인"
          bottomBtnCnt="1"
          bottomBtn1Label="닫기"
          onClickBtn1={() => setOpen(false)}
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            작업이 완료되었습니다.
          </p>
        </Modal>
      </div>
    );
  },
};
