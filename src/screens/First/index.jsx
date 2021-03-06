import React, { useState, useEffect } from 'react';
import { Toasts, Notifications, Animations, Easings } from '../../components';

import '../style.scss';

const First = props => {
    const screenName = "First"
    const [inputValue, setInputValue] = useState('');
    const [isDark, setIsDark] = useState(false);

    return (
        <div className="page" style={{
            background: 'green',
        }}>
            <h1>Screen 1</h1>

            {/** Go to Screen 2 Button */}
            <input type='button' value="Go to Screen 2" onClick={_ => {
                props.switcher.current.present('Second', {
                    animation: Animations.SlideFromRight,
                    duration: 200,
                    easing: Easings.easeInOutQuart
                });
            }} />

            {/** Show Push Notification Button */}
            <input type='button' value="Show Push Notification" onClick={_ => {
                Notifications.show('Test Notification',
                    'This is a test notification showing normal notifications',
                    {
                        darkMode: isDark
                    }
                )
                setIsDark(!isDark)
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
                        darkMode: isDark,
                        confirmTitle: 'Okay',
                        dismissTitle: 'Nope'
                    }
                )
                setIsDark(!isDark)
            }} />

            <input type="text" value={inputValue} placeholder="State Cache Test" onChange={e => setInputValue(e.target.value)} />

            <input type='button' value="Show Toast Message" onClick={_ => {
                Toasts.show("Testing 1.. 2..")
            }} />

            <input type='button' value="Present Overlay" onClick={_ => {
                props.switcher.current.presentOverlay('Overlay', {
                    animation: Animations.SlideFromBottom,
                    duration: 200,
                    easing: Easings.linearTween
                });
            }} />

        </div>
    )
}

export default First;