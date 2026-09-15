'use client';

import React, {useState} from 'react';
import {Button, TextInput} from '@gravity-ui/uikit';

import './WelcomeScreen.scss';

interface WelcomeScreenProps {
    onContinue: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({onContinue}) => {
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
                <h4 className="screen-title">Добро пожаловать</h4>
                <p className="welcome-screen__description">Имя для таблицы результатов на стенде</p>

                <form onSubmit={handleSubmit} className="welcome-screen__form">
                    <TextInput
                        className="welcome-screen__input"
                        value={name}
                        onUpdate={setName}
                        placeholder="Введите имя"
                        size="xl"
                    />

                    <Button
                        className="button button--less-padding button--margin-top"
                        type="submit"
                        disabled={!name.trim()}
                    >
                        Продолжить
                    </Button>
                </form>
            </div>
        </div>
    );
};
