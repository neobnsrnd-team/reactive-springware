/**
 * @file CardManagementPanel.stories.tsx
 * @description CardManagementPanel 컴포넌트 스토리.
 */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CardManagementPanel } from './index';

const meta = {
  title: 'Biz/Card/CardManagementPanel',
  component: CardManagementPanel,
  tags: ['autodocs'],
  parameters: { brand: 'hana', domain: 'card' },
  decorators: [(Story: React.ComponentType) => <div style={{ width: 390, padding: 16 }}><Story /></div>],
  args: {
    maskedCardNumber:    '1234 **** **** 5678',
    paymentBank:         '하나은행',
    maskedAccountNumber: '123-****-5678',
    onCardInfo:          () => {},
    onPaymentAccount:    () => {},
    onPasswordSetting:   () => {},
    onOverseasPayment:   () => {},
  },
} satisfies Meta<typeof CardManagementPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
