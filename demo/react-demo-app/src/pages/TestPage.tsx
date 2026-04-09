import { cn } from "@lib/cn";
import { BottomNav, BottomSheet, Button, ButtonGroup } from "@neobnsrnd-team/reactive-springware";
import { Bell, CreditCard, Home, Menu, MessageSquare, ShoppingBag, User, Wallet } from "lucide-react";
import { useState } from "react";

export default function TestPage() {
    const [open, setOpen] = useState(false);
    const tabs = [
        { id: 'asset',   icon: <Wallet className="size-5" />,        label: '자산',   onClick: () => {}  },
        { id: 'product', icon: <ShoppingBag className="size-5" />,   label: '상품',   onClick: () => {}  },
        { id: 'home',    icon: <Home className="size-6" />,          label: '홈',     onClick: () => {}    },
        { id: 'card',    icon: <CreditCard className="size-5" />,    label: '카드',   onClick: () => {}  },
        { id: 'chat',    icon: <MessageSquare className="size-5" />, label: '챗봇',   onClick: () => {}  },
    ];

    const iconBtnCls = cn(
        'flex items-center justify-center size-9 rounded-full',
        'text-text-muted hover:bg-surface-raised hover:text-text-heading',
        'transition-colors duration-150',
    );

    return (
        <>
        {/* <div className={cn('flex flex-col h-dvh')}> */}
            {/* ── 상단 고정 헤더 ────────────────────────────── */}
            {/*
            * backdrop-blur + 반투명 흰 배경: 스크롤 시 콘텐츠가 헤더 아래로 자연스럽게 가려짐.
            * Figma 디자인(node 1:221) 기준: backdrop-blur-sm / bg-white/80 / border-b
            */}
            <header className="sticky top-0 z-sticky backdrop-blur-sm bg-white/80 border-b border-border-subtle">
                <div className="flex items-center h-14 px-standard gap-sm">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-xs">
                    {/* 로고 아이콘 — logo 전달 시만 노출 */}
                    {/* 타이틀: 브랜드 컬러(teal) + 볼드 — Figma node 1:226 */}
                    <h1 className="text-xl font-bold text-brand leading-none">하나카드</h1>
                    </div>
                </div>

                {/* 우측 액션 슬롯 — 미전달 시 프로필·벨·메뉴 기본 3버튼 */}
                <div className="shrink-0">
                    <div className="flex items-center gap-1">
                        {/* 프로필 버튼 */}
                        <button type="button" aria-label="프로필" className={iconBtnCls}>
                        <User className="size-4" aria-hidden="true" />
                        </button>

                        {/* 알림(벨) 버튼 — hasNotification 시 빨간 뱃지 표시 */}
                        <button type="button" aria-label="알림" className={cn(iconBtnCls, 'relative')}>
                        <Bell className="size-4" aria-hidden="true" />                        </button>

                        {/* 메뉴 버튼 */}
                        <button type="button" aria-label="메뉴" className={iconBtnCls}>
                        <Menu className="size-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
        
        <Button onClick={() => setOpen(true)}>테스트</Button>
        <BottomNav items={tabs} activeId={'home'} />
        {/* </div> */}
        <BottomSheet snap="auto" open={open} onClose={() => setOpen(false)}
            footer={<ButtonGroup>
                <Button fullWidth onClick={() => setOpen(false)}>이체 확인</Button>
            </ButtonGroup>}>
            바텀시트입니다.
        </BottomSheet>
        </>
    );
}