# React-TV Navigation

> Navigation for TVs using React-TV

![React-TV Navigation Example](images/example.gif)

[See code from this example](https://github.com/react-tv/react-tv/blob/master/examples/navigation/src/App.js)

Based on Netflix navigation, React-TV-Navigation is a separated package from renderer to manage focusable components. React and [React-TV[(http://github.com/react-tv/react-tv)] are peer-dependencies.

## withFocusable and withNavigation:

Navigation based on HOC and HOF beeing declarative.

```jsx
import React from 'react'
import ReactTV, { renderOnAppLoaded } from 'react-tv'
import { withFocusable, withNavigation } from 'react-tv-navigation'

const Item = ({focused, setFocus, focusPath}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <div onClick={() => { setFocus() }} >
      It's {focused} Item
    </div>
  )
}

const Button = ({focused, setFocus, focusPath}) => {
  return (
    <div onClick={() => { setFocus('focusPath-1') }}>
      Back To First Item!
    </div>
  )
}

const FocusableItem = withFocusable({focusPath: 'item-1'})(Item)
const FocusableOtherItem = withFocusable({focusPath: 'item-2'})(Item)
const FocusableButton = withFocusable({focusPath: 'button'})(Button)

function App({currentFocusPath}) {
  return (
    <div>
      <h1>Current FocusPath: '{currentFocusPath}'</h1>,
      <FocusableItem/>
      <FocusableOtherItem/>
      <FocusableButton/>
    </div>
  )
}
```

Soon we'll write a decent README.md :)

#### License by MIT
