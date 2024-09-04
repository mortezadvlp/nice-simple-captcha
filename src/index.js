import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import Captcha, { _CAPTCHA_EMPTY_ERROR, _CAPTCHA_EXPIRED, _CAPTCHA_LOAD_ERROR, _CAPTCHA_MISMATCH_ERROR, _CAPTCHA_OK } from './Captcha/Captcha'

export const CAPTCHA_OK             = _CAPTCHA_OK;
export const CAPTCHA_LOAD_ERROR     = _CAPTCHA_LOAD_ERROR;
export const CAPTCHA_EMPTY_ERROR    = _CAPTCHA_EMPTY_ERROR;
export const CAPTCHA_MISMATCH_ERROR = _CAPTCHA_MISMATCH_ERROR;
export const CAPTCHA_EXPIRED        = _CAPTCHA_EXPIRED;

export const NiceSimpleCaptcha = forwardRef((
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
      caseSensetive = true
    }, ref) => {

  const innerCaptcha = useRef();

  const resetCaptcha = () => {
    innerCaptcha.current.resetCaptcha();
  }

  useImperativeHandle(ref, () => ({
    resetCaptcha,
  }))

  return (
    <Captcha ref={innerCaptcha}
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
      caseSensetive={caseSensetive}
    />
  )
});
