import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

import './style.css';

export const Animations = {
    Fade: 'Fade',
    SlideFromLeft: 'SlideFromLeft',
    SlideFromRight: 'SlideFromRight',
    SlideFromTop: 'SlideFromTop',
    SlideFromBottom: 'SlideFromBottom',
}

export const Easings = {
    linearTween: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeInQuad: function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    },
    easeInCubic: function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    },
    easeOutCubic: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    },
    easeInOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    },
    easeInQuart: function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t + b;
    },
    easeOutQuart: function (t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    },
    easeInOutQuart: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    },
    easeInQuint: function (t, b, c, d) {
        t /= d;
        return c * t * t * t * t * t + b;
    },
    easeOutQuint: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    },
    easeInSine: function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        t--;
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    },
    easeInCirc: function (t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t * t) - 1) + b;
    },
    easeOutCirc: function (t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t * t) + b;
    },
    easeInOutCirc: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        t -= 2;
        return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    },
}

const ScreenSwitcher = forwardRef((props, ref) => {
    const [currentScreen, setCurrentScreen] = useState(null)
    const [nextScreen, setNextScreen] = useState(null)
    const currentScreenContainer = useRef(null)
    const nextScreenContainer = useRef(null)

    let anim = null;
    let animationStart = 0

    useEffect(_ => {
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.opacity = 0
        if (props.initialScreen) {
            setCurrentScreen(props.initialScreen)
        }
    }, [])

    useImperativeHandle(ref, _ => ({
        navigate(screenName, animation, duration, easing) {
            // Ensure all properties have values
            screenName = screenName || Object.keys(props.screens)[0]
            animation = animation || Animations.Fade
            duration = duration || 500
            easing = easing || Easings.linearTween

            // Prepare for Animation
            setNextScreen(screenName)
            let now = new Date().getTime();
            animationStart = now

            // Start Animation
            switch (animation) {
                case Animations.SlideFromRight:
                    animateSlideFromRight(duration, easing);
                    break;
                case Animations.SlideFromLeft:
                    animateSlideFromLeft(duration, easing);
                    break;
                case Animations.Fade:
                default:
                    animateFade(duration, easing);
                    break;
            }

            // Clean Up
            setTimeout(_ => {
                setCurrentScreen(screenName)
                clearInterval(anim)
                resetAnimationParams()
                setNextScreen(null)
            }, duration)
        }
    }))

    const animateSlideFromRight = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 1
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(100vw, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * 100}vw, 0)`
            currentScreenContainer.current.style.transform = `translate(${animPosition(duration, easing) * -100}vw, 0)`
        }, (1000 / 60));
    }

    const animateSlideFromLeft = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 1
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(-100vw, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.transform = `translate(${(1 - animPosition(duration, easing)) * -100}vw, 0)`
            currentScreenContainer.current.style.transform = `translate(${animPosition(duration, easing) * 100}vw, 0)`
        }, (1000 / 60));
    }

    const animateFade = (duration, easing) => {
        // Prepare for animation
        nextScreenContainer.current.style.opacity = 0
        currentScreenContainer.current.style.opacity = 1
        // Execute animation
        anim = setInterval(_ => {
            nextScreenContainer.current.style.opacity = animPosition(duration, easing)
            currentScreenContainer.current.style.opacity = 1 - animPosition(duration, easing)
        }, (1000 / 60));
    }

    const animPosition = (duration, easing) => {
        const now = new Date().getTime()
        const animStart = animationStart
        const animPercent = (now - animStart) / duration
        const animEasePercent = easing(animPercent, 0, 1, 1)
        return animEasePercent
    }

    const resetAnimationParams = _ => {
        nextScreenContainer.current.style.opacity = 0
        currentScreenContainer.current.style.opacity = 1
        nextScreenContainer.current.style.transform = 'translate(0, 0)'
        currentScreenContainer.current.style.transform = 'translate(0, 0)'
    }

    return (
        <div className="ScreenSwitcher">
            <div ref={nextScreenContainer} className="NextScreenContainer">
                {props.screens[nextScreen]}
            </div>
            <div ref={currentScreenContainer} className="CurrentScreenContainer">
                {props.screens[currentScreen]}
            </div>
        </div>
    )
})

ScreenSwitcher.defaultProps = {
    screens: {}
}

export default ScreenSwitcher;