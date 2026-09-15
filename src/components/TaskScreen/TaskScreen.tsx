'use client';

import React from 'react';
import {Button, Icon} from '@gravity-ui/uikit';

import TaskImage from '../../assets/icons/task-1.svg';
import ExIcon from '../../assets/icons/ex.svg';
import CloseIcon from '../../assets/icons/x.svg';

import './TaskScreen.scss';

interface TaskScreenProps {
    onRules?: () => void;
    onClose?: () => void;
    onSkip?: () => void;
    onStart?: () => void;
}

export const TaskScreen: React.FC<TaskScreenProps> = ({onRules, onClose, onSkip, onStart}) => {
    return (
        <div className="task-screen">
            <div className="task-screen__header">
                <Button className="button button--gray button--less-padding" onClick={onRules}>
                    Правила
                </Button>

                <div className="task-screen__title-block">
                    <h4 className="screen-title">Root Cause Challenge</h4>
                    <p className="task-screen__description">
                        Найди причину инцидента за 5 минут с помощью
                        <br /> Observability-платформы «Monium»
                    </p>
                </div>

                <Button
                    className="button button--gray button--square"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <Icon data={CloseIcon} width={15} height={15} />
                </Button>
            </div>

            <div className="task-screen__content">
                <div className="task-screen__body">
                    <div className="task-screen__body-left">
                        <h5 className="task-screen__title">Задача 1</h5>

                        <h6 className="task-screen__subtitle">Ситуация</h6>
                        <p className="task-screen__text">
                            Главврач заметил провал в количестве завершенных приемов на прошлой
                            неделе (график ушел на дно в среду) и просит вас объясниться.
                        </p>

                        <h6 className="task-screen__subtitle">Задание</h6>
                        <p className="task-screen__text">
                            Создайте Блокноте и Выведите график метрики RPS (запросов в секунду) по
                            эндпоинту /api/orders (можно переиспользовать запрос из SLO). Сравните
                            график текущей недели с графиком прошлой недели. Добавьте текстовое
                            объяснение &quot;почему&quot;
                        </p>

                        <div className="task-screen__hint">
                            <Icon data={ExIcon} width={32} height={32} />
                            <span className="task-screen__hint-text">
                                Работайте в Monium на соседней вкладке
                            </span>
                        </div>
                    </div>

                    <div className="task-screen__body-right">
                        <Icon data={TaskImage} width={560} height={440} />
                    </div>
                </div>

                <div className="task-screen__footer">
                    <Button className="button button--less-padding button--gray" onClick={onSkip}>
                        Пропустить
                    </Button>
                    <Button className="button button--less-padding" onClick={onStart}>
                        Начать задачу
                    </Button>
                </div>
            </div>
        </div>
    );
};
