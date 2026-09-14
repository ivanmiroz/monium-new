'use client';

import React from 'react';
import {Button, Col, Icon, Row} from '@gravity-ui/uikit';

import AlarmIcon from '../../assets/icons/alarm.svg';
import CopyIcon from '../../assets/icons/copy.svg';
import YCLogotype from '../../assets/icons/YC-Logotype.svg';
import KVMonium from '../../assets/icons/kv_monium.svg';

import './HeroSection.scss';

export const HeroSection = () => {
    return (
        <div className="hero-section">
            {/* Логотип слева вверху */}
            <div className="hero-section__logo">
                <Icon data={YCLogotype} height={48} width={333} />
            </div>

            {/* Основной контент по центру вертикально */}
            <Row className="hero-section__content" align="center">
                {/* Левый блок */}
                <Col s="12" l="6" className="hero-section__left">
                    {/* Блок времени и задач */}
                    <div className="stats-block">
                        <div className="stats-block__item">
                            <Icon data={AlarmIcon} height={20} width={20} />
                            <span className="stats-block__text">5 мин</span>
                        </div>
                        <div className="stats-block__item stats-block__item_tasks">
                            <Icon data={CopyIcon} height={20} width={20} />
                            <span className="stats-block__text">2 задачи</span>
                        </div>
                    </div>

                    <h1 className="hero-section__title">Root&nbsp;Cause Challenge</h1>
                    <p className="hero-section__description">
                        Найди причину инцидента за 5 минут с помощью Observability-платформы
                        «Monium»
                    </p>

                    <Button className="hero-section__button" view="action" size="xl">
                        Начать
                    </Button>
                </Col>

                {/* Правый блок */}
                <Col s="12" l="6" className="hero-section__right">
                    <Icon
                        data={KVMonium}
                        height={540}
                        width={799}
                        className="hero-section__image"
                    />
                </Col>
            </Row>
        </div>
    );
};
