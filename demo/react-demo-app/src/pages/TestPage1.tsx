import { Badge, Button, ButtonGroup, HomePageLayout, Inline, PageLayout } from "@neobnsrnd-team/reactive-springware";

export default function TestPage1() {
    return (
        <>
        <PageLayout title="하나카드" showBack={true} onBack={() => {}}
            bottomBtnCnt="2" rightBtnType='none'>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <div><Button /></div>
            <Badge>테스트</Badge>
        </PageLayout>
        </>
    );
}