import { ProtocolYDriverIdSource } from "../y_driver_id_source";

export class ProtocolYDriverId
{
    static mask: bigint = BigInt(1) << BigInt(8);

    public source: ProtocolYDriverIdSource;
    public serialNumber: string;

    constructor (
        source: ProtocolYDriverIdSource,
        serialNumber: string
    )
    {
        this.source = source;
        this.serialNumber = serialNumber;
    }
}