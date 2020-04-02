import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import Animations from '../../components/Scripts/Animations';
import Easings from '../../components/Scripts/Easings';
import Notifications from '../../components/Notification/Notifications';

import '../style.scss';

const First = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');

    useImperativeHandle(ref, _ => ({
        cachedState() {
            return { inputValue }
        },
        restoreCachedState(stateObject) {
            inputValue = stateObject.inputValue
        }
    }))

    return (
        <div className="page" style={{
            background: 'green',
        }}>
            <h1>Screen 1</h1>

            {/** Go to Screen 2 Button */}
            <input type='button' value="Go to Screen 2" onClick={_ => {
                props.switcher.current.switchTo('Screen2', Animations.SlideFromRight, 200, Easings.easeInOutQuart);
            }} />

            {/** Show Push Notification Button */}
            <input type='button' value="Show Push Notification" onClick={_ => {
                Notifications.show('Test Notification',
                    'This is a test notification showing normal notifications',
                    {
                        darkMode: true
                    }
                )
            }} />

            {/** Show Confirm Notification Button */}
            <input type='button' value="Show Confirm Notification" onClick={_ => {
                Notifications.showConfirm('Test Confirm Notification',
                    'This is a test notification showing how confirm notifications work',
                    _ => {
                        console.log('Confirm Clicked')
                    },
                    _ => {
                        console.log('Dismiss Clicked')
                    },
                    {
                        darkMode: true,
                        confirmTitle: 'Okay',
                        dismissTitle: 'Nope'
                    }
                )
            }} />

            <input type="text" value={inputValue} placeholder="Cache Test" onChange={e => setInputValue(e.target.value)} />

        </div>
    )
})

export default First;