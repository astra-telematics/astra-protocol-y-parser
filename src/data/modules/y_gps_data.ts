export class ProtocolYGpsData
{
    static mask: bigint = BigInt(1) << BigInt(1);

    public latitude: number;
    public longitude: number;
    public speedKph: number;
    public maxSpeedSinceLastReportKph: number;
    public journeyDistanceKm: number;
    public headingDeg: number;
    public altitudeM: number;
    public validFixAvailabilityPercent: number;
    public svsInView: number;
    public estimatedPositionErrorM: number;

    constructor (
        latitude: number,
        longitude: number,
        speedKph: number,
        maxSpeedSinceLastReportKph: number,
        headingDeg: number,
        altitudeM: number,
        journeyDistanceKm: number,
        validFixAvailabilityPercent: number,
        svsInView: number,
        estimatedPositionErrorM: number,
    )
    {
        this.latitude = latitude;
        this.longitude = longitude;
        this.speedKph = speedKph;
        this.maxSpeedSinceLastReportKph = maxSpeedSinceLastReportKph;
        this.journeyDistanceKm = journeyDistanceKm;
        this.headingDeg = headingDeg;
        this.altitudeM = altitudeM;
        this.validFixAvailabilityPercent = validFixAvailabilityPercent;
        this.svsInView = svsInView;
        this.estimatedPositionErrorM = estimatedPositionErrorM;
    }
}