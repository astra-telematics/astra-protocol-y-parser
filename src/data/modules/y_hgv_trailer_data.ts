import * as moment from "moment-timezone";

export class ProtocolYHgvTrailerFlags
{
    public raw: number;
    public absActivated: boolean;
    public brakeEventStart: boolean;
    public brakeEventOngoing: boolean;
    public brakeEventEnd: boolean;
    public brakeEventValid: boolean;
    public absError: boolean;
    public brakingImbalance: boolean;
    public redWarningLight: boolean;
    public amberWarningLight: boolean;
    public stabilityControlActivated: boolean;
    public rolloverPreventionActivated: boolean;

    constructor (raw: number)
    {
        this.raw = raw;
        this.absActivated = (raw & 0x01) === 0x01;
        this.brakeEventStart = (raw & 0x02) === 0x02;
        this.brakeEventOngoing = (raw & 0x04) === 0x04;
        this.brakeEventEnd = (raw & 0x08) === 0x08;
        this.brakeEventValid = (raw & 0x10) === 0x10;
        this.absError = (raw & 0x20) === 0x20;
        this.brakingImbalance = (raw & 0x40) === 0x40;
        this.redWarningLight = (raw & 0x80) === 0x80;
        this.amberWarningLight = (raw & 0x100) === 0x100;
        this.stabilityControlActivated = (raw & 0x200) === 0x200;
        this.rolloverPreventionActivated = (raw & 0x400) === 0x400;
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
    public tyrePressureBar?: number;
    public brakeTemperatureDegC?: number;
    public brakeLiningWearPercent?: number;

    constructor (
        rawWheelPosition: number,
        tyrePressureBar?: number,
        brakeTemperatureDegC?: number,
        brakeLiningWearPercent?: number
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
    public roadAngleDeg?: number;
    public brakeDemandPressureKpa: number;
    public brakingEfficiencyRawPercent?: number;
    public brakingEfficiencyCompensatedPercent?: number;
    public decelerationMpss?: number;
    public wheelCount: number;
    public wheels: ProtocolYHgvTrailerWheelData[];
    public ebsSupplyPressureKpa: number;
    public parkingBrakeDemand?: number;
    public individualBrakePressuresKpa: (number | undefined)[];

    constructor (
        canEventDateTime: moment.Moment,
        rawFlags: number,
        totalAxleLoadKg: number,
        wheelBasedSpeedKph: number,
        brakeDemandPressureKpa: number,
        wheelCount: number,
        wheels: ProtocolYHgvTrailerWheelData[],
        ebsSupplyPressureKpa: number,
        roadAngleDeg?: number,
        decelerationMpss?: number,
        brakingEfficiencyRawPercent?: number,
        brakingEfficiencyCompensatedPercent?: number,
        parkingBrakeDemand?: number,
        individualBrakePressuresKpa?: (number | undefined)[]
    )
    {
        this.canEventDateTime = canEventDateTime;
        this.flags = new ProtocolYHgvTrailerFlags(rawFlags);
        this.totalAxleLoadKg = totalAxleLoadKg;
        this.wheelBasedSpeedKph = wheelBasedSpeedKph;
        this.roadAngleDeg = roadAngleDeg;
        this.brakeDemandPressureKpa = brakeDemandPressureKpa;
        this.decelerationMpss = decelerationMpss;
        this.brakingEfficiencyRawPercent = brakingEfficiencyRawPercent;
        this.brakingEfficiencyCompensatedPercent = brakingEfficiencyCompensatedPercent;
        this.wheelCount = wheelCount;
        this.wheels = wheels;
        this.ebsSupplyPressureKpa = ebsSupplyPressureKpa;
        this.parkingBrakeDemand = parkingBrakeDemand;
        this.individualBrakePressuresKpa = individualBrakePressuresKpa ?? [];
    }
}