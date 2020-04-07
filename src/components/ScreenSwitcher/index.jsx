import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Animations, Easings } from "../index";
import $ from 'jquery';

import './style.scss';

const ScreenNavigator = forwardRef((props, ref) => {

    // Props
    let { initialScreen, screens } = props

    // Refs
    const rootContainer = useRef(null)

    // locals
    let anim = null
    let animEnd = null
    let animationStart = 0
    let currentScreenContainerClass = 'CurrentScreenContainer'
    let nextScreenContainerClass = 'NextScreenContainer'
    let overlayScreenContainerClass = 'OverlayScreenContainer'

    useEffect(_ => {
            console.log("Setup setup setup!")
            Object.keys(screens).forEach(key => {
            addScreenToDOM(key, screens[key])
        })
    })

    useEffect(_ => {
        return _ => {
            console.log("Cleanup cleanup everybody cleanup!")
            Object.keys(screens).forEach(key => {
                removeScreenFromDOM(key, screens[key])
            })
        }
    })

    useImperativeHandle(ref, _ => ({
        present: present,
        switchTo: switchTo,
        presentOverlay: presentOverlay,
        dismissOverlay: dismissOverlay,
    }))

    const resetAnimation = _ => {
        if (anim) {
            clearInterval(anim)
            anim = null
            if (animEnd) {
                clearTimeout(animEnd)
                animEnd = null
            }
        }
    }

    const present = (screenName, animation) => {
        if (anim) {
            resetAnimation()

            const currentScreenContainer = $(`.${currentScreenContainerClass}`)
            const nextScreenContainer = $(`.${nextScreenContainerClass}`)

            // currentScreenContainer.removeClass(currentScreenContainerClass)
            nextScreenContainer.removeClass(nextScreenContainerClass)
            nextScreenContainer.addClass(currentScreenContainerClass)
        }

        // Ensure all properties have values
        animation = validateAnimationObject(animation);

        // Prepare for Animation
        const now = new Date().getTime()
        animationStart = now

        // Get Screens
        const currentScreenContainer = $(`.${currentScreenContainerClass}`)
        const nextScreenContainer = $(`#${screenName}`)
        nextScreenContainer.addClass(nextScreenContainerClass)

        // Start Animation
        startAnimation(currentScreenContainer, nextScreenContainer, animation.animation, animation.duration, animation.easing)

        // Clean Up
        animEnd = setTimeout(_ => {
            currentScreenContainer.removeClass(currentScreenContainerClass)
            nextScreenContainer.removeClass(nextScreenContainerClass)
            nextScreenContainer.addClass(currentScreenContainerClass)
            resetAnimation()
        }, animation.duration + 100)
    }

    const switchTo = (screenName, animation, duration, easing) => {
        console.log("The switchTo function has been deprecated and has been replaced with present(screenName, animationObject)")

        // Ensure all properties have values
        screenName = screenName || Object.keys(screens)[0]
        let animObj = {
            animation: animation,
            duration: duration,
            easing: easing
        }
        animObj = validateAnimationObject(animObj)

        // Use present instead of switchTo
        present(screenName, animObj)
    }

    const presentOverlay = (screenName, animation) => {
        if (anim) {
            resetAnimation()
        }

        // Ensure all properties have values
        animation = validateAnimationObject(animation);

        // Prepare for Animation
        let now = new Date().getTime();
        animationStart = now

        // Get Screens
        const overlayScreenContainer = $(`#${screenName}`)
        overlayScreenContainer.addClass(overlayScreenContainerClass)

        // Start Animation
        startAnimation(null, overlayScreenContainer, animation.animation, animation.duration, animation.easing)

        // Clean Up
        animEnd = setTimeout(_ => {
            resetAnimation()
        }, animation.duration + 100)
    }

    const dismissOverlay = (animation) => {
        if (anim) {
            resetAnimation()

            const overlayScreenContainer = $(`.${overlayScreenContainerClass}`)

            overlayScreenContainer.removeClass(overlayScreenContainerClass)
        }
        // Ensure all properties have values
        animation = validateAnimationObject(animation);

        // Prepare for Animation
        let now = new Date().getTime();
        animationStart = now

        // Get Screens
        const overlayScreenContainer = $(`.${overlayScreenContainerClass}`).last()
        overlayScreenContainer.addClass(overlayScreenContainerClass)

        // Start Animation
        startAnimation(overlayScreenContainer, null, animation.animation, animation.duration, animation.easing)

        // Clean Up
        animEnd = setTimeout(_ => {
            overlayScreenContainer.removeClass(overlayScreenContainerClass)
            resetAnimation();
        }, animation.duration + 100)
    }

    const validateAnimationObject = (animObj) => {
        animObj.animation = animObj.animation || Animations.Fade
        animObj.duration = animObj.duration || 500
        animObj.easing = animObj.easing || Easings.linearTween

        return animObj
    }

    const startAnimation = (cScreen, nScreen, animation, duration, easing) => {
        switch (animation) {
            case Animations.SlideFromRight:
                animateSlideFromRight(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromLeft:
                animateSlideFromLeft(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromBottom:
                animateSlideFromBottom(cScreen, nScreen, duration, easing);
                break;
            case Animations.SlideFromTop:
                animateSlideFromTop(cScreen, nScreen, duration, easing);
                break;
            case Animations.Fade:
            default:
                animateFade(cScreen, nScreen, duration, easing);
                break;
        }
    }

    const animateSlideFromRight = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.css({
                opacity: 1,
                transform: 'translate(0,0)'
            })
        }
        if (nScreen) {
            nScreen.css({
                opacity: 1,
                transform: 'translate(100vw,0)'
            })
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.css('transform', `translate(${animPosition(duration, easing) * -100}vw, 0)`)
            }
            if (nScreen) {
                nScreen.css('transform', `translate(${(1 - animPosition(duration, easing)) * 100}vw, 0)`)
            }
        }, (1000 / 60));
    }

    const animateSlideFromLeft = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.css({
                opacity: 1,
                transform: 'translate(0,0)'
            })
        }
        if (nScreen) {
            nScreen.css({
                opacity: 1,
                transform: 'translate(-100vw,0)'
            })
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.css('transform', `translate(${animPosition(duration, easing) * 100}vw, 0)`)
            }
            if (nScreen) {
                nScreen.css('transform', `translate(${(1 - animPosition(duration, easing)) * -100}vw, 0)`)
            }
        }, (1000 / 60));
    }

    const animateSlideFromBottom = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.css({
                opacity: 1,
                transform: 'translate(0,0)'
            })
        }
        if (nScreen) {
            nScreen.css({
                opacity: 1,
                transform: 'translate(0,100vh)'
            })
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.css('transform', `translate(0, ${animPosition(duration, easing) * 100}vh)`)
            }
            if (nScreen) {
                nScreen.css('transform', `translate(0, ${(1 - animPosition(duration, easing)) * 100}vh)`)
            }
        }, (1000 / 60));
    }

    const animateSlideFromTop = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.css({
                opacity: 1,
                transform: 'translate(0,0)'
            })
        }
        if (nScreen) {
            nScreen.css({
                opacity: 1,
                transform: 'translate(0,-100vh)'
            })
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.css('transform', `translate(0, ${animPosition(duration, easing) * 100}vh)`)
            }
            if (nScreen) {
                nScreen.css('transform', `translate(0, ${(1 - animPosition(duration, easing)) * -100}vh)`)
            }
        }, (1000 / 60));
    }

    const animateFade = (cScreen, nScreen, duration, easing) => {
        // Prepare for animation
        if (cScreen) {
            cScreen.css('opacity', 1)
        }
        if (nScreen) {
            nScreen.css('opacity', 0)
        }
        // Execute animation
        anim = setInterval(_ => {
            if (cScreen) {
                cScreen.css('opacity', 1 - animPosition(duration, easing))
            }
            if (nScreen) {
                nScreen.css('opacity', animPosition(duration, easing))
            }
        }, (1000 / 60));
    }

    const animPosition = (duration, easing) => {
        const now = new Date().getTime()
        const animStart = animationStart
        const animPercent = Math.min(1, (now - animStart) / duration)
        const animEasePercent = easing(animPercent, 0, 1, 1)
        return animEasePercent
    }

    const addScreenToDOM = (screenName, screen) => {
        let screenContainer = document.createElement('div')
        screenContainer.id = screenName
        $(screenContainer).addClass('ScreenContainer')
        if (initialScreen === screenName) {
            $(screenContainer).addClass('CurrentScreenContainer')
        }
        rootContainer.current.appendChild(screenContainer)
        ReactDOM.render(screen, screenContainer)
    }

    const removeScreenFromDOM = (screenName, screen) => {
        $(`#${screenName}`).remove()
    }

    return (
        <div className="ScreenSwitcher" ref={rootContainer}>
            {/* Child Screens will be appended here */}
        </div>
    )
})

ScreenNavigator.defaultProps = {
    screens: {}
}

export default ScreenNavigator;