import { ISetting, SettingType} from '@rocket.chat/apps-engine/definition/settings';

export enum AppSetting {
    TheHookAppUserLoggedInUrls = 'thehook_userloggedin_urls',
}

export const settings: Array<ISetting> = [
    {
        id: AppSetting.TheHookAppUserLoggedInUrls,
        public: true,
        type: SettingType.STRING,
        value: null,
        packageValue: null,
        hidden: false,
        i18nLabel: 'TheHook_UserLoggedIn',
        required: false,
    },    
]