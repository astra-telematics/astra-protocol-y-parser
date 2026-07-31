export class ProtocolYTpmsSensor
{
       public axleNumber: number;
       public wheelNumber: number;
       public tyrePressureBar: number;
       public tyreTemperatureDegC: number;

       constructor (
           axleNumber: number,
           wheelNumber: number,
           tyrePressureBar: number,
           tyreTemperatureDegC: number
       )
       {
           this.axleNumber = axleNumber;
           this.wheelNumber = wheelNumber;
           this.tyrePressureBar = tyrePressureBar;
           this.tyreTemperatureDegC = tyreTemperatureDegC;
       }
}

export class ProtocolYTpms
{
    static mask: bigint = BigInt(1) << BigInt(5);

    public sensors: ProtocolYTpmsSensor[];

    constructor (
        sensorCount: number,
        sensors: ProtocolYTpmsSensor[]
    )
    {
        this.sensors = sensors;
    }
}