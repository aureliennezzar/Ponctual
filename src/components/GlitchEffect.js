import React, { useEffect, useState } from 'react';
import { GlitchContext } from '../contexts/GlitchContext';

const GlitchEffect = ({ active = true, children }) => {
    const [renderedText, setRenderedText] = useState(children)
    const [originalText, setoriginalText] = useState(children)

    useEffect(() => {
        if (active) {
            glitchEffect(renderedText)
            active = false
        }
    }, [])
    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    const getRandomIndex = (len) => {
        return (Math.floor(Math.random() * len) + 1) - 1
    }

    const glitchEffect = (text) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const original = text.slice(0)
        let interval = 0
        switch (Math.floor(Math.random() * 10)) {
            case 0:
                interval += 2000
                break;
            case 1:
                interval += 1500
                break;
            case 2:
                interval += 3250
                break;
            case 3:
                interval += 4000
                break;
            case 4:
                interval += 2250
                break;
            case 5:
                interval += 6000
                break;
            case 6:
                interval += 3000
                break;
            case 7:
                interval += 1750
                break;
            case 8:
                interval += 5300
                break;
            case 9:
                interval += 3700
                break;

            default:
                interval += 4100
                break;
        }
        setInterval(() => {
            const randomIndex = getRandomIndex(text.length)

            for (let i = 0; i <= 15; i++) {
                const randomChar = getRandomIndex(chars.length)
                setTimeout(() => {
                    if (i % 2 === 0) {
                        text = text.replaceAt(randomIndex, chars[randomChar])
                    } else {
                        text = text.replaceAt(randomIndex, '▒')
                    }
                    setRenderedText(text)
                    if (i === 15) {
                        setRenderedText(original)
                    }
                }, i * 65)
            }
            text = original
        }, interval);

    }
    return (
        <>
            {children}
        </>
        // <GlitchContext.Consumer>
        //     {value => {
        //         if (value) {
        //             return renderedText
        //         } else {
        //             return originalText
        //         }
        //     }}
        // </GlitchContext.Consumer>
    );
}

export default GlitchEffect;