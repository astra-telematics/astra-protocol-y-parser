export enum ProtocolYSensorType
{
    UNASSIGNED = 0,
    TEMPERATURE,
    HUMIDITY,
    LIGHT
}

export class ProtocolYSensor
{
    public index: number;
    public type: ProtocolYSensorType;
    public dataValid: boolean;

    public temperatureDeg?: number;
    public humidityPercent?: number;

    constructor (
        index: number,
        type: ProtocolYSensorType,
        dataValid: boolean,
        temperatureDeg?: number,
        humidityPercent?: number
    )
    {
        this.index = index;
        this.type = type;
        this.dataValid = dataValid;
        this.temperatureDeg = temperatureDeg;
        this.humidityPercent = humidityPercent;
    }
}

export class ProtocolYSensors
{
    static mask: bigint = BigInt(1) << BigInt(32);

    public sensors?: ProtocolYSensor[]
}