'use client';

import {useState} from 'react';
import {HeroSection} from '../components/HeroSection';
import {WelcomeScreen} from '../components/WelcomeScreen';
import {TaskData, TaskScreen} from '../components/TaskScreen';
import {RulesScreen} from '../components/RulesScreen';
import {ConfirmExitScreen} from '../components/ConfirmExitScreen';
import {ResultsScreen, TaskResult} from '../components/ResultsScreen';
import {pickRandomTasks} from '../data/tasks';
import {useFitScale} from '../hooks/useFitScale';

type Screen =
    | 'hero'
    | 'welcome'
    | 'game'
    | 'rules'
    | 'confirm-exit'
    | 'confirm-skip'
    | 'results'
    | 'confirm-exit-results';

const TASKS_PER_GAME = 2;

export default function Home() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
    const [playerName, setPlayerName] = useState('');
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [taskIndex, setTaskIndex] = useState(0);
    const [results, setResults] = useState<TaskResult[]>([]);
    const [pendingSkipTime, setPendingSkipTime] = useState('00:00');

    const scale = useFitScale();

    const resetGame = () => {
        setTaskIndex(0);
        setResults([]);
        setPendingSkipTime('00:00');
        setTasks([]);
    };

    const handleStart = () => {
        setCurrentScreen('welcome');
    };

    const handleContinue = (name: string) => {
        setPlayerName(name);
        setTasks(pickRandomTasks(TASKS_PER_GAME));
        setTaskIndex(0);
        setResults([]);
        setPendingSkipTime('00:00');
        setCurrentScreen('game');
    };

    const finishOrNext = (nextResults: TaskResult[]) => {
        setResults(nextResults);
        if (nextResults.length >= tasks.length) {
            setCurrentScreen('results');
        } else {
            setTaskIndex((prev) => prev + 1);
            setCurrentScreen('game');
        }
    };

    const handleTaskComplete = (isCorrect: boolean, time: string) => {
        finishOrNext([...results, {status: isCorrect ? 'correct' : 'wrong', time}]);
    };

    const handleSkipConfirm = (time: string) => {
        finishOrNext([...results, {status: 'skipped', time}]);
    };

    const exitToHero = () => {
        resetGame();
        setCurrentScreen('hero');
    };

    const renderScreen = () => {
        if (currentScreen === 'welcome') {
            return <WelcomeScreen onContinue={handleContinue} />;
        }

        if (currentScreen === 'rules') {
            return <RulesScreen onBack={() => setCurrentScreen('game')} />;
        }

        if (currentScreen === 'results') {
            return (
                <ResultsScreen
                    playerName={playerName}
                    results={results}
                    onClose={() => setCurrentScreen('confirm-exit-results')}
                />
            );
        }

        if (currentScreen === 'confirm-exit-results') {
            return (
                <ConfirmExitScreen
                    onStay={() => setCurrentScreen('results')}
                    onAction={exitToHero}
                />
            );
        }

        if (
            currentScreen === 'game' ||
            currentScreen === 'confirm-exit' ||
            currentScreen === 'confirm-skip'
        ) {
            if (!tasks[taskIndex]) {
                return null;
            }

            return (
                <>
                    <TaskScreen
                        key={taskIndex}
                        task={{...tasks[taskIndex], title: `Задача ${taskIndex + 1}`}}
                        onRules={() => setCurrentScreen('rules')}
                        onClose={() => setCurrentScreen('confirm-exit')}
                        onStart={() => {
                            /* открыть задачу в новой вкладке */
                        }}
                        onSkipRequest={(time) => {
                            setPendingSkipTime(time);
                            setCurrentScreen('confirm-skip');
                        }}
                        onComplete={handleTaskComplete}
                    />

                    {currentScreen === 'confirm-exit' && (
                        <ConfirmExitScreen
                            onStay={() => setCurrentScreen('game')}
                            onAction={exitToHero}
                        />
                    )}

                    {currentScreen === 'confirm-skip' && (
                        <ConfirmExitScreen
                            title="Пропустить задачу?"
                            text="Пока задача не решена, баллы за нее не будут начислены"
                            stayLabel="Остаться"
                            actionLabel="Пропустить"
                            onStay={() => setCurrentScreen('game')}
                            onAction={() => handleSkipConfirm(pendingSkipTime)}
                        />
                    )}
                </>
            );
        }

        return <HeroSection onStart={handleStart} />;
    };

    return (
        <div className="app-scaler">
            <div className="app-scaler__inner" style={{transform: `scale(${scale})`}}>
                {renderScreen()}
            </div>
        </div>
    );
}
