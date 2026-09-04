import {BinaryReader} from 'binutils64';

export class ProtocolYJ1939Dtc
{
    public rawData: number;
    public suspectParameterNumber: number;
    public failureModeIdentifier: number;
    public conversionMethod: number;
    public occurrenceCount: number;

    constructor(
        rawData: number
    )
    {
        // bytes 0-1          SPN Low (Suspect Parameter Number)
        // byte 2, bits 5-7   SPN High (Suspect Parameter Number)
        // byte 2, bits 0-4   FMI (Failure Mode Identifier)
        // byte 3, bit 7      CM (SPN Conversion Method)
        // byte 3, bits 0-6   OC (Occurrence Count)

        this.rawData = rawData;
        this.suspectParameterNumber = ((rawData >> 24) & 0xFF) | (((rawData >> 16) & 0xFF) << 8) | (((rawData >> 13) & 0x7) << 16);
        this.failureModeIdentifier = (rawData >> 8) & 0x1F;
        this.conversionMethod = (rawData >> 7) & 0x1;
        this.occurrenceCount = rawData & 0x7F;
    }
}


export class ProtocolYJ1939Dtcs
{
    static module_number = 21;
    static mask: bigint = BigInt(1) << BigInt(ProtocolYJ1939Dtcs.module_number - 1);

    public dtcs: ProtocolYJ1939Dtc[];
    public dtcsCount: number;
    constructor (
        moduleReader: BinaryReader
    )
    {
        this.dtcs = [];
        this.dtcsCount = 0;
        let rawDtc = moduleReader.ReadUInt32();
        do {
            this.dtcs.push(new ProtocolYJ1939Dtc(rawDtc));
            this.dtcsCount++;
            rawDtc = moduleReader.ReadUInt32();
        } while (rawDtc != 0);
    }
}