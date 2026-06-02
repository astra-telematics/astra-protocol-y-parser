export class ProtocolYSimSubscriberId
{
    static mask: bigint = BigInt(1) << BigInt(26);

    public imsi: string;

    constructor (
        imsi: string
    )
    {
        this.imsi = imsi;
    }
}