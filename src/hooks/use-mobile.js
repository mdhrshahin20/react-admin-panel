import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(mobileBreakpoint = 768) {
    const [isMobile, setIsMobile] = React.useState(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)
        const onChange = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < mobileBreakpoint)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}