import axios, { AxiosRequestConfig } from "axios";
import { API, IAPIOptions } from "vk-io";

type TAccessRightType = InstanceType<
    typeof UtilsVKAPI
>["_accessRightsTypes"][number];

type TAPISection = InstanceType<typeof UtilsVKAPI>["_apiSections"][number];

interface ITokenInfo {
    type: "user" | "group";
    id: number;
    accessRights: TAccessRightType[];
}

interface IVKAPIStatus {
    section: TAPISection;
    performance: number;
    uptime: number;
}

class UtilsVKAPI {
    private readonly _accessRights = {
        user: [
            {
                right: "notify",
                mask: 1 << 0,
            },
            {
                right: "friends",
                mask: 1 << 1,
            },
            {
                right: "photos",
                mask: 1 << 2,
            },
            {
                right: "audio",
                mask: 1 << 3,
            },
            {
                right: "video",
                mask: 1 << 4,
            },
            {
                right: "stories",
                mask: 1 << 6,
            },
            {
                right: "pages",
                mask: 1 << 7,
            },
            {
                right: "leftLink",
                mask: 1 << 8,
            },
            {
                right: "status",
                mask: 1 << 10,
            },
            {
                right: "notes",
                mask: 1 << 11,
            },
            {
                right: "messages",
                mask: 1 << 12,
            },
            {
                right: "wall",
                mask: 1 << 13,
            },
            {
                right: "ads",
                mask: 1 << 15,
            },
            {
                right: "offline",
                mask: 1 << 16,
            },
            {
                right: "docs",
                mask: 1 << 17,
            },
            {
                right: "groups",
                mask: 1 << 18,
            },
            {
                right: "notifications",
                mask: 1 << 19,
            },
            {
                right: "stats",
                mask: 1 << 20,
            },
            {
                right: "email",
                mask: 1 << 22,
            },
            {
                right: "market",
                mask: 1 << 27,
            },
        ],
        group: [
            {
                right: "stories",
                mask: 1 << 0,
            },
            {
                right: "photos",
                mask: 1 << 2,
            },
            {
                right: "app_widget",
                mask: 1 << 6,
            },
            {
                right: "messages",
                mask: 1 << 12,
            },
            {
                right: "docs",
                mask: 1 << 17,
            },
            {
                right: "manage",
                mask: 1 << 18,
            },
        ],
    } as const;

    private readonly _accessRightsTypes = [
        "notify",
        "friends",
        "photos",
        "audio",
        "video",
        "stories",
        "pages",
        "leftLink",
        "status",
        "notes",
        "messages",
        "wall",
        "ads",
        "offline",
        "docs",
        "groups",
        "notifications",
        "stats",
        "email",
        "market",
        "app_widget",
        "manage",
    ] as const;

    private readonly _apiSections = [
        "users",
        "friends",
        "groups",
        "photos",
        "video",
        "messages",
        "wall",
        "newsfeed",
        "notes",
        "likes",
        "pages",
    ] as const;

    /**
     * @description Получить текущее состояние API VK
     * @returns {Promise} Текущее состояние API VK
     */
    public async status(
        extra?: Omit<AxiosRequestConfig, "method" | "url">
    ): Promise<IVKAPIStatus[]> {
        let data: string = (
            await axios({
                url: "https://vk.com/dev/health",
                method: "GET",
                headers: {
                    "Accept-Language": "en-US,en;q=0.5",
                },
                ...extra,
            })
        ).data as string;
        data = data.toString();
        let position1 = data.indexOf("var content = {");
        let position2 = data.indexOf("'header': ['");
        const newData = data.substring(position1, position2);
        position1 = newData.indexOf("[[");
        position2 = newData.indexOf("]]");
        const arrayWithSections = JSON.parse(
            newData.substring(position1, position2 + 2)
        ) as never[];
        const response: IVKAPIStatus[] = [];
        for (const sectionData of arrayWithSections) {
            response.push({
                section: sectionData[0],
                performance: sectionData[2],
                uptime: sectionData[3],
            });
        }
        return response;
    }

    /**
     * @description Проверка токена
     * @param {string} token Проверяемый токен
     * @returns {Promise} данные токена
     */
    public async checkToken(
        token: string,
        apiParams?: Partial<Omit<IAPIOptions, "token" | "apiVersion">>
    ): Promise<ITokenInfo> {
        if (token.length !== 85) {
            throw new TypeError("Invalid token length");
        }

        const tokenWords = token.split("");

        const allowedWordSet = new Set([
            "d",
            "e",
            "f",
            "b",
            "c",
            "a",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ]);

        tokenWords.forEach((tempWord) => {
            if (!allowedWordSet.has(tempWord)) {
                throw new TypeError(`Invalid token symbol (${tempWord})`);
            }
        });

        const tempAPI = new API({ token, apiVersion: "5.170", ...apiParams });

        const tokenData = await tempAPI.users.get({}).catch(() => {
            throw new TypeError("Invalid token");
        });

        const response: ITokenInfo = {
            type: "user",
            id: 0,
            accessRights: [],
        };

        if (tokenData.length === 0) {
            const [secondTokenData] = await tempAPI.groups.getById({});
            response.type = "group";
            response.id = secondTokenData.id as number;
            const currentPermissions = await tempAPI.groups.getTokenPermissions(
                {}
            );
            response.accessRights = this.decodeMask(
                currentPermissions.mask,
                "group"
            );
        } else {
            response.id = tokenData[0].id as number;
            const currentPermissions = await tempAPI.account.getAppPermissions({
                user_id: response.id,
            });
            response.accessRights = this.decodeMask(currentPermissions, "user");
        }

        return response;
    }

    /**
     * @description Позволяет получить битовую маску по правам
     * @param {Array.<VKUtils.TAccessRightType>} rights - набор прав
     * @param {"user" | "group"} type - пользователь/группа
     * @returns {number} - битовая маска
     */
    public generateMask(
        rights: TAccessRightType[],
        type: "user" | "group"
    ): number {
        let mask = 0;
        for (const right of rights) {
            const index = this._accessRights[type].findIndex(
                (x) => x.right === right
            );
            mask += this._accessRights[type][index].mask;
        }
        return mask;
    }

    /**
     * @description Позволяет получить набор прав по битовой маске
     * @param {number} bitmask - битовая маска
     * @param {"user" | "group"} type - пользователь/группа
     * @returns {Array.<VKUtils.TAccessRightType>} - набор прав
     */
    public decodeMask(
        bitmask: number,
        type: "user" | "group"
    ): TAccessRightType[] {
        const rights: TAccessRightType[] = [];
        for (const right of this._accessRights[type]) {
            if (Boolean(bitmask & right.mask) === true) {
                rights.push(right.right);
            }
        }
        return rights;
    }
}

export { TAccessRightType, ITokenInfo, IVKAPIStatus };

export default UtilsVKAPI;
