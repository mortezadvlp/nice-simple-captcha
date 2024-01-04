
import { useState, useEffect } from 'react';
import './Captcha.css';
import { ArrowClockwise } from 'react-bootstrap-icons';
import { useRef } from 'react';
import { toPng } from 'html-to-image';

export const CAPTCHA_OK             =  0;
export const CAPTCHA_LOAD_ERROR     = -1;
export const CAPTCHA_EMPTY_ERROR    = -2;
export const CAPTCHA_MISMATCH_ERROR = -3;
export const CAPTCHA_EXPIRED        = -4;

export default function Captcha( {
        className = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
        length = 5,
        blackMode = false,
        crossLine = true,
        expireAfterSec = 60,
        captchaPassed = (passed, messageCode) => {},
        onEnterPressed = () => {},
        style={},
    } ) {

    const [captchaChars, setCaptchaChars] = useState([]);
    const [inputCaptcha, setInputCaptcha] = useState({captcha: '', value: '', generateTime: 0});
    const captchaRef = useRef(null);
    const [img, setImg] = useState('');

    useEffect(() => {
        if (inputCaptcha.captcha === '') {
            captchaPassed(false, CAPTCHA_LOAD_ERROR); //'Load Error'
        }
        else if (inputCaptcha.value === '') {
            captchaPassed(false, CAPTCHA_EMPTY_ERROR);   //'Empty Value'
        }
        else if (inputCaptcha.captcha !== inputCaptcha.value) {
            captchaPassed(false, CAPTCHA_MISMATCH_ERROR);   //'Mismatch'
        }
        else if ((Date.now() - inputCaptcha.generateTime) > (expireAfterSec * 1000)) {
            captchaPassed(false, CAPTCHA_EXPIRED);   //'Expired'
        }
        else {
            captchaPassed(true, CAPTCHA_OK); //''
        }
    }, [inputCaptcha])

    useEffect(() => {
        setTimeout(() => {
            createCaptchaChars();
        }, 500);
    }, [characters, length])

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

    const createCaptchaChars = () => {
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
        setInputCaptcha({captcha: chStr.reverse().join(''), value: '', generateTime: Date.now()});
    }
    
    const onEnterCaptured = (key) => {
        if (key === 'Enter') {
            onEnterPressed();
        }
    }

    return (
        <div className={`py-2 d-flex flex-column gap-2 ${className}`} style={style} >
            <div className='position-relative' >
                <div ref={captchaRef} className={`captcha-characters ${blackMode ? 'bg-dark' : 'bg-light'} d-flex flex-row justify-content-evenly p-2 position-relative`} >
                    {captchaChars.map((char, index) =>
                        <span key={index} className={`${blackMode ? 'text-white' : 'text-black'}`} 
                            style={{
                                    scale: char.scale,
                                    fontWeight: char.fontWeight,
                                    rotate: `${char.rotate}deg`,
                                    alignSelf: char.align
                                }} 
                        >{char.ch}</span>
                    )}
                    {crossLine &&
                    <div className={`border-bottom ${blackMode ? 'border-light' : 'border-dark'} border-2 position-absolute top-50`} style={{width: '90%'}} ></div>
                    }
                </div>
                <div className='w-100 position-absolute top-0 start-0' ><img src={img} /></div>
            </div>
            <div className='d-flex flex-row align-items-center gap-2' >
                <input dir='ltr' value={inputCaptcha.value} onChange={(e) => setInputCaptcha(s => ({...s, value: e.target.value}))} onKeyDown={(e) => onEnterCaptured(e.key)} />
                <button className={`lead ${blackMode ? 'text-black' : 'text-white'} bg-transparent border-0 p-0`} onClick={() => createCaptchaChars()} ><ArrowClockwise /> </button>
            </div>
        </div>
    );
}
