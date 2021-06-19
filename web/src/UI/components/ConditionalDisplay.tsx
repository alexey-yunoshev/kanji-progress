export interface ConditionalDisplayProps {
    isHidden: boolean,
    children: JSX.Element | Array<JSX.Element>,
}

function ConditionalDisplay({
                                children,
                                isHidden,
                            }: ConditionalDisplayProps) {
    if (isHidden) {
        return <></>
    }

    return <>{children}</>

}

export default ConditionalDisplay;