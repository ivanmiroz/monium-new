'use client';

import React from 'react';
import {Button} from '@gravity-ui/uikit';

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
                        <h5 className="rules-screen__title">
                            Вы — дежурный инженер клиники «Лапки»
                        </h5>

                        <div className="rules-screen__text">
                            <p className="rules-screen__text-item">
                                1. Работайте в Monium в соседней вкладке
                            </p>
                            <p className="rules-screen__text-item">
                                2. Не закрывайте эту вкладку — здесь таймер
                            </p>
                            <p className="rules-screen__text-item">
                                3. Будьте в наушниках на протяжении всего квиза
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
                        <p className="rules-screen__video-caption">
                            4. Будьте в наушниках на протяжении всего квиза
                        </p>
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
