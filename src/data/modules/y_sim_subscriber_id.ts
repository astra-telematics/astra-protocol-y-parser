export class ProtocolYSimSubscriberId
{
    static mask: bigint = BigInt(1) << BigInt(26);

    public imsi: Buffer;

    constructor (
        imsi: Buffer
    )
    {
        this.imsi = imsi;
    }
}