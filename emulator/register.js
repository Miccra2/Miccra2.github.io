class Register {
    // name: str
    // size: int                    (in byte)
    // other: Array[Register]       (for callback to main register)
    constructor(name, size, other = null) {
        this.name = name;
        this.size = size;
        if (other === null) {
            this.data = new Uint8Array(this.size);
        }
        else if (other instanceof Register) {
            this.other = other;
        }
    }

    // reg: Register
    // offset: int
    AddReg(reg, offset) {
        if (this.regs === undefined) {
            this.regs = [];
        }
        this.regs.push({offset: offset, reg: reg});
        return reg;
    }

    // size: int
    // offset: int
    // byteorder: str
    Read(size = null, offset = 0, byteorder = "little") {
        if (size === null) {
            size = this.size;
        }
        if (this.other instanceof Register) {
            if (this.regs instanceof Array) {
                return this.regs.forEach((e) => {
                    if (e.reg.name === this.name) {
                        return other.Read(e.reg.size, e.offset, byteorder);
                    }
                });
            }
            return null;
        }
        let res = 0;
        if (byteorder === "little") {
            for (let i = 0; i < this.data.length && i < this.size && i < size; i++) {
                res += this.data[(offset * 8) + i] << (i * 8);
            }
            return res;
        }
        else if (byteorder === "big") {
            for (let i = 0; i < this.data.length && i < this.size && i < size; i++) {
                res += this.data[(offset * 8) + size - i] << (i * 8);
            }
            return res;
        }
        return null;
    }

    // value: int
    // size: int
    // offset: int
    // byteorder: str
    Write(value, size = null, offset = 0, byteorder = "little") {
        if (size === null) {
            size = this.size;
        }
        if (this.other instanceof Register) {
            if (this.regs instanceof Array) {
                return this.regs.forEach((e) => {
                    if (e.reg.name === this.name) {
                        other.Write(vlaue, e.reg.size, e.offset, byteorder);
                    }
                });
            }
            return null;
        }
        let res = 0;
        if (byteorder === "little") {
            for (let i = 0; i < this.data.length && i < this.size && i < size; i++) {
                res += this.data[offset + i] << (i * 8);
            }
            return res;
        }
        else if (byteorder === "big") {
            for (let i = 0; i < this.data.length && i < this.size && i < size; i++) {
                res += this.data[offset + size - i] << (i * 8);
            }
            return res;
        }
        return null;
    }
}

// for managing register visuals in emulator
class RegisterCollection {
    // regs: Array[Register]
    constructor(regs) {
        this.regs = regs;
    }
}
