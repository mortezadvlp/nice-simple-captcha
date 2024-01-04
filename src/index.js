import React from 'react'
import styles from './styles.module.css'
import Captcha from './Captcha/Captcha'

export const ExampleComponent = (
    {
      className = '',
      blackMode = false,
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789',
      length = 5,
      crossLine = true,
      expireAfterSec = 60,
      captchaPassed = (passed, messageCode) => {},
      onEnterPressed = () => {},
      style={}
    }) => {
  return (
    <Captcha 
      className={className}
      captchaPassed={(passed, messageCode) => captchaPassed(passed, messageCode)}
      onEnterPressed={() => onEnterPressed()}
      blackMode={blackMode}
      characters={characters}
      length={length}
      crossLine={crossLine}
      expireAfterSec={expireAfterSec}
      style={style}
    />
  )
}
