import React, { useRef } from 'react';
import ScreenSwitcher from '../../components/ScreenSwitcher';
import Animations from '../../components/Scripts/Animations';
import Easings from '../../components/Scripts/Easings';
import Notifications from '../../components/Notification/Notifications';

import '../style.scss';

const Second = props => {
    const pageStyle = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
    const pageHeaderStyle = {
        color: 'white',
        marginTop: 24,
        marginBottom: 12,
        fontWeight: 500,
    }
    const buttonStyle = {
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        border: 'none',
        background: 'white',
        color: 'black',
        borderRadius: 500,
        marginTop: 12,
        cursor: 'pointer',
    }
    return (
        <div style={{
            ...pageStyle,
            background: 'blue',
        }}>
            <h1 style={pageHeaderStyle}>Screen 2</h1>

            {/** Go to Screen 1 Button */}
            <input type='button' style={buttonStyle} value="Go to Screen 1" onClick={_ => {
                props.switcher.current.navigate('Screen1', Animations.SlideFromLeft, 200, Easings.easeInOutQuart);
            }} />

        </div>
    )
}

export default Second;