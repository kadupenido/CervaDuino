module.exports = {
    buzzer: 8,
    circuit:{
        temp: {
            controller: "LM35",
            pin: "A0"
        }
    },
    hlt:{
        temp: {
            controller: "DS18B20",
            pin: 2,
            address: 0x317017290ff
        },
        resistance: 6
    },
    mlt:{
        temp: {
            controller: "DS18B20",
            pin: 2,
            address: 0x317251d3aff
        },
        resistance: 5,
        recirculationRelay: 4,
    },
    bk:{
        temp: {
            controller: "DS18B20",
            pin: 2,
            address: 0x316010f52ff
        },
        resistance: 3,
        coolingRelay: 7,
    },
    current: {
        pin: 1,
        voltage: 220
    }
}