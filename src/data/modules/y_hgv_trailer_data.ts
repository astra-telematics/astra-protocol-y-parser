import * as moment from "moment-timezone";

export class ProtocolYHgvTrailerFlags
{
    public raw: number;
    public absActivated: boolean;
    public brakeEvent: boolean;

    constructor (raw: number)
    {
        this.raw = raw;
        this.absActivated = (raw & 0x01) === 0x01;
        this.brakeEvent = (raw & 0x02) === 0x02;
    }
}

export class ProtocolYHgvTrailerWheelPosition
{
    public raw: number;
    public wheelNumber: number;
    public axlePosition: number;

    constructor (raw: number)
    {
        this.raw = raw;

        // Bits 0-3: wheel number counting left to right when facing forwards
        this.wheelNumber = raw & 0x0F;

        // Bits 4-7: axle position counting front to back
        this.axlePosition = (raw >> 4) & 0x0F;
    }
}

export class ProtocolYHgvTrailerWheelData
{
    public wheelPosition: ProtocolYHgvTrailerWheelPosition;
    public tyrePressureBar: number;
    public brakeTemperatureDegC: number;
    public brakeLiningWearPercent: number;

    constructor (
        rawWheelPosition: number,
        tyrePressureBar: number,
        brakeTemperatureDegC: number,
        brakeLiningWearPercent: number
    )
    {
        this.wheelPosition = new ProtocolYHgvTrailerWheelPosition(rawWheelPosition);
        this.tyrePressureBar = tyrePressureBar;
        this.brakeTemperatureDegC = brakeTemperatureDegC;
        this.brakeLiningWearPercent = brakeLiningWearPercent;
    }
}

export class ProtocolYHgvTrailerData
{
    static mask: bigint = BigInt(1) << BigInt(43);

    public canEventDateTime: moment.Moment;
    public flags: ProtocolYHgvTrailerFlags;
    public totalAxleLoadKg: number;
    public wheelBasedSpeedKph: number;
    public roadAngleDeg: number;
    public brakeDemandPressureKpa: number;
    public brakingCoefficientRatio: number;
    public brakingEfficiencyPercent: number;
    public wheelCount: number;
    public wheels: ProtocolYHgvTrailerWheelData[];

    constructor (
        canEventDateTime: moment.Moment,
        rawFlags: number,
        totalAxleLoadKg: number,
        wheelBasedSpeedKph: number,
        roadAngleDeg: number,
        brakeDemandPressureKpa: number,
        brakingCoefficientRatio: number,
        brakingEfficiencyPercent: number,
        wheelCount: number,
        wheels: ProtocolYHgvTrailerWheelData[]
    )
    {
        this.canEventDateTime = canEventDateTime;
        this.flags = new ProtocolYHgvTrailerFlags(rawFlags);
        this.totalAxleLoadKg = totalAxleLoadKg;
        this.wheelBasedSpeedKph = wheelBasedSpeedKph;
        this.roadAngleDeg = roadAngleDeg;
        this.brakeDemandPressureKpa = brakeDemandPressureKpa;
        this.brakingCoefficientRatio = brakingCoefficientRatio;
        this.brakingEfficiencyPercent = brakingEfficiencyPercent;
        this.wheelCount = wheelCount;
        this.wheels = wheels;
    }
}