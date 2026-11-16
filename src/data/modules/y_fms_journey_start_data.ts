import * as moment from "moment-timezone";

export class ProtocolYFmsJourneyStartData
{
    static mask: bigint = BigInt(1) << BigInt(10);

    public canEventDateTime?: moment.Moment;
    public axleWeightKg: number;

    constructor (
        axleWeightKg: number,
        canEventDateTime?: moment.Moment
    )
    {
        this.axleWeightKg = axleWeightKg;
        this.canEventDateTime = canEventDateTime;
    }
}