import React from "react";
import { Range, getTrackBackground } from 'react-range';
import { useState } from 'react';

export default function Main({ rtl }) {
    const STEP = 10;
    const MIN = 0;
    const MAX = 100;
    const [values, setValues] = useState([50]);

    return (
        <div className="main">
            <div className="android-large">
                <div className="div">
                    <div className="text-wrapper">Рассчитать кредит</div>
                    <div className="frame">
                        <div className="overlap-group">
                            <div className="rectangle" />
                            <Range className="range-credits"
                                values={values}
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                rtl={rtl}
                                onChange={(values) => setValues(values)}
                                renderMark={({ props, index }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '16px',
                                            width: '5px',
                                            backgroundColor: index * STEP < values[0] ? '#548BF4' : '#ccc'
                                        }}
                                    />
                                )}
                                renderTrack={({ props, children }) => (
                                    <div
                                        onMouseDown={props.onMouseDown}
                                        onTouchStart={props.onTouchStart}
                                        style={{
                                            ...props.style,
                                            height: '36px',
                                            display: 'flex',
                                            width: '100%'
                                        }}
                                    >
                                        <div
                                            ref={props.ref}
                                            style={{
                                                height: '5px',
                                                width: '100%',
                                                borderRadius: '4px',
                                                background: getTrackBackground({
                                                    values: values,
                                                    colors: ['#548BF4', '#ccc'],
                                                    min: MIN,
                                                    max: MAX,
                                                    rtl
                                                }),
                                                alignSelf: 'center'
                                            }}
                                        >
                                            {children}
                                        </div>
                                    </div>
                                )}
                                renderThumb={({ props, isDragged }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '42px',
                                            width: '42px',
                                            borderRadius: '4px',
                                            backgroundColor: '#FFF',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow: '0px 2px 6px #AAA'
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: '16px',
                                                width: '5px',
                                                backgroundColor: isDragged ? '#548BF4' : '#CCC'
                                            }}
                                        />
                                    </div>
                                )}
                            />
                            <output style={{ marginTop: '30px' }}>{values[0].toFixed(1)}</output>
                            <div className="text-wrapper-3">Сумма</div>
                        </div>
                    </div>
                    <div className="text-wrapper-4">30 000</div>
                    <div className="overlap">
                        <div className="text-wrapper-5">Срок кредитования</div>
                    </div>
                    <div className="overlap-wrapper">
                        <div className="div-wrapper">
                            <div className="text-wrapper-6">Рассчитать</div>
                        </div>
                    </div>
                    <div className="overlap-group-wrapper">
                        <div className="overlap-2">
                            <div className="text-wrapper-7">Сила Кошелька</div>
                        </div>
                    </div>
                    <div className="text-wrapper-8">3 500 000</div>
                    <div className="text-wrapper-9">1</div>
                    <div className="text-wrapper-10">2</div>
                    <div className="text-wrapper-11">3</div>
                    <div className="text-wrapper-12">4</div>
                    <div className="text-wrapper-13">5</div>
                    <div className="text-wrapper-14">6</div>
                </div>
            </div>


        </div>
    )
}




