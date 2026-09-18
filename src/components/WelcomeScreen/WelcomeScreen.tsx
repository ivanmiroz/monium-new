'use client';

import React, {useState} from 'react';
import {Button, TextInput} from '@gravity-ui/uikit';

import './WelcomeScreen.scss';

interface WelcomeScreenProps {
    onContinue: (name: string) => void;
    onBack?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({onContinue, onBack}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onContinue(name.trim());
        }
    };

    return (
        <div className="welcome-screen">
            <div className="welcome-screen__content">
                <h4 className="screen-title">Добро пожаловать!</h4>
                <p className="welcome-screen__description">
                    Представьтесь, чтобы мы могли отслеживать
                    <br /> ваш прогресс в решении задач
                </p>

                <form onSubmit={handleSubmit} className="welcome-screen__form">
                    <TextInput
                        autoFocus
                        className="welcome-screen__input"
                        value={name}
                        onUpdate={setName}
                        placeholder="Иван Иванов"
                        size="xl"
                    />

                    <div className="welcome-screen__actions">
                        <Button
                            className="button button--gray button--less-padding button--margin-top"
                            type="button"
                            onClick={onBack}
                        >
                            Назад
                        </Button>
                        <Button
                            className="button button--less-padding button--margin-top"
                            type="submit"
                            disabled={!name.trim()}
                        >
                            Продолжить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
