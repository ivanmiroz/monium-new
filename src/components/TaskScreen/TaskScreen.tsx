'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Button, Icon} from '@gravity-ui/uikit';

import ExIcon from '../../assets/icons/ex.svg';
import CloseIcon from '../../assets/icons/x.svg';

import './TaskScreen.scss';

export interface TaskData {
    title: string;
    situation: string;
    task: string;
    image: React.FC;
}

interface TaskScreenProps {
    task: TaskData;
    onRules?: () => void;
    onClose?: () => void;
    onStart?: () => void;
    onSkipRequest?: (time: string) => void;
    onComplete?: (isCorrect: boolean, time: string) => void;
}

const TIMER_TOTAL_SECONDS = 5 * 60; // 05:00 — общая длительность
const TIMER_START_SECONDS = TIMER_TOTAL_SECONDS - 1; // 04:59 — стартовое отображение
const TIMER_DANGER_THRESHOLD = 59; // 00:59 и менее — красный

const formatTime = (totalSeconds: number): string => {
    const safe = Math.max(0, totalSeconds);
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const TaskScreen: React.FC<TaskScreenProps> = ({
    task,
    onRules,
    onClose,
    onStart,
    onSkipRequest,
    onComplete,
}) => {
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(TIMER_START_SECONDS);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isSubmitted || isUnlocked) {
            return () => {};
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Shift') {
                setIsUnlocked(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSubmitted, isUnlocked]);

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsTimerRunning(false);
    };

    const getElapsedTime = (): string => {
        return formatTime(TIMER_TOTAL_SECONDS - secondsLeft);
    };

    const handleStart = () => {
        if (isTimerRunning || isSubmitted) {
            return;
        }

        setIsTimerRunning(true);
        setSecondsLeft(TIMER_START_SECONDS);

        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    stopTimer();
                    setIsTimeUp(true);
                    setIsSubmitted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        onStart?.();
    };

    const handleSubmit = () => {
        stopTimer();
        setIsSubmitted(true);
    };

    const handleResult = (isCorrect: boolean) => {
        onComplete?.(isCorrect, getElapsedTime());
    };

    const handleSkipClick = () => {
        onSkipRequest?.(getElapsedTime());
    };

    const isTimerDanger = secondsLeft <= TIMER_DANGER_THRESHOLD;
    const TaskImage = task.image;

    return (
        <div className="task-screen">
            <div className="task-screen__header">
                <div className="task-screen__header-left">
                    <Button className="button button--gray button--less-padding" onClick={onRules}>
                        Правила
                    </Button>
                </div>

                <div className="task-screen__title-block">
                    <h4 className="screen-title">Root Cause Challenge</h4>
                    <p className="task-screen__description">
                        Найди причину инцидента за 5 минут с помощью
                        <br /> Observability-платформы «Monium»
                    </p>
                </div>

                <div className="task-screen__header-right">
                    <Button
                        className="button button--gray button--square"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        <Icon data={CloseIcon} width={15} height={15} />
                    </Button>
                </div>
            </div>

            <div className="task-screen__content">
                <div className="task-screen__body">
                    <div className="task-screen__body-left">
                        {isSubmitted ? (
                            <>
                                <h5 className="task-screen__title">
                                    {isTimeUp
                                        ? 'Время для задачи вышло!'
                                        : `${task.title} завершена!`}
                                </h5>
                                <p className="task-screen__text task-screen__text--submitted">
                                    Поднимите руку — стендист проверит решение
                                </p>
                            </>
                        ) : (
                            <>
                                <h5 className="task-screen__title">{task.title}</h5>

                                <h6 className="task-screen__subtitle">Ситуация</h6>
                                <p className="task-screen__text">{task.situation}</p>

                                <h6 className="task-screen__subtitle">Задание</h6>
                                <p className="task-screen__text">{task.task}</p>

                                <div className="task-screen__hint">
                                    <Icon data={ExIcon} width={32} height={32} />
                                    <span className="task-screen__hint-text">
                                        Работайте в Monium на соседней вкладке
                                    </span>
                                </div>

                                {isTimerRunning ? (
                                    <div
                                        className={
                                            isTimerDanger
                                                ? 'task-screen__timer task-screen__timer--danger'
                                                : 'task-screen__timer'
                                        }
                                    >
                                        {formatTime(secondsLeft)}
                                    </div>
                                ) : (
                                    <p className="task-screen__note">
                                        На этой странице запустится таймер,
                                        <br /> а в новой вкладке откроется нужная задача
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    <div className="task-screen__body-right">
                        <TaskImage />
                    </div>
                </div>

                <div className="task-screen__footer">
                    {isSubmitted ? (
                        <>
                            <Button
                                className="button button--less-padding button--gray"
                                onClick={() => handleResult(false)}
                                disabled={!isUnlocked}
                            >
                                Неправильно
                            </Button>
                            <Button
                                className="button button--less-padding"
                                onClick={() => handleResult(true)}
                                disabled={!isUnlocked}
                            >
                                Правильно
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                className="button button--less-padding button--gray"
                                onClick={handleSkipClick}
                            >
                                Пропустить
                            </Button>

                            {isTimerRunning ? (
                                <Button
                                    className="button button--less-padding"
                                    onClick={handleSubmit}
                                >
                                    Остановить таймер и вызвать проверку
                                </Button>
                            ) : (
                                <Button
                                    className="button button--less-padding"
                                    onClick={handleStart}
                                >
                                    Начать задачу
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
