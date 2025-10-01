import { z } from "zod";

const forbiddenWords: string[] = [
    "elelyon", "elshaddai", "adonai", "elohim", "yhwh", "yahweh", "hashem",
    "jehovah", "jeova", "jeová", "allah", "alá",
    "israel", "israeli", "aisraeli", "israelita", "umisraelita", "israelit", "aisraelit",
    "null", "undefined", "admin", "user", "guest",
    "toe", "terms", "termos", "policies", "policy", "cookies", "cookie", "privacy", "legal", "legals", "language", "idioma",
    "signup", "signin", "recover", "sent", "activate", "search", "settings", "new", "help", "changelog", "dashboard",
    "crf", "crfla", "crflamengo", "flamengo", "fla", "tjf", "t.j.f", "jovemfla", "jovem.fla", "jovem_fla",
    "ffc", "flufc", "fluminensefc", "fluminese", "flu", "tyf", "t.y.f", "youngflu", "young.flu", "young_flu",
    "tcp", "t.c.p", "tcpuro",
    "pcc", "p.c.c",
    "ada", "a.d.a",
    "cv", "c.v", "comandov", "comando.v", "cvermelho", "c.vermelho",
    "td2", "td.2", "tudo2", "td3", "td.3", "tudo3", "13", "1333", "13.3.3",
]

export function noForbiddenWords(message: string = "Not allowed") {
    const patterns = forbiddenWords.map(w => new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i"));
    return (schema: z.ZodString) =>
        schema.refine((val) => {
            const normalized = val.toLowerCase().replace(/\s+/g, "");
            return patterns.every(p => !p.test(normalized));
        }, { message });
}