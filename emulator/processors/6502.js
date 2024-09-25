class P6502 {
    constructor() {
        this.AC = new Register("AC", 1);    // accumulator
        this.XI = new Register("XI", 1);    // x index
        this.YI = new Register("YI", 1);    // y index
        this.PC = new Register("PC", 2);    // program counter
        this.SP = new Register("SP", 1);    // stack pointer
        this.PF = new Register("PF", 1);    // processor flags
        new RegisterCollection([
            this.AC,
            this.XI,
            this.YI,
            this.PC,
            this.SP,
            this.PF,
        ]);
    }
}
