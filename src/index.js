import React, { useImperativeHandle, useRef } from 'react'
import Captcha from './Captcha/Captcha'

export const CAPTCHA_OK             =  0;
export const CAPTCHA_LOAD_ERROR     = -1;
export const CAPTCHA_EMPTY_ERROR    = -2;
export const CAPTCHA_MISMATCH_ERROR = -3;
export const CAPTCHA_EXPIRED        = -4;

export const NiceSimpleCaptcha = (
    {
      className = '',
      inputClassName = '',
      screenColor = 'white',
      screenBorderColor = 'black',
      captchaColor = 'black',
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
      length = 5,
      crossLine = true,
      expireAfterSec = 60,
      onCaptchaValidate = (passed, messageCode) => {},
      onEnterPressed = () => {},
      style={},
      refreshButtonIcon = null,
    }) => {

  const innerCaptcha = useRef();

  const resetCaptcha = () => {
    innerCaptcha.current.resetCaptcha();
  }

  useImperativeHandle(innerCaptcha, () => ({
    resetCaptcha,
  }))

  return (
    <Captcha refs={innerCaptcha} 
      className={className}
      inputClassName={inputClassName}
      onCaptchaValidate={(passed, messageCode) => onCaptchaValidate(passed, messageCode)}
      onEnterPressed={() => onEnterPressed()}
      screenColor={screenColor}
      screenBorderColor={screenBorderColor}
      captchaColor={captchaColor}
      characters={characters}
      length={Number(length)}
      crossLine={crossLine}
      expireAfterSec={Number(expireAfterSec)}
      style={style}
      refreshButtonIcon={refreshButtonIcon}
    />
  )
}
