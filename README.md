# An Introduction to Deno

[Node.jsの後悔から生まれた新しい実行環境・Deno入門 〜簡単なアプリケーション作成ハンズオン付き〜](https://knowledge.sakura.ad.jp/24150/)のサンプルコードです。

[Visual Studio Code](https://code.visualstudio.com/)で「ファイル」→「ワークスペースを開く」から`project.code-workspace`を選択してください。

## インストール方法

[公式ページ](https://deno.land/#installation)より。

Windowsの場合

```powershell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

macOS/Linuxの場合

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## とりあえず動かしてみる

Deno版

```bash
deno run --allow-net deno-example.ts
```

Node.js版

```bash
node node-example.js
```

動作確認

- <http://localhost:8000/> - **地獄の言葉**があらわれる
- <http://localhost:8000/abc> - **地獄の言葉**があらわれる
- どのパスにアクセスしても**地獄の言葉**があらわれる

## ウェブアプリケーションフレームワークを使ってみる

```bash
deno run --allow-net servest-example.ts
```

動作確認

- <http://localhost:8000/> - **地獄の言葉**があらわれる
- <http://localhost:8000/abc> - Not Found

## Web APIっぽいものを作ってみる

```bash
deno run --allow-net webapi-example.ts
```

動作確認

- <http://localhost:8000/users> - `users`変数の中身が一覧表示される
- <http://localhost:8000/users/1> - `id`が1の項目が表示される
- <http://localhost:8000/users/100> - Not Found

## パラメーターを処理してみる

[value-schema](https://deno.land/x/value_schema)の動作確認

```bash
deno run parameter-example.ts
```

Web APIにパラメーター処理を追加

```bash
deno run --allow-net webapi-parameter-example.ts
```

動作確認

- <http://localhost:8000/users?limit=5> - 最初の5件のみ表示される
- <http://localhost:8000/users?limit=2&offset=5> - 6-7件目が表示される
- <http://localhost:8000/users?q=Trinidad> - `name`に"Trinidad"が含まれる項目のみ表示される

## 全部合体させる

```bash
deno run --allow-net all-in-one.ts
```

動作確認

- <http://localhost:8000/> - **地獄の言葉**があらわれる
- <http://localhost:8000/users?limit=5&offset=3> - 4-8件目が表示される
- <http://localhost:8000/users/5> - `id`が5の項目が表示される
