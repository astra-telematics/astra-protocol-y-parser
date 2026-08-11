# astra-protocol-y-parser

A lightweight NodeJS package for parsing data from Astra Telematics IoT devices.

This package has been written in TypeScript, offering rich code-hinting and type safety.

This parser has been updated for **Protocol Y v1.9**.

## Protocol Y v1.9 notes

Protocol Y v1.9 changes the report header layout and several data modules.

### Report header changes

- Report module mask: **10 bytes**
- Report reason flags: **8 bytes**
- Report status flags: **4 bytes**
- Reason flag bit 32: **Trailer Data Event**

### Notable module changes

- **Module 1 – Device Power**
  - External input voltage is now **2 bytes**
  - Resolution: **0.1 V/bit**

- **Module 2 – GNSS Data**
  - Added:
    - GNSS valid fix availability %
    - GNSS SVs in view
    - GNSS estimated position error

- **Module 6 – Signal Quality**
  - Removed in Protocol Y v1.3
  - GNSS/network quality information is now represented in GNSS Data and Mobile Network Info

- **Module 7 – Mobile Network Info**
  - Added:
    - RSSI
    - RAT

- **Module 13 – FMS In-Journey Data**
  - Total fuel used resolution is now **0.001 L/bit**

- **Module 44**
  - Replaced with **HGV Trailer Data**

## Supports data modules

- [x] Device Power
- [x] GNSS Data
- [x] Digital I/O
- [x] Analogue Inputs
- [x] Driver Behaviour
- [ ] Signal Quality REMOVED in Protocol Y v1.3
- [x] GSM / Mobile Network Info incl. MCC, MNC, RSSI and RAT
- [x] Geofences
- [x] Driver ID
- [ ] Trailer ID DEPRECATED
- [x] Driver Alcohol Test Data
- [x] FMS Journey Start Data
- [x] FMS In-Journey Data
- [x] OBD In-Journey Data
- [x] OBD Diagnostic Trouble Codes
- [x] FMS Journey Stop Data
- [x] OBD Journey Stop Data
- [x] Carrier Temperature Data
- [x] 1-Wire Temperature Probe Data
- [x] Carrier 2-Way Alarms
- [x] Rayvolt E-Bicycle
- [x] ECON 3-Byte
- [x] Gritter Data (BS EN 15430)
- [x] Beacons
- [x] Redforge Weight
- [x] ECON "1-Gram" Gritter Data
- [x] NMEA 2000 Data
- [x] SIM Card Subscriber ID
- [x] SIM Card Serial Number
- [x] FMS Driver ID
- [x] FMS In-Journey High-res
- [x] FMS Driver Working States
- [x] Segway Ninebot ES4 Sharing
- [x] Temperature + Humidity Sensors
- [x] Going Green "The Core" Bike Data
- [x] Ecooter E1/E2 Scooter Data
- [x] Torrot Muvi Scooter Data
- [x] Ecooter E1/E2 Serial Numbers
- [x] Askoll eS2 Scooter Data
- [x] Cash-in-transit Status
- [x] Torrot Muvi Battery Data
- [x] STARS ACIM Motor Controller Data
- [x] "CAR2" Data
- [ ] GNSS Extended Data REMOVED / replaced by HGV Trailer Data in Module 44
- [x] HGV Trailer Data
- [ ] CM2010 Mobility Scooter Controller Data DEPRECATED
- [x] Astra Generic CAN Data
- [x] Astra Generic Debug Data
- [x] Heinzmann E-Scooter CAN Data

## Installation

Run the following command in the root of your project:

```bash
npm i astra-protocol-y-parser