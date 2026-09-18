'use client';

import React from 'react';
import {Button, Icon} from '@gravity-ui/uikit';

import YCLogotype from '../../assets/icons/YC-Logotype-small.svg';
import YesIcon from '../../assets/icons/yes.svg';
import NoIcon from '../../assets/icons/no.svg';
import QrIcon from '../../assets/icons/qr.svg';
import CloseIcon from '../../assets/icons/x.svg';

import './ResultsScreen.scss';

export interface TaskResult {
    status: 'correct' | 'wrong' | 'skipped';
    time: string;
}

interface ResultsScreenProps {
    playerName: string;
    results: TaskResult[];
    onClose?: () => void;
    onRestart?: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
    playerName,
    results,
    onClose,
    onRestart,
}) => {
    return (
        <div className="results-screen">
            <div className="results-screen__header">
                <Button
                    className="button button--gray button--less-padding"
                    onClick={onRestart}
                    type="button"
                >
                    Пройти ещё раз
                </Button>
                <Button
                    className="button button--gray button--square"
                    onClick={onClose}
                    aria-label="Закрыть"
                    type="button"
                >
                    <Icon data={CloseIcon} width={15} height={15} />
                </Button>
            </div>

            <div className="results-screen__wrapper">
                <div className="results-screen__left">
                    <div className="results-screen__logo">
                        <Icon data={YCLogotype} />
                    </div>

                    <div className="results-screen__thanks">
                        <h6 className="results-screen__thanks-title">
                            Спасибо за участие,
                            <br /> {playerName}!
                        </h6>
                    </div>

                    <p className="results-screen__tasks-title">Ваши результаты:</p>

                    <div className="results-screen__tasks">
                        {results.map((result, index) => (
                            <div key={index} className="results-screen__task">
                                <div className="results-screen__task-info">
                                    <h6 className="results-screen__task-title">
                                        Задача {index + 1}
                                    </h6>
                                    <p className="results-screen__task-time">{result.time}</p>
                                </div>

                                {result.status === 'correct' ? (
                                    <Icon data={YesIcon} width={61} height={61} />
                                ) : (
                                    <Icon data={NoIcon} width={61} height={61} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="results-screen__right">
                    <div className="results-screen__right-badge">После Scale</div>

                    <h6 className="results-screen__right-title">
                        Хотите получить специальный офер, демо продукта или полезные материалы?
                    </h6>
                    <p className="results-screen__right-text">Сканируйте QR-код</p>
                    <div className="results-screen__qr">
                        <Icon data={QrIcon} size={473} />
                    </div>
                </div>
            </div>
        </div>
    );
};
