/**
 * @file types.ts
 * @description DatePicker 컴포넌트의 TypeScript 타입 정의
 */

export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  /** 선택 모드. 기본: 'single' */
  mode?:          DatePickerMode;
  /** single 모드에서 사용하는 선택된 날짜 */
  value?:         Date | null;
  /** range 모드에서 사용하는 시작·종료 날짜 */
  rangeValue?:    [Date | null, Date | null];
  onChange?:      (date: Date | null) => void;
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  minDate?:       Date;
  maxDate?:       Date;
  placeholder?:   string;
  label?:         string;
  disabled?:      boolean;
  className?:     string;
}