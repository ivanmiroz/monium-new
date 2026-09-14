import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {DEFAULT_BODY_CLASSNAME} from '../components/Wrapper';
import {App} from '../components/App';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import '../styles/globals.scss';

// Шрифт для заголовков
const ysDisplay = localFont({
    src: '../fonts/YS-Display-Black.woff2',
    weight: '900',
    style: 'normal',
    variable: '--font-ys-display',
    display: 'swap',
});

// Шрифт для основного текста
const ysText = localFont({
    src: '../fonts/YS-Text-Regular.woff2',
    weight: '400',
    style: 'normal',
    variable: '--font-ys-text',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Root Cause Challenge',
    description: 'Найди причину инцидента за 5 минут с помощью Observability-платформы «Monium»',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        // Применяем обе переменные шрифтов
        <html lang="ru" className={`${ysDisplay.variable} ${ysText.variable}`}>
            <body className={DEFAULT_BODY_CLASSNAME}>
                <App>{children}</App>
            </body>
        </html>
    );
}
