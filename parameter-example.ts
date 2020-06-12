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

console.log(vs.applySchemaObject(schemaObject, {
    limit: "1.8",
    offset: -1,
}));
