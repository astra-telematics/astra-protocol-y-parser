import { ProtocolYLoginData } from "./data/y_login_data";

export class ProtocolYParserOptions
{
    public enableMode4: boolean = false;
    public loginData?: ProtocolYLoginData;

    constructor(
        enableMode4: boolean = false,
        loginData?: ProtocolYLoginData
    )
    {
        this.enableMode4 = enableMode4;
        this.loginData = loginData;
    }
}