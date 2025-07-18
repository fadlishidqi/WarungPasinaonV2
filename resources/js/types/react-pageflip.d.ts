declare module 'react-pageflip' {
    import { RefObject } from 'react';
    
    export interface FlipBookProps {
        width: number;
        height: number;
        size?: 'stretch' | 'fixed';
        minWidth?: number;
        maxWidth?: number;
        minHeight?: number;
        maxHeight?: number;
        drawShadow?: boolean;
        flippingTime?: number;
        usePortrait?: boolean;
        startZIndex?: number;
        autoSize?: boolean;
        maxShadowOpacity?: number;
        showCover?: boolean;
        mobileScrollSupport?: boolean;
        onFlip?: (e: { data: number }) => void;
        onChangeOrientation?: (orientation: 'portrait' | 'landscape') => void;
        onChangeState?: (state: 'user_fold' | 'fold_corner' | 'flipping' | 'read') => void;
        className?: string;
        style?: React.CSSProperties;
        children: React.ReactNode;
    }
    
    export interface FlipBookRef {
        pageFlip(): {
            flip: (page: number) => void;
            flipNext: () => void;
            flipPrev: () => void;
            getCurrentPageIndex: () => number;
            getPageCount: () => number;
            getOrientation: () => 'portrait' | 'landscape';
            getBounds: () => { width: number; height: number };
            getSettings: () => any;
            loadFromImages: (images: string[]) => void;
            loadFromHTML: (items: HTMLElement[]) => void;
            updateState: (newState: any) => void;
            clear: () => void;
            destroy: () => void;
        };
    }
    
    const HTMLFlipBook: React.ForwardRefExoticComponent<FlipBookProps & React.RefAttributes<FlipBookRef>>;
    
    export default HTMLFlipBook;
}