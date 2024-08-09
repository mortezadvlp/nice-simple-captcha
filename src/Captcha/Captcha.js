
import React, { useState, useEffect } from 'react';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import styles from '../styles.module.css';
import { CAPTCHA_EMPTY_ERROR, CAPTCHA_EXPIRED, CAPTCHA_LOAD_ERROR, CAPTCHA_MISMATCH_ERROR, CAPTCHA_OK } from '..';

export default function Captcha( {
        className = '',
        inputClassName = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
        length = 5,
        screenColor = 'white',
        screenBorderColor = 'black',
        captchaColor = 'black',
        crossLine = true,
        expireAfterSec = 60,
        onCaptchaValidate = (passed, messageCode) => {},
        onEnterPressed = () => {},
        style={},
        refreshButtonIcon = null,
    } ) {

    const resetCaptcha = () => {
        createCaptchaChars(null);
    }

    const [captchaChars, setCaptchaChars] = useState([]);
    const [inputCaptcha, setInputCaptcha] = useState({captcha: '', value: '', generateTime: 0});
    const captchaRef = useRef(null);
    const [img, setImg] = useState('');

    useEffect(() => {
        if (inputCaptcha.captcha === '') {
            onCaptchaValidate(false, CAPTCHA_LOAD_ERROR);
        }
        else if (inputCaptcha.value === '') {
            onCaptchaValidate(false, CAPTCHA_EMPTY_ERROR);
        }
        else if (inputCaptcha.captcha !== inputCaptcha.value) {
            onCaptchaValidate(false, CAPTCHA_MISMATCH_ERROR);
        }
        else if ((Date.now() - inputCaptcha.generateTime) > (expireAfterSec * 1000)) {
            onCaptchaValidate(false, CAPTCHA_EXPIRED);
        }
        else {
            onCaptchaValidate(true, CAPTCHA_OK);
        }
    }, [inputCaptcha])

    useEffect(() => {
        setTimeout(() => {
            createCaptchaChars(null);
        }, 500);
    }, [characters, length, crossLine, screenColor, captchaColor])

    useEffect(() => {
        if (captchaChars.length > 0) {
            toPng(captchaRef.current)
                .then((dataUrl) => {
                    setImg(dataUrl);
                    setCaptchaChars([]);
                })
                .catch((e) => {
                    setCaptchaChars([]);
                    setInputCaptcha({captcha: '', value: '', generateTime: 0});
                })
        }
    }, [captchaChars])

    const createCaptchaChars = (e) => {
        if (e !== null) {
            e.preventDefault();
        }

        setCaptchaChars([]);

        const scales = ['1.3', '1.45', '1.6', '1.75'];
        const aligns = ['flex-start', 'center', 'flex-end'];
        const rotates = [-20, -10, 0, 10, 20];
        const chLen = characters.length;
        var chStr = [];
        let chars = [];
        for (let i = 0; i < length; i++) {
            let temp = {};
            let rnd = Math.floor(Math.random() * chLen);
            temp.ch = characters[rnd];
            chStr.push(temp.ch);
            temp.fontWeight = Math.random() < 0.5 ? 'normal' : 'bolder';
            rnd = Math.floor(Math.random() * scales.length);
            temp.scale = scales[rnd];
            rnd = Math.floor(Math.random() * aligns.length);
            temp.align = aligns[rnd];
            rnd = Math.floor(Math.random() * rotates.length);
            temp.rotate = rotates[rnd];
            chars.push(temp);
        }
        setCaptchaChars(chars);
        setInputCaptcha({captcha: chStr.join(''), value: '', generateTime: Date.now()});
    }
    
    const onEnterCaptured = (key) => {
        if (key === 'Enter') {
            onEnterPressed();
        }
    }

    return (
        <div className={`${styles.all} ${styles.dFlex} ${styles.flexColumn} ${styles.gap2} ${className}`} style={style} >
            <div className={`${styles.positionRelative} ${styles.border} ${styles.border1}`} ref={el => el && el.style.setProperty('border-color', screenBorderColor, 'important')} >
                <div ref={captchaRef} dir='ltr' className={`${styles.captchaCharacters} ${styles.dFlex} ${styles.flexRow} ${styles.justifyContentEvenly} ${styles.py2_5} ${styles.positionRelative}`} style={{backgroundColor: screenColor}} >
                    {captchaChars.map((char, index) =>
                        <span key={index} 
                            style={{
                                    scale: char.scale,
                                    fontWeight: char.fontWeight,
                                    rotate: `${char.rotate}deg`,
                                    alignSelf: char.align,
                                    color: captchaColor,
                                }}
                        >{char.ch}</span>
                    )}
                    {(crossLine && captchaChars.length > 0) &&
                    <div className={`${styles.borderBottom} ${styles.border2} ${styles.positionAbsolute} ${styles.top50}`} style={{width: '90%'}} ref={el => el && el.style.setProperty('border-color', captchaColor, 'important')} ></div>
                    }
                </div>
                <div className={`${styles.w100} ${styles.positionAbsolute} ${styles.top0} ${styles.start0}`} ><img src={img} /></div>
            </div>
            <div className={`${styles.w100} ${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.gap1}`} >
                <input dir='ltr' className={`${styles.w100} ${styles.py1} ${styles.noOutline} ${inputClassName}`} value={inputCaptcha.value} onChange={(e) => {const val = e.target.value; setInputCaptcha(s => ({...s, value: val}))}} onKeyDown={(e) => onEnterCaptured(e.key)} />
                <button className={`${styles.bgTransparent} ${styles.border0} ${styles.p0} ${styles.dFlex} ${styles.flexRow} ${styles.alignItemsCenter} ${styles.cursorPointer}`} onClick={(e) => createCaptchaChars(e)} >
                    {refreshButtonIcon
                    ?
                        refreshButtonIcon
                    :
                        <ArrowClockwise className={`${styles.lead} ${styles.textBlack}`} />
                    }
                </button>
            </div>
        </div>
    );
}
