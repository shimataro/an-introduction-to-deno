import {createApp} from "https://servestjs.org/@v1.1.0/mod.ts";

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
app.get("/users", async (req) => {
    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json",
        }),
        body: JSON.stringify(users),
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
