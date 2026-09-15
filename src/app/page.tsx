'use client';

import {useState} from 'react';
import {HeroSection} from '../components/HeroSection';
import {WelcomeScreen} from '../components/WelcomeScreen';

type Screen = 'hero' | 'welcome' | 'game';

export default function Home() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
    const [playerName, setPlayerName] = useState('');

    const handleStart = () => {
        setCurrentScreen('welcome');
    };

    const handleContinue = (name: string) => {
        setPlayerName(name);
        setCurrentScreen('game'); // следующий экран
    };

    if (currentScreen === 'welcome') {
        return <WelcomeScreen onContinue={handleContinue} />;
    }

    if (currentScreen === 'game') {
        return <div>Привет, {playerName}!</div>; // тут имя уже используется
    }

    return <HeroSection onStart={handleStart} />;
}
