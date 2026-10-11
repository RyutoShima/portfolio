# Ryuto Shima — Portfolio

作品の公開・記録を目的とするポートフォリオサイト。
GitHub `RyutoShima/portfolio` が正本。制作ブランチは **site-v1**。mainの変更・本番公開は行っていません。

## 現在の状態

2026-10-12：デザイン第2稿。黒背景・白文字、左ナビゲーション、PC4〜5列の画像一覧。
追加調整：上部右にSVGロゴ、ホーム先頭にRyuto Shimaと提供画像を配置。Artist Biographyの直後にステイトメント（本文未提供）、次にAwardsとPresentation。ナビゲーションはHome / Works（7ジャンル）/ Contactの階層構成です。全20の作品・項目を指定順で登録し、作品のないPluginのみ「掲載準備中」。
初版のローカル動作はユーザー確認済み。第2稿はコード・生成DOMの確認を実施し、ブラウザ実画面の確認は未実施です。
公開方式とドメインは未決定です。

## GitHub Pages公開（ユーザー側の設定待ち）

このサイトはビルド不要の静的HTML/CSS/JavaScriptです。公開時も `main` は変更せず、現時点で最新の実装を持つ `site-v1` のルートフォルダをGitHub Pagesの公開元として使用します。

1. GitHubの `RyutoShima/portfolio` → `Settings` → `Pages` を開く。
2. `Build and deployment` の `Source` を `Deploy from a branch` にする。
3. ブランチ `site-v1`、フォルダ `/(root)` を選び、`Save` を押す。
4. Actionsで初回デプロイを確認し、Pages設定内の `Visit site` から開く。一般的なプロジェクトURLは `https://ryutoshima.github.io/portfolio/` だが、実際の公開URLは設定画面で確認する。

注意：リポジトリは現在private。GitHub FreeでPagesを利用するにはpublicへの切替が必要（GitHub Pro等はprivateでも利用可能）。publicへの切替はGitHubリポジトリのソースコードも公開するため、ユーザーが自分で判断する。GitHub Pages自体は通常、privateリポジトリでも公開サイトとして閲覧可能。サイト公開後の `site-v1` への変更は原則として公開サイトに反映される。編集を公開前に確認する体制に変更する場合は、公開専用ブランチや `main` からのデプロイへ切り替える。

`.nojekyll` は静的ファイルを加工せずに配信するためのマーカーファイルです。README記載だけでは公開されません。Pages画面での設定・初回デプロイ成功の確認が必要です。

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

- `index.html`：名義・ホーム画像・Artist Biography・ステイトメント（掲載準備中）・Awards・Presentation。メールアドレスは掲載しません。
- `assets/home/home-photo.avif`：提供された445102.jpgをWeb向けに圧縮した画像（300×300px）。
- `assets/brand/ryuto-shima-logo.svg`：右上に単独表示する提供ロゴ。
- `works.html`：全ジャンルの作品一覧。`contact.html`：連絡先とmailtoリンク。
- `genre.html?genre=design`：Designの3項目。
- `genre.html?genre=sound-art`：サウンドアート・メディアアート一覧。
- `work.html?id=self-amplifier`：個別作品の例。
- `src/data.js`：ジャンル・作品情報。
- `src/styles.css`：見た目とレスポンシブ。
- `src/site.js`：全ページ共通の階層ナビゲーション生成と現在位置。
- `src/work-grid.js`：ジャンル一覧・Works一覧に共通するグリッド表示。
- `src/works.js`：全作品一覧。

作品追加は `src/data.js` の `works` に固有IDの項目を追加し、所属ジャンルの `works` 配列にも同じIDを追加します。作品名は `title`、所属ジャンルIDは `genre`、一覧の写真は `image` に指定します。写真ファイルは `assets/works/` に置きます。

必要な情報が提供された場合だけ、以下の任意項目を使用できます。

| キー | 内容 |
| --- | --- |
| metadata | 一覧と個別ページの小さな補助情報。未提供なら省略 |
| images | 個別ページの画像パス配列。省略時はimageを表示 |
| description | 説明文。空行で段落を分ける |
| externalUrl | 提供されたYouTubeリンク（現行表示はYouTube用） |

現在の作品情報・画像対応を推測で変更しないでください。ホーム本文はindex.htmlで編集します。公開用として指定されていないメールアドレスやSNSは掲載しません。共通ナビは `src/site.js` が生成します。項目・順序は `src/data.js` の `navigationGenres` と各ジャンルの `works` 配列で編集します。

写真未提供の項目では、装飾のない4:3の画像領域に「画像未登録」と表示します。新しいLive Set3件と、以前のYouTubeリンクとの対応は未確認です。従来の `work.html?id=live-set` に動画リンクを保持し、新しい3件へ推測で割り当てていません。「自己増幅器(再展示)」、およびSound ArtとDesignの同名作品は別IDで登録しています。

## 作業前に読む文書

1. PROJECT_GUIDE.md：共通運用ルール。
2. PROJECT_BRIEF.md：最新仕様・素材対応。
3. CODEX_HANDOFF.md：実装状況・調整値・次の確認。
