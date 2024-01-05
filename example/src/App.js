import React, { useEffect, useState } from 'react'

import { NiceSimpleCaptcha, CAPTCHA_EMPTY_ERROR, CAPTCHA_EXPIRED, CAPTCHA_LOAD_ERROR, CAPTCHA_MISMATCH_ERROR, CAPTCHA_OK } from 'nice-simple-captcha'
import 'nice-simple-captcha/dist/index.css'

const App = () => {
  const [result, setResult] = useState({passed: false, messageCode: 0});
  const [blackScreen, setBlackScreen] = useState(false);
  const [len, setLen] = useState(5);
  const [line, setLine] = useState(true);
  const [validDur, setValidDur] = useState(60);
  const [message, setMessage] = useState('');

  useEffect(() =>{
    const msg = 
      result.messageCode === CAPTCHA_OK ? 'CAPTCHA_OK' :
      result.messageCode === CAPTCHA_LOAD_ERROR ? 'CAPTCHA_LOAD_ERROR' :
      result.messageCode === CAPTCHA_EMPTY_ERROR ? 'CAPTCHA_EMPTY_ERROR' :
      result.messageCode === CAPTCHA_MISMATCH_ERROR ? 'CAPTCHA_MISMATCH_ERROR' :
      result.messageCode === CAPTCHA_EXPIRED ? 'CAPTCHA_EXPIRED' : 'Unknown!';

      setMessage(msg);
  }, [result.messageCode])

  const captchaValidate = (passed, messageCode) => {
    setResult({passed: passed, messageCode: messageCode})
  }

  const onEnterPressed = () => {
    alert('Enter pressed');
  }

  return (
    <div >
      <div >
        <div >
          <span >Screen Color</span>
          <select value={blackScreen} onChange={(e) => setBlackScreen(e.target.value)} >
            <option value={false} >White</option>
            <option value={true} >Black</option>
          </select>
        </div>
        <div >
          <input type='checkbox' value={line} onChange={(e) => setLine(e.target.value)} />
          <span >Cross Line</span>
        </div>
        <div >
          <span >Captcha Length</span>
          <input type='number' value={len} onChange={(e) => setLen(e.target.value)} min='3' max='10' />
        </div>
        <div >
          <span >Expire After Sec.</span>
          <input type='number' value={validDur} onChange={(e) => setValidDur(e.target.value)} min='30' max='600' />
        </div>
        <p >Captcha Validation Status:</p>
        <p >Passed: {result.passed}</p>
        <p >Message:</p>
        <p >{`${result.messageCode} => ${message}`}</p>
      </div>

      <NiceSimpleCaptcha
        className={''}
        inputClassName={''}
        blackScreen={blackScreen}
        characters={'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'}
        length={len}
        crossLine={line}
        expireAfterSec={validDur}
        style={{width: '200px'}}
        onCaptchaValidate={(passed, messageCode) => captchaValidate(passed, messageCode)}
        onEnterPressed={() => onEnterPressed()}
      />
    </div>
    
  )
}

export default App
