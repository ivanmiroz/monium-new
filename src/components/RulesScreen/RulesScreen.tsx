'use client';

import React from 'react';
import {Button} from '@gravity-ui/uikit';

import './RulesScreen.scss';

interface RulesScreenProps {
    onBack?: () => void;
}

export const RulesScreen: React.FC<RulesScreenProps> = ({onBack}) => {
    return (
        <div className="rules-screen">
            <div className="rules-screen__header">
                <div className="rules-screen__header-left">
                    <Button className="button button--gray button--less-padding" onClick={onBack}>
                        Вернуться к задаче
                    </Button>
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

                        <p className="rules-screen__text">
                            1. Работайте в Monium в соседней вкладке
                            <br />
                            2. Не закрывайте эту вкладку — здесь таймер
                            <br />
                            3. Будьте в наушниках на протяжении всего квиза
                        </p>
                    </div>

                    <div className="rules-screen__body-right">
                        <video
                            className="rules-screen__video"
                            src="/media/video.mp4"
                            autoPlay
                            controls
                            playsInline
                        />
                        <p className="rules-screen__video-caption">
                            4. Будьте в наушниках на протяжении всего квиза
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
