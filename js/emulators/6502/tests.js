function TestMsg(test, msg) {
    if (test) {
        console.log(`[SUCCESS] ${msg}`);
    } else {
        console.log(`[ERROR] ${msg}`);
    }
}

class MemoryTest {
    mem;

    constructor() {
        const MEMORYSIZE = 0x10000;
        this.mem = new Memory(MEMORYSIZE);
    }

    MemoryInitialization() {
        this.mem.Initialize();
        
        let is_zero_initialized = true;
        let i = 0;
        for (let i = 0; i < this.mem.data.length; i++) {
            if (this.mem.data[i] !== 0) {
                is_zero_initialized = false;
            }
        }

        TestMsg(this.mem.data.length === 64 * 1024 && is_zero_initialized, "MemoryInitialization");
    }

    MemoryWrite() {
        this.mem.Write(0xFFFC, 0x69);
        TestMsg(this.mem.data[0xFFFC] === 0x69, "MemoryWrite");
    }

    MemoryRead() {
        this.mem.data[0x0420] = 0x69;
        TestMsg(this.mem.Read(0x0420) === 0x69, "MemoryRead");
    }
}

function test() {
    let mem = new MemoryTest();

    mem.MemoryInitialization();
    mem.MemoryWrite();
    mem.MemoryRead();
}

test();
