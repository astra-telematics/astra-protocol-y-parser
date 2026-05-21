export enum ProtocolYBeaconType
{
    NONE = 0,
    HEIGHT = 1
}

export class ProtocolYBeacon
{
    public macAddress: string;
    public rssi: number;
    public isCompanion: boolean;
    public lastSeenS: number;
    public type: ProtocolYBeaconType;
    public heightCm?: number;
}

export class ProtocolYBeacons
{
    static mask: bigint = BigInt(1) << BigInt(44);

    public beacons?: ProtocolYBeacon[];
}