'use client';

import {useState} from 'react';
import {HeroSection} from '../components/HeroSection';
import {WelcomeScreen} from '../components/WelcomeScreen';
import {TaskScreen} from '../components/TaskScreen';

type Screen = 'hero' | 'welcome' | 'game';

export default function Home() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [playerName, setPlayerName] = useState('');

    const handleStart = () => {
        setCurrentScreen('welcome');
    };

    const handleContinue = (name: string) => {
        setPlayerName(name);
        setCurrentScreen('game');
    };

    if (currentScreen === 'welcome') {
        return <WelcomeScreen onContinue={handleContinue} />;
    }

    if (currentScreen === 'game') {
        return (
            <TaskScreen
                onSkip={() => {
                    /* логика пропуска */
                }}
                onStart={() => {
                    /* переход к задаче */
                }}
                onRules={() => {
                    /* открыть правила */
                }}
                onClose={() => {
                    /* закрыть/вернуться назад */
                }}
            />
        );
    }

    return <HeroSection onStart={handleStart} />;
}
