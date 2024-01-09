# nice-simple-captcha

> Simple Captcha

[![NPM](https://img.shields.io/npm/v/nice-simple-captcha.svg)](https://www.npmjs.com/package/nice-simple-captcha) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nice-simple-captcha
```

## Online Demo

Visit this link:
[https://simacoders.ir/features/#NiceSimpleCaptcha](https://simacoders.ir/features/#NiceSimpleCaptcha)

## Usage

```jsx
import {NiceSimpleCaptcha} from 'nice-simple-captcha'
import 'nice-simple-captcha/dist/index.css'

function Example() {
  return (
    <NiceSimpleCaptcha
      className={''}
      inputClassName={''}
      screenColor='white'
      screenBorderColor='black'
      captchaColor='black'
      characters={'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'}
      length={5}
      crossLine={true}
      expireAfterSec={60}
      style={{width: '200px'}}
      refreshButtonIcon = {null}
      onCaptchaValidate={(passed, messageCode) => captchaValidate(passed, messageCode)}
      onEnterPressed={() => onEnterPressed()}
    />
  )
}
```

### General properties
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>className</td>
      <td>string</td>
      <td>Apply your desire class globally</td>
    </tr>
    <tr>
      <td>inputClassName</td>
      <td>string</td>
      <td>Apply your desire class for input component</td>
    </tr>
      <td>characters</td>
      <td>string</td>
      <td>Acceptable characters for showing in the captcha</td>
    </tr>
    <tr>
      <td>length</td>
      <td>number</td>
      <td>Number of characters in the captcha</td>
    </tr>
    <tr>
      <td>crossLine</td>
      <td>boolean</td>
      <td>Captcha has a cross line over characters or not</td>
    </tr>
    <tr>
      <td>screenColor</td>
      <td>String</td>
      <td>Captcha Screen Color</td>
    </tr>
    <tr>
      <td>screenBorderColor</td>
      <td>String</td>
      <td>Captcha Screen Border Color</td>
    </tr>
    <tr>
      <td>captchaColor</td>
      <td>String</td>
      <td>Captcha Text Color</td>
    </tr>
    <tr>
      <td>expireAfterSec</td>
      <td>number</td>
      <td>Duration that the captcha is valid since it is generated (in sec)</td>
    </tr>
    <tr>
      <td>style</td>
      <td>object</td>
      <td>Apply your desire style globally</td>
    </tr>
    <tr>
      <td>refreshButtonIcon</td>
      <td>Component</td>
      <td>An icon for refresh button. If null, a simple clockwise arrow is shown.</td>
    </tr>
    <tr>
      <td>onCaptchaValidate</td>
      <td>function</td>
      <td>Call on input changes. It returns two parameters: (validation result: boolean, validation message code: number)*</td>
    </tr>
    <tr>
      <td>onEnterPressed</td>
      <td>function</td>
      <td>Call when user press enter key on input.</td>
    </tr>
  </tbody>
</table>
*: Validation message codes are available from:

```jsx
import { CAPTCHA_OK, CAPTCHA_LOAD_ERROR, CAPTCHA_EMPTY_ERROR, CAPTCHA_MISMATCH_ERROR, CAPTCHA_EXPIRED } from 'nice-simple-captcha';
```


## License

MIT © [mortezadvlp](https://github.com/mortezadvlp)
