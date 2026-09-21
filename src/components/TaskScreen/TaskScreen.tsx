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
const TIMER_WARNING_SECONDS = 5; // 00:05 — проигрываем звук

const SOUND_START = '/media/start.mp3';
const SOUND_WARNING = '/media/5sec.mp3';
const SOUND_TIMES_UP = '/media/times-up.mp3';

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
    const [penaltySeconds, setPenaltySeconds] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const penaltyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startSoundRef = useRef<HTMLAudioElement | null>(null);
    const warningSoundRef = useRef<HTMLAudioElement | null>(null);
    const timesUpSoundRef = useRef<HTMLAudioElement | null>(null);
    const warningPlayedRef = useRef(false);
    const timesUpPlayedRef = useRef(false);

    // Создаём Audio-объекты при монтировании, чистим при размонтировании
    useEffect(() => {
        startSoundRef.current = new Audio(SOUND_START);
        warningSoundRef.current = new Audio(SOUND_WARNING);
        timesUpSoundRef.current = new Audio(SOUND_TIMES_UP);

        return () => {
            startSoundRef.current?.pause();
            warningSoundRef.current?.pause();
            timesUpSoundRef.current?.pause();
        };
    }, []);

    // Очистка интервалов при размонтировании
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (penaltyIntervalRef.current) {
                clearInterval(penaltyIntervalRef.current);
            }
        };
    }, []);

    // Разблокировка кнопок по Shift после submit
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

    const stopPenaltyTimer = () => {
        if (penaltyIntervalRef.current) {
            clearInterval(penaltyIntervalRef.current);
            penaltyIntervalRef.current = null;
        }
    };

    const startPenaltyTimer = () => {
        stopPenaltyTimer();
        setPenaltySeconds(0);
        penaltyIntervalRef.current = setInterval(() => {
            setPenaltySeconds((prev) => prev + 1);
        }, 1000);
    };

    // Основное время + штраф — это уходит в результаты
    const getElapsedTime = (): string => {
        const base = TIMER_TOTAL_SECONDS - secondsLeft;
        return formatTime(base + penaltySeconds);
    };

    const handleStart = () => {
        if (isTimerRunning || isSubmitted) {
            return;
        }

        warningPlayedRef.current = false;
        timesUpPlayedRef.current = false;

        startSoundRef.current?.play().catch(() => {
            /* автоплей может быть заблокирован — игнорируем */
        });

        setIsTimerRunning(true);
        setSecondsLeft(TIMER_START_SECONDS);

        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                const next = prev - 1;

                if (next === TIMER_WARNING_SECONDS && !warningPlayedRef.current) {
                    warningPlayedRef.current = true;
                    warningSoundRef.current?.play().catch(() => {});
                }

                if (next <= 0) {
                    stopTimer();
                    setIsTimeUp(true);
                    setIsSubmitted(true);

                    if (!timesUpPlayedRef.current) {
                        timesUpPlayedRef.current = true;
                        timesUpSoundRef.current?.play().catch(() => {});
                    }

                    startPenaltyTimer();

                    return 0;
                }

                return next;
            });
        }, 1000);

        onStart?.();
    };

    const handleSubmit = () => {
        stopTimer();
        setIsSubmitted(true);
    };

    const handleResult = (isCorrect: boolean) => {
        stopPenaltyTimer();
        onComplete?.(isCorrect, getElapsedTime());
    };

    const handleSkipClick = () => {
        onSkipRequest?.(getElapsedTime());
    };

    const isTimerDanger = secondsLeft <= TIMER_DANGER_THRESHOLD;
    const TaskImage = task.image;

    const renderBody = () => {
        if (isSubmitted && isTimeUp) {
            return (
                <>
                    <h5 className="task-screen__title">Отличная работа</h5>
                    <p className="task-screen__text task-screen__text--submitted">
                        Поднимите руку — стендист проверит правильность решения
                    </p>

                    <div className="task-screen__timer-row">
                        <div className="task-screen__timer">{formatTime(0)}</div>
                        <div className="task-screen__penalty">+ {formatTime(penaltySeconds)}</div>
                    </div>
                </>
            );
        }

        if (isSubmitted) {
            return (
                <>
                    <h5 className="task-screen__title">Отличная работа</h5>
                    <p className="task-screen__text task-screen__text--submitted">
                        Поднимите руку — стендист проверит
                        <br /> правильность решения
                    </p>

                    <div className="task-screen__elapsed">
                        <span className="task-screen__elapsed-label">Сделали за:</span>
                        <div className="task-screen__timer task-screen__timer--elapsed">
                            {getElapsedTime()}
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <h5 className="task-screen__title">{task.title}</h5>

                <h6 className="task-screen__subtitle">Ситуация</h6>
                <p className="task-screen__text">{task.situation}</p>

                <h6 className="task-screen__subtitle">Задача</h6>
                <p className="task-screen__text">{task.task}</p>

                <div
                    className={
                        isTimerRunning
                            ? 'task-screen__hint task-screen__hint--running'
                            : 'task-screen__hint'
                    }
                >
                    <Icon data={ExIcon} size={20} />
                    <span className="task-screen__hint-text">
                        {isTimerRunning ? (
                            <>
                                Переходите во вторую вкладку и приступайте к задаче. Когда найдёте
                                <br />
                                решение, вернитесь в интерактив и нажмите «Сдать решение».
                                <br />
                                Если не успеете решить задачу за 5 минут, — решение не
                                засчитывается.
                            </>
                        ) : (
                            'Работайте в Monium на соседней вкладке'
                        )}
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
                        Когда ознакомитесь с задачей, нажмите «Начать
                        <br /> задачу» — запустится таймер.
                    </p>
                )}
            </>
        );
    };

    const renderFooter = () => {
        if (isSubmitted) {
            return (
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
            );
        }

        return (
            <>
                <Button
                    className="button button--less-padding button--gray"
                    onClick={handleSkipClick}
                >
                    Пропустить
                </Button>

                {isTimerRunning ? (
                    <Button className="button button--less-padding" onClick={handleSubmit}>
                        Сдать решение
                    </Button>
                ) : (
                    <Button className="button button--less-padding" onClick={handleStart}>
                        Начать задачу
                    </Button>
                )}
            </>
        );
    };

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
                        Найдите причину инцидента за 5 минут с помощью
                        <br /> observability-платформы Yandex Monium
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
                    <div className="task-screen__body-left">{renderBody()}</div>

                    <div className="task-screen__body-right">
                        <TaskImage />
                    </div>
                </div>

                <div className="task-screen__footer">{renderFooter()}</div>
            </div>
        </div>
    );
};
