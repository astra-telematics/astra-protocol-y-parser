import * as moment from "moment-timezone";
import { readU16BE, readU24, readU32BE, readModule, readModuleReader } from "../utils";
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
import { ProtocolYTpms, ProtocolYTpmsSensor } from "./modules/y_tpms";
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
    public tpms?: ProtocolYTpms;
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
            const moduleReader = readModuleReader(reader, 1);
            report.devicePower = new ProtocolYDevicePower(
                moduleReader.ReadUInt16() * 0.1,
                moduleReader.ReadUInt8()
            )
        }

        // GPS DATA
        if ((moduleMask & ProtocolYGpsData.mask) === ProtocolYGpsData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.rawGpsTimeDateLastKnownGood = moduleReader.ReadUInt32();
            report.gpsData = new ProtocolYGpsData(
                moduleReader.ReadInt32() / 1000000,
                moduleReader.ReadInt32() / 1000000,
                moduleReader.ReadUInt8() * 2,
                moduleReader.ReadUInt8() * 2,
                moduleReader.ReadUInt8() * 2,
                moduleReader.ReadUInt8() * 20,
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8()
            )
        }

        // DIGITALS
        if ((moduleMask & ProtocolYDigitals.mask) === ProtocolYDigitals.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.digitals = new ProtocolYDigitals(
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16()
            )
        }

        // ANALOGUES
        if ((moduleMask & ProtocolYAnalogues.mask) === ProtocolYAnalogues.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.analogues = new ProtocolYAnalogues(
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16()
            )
        }

        // DRIVER BEHAVIOUR
        if ((moduleMask & ProtocolYDriverBehaviour.mask) === ProtocolYDriverBehaviour.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.driverBehaviour = new ProtocolYDriverBehaviour(
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt16()
            )
        }

        // TPMS
        if ((moduleMask & ProtocolYTpms.mask) === ProtocolYTpms.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            const sensorCount = moduleReader.ReadUInt8();
            const sensors: ProtocolYTpmsSensor[] = [];
            for (let i = 0; i < sensorCount; i++)
            {
                sensors.push(new ProtocolYTpmsSensor(
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8() / 10,
                    moduleReader.ReadInt8()
                ));
            }
            report.tpms = new ProtocolYTpms(sensorCount, sensors);
        }

        // GSM NETWORK INFO
        if ((moduleMask & ProtocolYGsmNetworkInfo.mask) === ProtocolYGsmNetworkInfo.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.gsmNetworkInfo = new ProtocolYGsmNetworkInfo(
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8() * -1,
                moduleReader.ReadUInt8()
            )
        }

        // GEOFENCES
        if ((moduleMask & ProtocolYGeofences.mask) === ProtocolYGeofences.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.geofences = new ProtocolYGeofences(
                moduleReader.ReadUInt8()
            )
        }

        // DRIVER ID
        if ((moduleMask & ProtocolYDriverId.mask) === ProtocolYDriverId.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            let src: ProtocolYDriverIdSource = ProtocolYDriverIdSource.NONE;
            switch (moduleReader.ReadUInt8())
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
                moduleReader.ReadBytes(8).toString('hex').toUpperCase()
            )
        }

        // DRIVER ALCOHOL TEST DATA
        if ((moduleMask & ProtocolYDriverAlcoholTestData.mask) === ProtocolYDriverAlcoholTestData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            const rawStatus = moduleReader.ReadUInt8();
            
            report.driverAlcoholTestData = new ProtocolYDriverAlcoholTestData(
                rawStatus,
                (rawStatus & 0x01) === 0x01,
                moduleReader.ReadUInt16()
            );

        }

        // FMS JOURNEY-START DATA
        if ((moduleMask & ProtocolYFmsJourneyStartData.mask) === ProtocolYFmsJourneyStartData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.fmsJourneyStartData = new ProtocolYFmsJourneyStartData(
                moduleReader.ReadUInt16()
            )
        }

        // GNSS STOP-REPORT DATA
        if ((moduleMask & ProtocolYGnssStopReportData.mask) === ProtocolYGnssStopReportData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            let lifetimeOdoKm = moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();

            report.gnssStopReportData = new ProtocolYGnssStopReportData(
                lifetimeOdoKm,
                moduleReader.ReadUInt16()
            )
        }

        // FMS IN-JOURNEY DATA
        if ((moduleMask & ProtocolYFmsInJourneyData.mask) === ProtocolYFmsInJourneyData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.fmsInJourneyData = new ProtocolYFmsInJourneyData(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8() * 32,
                moduleReader.ReadUInt8() * 32,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt8() - 40,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt32() / 1000
            )
        }

        // OBD IN-JOURNEY DATA
        if ((moduleMask & ProtocolYObdInJourneyData.mask) === ProtocolYObdInJourneyData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.obdInJourneyData = new ProtocolYObdInJourneyData(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8() * 32,
                moduleReader.ReadUInt8() * 32,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt8() - 40,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16() / 10
            )
        }

        // OBD DTC CODES
        if ((moduleMask & ProtocolYObdDtcCodes.mask) === ProtocolYObdDtcCodes.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.obdDtcCodes = new ProtocolYObdDtcCodes(
                moduleReader.ReadBytes(5).toString('ascii'),
                moduleReader.ReadBytes(5).toString('ascii'),
                moduleReader.ReadBytes(5).toString('ascii'),
                moduleReader.ReadBytes(5).toString('ascii'),
                moduleReader.ReadBytes(5).toString('ascii')
            )
        }

        // FMS JOURNEY-STOP DATA
        if ((moduleMask & ProtocolYFmsJourneyStopData.mask) === ProtocolYFmsJourneyStopData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            let lifetimeOdoKm = moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();

            report.fmsJourneyStopData = new ProtocolYFmsJourneyStopData(
                lifetimeOdoKm,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16() * 5
            )
        }

        // OBD JOURNEY-STOP DATA
        if ((moduleMask & ProtocolYObdJourneyStopData.mask) === ProtocolYObdJourneyStopData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            let lifetimeOdoKm = moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();
            lifetimeOdoKm <<= 8;
            lifetimeOdoKm |= moduleReader.ReadUInt8();

            report.obdJourneyStopData = new ProtocolYObdJourneyStopData(
                lifetimeOdoKm,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16()
            )
        }

        // CARRIER TEMPERATURE DATA
        if ((moduleMask & ProtocolYCarrierTemperatureData.mask) === ProtocolYCarrierTemperatureData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            if (loginData?.protocolId === 'Z')
            {
                moduleReader.ReadBytes(17);
            }
            else
            {
                report.carrierTemperatureData = new ProtocolYCarrierTemperatureData(
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadUInt8() / 2,
                    moduleReader.ReadUInt8() / 2,
                    moduleReader.ReadUInt8() / 2,
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt16() * 2,
                    moduleReader.ReadUInt16() * 2,
                    moduleReader.ReadUInt16(),
                    readU24(moduleReader)
                )
            }
        }

        // ONE-WIRE TEMPERATURE PROBE
        if ((moduleMask & ProtocolYOneWireTemperatureProbe.mask) === ProtocolYOneWireTemperatureProbe.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.oneWireTemperatureProbe = new ProtocolYOneWireTemperatureProbe(
                (moduleReader.ReadUInt16() / 10) - 550,
                (moduleReader.ReadUInt16() / 10) - 550,
                (moduleReader.ReadUInt16() / 10) - 550,
                (moduleReader.ReadUInt16() / 10) - 550
            )
        }

        // CARRIER TWO-WAY ALARMS
        if ((moduleMask & ProtocolYCarrierTwoWayAlarms.mask) === ProtocolYCarrierTwoWayAlarms.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            if (loginData?.protocolId === 'Z')
            {
                moduleReader.ReadBytes(10);
            }
            else
            {
                report.carrierTwoWayAlarms = new ProtocolYCarrierTwoWayAlarms(
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadBytes(16)
                )
            }
        }

        // RAYVOLT E-BICYCLE
        if ((moduleMask & ProtocolYRayvoltEBicycle.mask) === ProtocolYRayvoltEBicycle.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            if (loginData?.protocolId === 'Z')
            {
                moduleReader.ReadBytes(19);
            }
            else
            {
                report.rayvoltEBicycle = new ProtocolYRayvoltEBicycle(
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8() / 4,
                    moduleReader.ReadInt8(),
                    moduleReader.ReadUInt8() / 2,
                    moduleReader.ReadUInt16()
                )
            }
        }

        // ECON 3-BYTE
        if ((moduleMask & ProtocolYEcon3Byte.mask) === ProtocolYEcon3Byte.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.econ3Byte = new ProtocolYEcon3Byte(
                readU24(moduleReader)
            )
        }

        // GRITTER DATA (BS EN 15430)
        if ((moduleMask & ProtocolYGritterDataBsEn15430.mask) === ProtocolYGritterDataBsEn15430.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.gritterDataBsEn15430 = new ProtocolYGritterDataBsEn15430(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8()
            )
        }


        // REDFORGE WEIGHT
        if ((moduleMask & ProtocolYRedforgeWeight.mask) === ProtocolYRedforgeWeight.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.redforgeWeight = new ProtocolYRedforgeWeight(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8()
            )
        }

        // NMEA 2000 DATA
        if ((moduleMask & ProtocolYNmea2000Data.mask) === ProtocolYNmea2000Data.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            if (loginData?.protocolId === 'Z')
            {
                moduleReader.ReadBytes(6);
            }
            else
            {
                report.nmea2000Data = new ProtocolYNmea2000Data(
                    moduleReader.ReadInt16() * 0.004,
                    moduleReader.ReadInt16() * 0.004,
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16() * 10,
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt32() * 0.01,
                    moduleReader.ReadUInt16() * 0.001,
                    moduleReader.ReadUInt16() * 0.01,
                    moduleReader.ReadUInt16() * 0.01,
                    moduleReader.ReadBytes(16)
                )
            }
        }

        // SIM SUBSCRIBER ID
        if ((moduleMask & ProtocolYSimSubscriberId.mask) === ProtocolYSimSubscriberId.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.simSubscriberId = new ProtocolYSimSubscriberId(
                BigInt(`0x${moduleReader.ReadBytes(7).toString('hex')}`).toString()
            )
        }

        // SIM CARD SERIAL NUMBER
        if ((moduleMask & ProtocolYSimCardSerialNumber.mask) === ProtocolYSimCardSerialNumber.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.simCardSerialNumber = new ProtocolYSimCardSerialNumber(
                moduleReader.ReadBytes(20).toString('ascii')
            )
        }

        // FMS DRIVER-ID
        if ((moduleMask & ProtocolYFmsDriverId.mask) === ProtocolYFmsDriverId.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.fmsDriverId = new ProtocolYFmsDriverId(
                moduleReader.ReadBytes(19).toString('ascii'),
                moduleReader.ReadBytes(19).toString('ascii')
            )
        }

        // FMS IN-JOURNEY HIGH-RES  - removed in Protocol Y
        if ((moduleMask & ProtocolYFmsInJourneyHighRes.mask) === ProtocolYFmsInJourneyHighRes.mask)
        {
            readModuleReader(reader, 1);
            // Do not read bytes here for Protocol Y new format.
        }

        // FMS DRIVER WORKING STATES
        if ((moduleMask & ProtocolYFmsDriverWorkingStates.mask) === ProtocolYFmsDriverWorkingStates.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            if (loginData?.protocolId === 'Z')
            {
                moduleReader.ReadBytes(1);
            }
            else
            {
                report.fmsDriverWorkingStates = new ProtocolYFmsDriverWorkingStates(
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt8()
                )
            }
        }

        // SEGWAY NINEBOT ES4 SHARING
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule32.mask) === ProtocolZModule32.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod32 = new ProtocolZModule32(
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadUInt16() / 10,
                    moduleReader.ReadInt16() / 10,
                    readU24(moduleReader),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadInt16(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt8()
                );
            }
        }
        else if ((moduleMask & ProtocolYSegwayNinebotEs4Sharing.mask) === ProtocolYSegwayNinebotEs4Sharing.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.segwayNinebotEs4Sharing = new ProtocolYSegwayNinebotEs4Sharing(
                moduleReader.ReadUInt8() / 10,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8()
            )
        }

        // SENSORS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule33.mask) === ProtocolZModule33.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod33 = new ProtocolZModule33(
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadInt16(),
                    moduleReader.ReadInt16(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadInt16(),
                    moduleReader.ReadInt16(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt32(),
                    moduleReader.ReadUInt8()
                )
            }
        }
        else if ((moduleMask & ProtocolYSensors.mask) === ProtocolYSensors.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.sensors = new ProtocolYSensors();

            for (let i = 0; i < 6; i++)
            {
                let b1 = moduleReader.ReadUInt8();
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
                            sensor.temperatureDeg = moduleReader.ReadInt16() / 100;
                            break;
                        case ProtocolYSensorType.HUMIDITY:
                            sensor.humidityPercent = moduleReader.ReadUInt16() / 100;
                            break;
                        default:
                            break;
                    }

                    if (!report.sensors.sensors) report.sensors.sensors = [];
                    report.sensors.sensors.push(sensor);
                }
            }
        }

        // GOING GREEN "THE CORE" BIKE DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule34.mask) === ProtocolZModule34.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod34 = new ProtocolZModule34(moduleReader.ReadBytes(38));
            }
        }
        else if ((moduleMask & ProtocolYGoingGreenTheCoreBikeData.mask) === ProtocolYGoingGreenTheCoreBikeData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.goingGreenTheCoreBikeData = new ProtocolYGoingGreenTheCoreBikeData(
                moduleReader.ReadUInt16() * 0.0015
            )
        }

        // ECOOTER E1/E2 SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule35.mask) === ProtocolZModule35.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod35 = new ProtocolZModule35(
                    moduleReader.ReadBytes(17).toString('ascii'),
                    moduleReader.ReadBytes(12),
                    moduleReader.ReadBytes(20),
                    moduleReader.ReadBytes(4),
                    moduleReader.ReadBytes(12),
                    moduleReader.ReadBytes(20),
                    moduleReader.ReadBytes(8).toString('ascii'),
                    moduleReader.ReadBytes(10).toString('ascii'),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8(),
                    moduleReader.ReadUInt8()
                );
            }
        }
        else if ((moduleMask & ProtocolYEcooterScooterData.mask) === ProtocolYEcooterScooterData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.ecooterScooterData = new ProtocolYEcooterScooterData(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadInt8(),
                moduleReader.ReadInt8(),
                moduleReader.ReadInt16() * 10,
                moduleReader.ReadUInt8()
            )
        }

        // TORROT MUVI SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule36.mask) === ProtocolZModule36.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod36 = new ProtocolZModule36(moduleReader.ReadBytes(9));
            }
        }
        else if ((moduleMask & ProtocolYTorrotMuviScooterData.mask) === ProtocolYTorrotMuviScooterData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.torrotMuviScooterData = new ProtocolYTorrotMuviScooterData(
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadInt16() / 10,
                moduleReader.ReadInt16() / 10,
                moduleReader.ReadInt16() / 10,
                moduleReader.ReadInt16() / 10,
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt16() / 10,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt32(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8() / 0.22745,
                moduleReader.ReadUInt8() / 0.3921,
                moduleReader.ReadInt8(),
                moduleReader.ReadInt32() * 100,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8()
            )
        }

        // ECOOTER SERIAL NUMBERS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule37.mask) === ProtocolZModule37.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod37 = new ProtocolZModule37(
                    moduleReader.ReadInt8(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadInt8(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                    moduleReader.ReadUInt16(),
                );
            }
        }
        else if ((moduleMask & ProtocolYEcooterSerialNumbers.mask) === ProtocolYEcooterSerialNumbers.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.ecooterSerialNumbers = new ProtocolYEcooterSerialNumbers(
                moduleReader.ReadBytes(16).toString('ascii'),
                moduleReader.ReadBytes(16).toString('ascii')
            )
        }

        // ASKOLL ES2 SCOOTER DATA
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule38.mask) === ProtocolZModule38.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod38 = new ProtocolZModule38(
                    moduleReader.ReadBytes(26)
                )
            }
        }
        else if ((moduleMask & ProtocolYAskollEs2ScooterData.mask) === ProtocolYAskollEs2ScooterData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            let julianSecs = moduleReader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.askollEs2ScooterData = new ProtocolYAskollEs2ScooterData(
                timestamp,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt32(),
                moduleReader.ReadUInt32(),
                moduleReader.ReadInt8(),
                moduleReader.ReadUInt16() * 100,
                moduleReader.ReadUInt8() * 100,
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt32() * 100,
                moduleReader.ReadUInt16() * 100,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16() * 10,
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8() * 0.1,
                moduleReader.ReadUInt8()
            )
        }

        // CASH IN TRANSIT STATUS
        if (loginData?.protocolId === 'Z')
        {
            if ((moduleMask & ProtocolZModule39.mask) === ProtocolZModule39.mask)
            {
                const moduleReader = readModuleReader(reader, 1);
                report.zMod39 = new ProtocolZModule39(
                    moduleReader.ReadBytes(71)
                );
            }
        }
        else if ((moduleMask & ProtocolYCashInTransitStatus.mask) === ProtocolYCashInTransitStatus.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.cashInTransitStatus = new ProtocolYCashInTransitStatus(
                moduleReader.ReadUInt8(),
                moduleReader.ReadBytes(5)
            )
        }

        // TORROT MUVI BATTERY DATA
        if ((moduleMask & ProtocolYTorrotMuviBatteryData.mask) === ProtocolYTorrotMuviBatteryData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.torrotMuviBatteryData = new ProtocolYTorrotMuviBatteryData(
                moduleReader.ReadBytes(13).toString('ascii'),
                moduleReader.ReadBytes(13).toString('ascii'),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                readU24(moduleReader) * 0.1,
                readU24(moduleReader) * 0.1,
                moduleReader.ReadUInt8(),
                moduleReader.ReadBytes(2)
            )
        }

        // BATTERY USAGE STATISTICS - removed in Protocol Y
        if ((moduleMask & ProtocolYBatteryUsageStatistics.mask) === ProtocolYBatteryUsageStatistics.mask)
        {
            readModuleReader(reader, 1);
            // Do not read bytes here for Protocol Y new format.
        }

        // STARS ACIM MOTOR CONTROLLER DATA
        if ((moduleMask & ProtocolYStarsAcimMotorControllerData.mask) === ProtocolYStarsAcimMotorControllerData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.starsAcimMotorControllerData = new ProtocolYStarsAcimMotorControllerData(
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16() / 100,
                moduleReader.ReadUInt8(),
                moduleReader.ReadInt16() / 100,
                moduleReader.ReadInt16() / 100,
                moduleReader.ReadInt16(),
                moduleReader.ReadInt16(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16()
            )
            let julianSecs = moduleReader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.starsAcimMotorControllerData.canEventDateTime = timestamp;
        }

        // "CAR2" DATA
        if ((moduleMask & ProtocolYCar2Data.mask) === ProtocolYCar2Data.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.car2Data = new ProtocolYCar2Data(
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt8(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16(),
                moduleReader.ReadUInt16()
            )
            let julianSecs = moduleReader.ReadUInt32();
            let timestamp = moment.utc('1980-01-06T00:00:00').add(julianSecs, 'seconds');
            report.car2Data.canEventDateTime = timestamp;
        }

        // HGV TRAILER DATA
        if ((moduleMask & ProtocolYHgvTrailerData.mask) === ProtocolYHgvTrailerData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            const julianSecs = moduleReader.ReadUInt32();
            const canEventDateTime = moment
                .tz('1980-01-06T00:00:00', 'UTC')
                .add(julianSecs, 'seconds');

            const rawFlags = moduleReader.ReadUInt8();

            const totalAxleLoadKg = moduleReader.ReadUInt16() * 2;
            const wheelBasedSpeedKph = moduleReader.ReadUInt16() / 256;
            const roadAngleDeg = moduleReader.ReadUInt8() / 10;
            const brakeDemandPressureKpa = moduleReader.ReadUInt16() / 52;
            const brakingCoefficientRatio = moduleReader.ReadUInt16() / 100;
            const brakingEfficiencyPercent = moduleReader.ReadUInt8();

            const wheelCount = moduleReader.ReadUInt8();
            const wheels: ProtocolYHgvTrailerWheelData[] = [];

            for (let i = 0; i < wheelCount; i++)
            {
                const rawWheelPosition = moduleReader.ReadUInt8();
                const tyrePressureBar = moduleReader.ReadUInt8() * 0.1;
                const brakeTemperatureDegC = moduleReader.ReadUInt8() * 10;
                const brakeLiningWearPercent = moduleReader.ReadUInt8() * 0.4;

                wheels.push(new ProtocolYHgvTrailerWheelData(
                    rawWheelPosition,
                    tyrePressureBar,
                    brakeTemperatureDegC,
                    brakeLiningWearPercent
                ));
            }

            const currentEbsSupplyPressureKpa = moduleReader.ReadUInt8() * 5;
            const parkingBrakeDemand = moduleReader.ReadUInt8() * 0.4;
            const rawRetarderStatus = moduleReader.ReadUInt8();
            const retarderReferenceTorqueNm = moduleReader.ReadUInt16();
            const retarderPercentTorque = moduleReader.ReadUInt8() - 125;
            const retarderPercentDemand = moduleReader.ReadUInt8() - 125;

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
                wheels,
                currentEbsSupplyPressureKpa,
                parkingBrakeDemand,
                rawRetarderStatus,
                retarderReferenceTorqueNm,
                retarderPercentTorque,
                retarderPercentDemand
            );
        }

        // BEACONS (formerly CM2010 MOBILITY SCOOTER CONTROLLER)
        if ((moduleMask & ProtocolYBeacons.mask) === ProtocolYBeacons.mask)
        {
            const moduleReader = readModuleReader(reader, 2);
            const beacons = new ProtocolYBeacons();
            beacons.beacons = [];
             // skip reserved bytes
            moduleReader.ReadBytes(4);

            const beaconCount = moduleReader.ReadUInt8();

            for (let i = 0; i < beaconCount; i++) {

                const beacon = new ProtocolYBeacon();
                beacon.macAddress = moduleReader.ReadBytes(6).toString('hex').toUpperCase();
                beacon.rssi = moduleReader.ReadInt8();
                beacon.isCompanion = moduleReader.ReadUInt8() === 1;
                beacon.lastSeenS = moduleReader.ReadUInt16();
                beacon.type = moduleReader.ReadUInt8();
                const beaconMetaDataBytesLength = moduleReader.ReadUInt8();
                const rawMetadata: Buffer = moduleReader.ReadBytes(beaconMetaDataBytesLength);
                const metadataReader = new binutils.BinaryReader(rawMetadata);

                switch (beacon.type)
                {
                    case ProtocolYBeaconType.HEIGHT:
                        beacon.heightCm = metadataReader.ReadUInt16();
                        break;
                }

                beacons.beacons.push(beacon);
            }

            report.beacons = beacons;
        }

        // ASTRA GENERIC CAN DATA
        if ((moduleMask & ProtocolYAstraGenericCanData.mask) === ProtocolYAstraGenericCanData.mask)
        {
            const { moduleReader, bodyLength } = readModule(reader, 2);

            if (bodyLength >= 4)
            {
                moduleReader.ReadBytes(4); // reserved

                const entriesBytesLength = bodyLength - 4;

                if (entriesBytesLength >= 13 && (entriesBytesLength % 13) === 0)
                {
                    report.astraGenericCanData = new ProtocolYAstraGenericCanData();
                    report.astraGenericCanData.entries = [];

                    const entryCount = entriesBytesLength / 13;

                    for (let i = 0; i < entryCount; i++)
                    {
                        report.astraGenericCanData.entries.push(
                            new ProtocolYAstraGenericCanDataEntry(
                                moduleReader.ReadUInt32(),
                                moduleReader.ReadBytes(8),
                                moduleReader.ReadUInt8()
                            )
                        );
                    }
                }
            }
        }

        // HEINZMANN ED-DISPLAY
        if ((moduleMask & ProtocolYHeinzmannData.mask) === ProtocolYHeinzmannData.mask)
        {
            const moduleReader = readModuleReader(reader, 1);
            report.heinzmannData = new ProtocolYHeinzmannData(
                moduleReader.ReadUInt8(),
                (moduleReader.ReadUInt16() / 1000),
                moduleReader.ReadUInt32(),
                moduleReader.ReadUInt32()
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