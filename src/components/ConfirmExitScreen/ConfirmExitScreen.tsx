'use client';

import React from 'react';
import {Button} from '@gravity-ui/uikit';

import './ConfirmExitScreen.scss';

interface ConfirmExitScreenProps {
    onStay?: () => void;
    onExit?: () => void;
}

export const ConfirmExitScreen: React.FC<ConfirmExitScreenProps> = ({onStay, onExit}) => {
    return (
        <div className="confirm-exit-screen">
            <div className="confirm-exit-screen__dialog">
                <h5 className="confirm-exit-screen__title">Вы уверены, что хотите выйти?</h5>

                <p className="confirm-exit-screen__text">Весь прогресс будет утерян</p>

                <div className="confirm-exit-screen__actions">
                    <Button className="button button--medium" onClick={onStay}>
                        Остаться
                    </Button>
                    <Button className="button button--medium button--gray" onClick={onExit}>
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
};
