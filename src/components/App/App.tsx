'use client';

import React from 'react';
import {Theme, ThemeProvider} from '@gravity-ui/uikit';

interface AppProps {
    children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({children}) => {
    // Задаем тему напрямую, без зависимости от Wrapper
    const [theme] = React.useState<Theme>('light');

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
