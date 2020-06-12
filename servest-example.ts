import {createApp} from "https://servestjs.org/@v1.1.0/mod.ts";
const app = createApp();
console.log("http://localhost:8000/");
app.get("/", async (req) => {
    await req.respond({
        status: 200,
        body: "Hell Word",
    });
});
app.listen({port: 8000});
