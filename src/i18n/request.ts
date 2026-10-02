import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => ({
    locale: "pt",
    timeZone: "America/Sao_Paulo",
    messages: (await import("../../messages/pt.json")).default,
}));
