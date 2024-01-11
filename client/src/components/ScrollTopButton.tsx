import React, {useState, useEffect} from 'react';
import {IconSquareRoundedArrowUpFilled} from "@tabler/icons-react";

export const ScrollToTopButton = () => {

    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '55px',
                right: '20px',
                cursor: 'pointer',
                display: isVisible ? 'block' : 'none',
                zIndex: 9999
            }}
        >
            <IconSquareRoundedArrowUpFilled style={{width: '30px', height: '30px'}}/>
        </div>
    );
};
