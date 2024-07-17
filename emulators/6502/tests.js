function test() {
    const MEMORYSIZE = 0x10000;
    const MEM = new Memory(MEMORYSIZE);
    const CPU = new Processor();

    MEM.Initialize();
    CPU.Reset();
}
