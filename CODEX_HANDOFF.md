# Codex引き継ぎ — Ryuto Shima Portfolio

更新: 2026-10-12 / Rev. 0.5

## 最初に読むもの

`PROJECT_GUIDE.md` → `PROJECT_BRIEF.md` → 本文書。最新のユーザー指示を優先する。
GitHub `RyutoShima/portfolio` を正本とし、作業ブランチは **site-v1のみ**。mainの更新、マージ、本番公開、リポジトリの公開化は行わない。

## 現状

- 初版のホーム → ジャンル → 個別作品の遷移、3作品の画像、Live SetのYouTubeリンクはユーザーのローカル環境で確認済み。
- 第2稿では左ナビゲーション、4〜5列のPC作品一覧、写真と本文の縦配置へ変更。追加調整で全体の文字を約10〜20%拡大し、提供SVGロゴを使用。最新調整では右上のロゴのみの表示とし、名義はホーム先頭へ移した。
- ホームはRyuto Shima → 提供写真 → Artist Biography → Awards → Presentation → ステイトメント → 連絡先。ユーザー提供のBiography本文・受賞1件・発表14件を掲載。ステイトメントは未提供のため「掲載準備中」。連絡先は shima.ryuto.art@gmail.com をmailtoリンクで掲載。
- 本人が提供した445102.jpgを元にassets/home/home-photo.avif（300×300px）としてホーム先頭に配置。元のJPEGには変更を加えない。
- 左の分類ナビゲーションは7分類。Sound Art/Media Art、Music、Live Set、Instrument(Digital)、Instrument(Analog)、Plugin、Design の順。未提供作品の分類は「掲載準備中」。
- HTML/CSS/通常のJavaScriptによる静的構成を継続。ビルド・パッケージのインストールは不要。
- 今回は指定ブラウザ確認機能が利用できず、ブラウザでの実画面確認は未実施。第2稿の見た目はローカルで確認・調整する。

## 維持する条件

- 名義：Ryuto Shima。背景 #000000、文字 #FFFFFF、補助情報 #AAAAAA。
- 日英フォントを分離。日本語は通常の字間、過度な太字にしない。
- 角丸、カード装飾、影、千鳥・masonry配置は使わない。
- 画像は色・縦横比を保持し、切り抜かない。写真枠は左上を揃える。
- 未提供の作品説明、制作年、プロフィール、展示歴などは作らない。
- 写真がないLive Setに架空のサムネイルや大きな空枠を作らない。
- Music、Instrument(Digital)、Instrument(Analog)、Plugin、Designは「掲載準備中」を継続。
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

- `index.html`：名義・ホーム画像・Artist Biography・Awards・Presentation・ステイトメント・公開メールアドレス。経歴はユーザー提供の表記・日付・提示順を保持。Presentationは制作年とは限らない。独立したステイトメントは受領後に追加する。
- `assets/brand/ryuto-shima-logo.svg`：ユーザー提供SVGをそのまま保存。3HTMLの右上に単独表示。PNGは比較用に確認したが、サイト表示にはSVGを採用。
- `assets/home/home-photo.avif`：本人提供のホーム写真をWeb向けに圧縮した画像。画像自体を加工する意図ではない。
- `genre.html` / `src/genre.js`：ジャンル別一覧、未掲載・不正URL表示。
- `work.html` / `src/work.js`：作品詳細、戻るリンク、動画への外部リンク。
- `src/site.js`：ナビゲーションの現在位置。個別作品では所属ジャンルを表示。
- `src/styles.css`：共通レイアウト、レスポンシブ、日英フォント。
- `src/data.js`：作品とジャンルの正本データ。7分類と互換URL用の非表示`synth`定義を持つ。作品の内容は変更していない。

## 第2稿の調整可能な値

- PCの左ナビ幅230px（761〜1099pxは210px）、本文との間隔40px（中間幅28px）。
- 本文16px、ナビ14px、PC作品名15px、補助13px。ホーム名義32〜44px（モバイル34px）、ホーム画像最大280px（モバイル260px）。右上ロゴ72×51px（モバイル64×45px）。Awards・Presentationは行間1.55、行間隔8px。
- 1100〜1439pxで4列、1440px以上で5列。761〜1099pxは3列。
- 760px以下はナビゲーションを上部へ。360〜760pxで2列、359px以下で1列。
- 一覧の画像枠は4:3でcontain・左上寄せ。画像全体を表示するため下や右に余白が生じる場合がある。
- 個別作品本文は最大1120px、写真は最大85svh。画像・動画リンク・文章を縦配置。

## 更新・確認

起動と作品追加の手順はREADMEを参照。3HTMLの共通ナビゲーションは同じ内容で維持する。
次回はPCと狭い幅の実画面、キーボード操作、ホームと各ジャンル・個別作品の遷移、画像、YouTubeリンクを確認する。
作品のない列を埋めるために架空の作品や情報を追加しない。

今回提供されたPresentationの「Initinal Conditions」と「Cell Automata Synthesizer」の2026/12は原文を保持。soil with(prototype)の日付は未提供なので表示しない。
