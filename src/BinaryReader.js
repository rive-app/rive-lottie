class BinaryReader {

    readIndex = 0;

    constructor(buffer) {
        this.buffer = buffer;
    }

    isEOF() {
        return this.readIndex >= this.buffer.length;
    }

    readUint8() {
        const value = this.buffer.readUInt8(this.readIndex);
        this.readIndex += 1;
        return value;
    }

    readUint32() {
        const value = this.buffer.readUInt32LE(this.readIndex);
        this.readIndex += 4;
        return value;
      }

    readVarUint() {
        let result = 0;
        let shift = 0;
        while (true) {
            let byte = this.buffer.readUInt8(this.readIndex++) & 0xff;
            result |= (byte & 0x7f) << shift;
            if ((byte & 0x80) === 0) break;
            shift += 7;
        }
        return result;
    }

    readFloat32() {
        let value = this.buffer.readFloatLE(this.readIndex);
        this.readIndex += 4;
        return value;
    }

    readString(explicitLength = true) {
        const length = explicitLength ? this.readVarUint() : this.buffer.lengthInBytes;
        let str = '';
        for (let i = 0; i < length; i += 1) {
            str += String.fromCharCode(this.readUint8());
        }
        return str;
    }
}

module.exports = BinaryReader;