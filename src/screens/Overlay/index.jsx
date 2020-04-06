import React from 'react';
import { Animations, Easings } from '../../components';

import '../style.scss';

const Overlay = props => {
    return (
        <div className="page" style={{
            background: 'green',
        }}>
            <h1>Overlay Screen</h1>
            <input type="button" onClick={_ => {
                props.switcher.current.dismissOverlay(Animations.SlideFromTop, 200, Easings.linearTween)
            }} />
        </div>
    )
}

export default Overlay