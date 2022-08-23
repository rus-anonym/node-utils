import UtilsVKAPI from "./lib/api";
import UtilsVKGroup from "./lib/group";
import UtilsRegular from "../regular";
import axios, { AxiosRequestConfig } from "axios";

interface IArticleInfo {
    id: number;
    owner_id: number;
    raw_id: string;
    access_hash: string;
    title: string;
    subtitle: string;
    published: Date;
    views: number;
    views_formatted: string;
    shares: number;
    shares_formatted: string;
    url: string;
}

class UtilsVK {
    public readonly api: UtilsVKAPI;
    public readonly group: UtilsVKGroup;

    private readonly _regular: UtilsRegular;

    constructor({
        api = new UtilsVKAPI(),
        regular = new UtilsRegular(),
        group = new UtilsVKGroup(),
    }: {
        api?: UtilsVKAPI;
        regular?: UtilsRegular;
        group?: UtilsVKGroup;
    } = {}) {
        this.api = api;
        this.group = group;
        this._regular = regular;
    }

    /**
     * @description Получить данные о статье по ссылке
     * @param {string} articleLink Ссылка на статью
     * @returns {Promise} Данные статьи
     */
    public async getArticleInfo(
        articleLink: string,
        extra?: Omit<AxiosRequestConfig, "method" | "url">
    ): Promise<IArticleInfo> {
        articleLink = articleLink.trim().replace("https://m.", "https://");
        if (this._regular.isURL(articleLink) === false) {
            throw new TypeError("Invalid article link");
        } else {
            try {
                let data: string = (
                    await axios({
                        url: articleLink,
                        method: "GET",
                        ...extra,
                    })
                ).data as string;
                // eslint-disable-next-line quotes
                let position1 = data.indexOf(`Article.init({"id":`);
                let position2 = data.indexOf("</script></div>", position1);
                data = data.substring(position1, position2);
                position1 = 13;
                position2 = data.indexOf(", {");
                data = data.substring(position1, position2);
                const articleData = JSON.parse(data) as IArticleInfo & {
                    published_date: number;
                };
                return {
                    id: articleData.id,
                    owner_id: articleData.owner_id,
                    raw_id: articleData.raw_id,
                    access_hash: articleData.access_hash,
                    title: articleData.title,
                    subtitle: articleData.subtitle,
                    published: new Date(articleData.published_date * 1000),
                    views: articleData.views,
                    views_formatted: articleData.views_formatted,
                    shares: articleData.shares,
                    shares_formatted: articleData.shares_formatted,
                    url: "https://vk.com" + articleData.url,
                };
            } catch (error) {
                throw new Error("Invalid article");
            }
        }
    }

    /**
     * @description Позволяет узнать дату регистрации пользователя
     * @param {number} id - ID пользователя
     * @returns {Date} - Дата регистрации пользователя
     */
    public async getUserRegDate(
        id: number,
        config?: Omit<AxiosRequestConfig, "method" | "url">
    ): Promise<Date> {
        const data = (
            await axios({
                url: `https://vk.com/foaf.php?id=${id}`,
                method: "GET",
                ...config,
            })
        ).data as string;
        const firstIndex = data.indexOf("<ya:created dc:date=") + 22;
        // eslint-disable-next-line quotes
        const secondIndex = data.indexOf(`"/>`, firstIndex);
        return new Date(data.substring(firstIndex, secondIndex));
    }

    /**
     * @description Позволяет узнать дату изменения информации пользователя
     * @param {number} id - ID пользователя
     * @returns {Date} - Дата изменения страницы пользователя
     */
    public async getUserModifiedDate(
        id: number,
        config?: Omit<AxiosRequestConfig, "method" | "url">
    ): Promise<Date> {
        const data = (
            await axios({
                url: `https://vk.com/foaf.php?id=${id}`,
                method: "GET",
                ...config,
            })
        ).data as string;
        const firstIndex = data.indexOf("<ya:modified dc:date=") + 23;
        // eslint-disable-next-line quotes
        const secondIndex = data.indexOf('"/>', firstIndex);
        return new Date(data.substring(firstIndex, secondIndex));
    }
}

export { UtilsVKAPI, UtilsVKGroup };

export default UtilsVK;
