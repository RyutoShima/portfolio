# Ryuto Shima — Portfolio

作品の公開・記録を目的とするポートフォリオサイト。
GitHub `RyutoShima/portfolio` が正本。制作ブランチは **site-v1**。mainの変更・本番公開は行っていません。

## 現在の状態

2026-10-12：デザイン第2稿。黒背景・白文字、左ナビゲーション、PC4〜5列の画像一覧。
追加調整：文字を少し拡大し、名義横に提供SVGロゴを配置。ホームはステイトメント・連絡先とし、分類ナビゲーションからジャンル別の作品一覧へ進みます。本文・公開用連絡先は未提供のため「掲載準備中」です。
初版のローカル動作はユーザー確認済み。第2稿はコード・生成DOMの確認を実施し、ブラウザ実画面の確認は未実施です。
公開方式とドメインは未決定です。

## 手元で開く（Windows）

### Gitで取得済みの場合

portfolioフォルダーでターミナルを開き、次を順に実行します。

```sh
git status
git switch site-v1
git pull --ff-only origin site-v1
```

未コミットの変更がある場合は、破棄せず先に保存してください。切り替えや更新が競合で停止した場合も、強制上書きしないでください。
更新後はフォルダー内の **index.htmlをダブルクリック**するとブラウザで開けます。この構成はfile://でも動作します。

### Gitを使わず取得する場合

1. GitHubにログインし https://github.com/RyutoShima/portfolio/tree/site-v1 を開く。
2. ブランチが `site-v1` であることを確認し、Code → Download ZIP。
3. ZIPを展開し、展開先の `index.html` をダブルクリック。

### ローカルサーバーで開く場合

index.htmlがあるフォルダーで以下を実行します（Pythonが必要）。

```sh
py -m http.server 8000 --bind 127.0.0.1
```

ブラウザで http://127.0.0.1:8000/ を開きます。停止はターミナルで Ctrl+C。
macOS/Linuxでは `py` を `python3` に置き換えます。
外部公開はされません。古い表示が残る場合は Ctrl+F5 で再読み込みしてください。

## 構成と作品追加

ビルド不要のHTML/CSS/JavaScriptです。依存ライブラリのインストールは不要です。

- `index.html`：ステイトメント・連絡先。各sectionの「掲載準備中」を、本人提供の内容に差し替えます。
- `assets/brand/ryuto-shima-logo.svg`：名義の隣に表示する提供ロゴ。
- `genre.html?genre=sound-art`：サウンドアート・メディアアート一覧。
- `work.html?id=self-amplifier`：個別作品の例。
- `src/data.js`：ジャンル・作品情報。
- `src/styles.css`：見た目とレスポンシブ。
- `src/site.js`：ナビゲーションの現在位置。

作品追加は `src/data.js` の `works` に固有IDの項目を追加し、所属ジャンルの `works` 配列にも同じIDを追加します。作品名は `title`、所属ジャンルIDは `genre`、一覧の写真は `image` に指定します。写真ファイルは `assets/works/` に置きます。

必要な情報が提供された場合だけ、以下の任意項目を使用できます。

| キー | 内容 |
| --- | --- |
| metadata | 一覧と個別ページの小さな補助情報。未提供なら省略 |
| images | 個別ページの画像パス配列。省略時はimageを表示 |
| description | 説明文。空行で段落を分ける |
| externalUrl | 提供されたYouTubeリンク（現行表示はYouTube用） |

現在の作品情報・画像対応を推測で変更しないでください。ホーム本文はindex.htmlで編集します。公開用として指定されていないメールアドレスやSNSは掲載しません。共通ナビは3HTMLで揃えます。

## 作業前に読む文書

1. PROJECT_GUIDE.md：共通運用ルール。
2. PROJECT_BRIEF.md：最新仕様・素材対応。
3. CODEX_HANDOFF.md：実装状況・調整値・次の確認。
