(() => {
    let memory = new Memory(64 * 1024);
    let cpu = new P6502(memory);

    // inline program - start
    memory.data[0xFFFC] = 0xA9;     // 6502: LDA immediate
    memory.data[0xFFFD] = 0x69;     // immediate value
    // inline program - end

    cpu.Execute(1);
})()
