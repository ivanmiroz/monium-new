'use client';

import React from 'react';
import {Theme, ThemeProvider} from '@gravity-ui/uikit';

import {DEFAULT_THEME} from '../Wrapper';

interface AppProps {
    children: React.ReactNode;
}

export const App: React.FC<AppProps> = ({children}) => {
    const [theme] = React.useState<Theme>(DEFAULT_THEME);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
