import { ProtocolYLoginData } from "./data/y_login_data";
import { ProtocolYPacket } from "./data/y_packet";
import { ProtocolYParserOptions } from "./y_parser_options";

export class ProtocolYParser
{
    private data: Buffer;
    private options: ProtocolYParserOptions;
    public isLogin: boolean = false;
    public loginData?: ProtocolYLoginData;
    public packet?: ProtocolYPacket | null;

    constructor (
        data: Buffer,
        options: ProtocolYParserOptions = new ProtocolYParserOptions()
    )
    {
        this.data = data;
        this.options = options;
        this.parse();
    }

    private checkLogin ()
    {
        let decoded: string = this.data.toString('ascii');

        if (decoded.startsWith('$ASTRA;'))
        {
            let components: string[] = decoded.replace('\r\n', '').split(';');

            if (components.length >= 7)
            {
                if (components[5] === 'Y' || components[5] === 'Z')
                {
                    this.loginData = new ProtocolYLoginData(
                        components[2],
                        components[1],
                        components[3],
                        components[4],
                        components[6],
                        components.length >= 8 ? components[7].replace('\r', '') : undefined,
                        components[5]
                    );

                    return true;
                }
            }
        }

        return false;
    }

    private parse ()
    {
        if (this.checkLogin())
        {
            this.isLogin = true;
        }
        else
        {
            this.packet = ProtocolYPacket.fromData(this.data, this.options.enableMode4, this.options.loginData);
        }
    }
}