const binutils = require('binutils64');

export function readU24 (reader: any)
{
    let u24 = reader.ReadUInt8();
    u24 <<= 8;
    u24 |= reader.ReadUInt8();
    u24 <<= 8;
    u24 |= reader.ReadUInt8();
    return u24;
}

export function readU16BE (reader: any)
{
    let bytes: Buffer = reader.ReadBytes(2);
    return (bytes[1] << 8) | bytes[0];
}

export function readU32BE (reader: any)
{
    let bytes: Buffer = reader.ReadBytes(4);
    return (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
}

export function readModule (
    reader: any,
    byteCountBytes: 1 | 2 = 1
): { moduleReader: any, moduleByteCount: number, bodyLength: number }
{
    const moduleByteCount = byteCountBytes === 2
        ? reader.ReadUInt16()
        : reader.ReadUInt8();

    if (moduleByteCount < byteCountBytes)
    {
        throw new Error(`Invalid module byte count: ${moduleByteCount}`);
    }

    const bodyLength = moduleByteCount - byteCountBytes;
    const body = reader.ReadBytes(bodyLength);

    return {
        moduleReader: new binutils.BinaryReader(body),
        moduleByteCount,
        bodyLength
    };
}
export function readModuleReader (reader: any, byteCountBytes: 1 | 2 = 1): any
{
    return readModule(reader, byteCountBytes).moduleReader;
}