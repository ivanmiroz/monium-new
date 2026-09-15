'use client';

import {useState} from 'react';
import {HeroSection} from '../components/HeroSection';
import {WelcomeScreen} from '../components/WelcomeScreen';
import {TaskData, TaskScreen} from '../components/TaskScreen';
import {RulesScreen} from '../components/RulesScreen';
import {ConfirmExitScreen} from '../components/ConfirmExitScreen';
import {ResultsScreen, TaskResult} from '../components/ResultsScreen';

type Screen =
    | 'hero'
    | 'welcome'
    | 'game'
    | 'rules'
    | 'confirm-exit'
    | 'confirm-skip'
    | 'results'
    | 'confirm-exit-results';

const TASKS: TaskData[] = [
    {
        title: 'Задача 1',
        situation:
            'Главврач заметил провал в количестве завершенных приемов на прошлой неделе (график ушел на дно в среду) и просит вас объясниться.',
        task: 'Создайте Блокноте и Выведите график метрики RPS (запросов в секунду) по эндпоинту /api/orders (можно переиспользовать запрос из SLO). Сравните график текущей недели с графиком прошлой недели. Добавьте текстовое объяснение "почему"',
    },
    {
        title: 'Задача 2',
        situation: 'Здесь будет текст ситуации для второй задачи.',
        task: 'Здесь будет текст задания для второй задачи.',
    },
];

export default function Home() {
    const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
    const [playerName, setPlayerName] = useState('');
    const [taskIndex, setTaskIndex] = useState(0);
    const [results, setResults] = useState<TaskResult[]>([]);
    const [pendingSkipTime, setPendingSkipTime] = useState('00:00');

    const resetGame = () => {
        setTaskIndex(0);
        setResults([]);
        setPendingSkipTime('00:00');
    };

    const handleStart = () => {
        setCurrentScreen('welcome');
    };

    const handleContinue = (name: string) => {
        setPlayerName(name);
        resetGame();
        setCurrentScreen('game');
    };

    const finishOrNext = (nextResults: TaskResult[]) => {
        setResults(nextResults);
        if (nextResults.length >= TASKS.length) {
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
            <ConfirmExitScreen onStay={() => setCurrentScreen('results')} onAction={exitToHero} />
        );
    }

    if (
        currentScreen === 'game' ||
        currentScreen === 'confirm-exit' ||
        currentScreen === 'confirm-skip'
    ) {
        return (
            <>
                <TaskScreen
                    key={taskIndex}
                    task={TASKS[taskIndex]}
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
}
