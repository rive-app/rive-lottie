const easingTypes = {
    IN_OUT: 'in-out',
    IN_OUT_ONE_DIMENSIONS: 'in-out-one-dimension',
}

const inOutEasing = keyframe => {
    // TODO: implement hold heyframes
    if (keyframe.interpolationType === 1) {
        return {
            o: {
                x: 0.167,
                y: 0.167,
            },
            i: {
                x: 0.833,
                y: 0.833,
            }
        }
    } else if (keyframe.interpolationType === 2) {
        const interpolator = keyframe.interpolator;
        return {
            o: {
                x: interpolator.x1,
                y: interpolator.y1,
            },
            i: {
                x: interpolator.x2,
                y: interpolator.y2,
            }
        }
    }
    return {
        o: {
            x: 0.167,
            y: 0.167,
        },
        i: {
            x: 0.833,
            y: 0.833,
        }
    }
}

const inOutOneDimensionEasing = keyframe => {
    // TODO: implement hold heyframes
    if (keyframe.interpolationType === 1) {
        return {
            o: {
                x: [0.167],
                y: [0.167],
            },
            i: {
                x: [0.833],
                y: [0.833],
            }
        }
    } else if (keyframe.interpolationType === 2) {
        const interpolator = keyframe.interpolator;
        return {
            o: {
                x: [interpolator.x1],
                y: [interpolator.y1],
            },
            i: {
                x: [interpolator.x2],
                y: [interpolator.y2],
            }
        }
    }
    return {
        o: {
            x: [0.167],
            y: [0.167],
        },
        i: {
            x: [0.833],
            y: [0.833],
        }
    }
}

module.exports = {
    inOutEasing,
    inOutOneDimensionEasing,
}