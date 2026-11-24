export class ProtocolYGeneratorData
{
    static mask: bigint = BigInt(1) << BigInt(29);

    public oilPressureKpa: number;
    public oilTemperatureDeg: number;
    public coolantTemperatureDeg: number;
    public fuelLevelPercent: number;
    public defLevelPercent: number;
    public alternatorVoltageV: number;
    public batteryVoltageV: number;
    public engineSpeedRpm: number;
    public engineRuntimeSeconds: number;
    public generatorLineNeutralVoltageAverageV: number;
    public generatorCurrentAverageA: number;

    constructor (
        oilPressureKpa: number,
        oilTemperatureDeg: number,
        coolantTemperatureDeg: number,
        fuelLevelPercent: number,
        defLevelPercent: number,
        alternatorVoltageV: number,
        batteryVoltageV: number,
        engineSpeedRpm: number,
        engineRuntimeSeconds: number,
        generatorLineNeutralVoltageAverageV: number,
        generatorCurrentAverageA: number
    )
    {
        this.oilPressureKpa = oilPressureKpa;
        this.oilTemperatureDeg = oilTemperatureDeg;
        this.coolantTemperatureDeg = coolantTemperatureDeg;
        this.fuelLevelPercent = fuelLevelPercent;
        this.defLevelPercent = defLevelPercent;
        this.alternatorVoltageV = alternatorVoltageV;
        this.batteryVoltageV = batteryVoltageV;
        this.engineSpeedRpm = engineSpeedRpm;
        this.engineRuntimeSeconds = engineRuntimeSeconds;
        this.generatorLineNeutralVoltageAverageV = generatorLineNeutralVoltageAverageV;
        this.generatorCurrentAverageA = generatorCurrentAverageA;
    }
}
