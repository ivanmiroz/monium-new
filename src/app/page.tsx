'use client';

import {useState} from 'react';
import {HeroSection} from '../components/HeroSection';
import {WelcomeScreen} from '../components/WelcomeScreen';
import {TaskScreen} from '../components/TaskScreen';
import {RulesScreen} from '../components/RulesScreen';
import {ConfirmExitScreen} from '../components/ConfirmExitScreen';

type Screen = 'hero' | 'welcome' | 'game' | 'rules' | 'confirm-exit';

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

    if (currentScreen === 'rules') {
        return <RulesScreen onBack={() => setCurrentScreen('game')} />;
    }

    if (currentScreen === 'confirm-exit') {
        return (
            <ConfirmExitScreen
                onStay={() => setCurrentScreen('game')}
                onExit={() => setCurrentScreen('hero')}
            />
        );
    }

    if (currentScreen === 'game') {
        return (
            <TaskScreen
                onRules={() => setCurrentScreen('rules')}
                onClose={() => setCurrentScreen('confirm-exit')}
                onSkip={() => {
                    /* логика пропуска */
                }}
                onStart={() => {
                    /* переход к задаче */
                }}
            />
        );
    }

    return <HeroSection onStart={handleStart} />;
}
