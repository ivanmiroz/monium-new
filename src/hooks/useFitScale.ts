'use client';

import {useEffect, useState} from 'react';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export const useFitScale = (): number => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const update = () => {
            const s = Math.min(
                window.innerWidth / DESIGN_WIDTH,
                window.innerHeight / DESIGN_HEIGHT,
            );
            setScale(s);
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return scale;
};
