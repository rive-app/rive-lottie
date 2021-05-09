const uin32ToRgba = color => {
    return {

        r: (0x00ff0000 & color) >>> 16,
        g: (0x0000ff00 & color) >>> 8,
        b: (0x000000ff & color) >>> 0,
        a: (0xff000000 & color) >>> 24,
    }
}

const rgbaToVector = color => {
    return [
        color.r / 255,
        color.g / 255,
        color.b / 255,
        color.a / 255 * 100,
    ]
}

module.exports = {
    uin32ToRgba,
    rgbaToVector,
}