import React from 'react';
import { Animations, Easings } from '../../components';

import '../style.scss';

const Overlay = props => {
    return (
        <div className="page" style={{
            background: '#333333',
        }}>
            <h1>Overlay Screen</h1>
            <input type="button" onClick={_ => {
                props.switcher.current.dismissOverlay({
                    animation: Animations.SlideFromTop,
                    duration: 200,
                    easing: Easings.linearTween
                })
            }} value="Dismiss" />
        </div>
    )
}

export default Overlay