export class ProtocolYGeneratorData
{
    static mask: bigint = BigInt(1) << BigInt(29);

    public oilPressureKpa?: number;
    public oilTemperatureDeg?: number;
    public coolantTemperatureDeg?: number;
    public fuelLevelPercent?: number;
    public defLevelPercent?: number;
    public alternatorVoltageV?: number;
    public batteryVoltageV?: number;
    public engineSpeedRpm?: number;
    public engineRuntimeSeconds?: number;
    public generatorLineNeutralVoltageAverageV?: number;
    public generatorCurrentAverageA?: number;

    constructor (
        oilPressureKpa: number | undefined,
        oilTemperatureDeg: number | undefined,
        coolantTemperatureDeg: number | undefined,
        fuelLevelPercent: number | undefined,
        defLevelPercent: number | undefined,
        alternatorVoltageV: number | undefined,
        batteryVoltageV: number | undefined,
        engineSpeedRpm: number | undefined,
        engineRuntimeSeconds: number | undefined,
        generatorLineNeutralVoltageAverageV: number | undefined,
        generatorCurrentAverageA: number | undefined
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
