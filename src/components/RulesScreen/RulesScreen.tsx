'use client';

import React from 'react';
import {Button, Icon} from '@gravity-ui/uikit';

import ExIcon from '../../assets/icons/ex.svg';

import './RulesScreen.scss';

interface RulesScreenProps {
    showBack?: boolean;
    onBack?: () => void;
    onContinue: () => void;
}

export const RulesScreen: React.FC<RulesScreenProps> = ({showBack = false, onBack, onContinue}) => {
    return (
        <div className="rules-screen">
            <div className="rules-screen__header">
                <div className="rules-screen__header-left">
                    {showBack && (
                        <Button
                            className="button button--gray button--less-padding"
                            onClick={onBack}
                        >
                            Вернуться к задаче
                        </Button>
                    )}
                </div>

                <h4 className="screen-title rules-screen__header-title">Правила и вводные</h4>

                <div className="rules-screen__header-right" />
            </div>

            <div className="rules-screen__content">
                <div className="rules-screen__body">
                    <div className="rules-screen__body-left">
                        <p className="rules-screen__text-intro">
                            Вам предстоит на время решить две задачи, примерив роль дежурного
                            инженера клиники «Лапки». Перед началом посмотрите обзор
                            observability-платформы Monium — и переходите к задачам.
                        </p>

                        <div className="rules-screen__hint">
                            <Icon data={ExIcon} size={20} />
                            <span className="rules-screen__hint-text">Важно</span>
                        </div>

                        <div className="rules-screen__text">
                            <p className="rules-screen__text-item">
                                1. Работайте в Monium в соседней вкладке
                            </p>
                            <p className="rules-screen__text-item">
                                2. Не закрывайте эту вкладку — здесь таймер
                            </p>
                            <p className="rules-screen__text-item">
                                3. Не снимайте наушники, чтобы не пропустить звуковой сигнал
                                окончания времени
                            </p>
                        </div>
                    </div>

                    <div className="rules-screen__body-right">
                        <video
                            className="rules-screen__video"
                            src="/media/video.mp4"
                            controls
                            playsInline
                        />
                        <p className="rules-screen__video-caption">4. Посмотрите обзор</p>
                    </div>
                </div>

                {!showBack && (
                    <div className="rules-screen__footer">
                        <Button className="button button--less-padding" onClick={onContinue}>
                            Продолжить
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
