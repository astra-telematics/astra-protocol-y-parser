import * as moment from "moment-timezone";
import { readU16BE, readU24, readU32BE } from "../utils";
import { ProtocolYAnalogues } from "./modules/y_analogues";
import { ProtocolYAskollEs2ScooterData } from "./modules/y_askoll_es2_scooter_data";
import { ProtocolYAstraGenericCanData, ProtocolYAstraGenericCanDataEntry } from "./modules/y_astra_generic_can_data";
import { ProtocolYAstraDebugDataType, ProtocolYAstraDebugNvData, ProtocolYAstraGenericDebugData } from "./modules/y_astra_generic_debug_data";
import { ProtocolYBatteryUsageStatistics } from "./modules/y_battery_usage_statistics";
import { ProtocolYCar2Data } from "./modules/y_car2_data";
import { ProtocolYCarrierTwoWayAlarms } from "./modules/y_carrier_2_way_alarms";
import { ProtocolYCarrierTemperatureData } from "./modules/y_carrier_temperature_data";
import { ProtocolYCashInTransitStatus } from "./modules/y_cash_in_transit_status";
import { ProtocolYDevicePower } from "./modules/y_device_power";
import { ProtocolYDigitals } from "./modules/y_digitals";
import { ProtocolYDriverBehaviour } from "./modules/y_driver_behaviour";
import { ProtocolYDriverId } from "./modules/y_driver_id";
import { ProtocolYEcon3Byte } from "./modules/y_econ_3_byte";
import { ProtocolYEcooterScooterData } from "./modules/y_ecooter_scooter_data";
import { ProtocolYEcooterSerialNumbers } from "./modules/y_ecooter_serial_numbers";
import { ProtocolYFmsDriverId } from "./modules/y_fms_driver_id";
import { ProtocolYFmsDriverWorkingStates } from "./modules/y_fms_driver_working_states";
import { ProtocolYFmsInJourneyData } from "./modules/y_fms_in_journey_data";
import { ProtocolYFmsInJourneyHighRes } from "./modules/y_fms_in_journey_high_res";
import { ProtocolYFmsJourneyStartData } from "./modules/y_fms_journey_start_data";
import { ProtocolYFmsJourneyStopData } from "./modules/y_fms_journey_stop_data";
import { ProtocolYGeofences } from "./modules/y_geofences";
import { ProtocolYHgvTrailerData, ProtocolYHgvTrailerWheelData } from "./modules/y_hgv_trailer_data";
import { ProtocolYGnssStopReportData } from "./modules/y_gnss_stop_report_data";
import { ProtocolYGoingGreenTheCoreBikeData } from "./modules/y_going_green_the_core_bike_data";
import { ProtocolYGpsData } from "./modules/y_gps_data";
import { ProtocolYGsmNetworkInfo } from "./modules/y_gsm_network_info";
import { ProtocolYNmea2000Data } from "./modules/y_nmea_2000_data";
import { ProtocolYObdDtcCodes } from "./modules/y_obd_dtc_codes";
import { ProtocolYObdInJourneyData } from "./modules/y_obd_in_journey_data";
import { ProtocolYObdJourneyStopData } from "./modules/y_obd_journey_stop_data";
import { ProtocolYOneWireTemperatureProbe } from "./modules/y_one_wire_temperature_probe";
import { ProtocolYRayvoltEBicycle } from "./modules/y_rayvolt_e_bicycle";
import { ProtocolYRedforgeWeight } from "./modules/y_redforge_weight";
import { ProtocolYSegwayNinebotEs4Sharing } from "./modules/y_segway_ninebot_es4_sharing";
import { ProtocolYSensor, ProtocolYSensorType, ProtocolYSensors } from "./modules/y_sensors";
import { ProtocolYSignalQuality } from "./modules/y_signal_quality";
import { ProtocolYSimCardSerialNumber } from "./modules/y_sim_card_serial_number";
import { ProtocolYSimSubscriberId } from "./modules/y_sim_subscriber_id";
import { ProtocolYStarsAcimMotorControllerData } from "./modules/y_stars_acim_motor_controller_data";
import { ProtocolYTorrotMuviBatteryData } from "./modules/y_torrot_muvi_battery_data";
import { ProtocolYTorrotMuviScooterData } from "./modules/y_torrot_muvi_scooter_data";
import { ProtocolYDriverIdSource } from "./y_driver_id_source";
import { ProtocolYReason } from "./y_reason";
import { ProtocolYReasonLabel } from "./y_reason_labels";
import { ProtocolYReportStatus } from "./y_report_status";
import { ProtocolYHeinzmannData } from "./modules/y_heinzmann";
import { ProtocolZModule32 } from "./modules/z_mod32";
import { ProtocolZModule33 } from "./modules/z_mod33";
import { ProtocolZModule34 } from "./modules/z_mod34";
import { ProtocolZModule35 } from "./modules/z_mod35";
import { ProtocolZModule36 } from "./modules/z_mod36";
import { ProtocolZModule37 } from "./modules/z_mod37";
import { ProtocolZModule38 } from "./modules/z_mod38";
import { ProtocolZModule39 } from "./modules/z_mod39";
import { ProtocolYLoginData } from "./y_login_data";
import { ProtocolYBeacon, ProtocolYBeacons, ProtocolYBeaconType } from "./modules/y_beacons";
import { ProtocolYGritterDataBsEn15430 } from "./modules/y_gritter_data_bs_en_15430";
import { ProtocolYDriverAlcoholTestData } from "./modules/y_driver_alcohol_test_data";

const binutils = require('binutils64');

export class ProtocolYReport
{
    public timestamp?: moment.Moment;
    public sequenceNumber?: number;
    public reasons: ProtocolYReason[] = [];
    public statusFlags?: number;
    public status?: ProtocolYReportStatus;
    public rawModuleMask: bigint;
    public rawRtcTime: number;
    public rawReasonFlags: bigint;
    public rawStatusFlags: number;
    public rawGpsTimeDateLastKnownGood: number;

    public devicePower?: ProtocolYDevicePower;
    public gpsData?: ProtocolYGpsData;
    public digitals?: ProtocolYDigitals;
    public analogues?: ProtocolYAnalogues;
    public driverBehaviour?: ProtocolYDriverBehaviour;
    public signalQuality?: ProtocolYSignalQuality;
    public gsmNetworkInfo?: ProtocolYGsmNetworkInfo;
    public geofences?: ProtocolYGeofences;
    public driverId?: ProtocolYDriverId;
    public driverAlcoholTestData?: ProtocolYDriverAlcoholTestData;
    public fmsJourneyStartData?: ProtocolYFmsJourneyStartData;
    public gnssStopReportData?: ProtocolYGnssStopReportData;
    public fmsInJourneyData?: ProtocolYFmsInJourneyData;
    public obdInJourneyData?: ProtocolYObdInJourneyData;
    public obdDtcCodes?: ProtocolYObdDtcCodes;
    public fmsJourneyStopData?: ProtocolYFmsJourneyStopData;
    public obdJourneyStopData?: ProtocolYObdJourneyStopData;
    public carrierTemperatureData?: ProtocolYCarrierTemperatureData;
    public oneWireTemperatureProbe?: ProtocolYOneWireTemperatureProbe;
    public carrierTwoWayAlarms?: ProtocolYCarrierTwoWayAlarms;
    public rayvoltEBicycle?: ProtocolYRayvoltEBicycle;
    public econ3Byte?: ProtocolYEcon3Byte;
    public gritterDataBsEn15430?: ProtocolYGritterDataBsEn15430;
    public beacons?: ProtocolYBeacons;
    public redforgeWeight?: ProtocolYRedforgeWeight;
    public nmea2000Data?: ProtocolYNmea2000Data;
    public simSubscriberId?: ProtocolYSimSubscriberId;
    public simCardSerialNumber?: ProtocolYSimCardSerialNumber;
    public fmsDriverId?: ProtocolYFmsDriverId;
    public fmsDriverWorkingStates?: ProtocolYFmsDriverWorkingStates;
    public segwayNinebotEs4Sharing?: ProtocolYSegwayNinebotEs4Sharing;
    public sensors?: ProtocolYSensors;
    public goingGreenTheCoreBikeData?: ProtocolYGoingGreenTheCoreBikeData;
    public ecooterScooterData?: ProtocolYEcooterScooterData;
    public torrotMuviScooterData?: ProtocolYTorrotMuviScooterData;
    public ecooterSerialNumbers?: ProtocolYEcooterSerialNumbers;
    public askollEs2ScooterData?: ProtocolYAskollEs2ScooterData;
    public cashInTransitStatus?: ProtocolYCashInTransitStatus;
    public torrotMuviBatteryData?: ProtocolYTorrotMuviBatteryData;
    public starsAcimMotorControllerData?: ProtocolYStarsAcimMotorControllerData;
    public car2Data?: ProtocolYCar2Data;
    public hgvTrailerData?: ProtocolYHgvTrailerData;
    public astraGenericCanData?: ProtocolYAstraGenericCanData;
    public heinzmannData?: ProtocolYHeinzmannData;
    public astraGenericDebugData?: ProtocolYAstraGenericDebugData;
    public zMod32?: ProtocolZModule32
    public zMod33?: ProtocolZModule33;
    public zMod34?: ProtocolZModule34;
    public zMod35?: ProtocolZModule35
    public zMod36?: ProtocolZModule36;
    public zMod37?: ProtocolZModule37;
    public zMod38?: ProtocolZModule38;
    public zMod39?: ProtocolZModule39;
    
    constructor(){}

    static fromReader (reader: any, loginData?: ProtocolYLoginData): ProtocolYReport
    {
        let report = new ProtocolYReport();

        report.sequenceNumber = reader.ReadUInt8();

        let moduleMask: bigint = BigInt(0);
        for (let i = 0; i < 10; i++)
        {
            moduleMask |= BigInt(reader.ReadUInt8());
            if (i !== 9) moduleMask <<= BigInt(8);
        }
        report.rawModuleMask = moduleMask;

        let julianSecs = reader.ReadUInt32();
        report.rawRtcTime = julianSecs;
        report.timestamp = moment.tz('1980-01-06T00:00:00', 'UTC').add(julianSecs, 'seconds');

        // report reason flags: 8 bytes
        let reasonFlags: bigint = BigInt(0);
        for (let i = 0; i < 8; i++)
        {
            reasonFlags |= BigInt(reader.ReadUInt8());
            if (i !== 7) reasonFlags <<= BigInt(8);
        }
        report.rawReasonFlags = reasonFlags;

        for (let i = 0; i < ProtocolYReasonLabel.COUNT; i++)
        {
            let mask = BigInt(1) << BigInt(i);
            if ((reasonFlags & mask) === mask)
            {
                report.reasons.push(new ProtocolYReason(i, ProtocolYReasonLabel[i]));
            }
        }

        const statusFlags = reader.ReadUInt32();

        report.statusFlags = statusFlags;
        report.rawStatusFlags = statusFlags;

        report.status = new ProtocolYReportStatus();
        report.status.ignitionState = (report.statusFlags! & 0x1) === 1;
        report.status.businessMode = (report.statusFlags! & 0x2) === 0;
        report.status.gpsValid = (report.statusFlags! & 0x4) === 0;
        report.status.networkRoaming = (report.statusFlags! & 0x8) === 1;
        report.status.reportsToFollow = (report.statusFlags! & 0x10) === 1;
        report.status.storedReport = (report.statusFlags! & 0x20) === 1;
        report.status.immobilised = (report.statusFlags! & 0x40) === 1;
        report.status.rs232ExternalDeviceReadError = (report.statusFlags! & 0x80) === 1;
        report.status.gpsJammerDetected = (report.statusFlags! & 0x100) === 1;
        report.status.luggageCompartmentUnlocked = (report.statusFlags! & 0x200) === 0;
        report.status.backupBatteryCharging = (report.statusFlags! & 0x400) === 1;

        // DEVICE POWER
        if ((moduleMask & ProtocolYDevicePower.mask) === ProtocolYDevicePower.mask)
        {
            report.devicePower = new ProtocolYDevicePower(
                reader.ReadUInt16() * 0.1,
                reader.ReadUInt8()
            )
        }

        // GPS DATA
        if ((moduleMask & ProtocolYGpsData.mask) === ProtocolYGpsData.mask)
        {
            report.rawGpsTimeDateLastKnownGood = reader.ReadUInt32();
            report.gpsData = new ProtocolYGpsData(
                reader.ReadInt32() / 1000000,
                reader.ReadInt32() / 1000000,
                reader.ReadUInt8() * 2,
                reader.ReadUInt8() * 2,
                reader.ReadUInt8() * 2,
                reader.ReadUInt8() * 20,
                reader.ReadUInt16() / 10,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8()
            )
        }

        // DIGITALS
        if ((moduleMask & ProtocolYDigitals.mask) === ProtocolYDigitals.mask)
        {
            report.digitals = new ProtocolYDigitals(
                reader.ReadUInt16(),
                reader.ReadUInt16()
            )
        }

        // ANALOGUES
        if ((moduleMask & ProtocolYAnalogues.mask) === ProtocolYAnalogues.mask)
        {
            report.analogues = new ProtocolYAnalogues(
                reader.ReadUInt16(),
                reader.ReadUInt16()
            )
        }

        // DRIVER BEHAVIOUR
        if ((moduleMask & ProtocolYDriverBehaviour.mask) === ProtocolYDriverBehaviour.mask)
        {
            report.driverBehaviour = new ProtocolYDriverBehaviour(
                reader.ReadUInt8() / 10,
                reader.ReadUInt8() / 10,
                reader.ReadUInt8() / 10,
                reader.ReadUInt8() / 10,
                reader.ReadUInt8() / 10,
                reader.ReadUInt8() / 10,
                reader.ReadUInt16()
            )
        }

        // SIGNAL QUALITY - removed in Protocol Y
        if ((moduleMask & ProtocolYSignalQuality.mask) === ProtocolYSignalQuality.mask)
        {
            // Do not read bytes here for Protocol Y new format.
        }

        // GSM NETWORK INFO
        if ((moduleMask & ProtocolYGsmNetworkInfo.mask) === ProtocolYGsmNetworkInfo.mask)
        {
            report.gsmNetworkInfo = new ProtocolYGsmNetworkInfo(
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt8() * -1,
                reader.ReadUInt8()
            )
        }

        // GEOFENCES
        if ((moduleMask & ProtocolYGeofences.mask) === ProtocolYGeofences.mask)
        {
            report.geofences = new ProtocolYGeofences(
                reader.ReadUInt8()
            )
        }

        // DRIVER ID
        if ((moduleMask & ProtocolYDriverId.mask) === ProtocolYDriverId.mask)
        {
            let src: ProtocolYDriverIdSource = ProtocolYDriverIdSource.NONE;
            switch (reader.ReadUInt8())
            {
                case 1:
                    src = ProtocolYDriverIdSource.IBUTTON;
                    break;
                case 2:
                    src = ProtocolYDriverIdSource.RFID;
                    break;
                case 3:
                    src = ProtocolYDriverIdSource.BLUETOOTH;
                    break;
                case 4:
                    src = ProtocolYDriverIdSource.CR002_CARD_READER;
                    break;
            }
            report.driverId = new ProtocolYDriverId(
                src,
                reader.ReadBytes(8).toString('hex').toUpperCase()
            )
        }

        // DRIVER ALCOHOL TEST DATA
        if ((moduleMask & ProtocolYDriverAlcoholTestData.mask) === ProtocolYDriverAlcoholTestData.mask)
        {
            const rawStatus = reader.ReadUInt8();
            
            report.driverAlcoholTestData = new ProtocolYDriverAlcoholTestData(
                rawStatus,
                (rawStatus & 0x01) === 0x01,
                reader.ReadUInt16()
            );

            // skip reserved
            reader.ReadBytes(5);
        }

        // FMS JOURNEY-START DATA
        if ((moduleMask & ProtocolYFmsJourneyStartData.mask) === ProtocolYFmsJourneyStartData.mask)
        {
            report.fmsJourneyStartData = new ProtocolYFmsJourneyStartData(
                reader.ReadUInt16()
            )
        }

        // GNSS STOP-REPORT DATA
        if ((moduleMask & ProtocolYGnssStopReportData.mask) === ProtocolYGnssStopReportData.mask)
        {
            let lifetimeOdoKm = reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();

            report.gnssStopReportData = new ProtocolYGnssStopReportData(
                lifetimeOdoKm,
                reader.ReadUInt16()
            )
        }

        // FMS IN-JOURNEY DATA
        if ((moduleMask & ProtocolYFmsInJourneyData.mask) === ProtocolYFmsInJourneyData.mask)
        {
            report.fmsInJourneyData = new ProtocolYFmsInJourneyData(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8() * 32,
                reader.ReadUInt8() * 32,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt16() / 10,
                reader.ReadUInt8() - 40,
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt8(),
                reader.ReadUInt32() / 1000
            )
        }

        // OBD IN-JOURNEY DATA
        if ((moduleMask & ProtocolYObdInJourneyData.mask) === ProtocolYObdInJourneyData.mask)
        {
            report.obdInJourneyData = new ProtocolYObdInJourneyData(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8() * 32,
                reader.ReadUInt8() * 32,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt16() / 10,
                reader.ReadUInt8() - 40,
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt8(),
                reader.ReadUInt16() / 10
            )
        }

        // OBD DTC CODES
        if ((moduleMask & ProtocolYObdDtcCodes.mask) === ProtocolYObdDtcCodes.mask)
        {
            report.obdDtcCodes = new ProtocolYObdDtcCodes(
                reader.ReadBytes(5).toString('ascii'),
                reader.ReadBytes(5).toString('ascii'),
                reader.ReadBytes(5).toString('ascii'),
                reader.ReadBytes(5).toString('ascii'),
                reader.ReadBytes(5).toString('ascii')
            )
        }

        // FMS JOURNEY-STOP DATA
        if ((moduleMask & ProtocolYFmsJourneyStopData.mask) === ProtocolYFmsJourneyStopData.mask)
        {
            let lifetimeOdoKm = reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();

            report.fmsJourneyStopData = new ProtocolYFmsJourneyStopData(
                lifetimeOdoKm,
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16() / 10,
                reader.ReadUInt16(),
                reader.ReadUInt16() * 5
            )
        }

        // OBD JOURNEY-STOP DATA
        if ((moduleMask & ProtocolYObdJourneyStopData.mask) === ProtocolYObdJourneyStopData.mask)
        {
            let lifetimeOdoKm = reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= reader.ReadUInt8();

            report.obdJourneyStopData = new ProtocolYObdJourneyStopData(
                lifetimeOdoKm,
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16()
            )
        }

        // CARRIER TEMPERATURE DATA
        if ((moduleMask & ProtocolYCarrierTemperatureData.mask) === ProtocolYCarrierTemperatureData.mask)
        {
            if (loginData?.protocolId === 'Z')
            {
                reader.ReadBytes(17);
            }
            else
            {
                report.carrierTemperatureData = new ProtocolYCarrierTemperatureData(
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt16() / 10,
                    reader.ReadUInt8() / 2,
                    reader.ReadUInt8() / 2,
                    reader.ReadUInt8() / 2,
                    reader.ReadUInt8(),
                    reader.ReadUInt16() * 2,
                    reader.ReadUInt16() * 2,
                    reader.ReadUInt16(),
                    readU24(reader)
                )
            }
        }

        // ONE-WIRE TEMPERATURE PROBE
        if ((moduleMask & ProtocolYOneWireTemperatureProbe.mask) === ProtocolYOneWireTemperatureProbe.mask)
        {
            report.oneWireTemperatureProbe = new ProtocolYOneWireTemperatureProbe(
                (reader.ReadUInt16() / 10) - 550,
                (reader.ReadUInt16() / 10) - 550,
                (reader.ReadUInt16() / 10) - 550,
                (reader.ReadUInt16() / 10) - 550
            )
        }

        // CARRIER TWO-WAY ALARMS
        if ((moduleMask & ProtocolYCarrierTwoWayAlarms.mask) === ProtocolYCarrierTwoWayAlarms.mask)
        {
            if (loginData?.protocolId === 'Z')
            {
                reader.ReadBytes(10);
            }
            else
            {
                report.carrierTwoWayAlarms = new ProtocolYCarrierTwoWayAlarms(
                    reader.ReadUInt8(),
                    reader.ReadBytes(16)
                )
            }
        }

        // RAYVOLT E-BICYCLE
        if ((moduleMask & ProtocolYRayvoltEBicycle.mask) === ProtocolYRayvoltEBicycle.mask)
        {
            if (loginData?.protocolId === 'Z')
            {
                reader.ReadBytes(19);
            }
            else
            {
                report.rayvoltEBicycle = new ProtocolYRayvoltEBicycle(
                    reader.ReadUInt32(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt8(),
                    reader.ReadUInt8() / 4,
                    reader.ReadInt8(),
                    reader.ReadUInt8() / 2,
                    reader.ReadUInt16()
                )
                // skip reserved bytes
                reader.ReadBytes(2);
            }
        }

        // ECON 3-BYTE
        if ((moduleMask & ProtocolYEcon3Byte.mask) === ProtocolYEcon3Byte.mask)
        {
            report.econ3Byte = new ProtocolYEcon3Byte(
                readU24(reader)
            )
        }

        // GRITTER DATA (BS EN 15430)
        if ((moduleMask & ProtocolYGritterDataBsEn15430.mask) === ProtocolYGritterDataBsEn15430.mask)
        {
            report.gritterDataBsEn15430 = new ProtocolYGritterDataBsEn15430(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8() / 10,
                reader.ReadUInt8()
            )
        }


        // REDFORGE WEIGHT
        if ((moduleMask & ProtocolYRedforgeWeight.mask) === ProtocolYRedforgeWeight.mask)
        {
            report.redforgeWeight = new ProtocolYRedforgeWeight(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8()
            )
        }

        // NMEA 2000 DATA
        if ((moduleMask & ProtocolYNmea2000Data.mask) === ProtocolYNmea2000Data.mask)
        {
            if (loginData?.protocolId === 'Z')
            {
                reader.ReadBytes(6);
            }
            else
            {
                report.nmea2000Data = new ProtocolYNmea2000Data(
                    reader.ReadInt16() * 0.004,
                    reader.ReadInt16() * 0.004,
                    reader.ReadUInt8(),
                    reader.ReadUInt8(),
                    reader.ReadUInt16(),
                    reader.ReadUInt8(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16() * 10,
                    reader.ReadUInt16(),
                    reader.ReadUInt32(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt8(),
                    reader.ReadUInt8(),
                    reader.ReadUInt32() * 0.01,
                    reader.ReadUInt16() * 0.001,
                    reader.ReadUInt16() * 0.01,
                    reader.ReadUInt16() * 0.01,
                    reader.ReadBytes(16)
                )
            }
        }

        // SIM SUBSCRIBER ID
        if ((moduleMask & ProtocolYSimSubscriberId.mask) === ProtocolYSimSubscriberId.mask)
        {
            report.simSubscriberId = new ProtocolYSimSubscriberId(
                reader.ReadBytes(7)
            )
        }

        // SIM CARD SERIAL NUMBER
        if ((moduleMask & ProtocolYSimCardSerialNumber.mask) === ProtocolYSimCardSerialNumber.mask)
        {
            report.simCardSerialNumber = new ProtocolYSimCardSerialNumber(
                reader.ReadBytes(20).toString('ascii')
            )
        }

        // FMS DRIVER-ID
        if ((moduleMask & ProtocolYFmsDriverId.mask) === ProtocolYFmsDriverId.mask)
        {
            report.fmsDriverId = new ProtocolYFmsDriverId(
                reader.ReadBytes(19).toString('ascii'),
                reader.ReadBytes(19).toString('ascii')
            )
        }

        // FMS IN-JOURNEY HIGH-RES  - removed in Protocol Y
        if ((moduleMask & ProtocolYFmsInJourneyHighRes.mask) === ProtocolYFmsInJourneyHighRes.mask)
        {
            // Do not read bytes here for Protocol Y new format.
        }

        // FMS DRIVER WORKING STATES
        if ((moduleMask & ProtocolYFmsDriverWorkingStates.mask) === ProtocolYFmsDriverWorkingStates.mask)
        {
            if (loginData?.protocolId === 'Z')
            {
                reader.ReadBytes(1);
            }
            else
            {
                report.fmsDriverWorkingStates = new ProtocolYFmsDriverWorkingStates(
                    reader.ReadUInt32(),
                    reader.ReadUInt8()
                )
            }
        }

        // SEGWAY NINEBOT ES4 SHARING
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule32.mask) === ProtocolZModule32.mask)
            {
                report.zMod32 = new ProtocolZModule32(
                    reader.ReadUInt8(),
                    reader.ReadInt8(),
                    reader.ReadUInt16() / 10,
                    reader.ReadInt16() / 10,
                    readU24(reader),
                    reader.ReadUInt16(),
                    reader.ReadInt16(),
                    reader.ReadInt8(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt16(),
                    reader.ReadUInt8()
                );
            }
        }
        else if ((moduleMask & ProtocolYSegwayNinebotEs4Sharing.mask) === ProtocolYSegwayNinebotEs4Sharing.mask)
        {
            report.segwayNinebotEs4Sharing = new ProtocolYSegwayNinebotEs4Sharing(
                reader.ReadUInt8() / 10,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8()
            )
        }

        // SENSORS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule33.mask) === ProtocolZModule33.mask)
            {
                report.zMod33 = new ProtocolZModule33(
                    reader.ReadUInt8(),
                    reader.ReadInt8(),
                    reader.ReadInt8(),
                    reader.ReadInt16(),
                    reader.ReadInt16(),
                    reader.ReadUInt32(),
                    reader.ReadUInt8(),
                    reader.ReadUInt8(),
                    reader.ReadInt16(),
                    reader.ReadInt16(),
                    reader.ReadUInt8(),
                    reader.ReadUInt8(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadInt8(),
                    reader.ReadUInt8(),
                    reader.ReadUInt32(),
                    reader.ReadUInt32(),
                    reader.ReadUInt8()
                )
            }
        }
        else if ((moduleMask & ProtocolYSensors.mask) === ProtocolYSensors.mask)
        {
            report.sensors = new ProtocolYSensors();

            for (let i = 0; i < 6; i++)
            {
                let b1 = reader.ReadUInt8();
                let rawType = b1 & 0x0F;
                let sensor = new ProtocolYSensor(
                    i,
                    rawType === 1 ? ProtocolYSensorType.TEMPERATURE 
                        : rawType === 2 ? ProtocolYSensorType.HUMIDITY 
                        : rawType === 3 ? ProtocolYSensorType.LIGHT
                        : ProtocolYSensorType.UNASSIGNED,
                    (b1 & 0xF0) !== 0
                );
                if (sensor.type !== ProtocolYSensorType.UNASSIGNED)
                {
                    switch (sensor.type)
                    {
                        case ProtocolYSensorType.TEMPERATURE:
                            sensor.temperatureDeg = reader.ReadInt16() / 100;
                            break;
                        case ProtocolYSensorType.HUMIDITY:
                            sensor.humidityPercent = reader.ReadUInt16() / 100;
                            break;
                        default:
                            reader.ReadBytes(2);
                            break;
                    }

                    if (!report.sensors.sensors) report.sensors.sensors = [];
                    report.sensors.sensors.push(sensor);
                }
                else
                {
                    reader.ReadBytes(2);
                }
            }
        }

        // GOING GREEN "THE CORE" BIKE DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule34.mask) === ProtocolZModule34.mask)
            {
                report.zMod34 = new ProtocolZModule34(reader.ReadBytes(38));
            }
        }
        else if ((moduleMask & ProtocolYGoingGreenTheCoreBikeData.mask) === ProtocolYGoingGreenTheCoreBikeData.mask)
        {
            report.goingGreenTheCoreBikeData = new ProtocolYGoingGreenTheCoreBikeData(
                reader.ReadUInt16() * 0.0015
            )
        }

        // ECOOTER E1/E2 SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule35.mask) === ProtocolZModule35.mask)
            {
                report.zMod35 = new ProtocolZModule35(
                    reader.ReadBytes(17).toString('ascii'),
                    reader.ReadBytes(12),
                    reader.ReadBytes(20),
                    reader.ReadBytes(4),
                    reader.ReadBytes(12),
                    reader.ReadBytes(20),
                    reader.ReadBytes(8).toString('ascii'),
                    reader.ReadBytes(10).toString('ascii'),
                    reader.ReadUInt8(),
                    reader.ReadUInt8(),
                    reader.ReadUInt8()
                );
            }
        }
        else if ((moduleMask & ProtocolYEcooterScooterData.mask) === ProtocolYEcooterScooterData.mask)
        {
            report.ecooterScooterData = new ProtocolYEcooterScooterData(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadInt8(),
                reader.ReadInt8(),
                reader.ReadInt16() * 10,
                reader.ReadUInt8()
            )
            // skip reserved bytes
            reader.ReadBytes(2);
        }

        // TORROT MUVI SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule36.mask) === ProtocolZModule36.mask)
            {
                report.zMod36 = new ProtocolZModule36(reader.ReadBytes(9));
            }
        }
        else if ((moduleMask & ProtocolYTorrotMuviScooterData.mask) === ProtocolYTorrotMuviScooterData.mask)
        {
            report.torrotMuviScooterData = new ProtocolYTorrotMuviScooterData(
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadInt16() / 10,
                reader.ReadInt16() / 10,
                reader.ReadInt16() / 10,
                reader.ReadInt16() / 10,
                reader.ReadUInt16() / 10,
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16() / 10,
                reader.ReadUInt16() / 10,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt16(),
                reader.ReadUInt32(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8() / 0.22745,
                reader.ReadUInt8() / 0.3921,
                reader.ReadInt8(),
                reader.ReadInt32() * 100,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8()
            )
            // skip reserved bytes
            reader.ReadBytes(2);
        }

        // ECOOTER SERIAL NUMBERS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule37.mask) === ProtocolZModule37.mask)
            {
                report.zMod37 = new ProtocolZModule37(
                    reader.ReadInt8(),
                    reader.ReadInt8(),
                    reader.ReadInt8(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                    reader.ReadUInt16(),
                );
            }
        }
        else if ((moduleMask & ProtocolYEcooterSerialNumbers.mask) === ProtocolYEcooterSerialNumbers.mask)
        {
            report.ecooterSerialNumbers = new ProtocolYEcooterSerialNumbers(
                reader.ReadBytes(16).toString('ascii'),
                reader.ReadBytes(16).toString('ascii')
            )
        }

        // ASKOLL ES2 SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule38.mask) === ProtocolZModule38.mask)
            {
                report.zMod38 = new ProtocolZModule38(
                    reader.ReadBytes(26)
                )
            }
        }
        else if ((moduleMask & ProtocolYAskollEs2ScooterData.mask) === ProtocolYAskollEs2ScooterData.mask)
        {
            let julianSecs = reader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.askollEs2ScooterData = new ProtocolYAskollEs2ScooterData(
                timestamp,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt32(),
                reader.ReadUInt32(),
                reader.ReadInt8(),
                reader.ReadUInt16() * 100,
                reader.ReadUInt8() * 100,
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt32() * 100,
                reader.ReadUInt16() * 100,
                reader.ReadUInt16(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt16() * 10,
                reader.ReadUInt16(),
                reader.ReadUInt8() * 0.1,
                reader.ReadUInt8()
            )
            // skip reserved bytes
            reader.ReadBytes(2);
        }

        // CASH IN TRANSIT STATUS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule39.mask) === ProtocolZModule39.mask)
            {
                report.zMod39 = new ProtocolZModule39(
                    reader.ReadBytes(71)
                );
            }
        }
        else if ((moduleMask & ProtocolYCashInTransitStatus.mask) === ProtocolYCashInTransitStatus.mask)
        {
            report.cashInTransitStatus = new ProtocolYCashInTransitStatus(
                reader.ReadUInt8(),
                reader.ReadBytes(5)
            )
        }

        // TORROT MUVI BATTERY DATA
        if ((moduleMask & ProtocolYTorrotMuviBatteryData.mask) === ProtocolYTorrotMuviBatteryData.mask)
        {
            report.torrotMuviBatteryData = new ProtocolYTorrotMuviBatteryData(
                reader.ReadBytes(13).toString('ascii'),
                reader.ReadBytes(13).toString('ascii'),
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                readU24(reader) * 0.1,
                readU24(reader) * 0.1,
                reader.ReadUInt8(),
                reader.ReadBytes(2)
            )
        }

        // BATTERY USAGE STATISTICS - removed in Protocol Y
        if ((moduleMask & ProtocolYBatteryUsageStatistics.mask) === ProtocolYBatteryUsageStatistics.mask)
        {
            // Do not read bytes here for Protocol Y new format.
        }

        // STARS ACIM MOTOR CONTROLLER DATA
        if ((moduleMask & ProtocolYStarsAcimMotorControllerData.mask) === ProtocolYStarsAcimMotorControllerData.mask)
        {
            report.starsAcimMotorControllerData = new ProtocolYStarsAcimMotorControllerData(
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadInt16() / 100,
                reader.ReadUInt8(),
                reader.ReadInt16() / 100,
                reader.ReadInt16() / 100,
                reader.ReadInt16(),
                reader.ReadInt16(),
                reader.ReadUInt8(),
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16()
            )
            let julianSecs = reader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.starsAcimMotorControllerData.canEventDateTime = timestamp;
            // skip reserved bytes
            reader.ReadBytes(4);
        }

        // "CAR2" DATA
        if ((moduleMask & ProtocolYCar2Data.mask) === ProtocolYCar2Data.mask)
        {
            report.car2Data = new ProtocolYCar2Data(
                reader.ReadUInt16(),
                reader.ReadUInt8(),
                reader.ReadUInt8(),
                reader.ReadUInt16(),
                reader.ReadUInt16(),
                reader.ReadUInt16()
            )
            let julianSecs = reader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.car2Data.canEventDateTime = timestamp;
            report.car2Data.reserved = reader.ReadBytes(8);
        }

        // HGV TRAILER DATA
        if ((moduleMask & ProtocolYHgvTrailerData.mask) === ProtocolYHgvTrailerData.mask)
        {
            const julianSecs = reader.ReadUInt32();
            const canEventDateTime = moment
                .tz('1980-01-06T00:00:00', 'UTC')
                .add(julianSecs, 'seconds');

            const rawFlags = reader.ReadUInt8();

            const totalAxleLoadKg = reader.ReadUInt16() * 2;
            const wheelBasedSpeedKph = reader.ReadUInt16() / 256;
            const roadAngleDeg = reader.ReadUInt8() / 10;
            const brakeDemandPressureKpa = reader.ReadUInt16() * 0.0195313;
            const brakingCoefficientRatio = reader.ReadUInt16() / 100;
            const brakingEfficiencyPercent = reader.ReadUInt8();

            const wheelCount = reader.ReadUInt8();
            const wheels: ProtocolYHgvTrailerWheelData[] = [];

            for (let i = 0; i < wheelCount; i++)
            {
                const rawWheelPosition = reader.ReadUInt8();
                const tyrePressureBar = reader.ReadUInt8() * 0.1;
                const brakeTemperatureDegC = reader.ReadUInt8() * 10;
                const brakeLiningWearPercent = reader.ReadUInt8() * 0.4;

                wheels.push(new ProtocolYHgvTrailerWheelData(
                    rawWheelPosition,
                    tyrePressureBar,
                    brakeTemperatureDegC,
                    brakeLiningWearPercent
                ));
            }

            report.hgvTrailerData = new ProtocolYHgvTrailerData(
                canEventDateTime,
                rawFlags,
                totalAxleLoadKg,
                wheelBasedSpeedKph,
                roadAngleDeg,
                brakeDemandPressureKpa,
                brakingCoefficientRatio,
                brakingEfficiencyPercent,
                wheelCount,
                wheels
            );
        }

        // BEACONS (formerly CM2010 MOBILITY SCOOTER CONTROLLER)
        if ((moduleMask & ProtocolYBeacons.mask) === ProtocolYBeacons.mask)
        {
            const beacons = new ProtocolYBeacons();
            beacons.beacons = [];
            const beaconCount = reader.ReadUInt8();
            const beaconsBytesLength = reader.ReadUInt16();
            // skip reserved bytes
            reader.ReadBytes(4);

            let beaconsBytesUsed = 0;
            while (beaconsBytesUsed < beaconsBytesLength && beacons.beacons.length < beaconCount)
            {
                if ((beaconsBytesLength - beaconsBytesUsed) < 12)
                {
                    // not enough bytes available to read core beacon data
                    break;
                }

                const beacon = new ProtocolYBeacon();
                beacon.macAddress = reader.ReadBytes(6).toString('hex').toUpperCase();
                beacon.rssi = reader.ReadInt8();
                beacon.isCompanion = reader.ReadUInt8() === 1;
                beacon.lastSeenS = reader.ReadUInt16();
                beacon.type = reader.ReadUInt8();
                const beaconMetaDataBytesLength = reader.ReadUInt8();

                beaconsBytesUsed += 12;

                if ((beaconsBytesLength - beaconsBytesUsed) < beaconMetaDataBytesLength)
                {
                    // not enough bytes available for meta-data
                    break;
                }

                const rawMetadata: Buffer = reader.ReadBytes(beaconMetaDataBytesLength);
                beaconsBytesUsed += beaconMetaDataBytesLength;

                const metadataReader = new binutils.BinaryReader(rawMetadata);

                switch (beacon.type)
                {
                    case ProtocolYBeaconType.HEIGHT:
                        beacon.heightCm = metadataReader.ReadUInt16();
                        break;
                }

                beacons.beacons.push(beacon);
            }

            if (beaconsBytesUsed !== beaconsBytesLength)
            {
                // did not consume all of the beacon bytes, skip anything unused and treat as invalid
                reader.ReadBytes(beaconsBytesLength - beaconsBytesUsed);
            }
            else
            {
                report.beacons = beacons;
            }
        }

        // ASTRA GENERIC CAN DATA
        if ((moduleMask & ProtocolYAstraGenericCanData.mask) === ProtocolYAstraGenericCanData.mask)
        {

            let byteCount = reader.ReadUInt16() - 6;
            
            if (byteCount >= 13 && (byteCount % 13) === 0)
            {
                report.astraGenericCanData = new ProtocolYAstraGenericCanData();

                // skip reserved
                reader.ReadBytes(4);

                let entryCount = byteCount / 13;

                for (let i = 0; i < entryCount; i++)
                {
                    if (!report.astraGenericCanData.entries) report.astraGenericCanData.entries = [];
                    report.astraGenericCanData.entries.push(
                        new ProtocolYAstraGenericCanDataEntry(
                            reader.ReadUInt32(),
                            reader.ReadBytes(8),
                            reader.ReadUInt8()
                        )
                    );
                }
            }
            else if (byteCount > 0)
            {
                reader.ReadBytes(byteCount);
            }
        }

        // HEINZMANN ED-DISPLAY
        if ((moduleMask & ProtocolYHeinzmannData.mask) === ProtocolYHeinzmannData.mask)
        {
            report.heinzmannData = new ProtocolYHeinzmannData(
                reader.ReadUInt8(),
                (reader.ReadUInt16() / 1000),
                reader.ReadUInt32(),
                reader.ReadUInt32(),
                reader.ReadBytes(2)
            );
        }

        // ASTRA GENERIC DEBUG DATA
        if ((moduleMask & ProtocolYAstraGenericDebugData.mask) === ProtocolYAstraGenericDebugData.mask)
        {
            let payloadSize = reader.ReadUInt16() - 1;
            let payloadType = reader.ReadUInt8();

            switch (payloadType)
            {
                case ProtocolYAstraDebugDataType.NV_DATA:
                    // skip type length
                    reader.ReadBytes(2);
                    report.astraGenericDebugData = new ProtocolYAstraGenericDebugData();
                    report.astraGenericDebugData.nvData = new ProtocolYAstraDebugNvData(
                        readU16BE(reader),
                        readU32BE(reader),
                        readU32BE(reader)
                    );
                    report.astraGenericDebugData.nvData.watchdogLevels = [];
                    for (let i = 0; i < 15; i++)
                    {
                        report.astraGenericDebugData.nvData.watchdogLevels.push(readU16BE(reader));
                    }
                    let wdgServiceName: Buffer = reader.ReadBytes(8);
                    if (wdgServiceName[0] !== 0)
                    {
                        report.astraGenericDebugData.nvData.watchdogServiceName = wdgServiceName.toString('ascii');
                    }
                    break;
                default:
                    // skip payload
                    if (payloadSize > 0)
                    {
                        reader.ReadBytes(payloadSize);
                    }
                    break;
            }
        }

        return report;
    }
}