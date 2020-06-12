import {createApp} from "https://servestjs.org/@v1.1.0/mod.ts";
import vs from "https://deno.land/x/value_schema/mod.ts";

const schemaObject = {
    q: vs.string({                      // 文字列型
        ifEmptyString: "",                  // 空文字列を許可（デフォルトでは空文字列はエラー）
        ifUndefined: "",                    // 省略時は空文字列
    }),
    limit: vs.number({                  // 数値型
        integer: vs.NUMBER.INTEGER.FLOOR,   // 整数（小数部は切り捨て）
        minValue: 1,                        // 1以上（違反したらエラー）
        maxValue: 20,                       // 20以下（違反したらエラー）
        ifUndefined: 10,                    // 省略時は10
    }),
    offset: vs.number({                 // 数値型
        integer: vs.NUMBER.INTEGER.YES,     // 整数（小数部があればエラー）
        minValue: {
            value: 0,                           // 最小値は0
            adjusts: true,                      // 違反したら範囲に収まるように調整（負の数を0にする）
        },
        ifUndefined: 0,                     // 省略時は0
    }),
};

interface User {
    id: number
    name: string
}
const users: User[] = [
    {id: 1, name: "Pablo Picasso"},
    {id: 2, name: "Pablo Diego Picasso"},
    {id: 3, name: "Pablo Diego José Picasso"},
    {id: 4, name: "Pablo Diego José Francisco Picasso"},
    {id: 5, name: "Pablo Diego José Francisco de Paula Picasso"},
    {id: 6, name: "Pablo Diego José Francisco de Paula Juan Picasso"},
    {id: 7, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Picasso"},
    {id: 8, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano Picasso"},
    {id: 9, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Picasso"},
    {id: 10, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Trinidad Picasso"},
    {id: 11, name: "Pablo Diego José Francisco de Paula Juan Nepomuceno Cipriano de la Santísima Trinidad Ruiz Picasso"},
];

const app = createApp();
console.log("http://localhost:8000/");
app.get("/", async (req) => {
    await req.respond({
        status: 200,
        body: "Hell Word",
    });
});
app.get("/users", async (req) => {
    const query: Record<string, string> = {};
    for (const [k, v] of req.query.entries()) {
        query[k] = v;
    }
    const normalizedQuery = vs.applySchemaObject(schemaObject, query);
    const filteredUsers = users
        .filter(user => user.name.indexOf(normalizedQuery.q) != -1)
        .slice(normalizedQuery.offset, normalizedQuery.offset + normalizedQuery.limit);

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(filteredUsers),
    });
});
app.get(new RegExp("^/users/(\\d+)"), async (req) => {
    const [_, id] = req.match;
    const filtered = users.filter(user => user.id === Number(id))
    if (filtered.length === 0) {
        // 見つからなかった
        return;
    }

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(filtered[0]),
    });
});
app.listen({port: 8000});
