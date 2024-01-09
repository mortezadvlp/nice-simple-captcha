import React, { useEffect, useState } from 'react'

import { NiceSimpleCaptcha, CAPTCHA_EMPTY_ERROR, CAPTCHA_EXPIRED, CAPTCHA_LOAD_ERROR, CAPTCHA_MISMATCH_ERROR, CAPTCHA_OK } from 'nice-simple-captcha'
import 'nice-simple-captcha/dist/index.css'

const App = () => {
  const [result, setResult] = useState({passed: false, messageCode: 0});
  const [screenColor, setScreenColor] = useState('#ffffff');
  const [screenBorderColor, setScreenBorderColor] = useState('#000000');
  const [captchaColor, setCaptchaColor] = useState('#000000');
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
    <div style={{padding: '10px'}} >
      <div >
        <div >
          <span >Screen Color</span>
          <input type='color' value={screenColor} onChange={e => setScreenColor(e.target.value)} />
        </div>
        <div >
          <span >Screen Border Color</span>
          <input type='color' value={screenBorderColor} onChange={e => setScreenBorderColor(e.target.value)} />
        </div>
        <div >
          <span >Captcha Color</span>
          <input type='color' value={captchaColor} onChange={e => setCaptchaColor(e.target.value)} />
        </div>
        <div >
          <input type='checkbox' checked={line} onChange={(e) => setLine(e.target.checked)} />
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
        <p >Passed: {result.passed ? 'Yes' : 'No'}</p>
        <p >Message: {`${result.messageCode} => ${message}`}</p>
      </div>

      <NiceSimpleCaptcha
        className={''}
        inputClassName={''}
        screenColor={screenColor}
        screenBorderColor={screenBorderColor}
        captchaColor={captchaColor}
        characters={'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'}
        length={len}
        crossLine={line}
        expireAfterSec={validDur}
        style={{width: '200px'}}
        onCaptchaValidate={(passed, messageCode) => captchaValidate(passed, messageCode)}
        onEnterPressed={() => onEnterPressed()}
        refreshButtonIcon = {null}
      />
    </div>
    
  )
}

export default App
