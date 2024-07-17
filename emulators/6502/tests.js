class Test {
    mem;
    cpu;

    constructor() {
        const MEMORYSIZE = 0x10000;
        this.mem = new Memory(MEMORYSIZE);
        this.cpu = new Processor();
    }

    TestInitializationAndReset() {
        this.mem.Initialize();
        this.cpu.Initialize();
    }
}

function test() {
    const MEMORYSIZE = 0x10000;
    const MEM = new Memory(MEMORYSIZE);
    const CPU = new Processor();

    MEM.Initialize();
    CPU.Reset(MEM);
}
