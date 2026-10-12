# Codex引き継ぎ — Ryuto Shima Portfolio

更新: 2026-10-12 / Rev. 1.2

## 最初に読むもの

`PROJECT_GUIDE.md` → `PROJECT_BRIEF.md` → 本文書。最新のユーザー指示を優先する。
GitHub `RyutoShima/portfolio` を正本とし、作業ブランチは **site-v1のみ**。`main` の更新やマージは行わない。サイトはGitHub Pagesで公開済み、リポジトリはpublic。`site-v1` の変更は公開サイトへ反映される。

## 現状

- 初版のホーム → ジャンル → 個別作品の遷移、3作品の画像、Live SetのYouTubeリンクはユーザーのローカル環境で確認済み。
- 第2稿では左ナビゲーション、4〜5列のPC作品一覧、写真と本文の縦配置へ変更。追加調整で全体の文字を約10〜20%拡大し、提供SVGロゴを使用。最新調整では右上のロゴのみの表示とし、名義はホーム先頭へ移した。
- ホームはRyuto Shima → 提供写真 → Artist Biography → ステイトメント（掲載準備中）→ Awards → Presentation。連絡先は独立のContactページに移し、shima.ryuto.art@gmail.comをmailtoリンクで掲載。
- 本人が提供した445102.jpgを元にassets/home/home-photo.avif（300×300px）としてホーム先頭に配置。元のJPEGには変更を加えない。
- 左の階層ナビゲーションはHome / Upcoming Events / Works（7分類を字下げ表示）/ Contact。Upcoming Eventsは `upcoming.html` で表示、詳細未提供のため「掲載準備中」。Worksクリックでジャンル別に全作品一覧を表示する。作品枠20件をユーザー指定順に登録、Pluginのみ「掲載準備中」。
- HTML/CSS/通常のJavaScriptによる静的構成を継続。ビルド・パッケージのインストールは不要。
- 今回は指定ブラウザ確認機能が利用できず、ブラウザでの実画面確認は未実施。第2稿の見た目はローカルで確認・調整する。

## 維持する条件

- 名義：Ryuto Shima。背景 #000000、文字 #FFFFFF、補助情報 #AAAAAA。
- 日英フォントを分離。日本語は通常の字間、過度な太字にしない。
- 角丸、カード装飾、影、千鳥・masonry配置は使わない。
- 画像は色・縦横比を保持し、切り抜かない。写真枠は左上を揃える。
- 未提供の作品説明、制作年、プロフィール、展示歴などは作らない。
- 写真がないLive Setに架空のサムネイルや大きな空枠を作らない。
- 写真未登録の作品枠には4:3の領域と控えめな「画像未登録」を表示する。Pluginのみ項目未提供なので「掲載準備中」。
- ホーム → ジャンル → 個別作品の階層と既存URLを維持する。

## 素材対応

| 作品名 | 画像 |
| --- | --- |
| 自己増幅器 | assets/works/self-amplifier.jpg |
| 自己聴取回路 | assets/works/self-listening-circuit.jpg |
| NO NAME SOUND | assets/works/no-name-sound.jpg |

提供画像の2枚目 FP002565.JPG は使用しない。管理用英語ファイル名は正式作品名ではない。
Live Setは https://youtu.be/gomq4a4tauA 。正式タイトル・日時・会場は未提供。埋め込み・自動再生は追加しない。

## ファイル構成

- `index.html`：名義・ホーム画像・Artist Biography・ステイトメント・Awards・Presentation。Presentationは制作年とは限らない。
- `assets/brand/ryuto-shima-logo.svg`：ユーザー提供SVG。全ページ右上に表示。
- `assets/home/home-photo.avif`：本人提供のホーム写真をWeb向けに圧縮した画像。画像自体を加工する意図ではない。
- `works.html` / `src/works.js`：7ジャンルを縦にまとめた全作品一覧。
- `contact.html`：独立した連絡先ページ。
- `upcoming.html`：今後の出演・展示予定ページ。本人から詳細が提供されるまでプレースホルダーのみ。
- `genre.html` / `src/genre.js`：ジャンル別一覧、未掲載・不正URL表示。
- `src/work-grid.js`：共通の高密度作品グリッドと写真未登録表示。
- `work.html` / `src/work.js`：作品詳細、戻るリンク、画像・MP4の番号順切替ギャラリー（メイン＋正方形サムネイルの横スクロール、矢印／キー／スワイプ切替）、動画再生コントロール、既存の外部YouTubeリンク。
- `src/site.js`：全HTML共通の階層ナビゲーションを動的生成。個別作品では所属ジャンルを選択状態で表示。
- `src/styles.css`：共通レイアウト、レスポンシブ、日英フォント。
- `src/data.js`：作品・ジャンル・作品順の正本データ。7分類と旧`synth`を保持。写真のある既存3作品を除き新規枠はタイトル・カテゴリのみ。旧`live-set`直リンクはYouTube対応未確認のため維持。

## 第2稿の調整可能な値

- PCの左ナビ幅230px（761〜1099pxは210px）、本文との間隔40px（中間幅28px）。
- 本文16px、ナビ14px、PC作品名15px、補助13px。ホーム名義32〜44px（モバイル34px）、ホーム画像最大280px（モバイル260px）。右上ロゴ72×51px（モバイル64×45px）。Awards・Presentationは行間1.55、行間隔8px。
- 1100〜1439pxで4列、1440px以上で5列。761〜1099pxは3列。
- 760px以下はナビゲーションを上部へ。360〜760pxで2列、359px以下で1列。
- 一覧画像枠は全ジャンルで横4:3、contain・左上寄せ。01写真の実寸も全7作品が横4:3。
- 個別作品本文は最大1120px、写真は最大85svh。画像・動画リンク・文章を縦配置。

## 更新・確認

起動と作品追加の手順はREADMEを参照。共通ナビゲーションは src/site.js で維持する。
次回はPCと狭い幅の実画面、キーボード操作、Home/Works/ジャンル/各作品/Contactの遷移、画像、旧YouTubeリンクを確認する。
作品のない列を埋めるために架空の作品や情報を追加しない。

今回提供されたPresentationの「Initinal Conditions」と「Cell Automata Synthesizer」の2026/12は原文を保持。soil with(prototype)の日付は未提供なので表示しない。

## Sound Art/Media Artの全メディア反映（2026-10-12）

- 7作品に `src/data.js` の `image`（各フォルダ01）と `media`（ファイル番号順に画像・動画を混在）を設定。写真23枚＋MP4動画7本。
- マッピング：Light with MK1 → `Light with MK1`（01.png〜02.png）、自己増幅器 → `self-amplifier`（01.JPG〜05.mp4）、Light with MK2 → `light-with-mk2`（01.jpg〜05.jpg）、自己増幅器（再展示） → `self-amplifier-re`（01.jpg〜05.mp4）、自己聴取回路 → `self-listening-circuit`（01.jpg〜03.jpg/mp4）、soil with(prototype) → `soil-with`（01.jpg〜02.mp4）、NO NAME SOUND → `no-name-sound`（01.jpg〜08.jpg/mp4）。
- 各作品の01サムネイルの画像実寸はすべて横4:3。以前の「6枚が縦3:4」という記述はJPEGヘッダの縦横を逆に解釈した誤り。写真をトリミングせず4:3枠に表示。
- 動画はコントロールあり、プリロードはmetadata、オートプレイなし。MP4コーデックのブラウザ互換性は実ブラウザで要確認。
- `site-v1` のみ変更。既存の素材本体・旧ファイル・`main` は変更しない。

## サムネイル下の余白修正（2026-10-12）

- Sound Art/Media Artの7作品は実画像がすべて横4:3なのに、縦3:4のCSS枠を与えたため、一覧で写真からタイトルまで大きな余白が発生した。
- `src/styles.css` の `.work-media--portrait` を廃止し、`src/work-grid.js` の同クラス付与も削除。全作品で元の横4:3枠を使用。作品タイトルとの間隔は元々設定された9pxに戻る。

## 作品詳細ギャラリー変更（2026-10-12）

- 以前のメディア全件縦積みを、上段大表示1件＋下段84px四方（小画面66px）のサムネイル横スクロールに変更。メイン画像・動画はアスペクト比を保持し切り抜き禁止。サムネイルのみ正方形領域に切り抜き表示。
- サムネイルクリック・前後ボタン・左右キー・タッチスワイプで切替。動画のサムネイルはHTML5 videoのメタデータと0.1秒の時刻指定を利用し、再生アイコンを重ねる。動画がサムネイルに表示されない環境でもアイコンを使えるようにする。
- メイン動画はコントロールあり・自動再生なし。切替時は前の動画をpauseしDOMを置換。1メディア作品は切替UIを出さない。メディアのない作品は従来どおりプレースホルダー、外部リンクだけの作品も従来どおり。
- `src/data.js` の `media` と `images`、`image` の互換性を維持。画像・動画ファイルの移動、削除、書き換えなし。実ブラウザでの動作確認は未実施。

## 作品詳細の2カラム化とLight with Vol.1の説明（2026-10-12）

- `src/work.js` で作品名、メディアギャラリー、説明文を別のGrid領域として配置。PC：左画像＋下部サムネイル、右タイトル・日英本文。スマートフォン：タイトル→ギャラリー→本文。画像と動画の切替仕様は維持する。
- `src/data.js` の `light-with-mk1` にユーザーの日本語原文を `descriptionJa`、より自然に整えた英語訳を `descriptionEn` として登録。タイトルは本人提供の `音＿機構 Vol.1 「Light with」` に更新。既存の歴史・発表欄、MK2の名称はそのまま。
- CSSはPCで約54:46の2カラム、画像表示領域は横4:3でメイン画像全体表示、左側はデスクトップでsticky。サムネイル列は元のまま。本文の多い作品でもPCで右カラムの縦スクロールが可能。
- 従来の `description`、メディア無し、外部YouTubeリンクもサポート。既存画像やMP4には変更しない。

## Light with MK1 YouTube埋め込み（2026-10-12）

- `src/data.js` の `light-with-mk1.media` 配列末尾に提供された `https://www.youtube.com/watch?v=W2zCHxJaOSc` を追加。写真01、02、YouTubeの順で、01を作品一覧のサムネイルに維持。
- `src/work.js` はYouTube共有URLから11文字のIDを検証・抽出。画像/MP4と同じスライド内にプライバシー強化型埋め込みiframeを表示し、下段に動画サムネイルと再生アイコンを表示。別スライドへの切替時にiframeがDOMから破棄され再生が停止。URLは画像ファイルとして誤判定されないよう優先処理。
- `src/styles.css` にYouTubeプレイヤー16:9・枠なし指定。既存2カラムとレスポンシブ構成を維持。埋め込み禁止、地域制限、YouTube側エラーは公開ブラウザで確認する。
