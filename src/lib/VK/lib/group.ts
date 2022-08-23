import { API, IAPIOptions } from "vk-io";

class UtilsVKGroup {
    /**
     * @description Получить идентификатор последней беседы в группе.
     * @param {string} token Токен группы
     * @returns {Promise.<number>} Идентификатор беседы.
     */
    public async getLastConversation(
        token: string,
        apiParams?: Partial<Omit<IAPIOptions, "token" | "apiVersion">>
    ): Promise<number> {
        const instanceVK = new API({
            token: token,
            apiVersion: "5.170",
            ...apiParams,
        });
        let maxConversationID = 2147483647;
        let minConversationID = 2000000001;
        let currentConversationID: number = maxConversationID;
        let status = false;

        const nextConversation = (): void => {
            maxConversationID = currentConversationID;
            currentConversationID = Math.round(
                (currentConversationID + minConversationID) / 2
            );
        };

        while (!status) {
            if (
                !(await this._checkConversationID(
                    instanceVK,
                    currentConversationID
                ))
            ) {
                nextConversation();
            } else {
                if (maxConversationID !== currentConversationID) {
                    while (!status) {
                        if (minConversationID + 10 > maxConversationID) {
                            for (
                                let i = minConversationID;
                                i < maxConversationID;
                                ++i
                            ) {
                                if (
                                    !(await this._checkConversationID(
                                        instanceVK,
                                        i
                                    ))
                                ) {
                                    status = true;
                                    currentConversationID = i - 1;
                                    return currentConversationID - 2e9;
                                }
                            }
                        }
                        currentConversationID = Math.round(
                            (minConversationID + maxConversationID) / 2
                        );

                        if (
                            !(await this._checkConversationID(
                                instanceVK,
                                currentConversationID
                            ))
                        ) {
                            nextConversation();
                        } else {
                            minConversationID = currentConversationID;
                        }
                    }
                } else {
                    status = true;
                    return currentConversationID - 2e9;
                }
            }
        }

        return currentConversationID - 2e9;
    }

    private async _checkConversationID(
        api: API,
        peerID: number
    ): Promise<boolean> {
        try {
            const { items } = await api.messages.getConversationsById({
                peer_ids: peerID,
            });
            const [data] = items as unknown as { peer: { id: number } }[];
            return !!data.peer.id;
        } catch (e) {
            return false;
        }
    }
}

export default UtilsVKGroup;
