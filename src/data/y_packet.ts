import * as moment from "moment";
import { astraCrc } from "../crc";
import { ProtocolYReport } from "./y_report";
import * as luhn from "luhn";
import { ProtocolYLoginData } from "./y_login_data";

import {BinaryReader} from 'binutils64';

export class ProtocolYPacket
{    
    constructor(){}

    private length?: number;
    public mode4Imei?: string;
    public reports: ProtocolYReport[] = [];
    /**
     * a report's unknown modules could not be skipped (the packet did not line up), so decoding stopped at its first
     * unknown module: it and any later reports in the packet could not be fully parsed
     */
    public framingIncomplete?: boolean;
    /** report count from the packet header (reports.length is smaller when framing is incomplete) */
    public declaredReportCount?: number;

    static fromData (data: Buffer, loginData?: ProtocolYLoginData): ProtocolYPacket | null
    {
        let packet = new ProtocolYPacket();
        let reader = new BinaryReader(data);

        if (data.length >= 6)
        {
            // skip protocol id
            reader.ReadBytes(1);
            // packet length
            packet.length = reader.ReadUInt16();
            // number of reports
            let numReports = reader.ReadUInt8();

            // confirm packet length
            if (packet.length === data.length)
            {
                // confirm crc
                if (data.readUint16BE(data.length-2) === astraCrc(data.subarray(0, data.length-2)))
                {
                    // check there are reports
                    if (numReports > 0)
                    {
                        packet.declaredReportCount = numReports;

                        // parse reports, skipping unknown modules by their length field
                        try
                        {
                            packet.parseReports(data, reader, numReports, loginData, true);
                        }
                        catch (skipError)
                        {
                            // Skipping assumes an unknown module's length field is 1 byte. If that was wrong the frame
                            // will not line up, so retry decoding each report only up to its first unknown module.
                            // A packet with no unknown modules fails the same way again: report the original error.
                            const retryReader = new BinaryReader(data);
                            retryReader.ReadBytes(4);
                            try
                            {
                                packet.parseReports(data, retryReader, numReports, loginData, false);
                            }
                            catch
                            {
                                throw skipError;
                            }
                        }

                        return packet;
                    }
                    else
                    {
                        throw Error('Empty packet');
                    }
                }
                else
                {
                    throw Error('Bad checksum');
                }
            }
            else
            {
                throw Error('Packet length incorrect');
            }
        }
        else
        {
            throw Error('Packet too small');
        }

        return null;
    }

    private parseReports (data: Buffer, reader: BinaryReader, numReports: number, loginData: ProtocolYLoginData | undefined, skipUnknownModules: boolean): void
    {
        this.reports = [];
        this.framingIncomplete = undefined;

        for (let i = 0; i < numReports; i++)
        {
            const parsedReport = ProtocolYReport.fromReader(reader, loginData, skipUnknownModules);
            this.reports.push(parsedReport);

            if (parsedReport.framingIncomplete)
            {
                // the end of this report (and so the start of the next one) is unknown: stop here
                this.framingIncomplete = true;
                return;
            }
        }

        // the declared reports must consume the packet exactly up to its checksum (anything else is corruption /
        // misalignment); not checkable when framing is incomplete
        if (reader.Position !== data.length - 2)
        {
            throw Error('Report bytes do not consume the packet');
        }
    }
}