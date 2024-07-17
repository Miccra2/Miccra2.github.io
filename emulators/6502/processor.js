class Memory {
    size;
    data;

    constructor(size) {
        this.size = size;
    }

    Initialize() {
        this.data = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.data[i] = 0;
        }
    }

    getByte(address) {
        return this.data[address];
    }

    setBate(address, data) {
        this.data[address] = data;
    }
}

class Status {
    C;  // carry
    Z;  // zero
    I;  // interrupt disable
    D;  // decimal mode enable
    B;  // break
    UNUSED; // unused
    V;  // overfow
    N;  // negative

    constructor() {
        this.C = 0;
        this.Z = 0;
        this.I = 0;
        this.D = 0;
        this.B = 0;
        this.UNUSED = 0;
        this.V = 0;
        this.N = 0;
    }

    data(d = undefined) {
        if (d == undefined) {
            return (
                this.C << 0 |
                this.Z << 1 |
                this.I << 2 |
                this.D << 3 |
                this.B << 4 |
                this.UNUSED << 5 |
                this.V << 6 |
                this.N << 7
            )
        } else {
            this.C = d >> 0 & 1;
            this.Z = d >> 1 & 1;
            this.I = d >> 2 & 1;
            this.D = d >> 3 & 1;
            this.B = d >> 4 & 1;
            this.UNUSED = d >> 5 & 1;
            this.V = d >> 6 & 1;
            this.N = d >> 7 & 1;
        }
    }
}

class Processor {
    // registers
    A;
    X;
    Y;
    PC;
    SP;
    P;

    constructor() {
        this.A = 0;
        this.X = 0;
        this.Y = 0;
        this.PC = 0;
        this.SP = 0;
        this.P = new Status();
    }

    Initialize(reset_address, memory) {
        this.A = 0;
        this.X = 0;
        this.Y = 0;
        this.PC = address;
        this.SP = 0xFF;
        this.P = new Status();

        memory.Initialize();
    }

    FetchByte(cycles, memory, address = undefined) {
        cycles--;
        if (address == undefined) {
            address = this.PC;
        }
        this.PC++;
        return memory.data[address];
    }

    FetchWord(cycles, memory, address = undefined) {
        cycles--;
        cycles--;
        if (address == undefined) {
            address = this.PC;
        }
        this.PC++;
        this.PC++;
        return memory.data[address] | (memory.data[address + 1] << 8);
    }

    ReadByte(cycles, memory, address) {}

    WriteByte(cycles, memory, address) {}

    Reset(memory, address = undefined) {
        if (address == undefined) {
            address = 0xFFFC;
        }
        this.Initialize(address, memory);
    }

    Execute(cycles, memory) {
        let instruction = FetchByte(cycles, memory);
        while (cycles) {
            switch (instruction) {
                /* load */
                // LDA
                case 0xA9:  /* LDA (immediate) */       this.A = FetchByte(cycles, memory, this.PC);                                        break;
                case 0xA5:  /* LDA (zero page) */       this.A = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC));             break;
                case 0xB5:  /* LDA (zero page, x) */    this.A = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC) + this.X);    break;
                case 0xAD:  /* LDA (absolute) */        this.A = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC));
                case 0xBD:  /* LDA (absolute, x) */     if ((this.PC + 2) % 255 < this.PC % 255) { cycles++; }
                                                        this.A = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC) + this.X);    break;
                case 0xB9:  /* LDA (absolure, y) */     if ((this.PC + 2) % 255 < this.PC % 255) { cycles++; }
                                                        this.A = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC) + this.Y);    break;
                case 0xA1:  /* LDA (indirect, x) */     this.A = FetchByte(cycles, memory, FetchWord(cycles, memory, FetchByte(cycles, memory, this.PC) + this.X));
                                                        break;
                case 0xB1:  /* LDA (y, indirect) */     if ((this.PC + 2) % 255 < this.PC % 255) { cycles++; }
                                                        this.A = FetchByte(cycles, memory, FetchWord(cycles, memory, FetchByte(cycles, memory, this.PC)) + this.Y);
                                                        break;
                // LDX
                case 0xA2:  /* LDX (immediate) */       this.X = FetchByte(cycles, memory, this.PC);                                        break;
                case 0xA6:  /* LDX (zero page) */       this.X = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC));             break;
                case 0xB6:  /* LDX (zero page, y) */    this.X = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC) + this.Y);    break;
                case 0xAE:  /* LDX (absolute) */        this.X = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC));             break;
                case 0xBE:  /* LDX (absolute, y) */     if ((this.PC + 2) % 255 < this.PC % 255) { cycles++; } 
                                                        this.X = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC) + this.Y);    break;
                // LDY
                case 0xA0:  /* LDY (immediate) */       this.Y = FetchByte(cycles, memory, this.PC);                                        break;
                case 0xA4:  /* LDY (zero page) */       this.Y = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC));             break;
                case 0xB4:  /* LDY (zero page, x) */    this.Y = FetchByte(cycles, memory, FetchByte(cycles, memory, this.PC) + this.X);    break;
                case 0xAC:  /* LDY (absolute) */        this.Y = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC));             break;
                case 0xBC:  /* LDY (absolute, x) */     if ((this.PC + 2) % 255 < this.PC % 255) { cycles++; }
                                                        this.Y = FetchByte(cycles, memory, FetchWord(cycles, memory, this.PC) + this.X);    break;
                
                /* store */
                // STA
                case 0x85:  /* STA (zero page) */       break;
            }
            instruction = FetchByte(cycles, memory);
        }
    }
}
