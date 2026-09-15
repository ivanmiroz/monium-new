'use client';

import React from 'react';
import {Button} from '@gravity-ui/uikit';

import './ConfirmExitScreen.scss';

interface ConfirmExitScreenProps {
    title?: string;
    text?: string;
    stayLabel?: string;
    actionLabel?: string;
    onStay?: () => void;
    onAction?: () => void;
}

export const ConfirmExitScreen: React.FC<ConfirmExitScreenProps> = ({
    title = 'Вы уверены, что хотите выйти?',
    text = 'Весь прогресс будет утерян',
    stayLabel = 'Остаться',
    actionLabel = 'Выйти',
    onStay,
    onAction,
}) => {
    return (
        <div className="confirm-exit-screen">
            <div className="confirm-exit-screen__dialog">
                <h5 className="confirm-exit-screen__title">{title}</h5>

                <p className="confirm-exit-screen__text">{text}</p>

                <div className="confirm-exit-screen__actions">
                    <Button className="button button--medium" onClick={onStay}>
                        {stayLabel}
                    </Button>
                    <Button className="button button--medium button--gray" onClick={onAction}>
                        {actionLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
};
