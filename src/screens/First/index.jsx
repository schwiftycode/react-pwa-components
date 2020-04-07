import React, { useState, useEffect } from 'react';
import { Toasts, Notifications, Animations, Easings } from '../../components';

import '../style.scss';

const First = props => {
    const screenName = "First"
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="page" style={{
            background: 'green',
        }}>
            <h1>Screen 1</h1>

            {/** Go to Screen 2 Button */}
            <input type='button' value="Go to Screen 2" onClick={_ => {
                props.switcher.current.switchTo('Second', Animations.SlideFromRight, 200, Easings.easeInOutQuart);
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

            <input type="text" value={inputValue} placeholder="State Cache Test" onChange={e => setInputValue(e.target.value)} />
            
            <input type='button' value="Clear States" onClick={_ => {
                props.switcher.current.clearStates()
            }} />
            
            <input type='button' value="Show Toast Message" onClick={_ => {
                Toasts.show("Testing 1.. 2..")
            }} />
            
            <input type='button' value="Present Overlay" onClick={_ => {
                props.switcher.current.presentOverlay('Overlay', Animations.SlideFromBottom, 200, Easings.linearTween);
            }} />

        </div>
    )
}

export default First;