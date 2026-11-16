import * as moment from "moment-timezone";

export class ProtocolYObdJourneyStopData
{
    static mask: bigint = BigInt(1) << BigInt(16);

    public canEventDateTime?: moment.Moment;
    public lifetimeOdometerKm: number;
    public lifetimeRunningHours: number;
    public timeRunWithMilOn: number;
    public distanceTravelledWithMilOn: number;

    constructor (
        lifetimeOdometerKm: number,
        lifetimeRunningHours: number,
        timeRunWithMilOn: number,
        distanceTravelledWithMilOn: number,
        canEventDateTime?: moment.Moment
    )
    {
        this.lifetimeOdometerKm = lifetimeOdometerKm;
        this.lifetimeRunningHours = lifetimeRunningHours;
        this.timeRunWithMilOn = timeRunWithMilOn;
        this.distanceTravelledWithMilOn = distanceTravelledWithMilOn;
        this.canEventDateTime = canEventDateTime;
    }
}