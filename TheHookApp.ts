import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IPostUserLoggedIn, IUser } from '@rocket.chat/apps-engine/definition/users';
import { AppSetting, settings } from './config/Settings';

export class TheHookApp extends App implements IPostUserLoggedIn{
    public appLogger: ILogger
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async initialize(configurationExtend: IConfigurationExtend): Promise<void> {
        // extend configuration
        await this.extendConfiguration(configurationExtend);
        this.getLogger().debug('Hello, World!')
    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        await Promise.all(settings.map((setting) => configuration.settings.provideSetting(setting)));
    }    

    public async executePostUserLoggedIn(context: IUser, read: IRead, http: IHttp){
        const { value: UserLoggedInUrls } = await read.getEnvironmentReader().getSettings().getById(AppSetting.TheHookAppUserLoggedInUrls);
        this.getLogger().info("User Logged in", context)
        this.getLogger().info("Send to URLS", UserLoggedInUrls)
        UserLoggedInUrls.split(",").map(url =>{
            http.post(
                url, 
                {data: {"data": context, "hook": "PostUserLoggedIn"}}
            )
        })
    }

}
