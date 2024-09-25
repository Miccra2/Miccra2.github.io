const MemoryMap = {
    offset: null,
    size: null,
    Read: undefined,
    Write: undefined,
};

class Memory {
    // size: int
    // map: Array[MemoryRange]
    constructor(size, map = null) {
        this.size = size;
        this.map = map;
        this.data = new Uint8Array(size);
    }

    // address: int
    Read(address) {
        if (address > this.size) {
            // Excption
            console.warn(`Error: Value '${address}' of 'address' is outside of size!`);
            return null;
        }
        if (this.map instanceof Array) {
            return this.map.forEach((e) => {
                if (e.Read !== undefined && address >= e.offset && address <= e.size) {
                    return e.Read(this, address);
                }
            });
        }
        return this.data[address];
    }

    // value: int
    // address: int
    Write(value, address) {
        if (address > this.size) {
            console.warn(`Error: Value '${address}' of 'address' is outside of size!`);
            return null;
        }
        if (this.map instanceof Array) {
            return this.map.forEach((e) => {
                if (e.Write !== undefined && address >= e.offset && address <= e.size) {
                    return e.Write(this, value, address);
                }
            });
        }
    }

    // address: int
    // size: int
    // byteorder: str
    GetRange(address, size, byteorder = "little") {
        let res = 0;
        if (byteorder === "little") {
            for (let i = 0; i < size; i++) {
                res += this.Read(address + i) << (i * 8);
            }
            return res;
        }
        else if (byteorder === "big") {
            for (let i = 0; i < size; i++) {
                res += this.Read(address + size - i) << (i * 8);
            }
            return res;
        }
        return null;
    }

    // address: int
    FetchByte(address) {
        return this.Read(address);
    }

    // address: int
    // byteorder: str
    FetchWrod(address, byteorder = "little") {
        return this.GetRange(address, 2, byteorder);
    }

    // address: int
    // byteorder: str
    FetchDword(address, byteorder = "little") {
        return this.GetRange(address, 4, byteorder);
    }

    // address: int
    // byteorder: str
    FetchQword(address, byteorder = "little") {
        return this.GetRange(address, 8, byteorder);
    }
}
