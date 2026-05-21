export enum ProtocolYRatName {
  UNKNOWN = 0,
  GSM = 1,
  LTE_M = 2,
  NB_IOT = 3,
  NETWORK_3G = 4,
  LTE_CAT_1 = 5,
  NETWORK_5G = 6,
  LORA = 7,
}
export class ProtocolYGsmNetworkInfo {
  static mask: bigint = BigInt(1) << BigInt(6);

  public mcc: number;
  public mnc: number;
  public rssiDbm: number;
  public rat: ProtocolYRatName;

  constructor(
    mcc: number,
    mnc: number,
    rssiDbm: number,
    rat: ProtocolYRatName,
  ) {
    this.mcc = mcc;
    this.mnc = mnc;
    this.rssiDbm = rssiDbm;
    this.rat = rat;
  }
}
