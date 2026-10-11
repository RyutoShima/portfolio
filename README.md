# Ryuto Shima — Portfolio

作品の公開・記録を目的とするポートフォリオサイト。
GitHub `RyutoShima/portfolio` が正本。制作・GitHub Pages公開ブランチは **site-v1**。mainは変更していません。`site-v1` の更新は公開サイトに反映されます。

## 現在の状態

2026-10-12：デザイン第2稿。黒背景・白文字、左ナビゲーション、PC4〜5列の画像一覧。
追加調整：上部右にSVGロゴ、ホーム先頭にRyuto Shimaと提供画像を配置。Artist Biographyの直後にステイトメント（本文未提供）、次にAwardsとPresentation。ナビゲーションはHome / Upcoming Events / Works（7ジャンル）/ Contactの階層構成です。Upcoming Eventsは予定未登録のため「掲載準備中」です。全20の作品・項目を指定順で登録し、作品のないPluginのみ「掲載準備中」。
初版のローカル動作はユーザー確認済み。第2稿はコード・生成DOMの確認を実施し、ブラウザ実画面の確認は未実施です。
GitHub Pagesにて https://ryutoshima.github.io/portfolio/ を公開済み（本人が表示確認）。公開元は `site-v1` の `/(root)` です。

## GitHub Pages公開（設定済み）

このサイトはビルド不要の静的HTML/CSS/JavaScriptです。公開時も `main` は変更せず、現時点で最新の実装を持つ `site-v1` のルートフォルダをGitHub Pagesの公開元として使用します。

1. GitHubの `RyutoShima/portfolio` → `Settings` → `Pages` を開く。
2. `Build and deployment` の `Source` を `Deploy from a branch` にする。
3. ブランチ `site-v1`、フォルダ `/(root)` を選び、`Save` を押す。
4. Actionsで初回デプロイを確認し、Pages設定内の `Visit site` から開く。一般的なプロジェクトURLは `https://ryutoshima.github.io/portfolio/` だが、実際の公開URLは設定画面で確認する。

リポジトリはpublicへ変更されており、Pagesは `site-v1` / `(root)` から公開済みです。`site-v1` に変更を反映すると公開サイトにも自動的に反映されます。公開前に別途レビューする運用にしたい場合は、公開専用ブランチ等への切替を検討してください。

`.nojekyll` は静的ファイルを加工せずに配信するためのマーカーファイルです。GitHub Pagesの公開サイトはユーザーが表示確認済みです。

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
- `upcoming.html`：今後の出演・展示予定（内容未提供のため掲載準備中）。
- `works.html`：全ジャンルの作品一覧。`contact.html`：連絡先とmailtoリンク。
- `genre.html?genre=design`：Designの3項目。
- `genre.html?genre=sound-art`：サウンドアート・メディアアート一覧。
- `work.html?id=self-amplifier`：メイン画像＋下段サムネイル型ギャラリーの個別作品例。
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
| images | 旧形式：個別ページの画像パス配列。mediaがあればmediaを優先 |
| media | 個別ページに番号順で表示する画像・動画のパス配列。省略時はimagesまたはimageを使用 |
| description | 説明文。空行で段落を分ける |
| externalUrl | 提供されたYouTubeリンク（現行表示はYouTube用） |

現在の作品情報・画像対応を推測で変更しないでください。ホーム本文はindex.htmlで編集します。公開用として指定されていないメールアドレスやSNSは掲載しません。共通ナビは `src/site.js` が生成します。項目・順序は `src/data.js` の `navigationGenres` と各ジャンルの `works` 配列で編集します。

写真未提供の項目では、装飾のない画像領域に「画像未登録」と表示します。サムネイル枠は全ジャンルで横4:3です。新しいLive Set3件と、以前のYouTubeリンクとの対応は未確認です。従来の `work.html?id=live-set` に動画リンクを保持し、新しい3件へ推測で割り当てていません。「自己増幅器(再展示)」、およびSound ArtとDesignの同名作品は別IDで登録しています。

## Sound Art/Media Artのメディア登録（2026-10-12）

- 7作品の `01` を一覧とWorks内のサムネイルに指定。`src/data.js` の `image` が一覧用、`media` が詳細ページに表示する写真・動画の番号順配列。
- 詳細ページの `src/work.js` は `media` 配列の画像・動画を1件ずつ大きく表示するギャラリー方式。下に正方形のサムネイルを横スクロール表示し、クリック、前後ボタン、左右キー、メイン領域のタッチスワイプで切替。動画は切替後に操作して再生（自動再生なし）。選択を変えると前の動画を停止する。従来の `images` / `image` とYouTubeリンクも維持。
- 作品ごとのフォルダは `assets/works/Light with MK1/`、`light-with-mk2/`、`self-amplifier/`、`self-amplifier-re/`、`self-listening-circuit/`、`soil-with/`、`no-name-sound/`。ファイル名の大小文字に注意。サムネイルはすべて各フォルダ内の01を使用する。
- Sound Art/Media Artの01画像は7作品とも横4:3（JPEG/PNGヘッダ実寸を再確認済み）。一覧枠も横4:3に統一し、写真とタイトルの間に不必要な空白が生じないようにする。`object-fit: contain` でトリミングしない。以前の「6作品は縦3:4」という記載はJPEG寸法の読み取り時に縦横を取り違えた誤り。
- 旧単体画像 `assets/works/self-amplifier.jpg` などは削除せず残す。新しく作品フォルダへ画像や動画を追加した際は `src/data.js` の `media` 配列も更新する。ファイルの存在だけでは自動掲載されない。

## 作業前に読む文書

1. PROJECT_GUIDE.md：共通運用ルール。
2. PROJECT_BRIEF.md：最新仕様・素材対応。
3. CODEX_HANDOFF.md：実装状況・調整値・次の確認。
