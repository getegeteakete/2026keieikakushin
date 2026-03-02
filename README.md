# 経営革新 AI アシスト — 東京・大阪・福岡対応

経営革新計画の申請をAIが徹底サポートするWebアプリケーション。

## 機能

- **AIヒアリング式 計画策定** — 10ステップで計画書ドラフトを自動生成
- **書類チェックリスト** — 地域別の必要書類＋記載例付き
- **申請タイムライン** — 逆算スケジュール管理
- **締切アラート** — 地域別の締切日をお知らせ
- **紹介アフィリエイト** — 紹介URL発行＋報酬管理
- **AIアドバイザー** — 新規性、数値目標、補助金連携を相談
- **地域専用ダッシュボード** — 登録地域に特化した申請サポート画面

## デモアカウント

| 種別 | メール | パスワード |
|------|--------|-----------|
| 管理者 | admin@keikaku.jp | admin123 |
| 会員 | demo@example.com | demo123 |

## Vercelデプロイ手順

### 1. GitHubリポジトリ作成 & プッシュ

```bash
cd keikaku-app
git init
git add .
git commit -m "Initial commit: 経営革新AI アシスト v2"
git remote add origin https://github.com/YOUR_USERNAME/keikaku-ai-assist.git
git branch -M main
git push -u origin main
```

### 2. Vercelでデプロイ

1. [vercel.com](https://vercel.com) にログイン
2. "New Project" → GitHubリポジトリを選択
3. Framework: **Vite** を自動検出
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. "Deploy" をクリック

### 3. カスタムドメイン（任意）

Vercel Dashboard → Settings → Domains でカスタムドメインを設定可能

## 技術スタック

- React 18 + Vite 5
- Anthropic Claude API（AI機能）
- BASE外部決済連携
- Vercel Hosting

## 環境変数（全機能を有効にする場合）

`env.example` をコピーして `.env` を作成し、取得したキーを設定してください。

| 変数 | 用途 |
|------|------|
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Supabase（認証・DB）。未設定の場合はメモリ内のダミーデータで動作 |
| `ANTHROPIC_API_KEY` | AI（Claude）チャット・申請書類生成。未設定だとAI機能でエラー |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` | メール送信（Resend）。登録時のテスト・自動送信用。未設定でも登録は可能 |

- **Supabase**: [supabase.com](https://supabase.com) でプロジェクト作成後、Dashboard → Settings → API で URL と anon key を取得。`supabase-schema.sql` を SQL Editor で実行してテーブルを作成してください。
- **Resend**: [resend.com](https://resend.com) でAPIキー取得。テスト送信は `onboarding@resend.dev` のまま利用可。
- **Anthropic**: [console.anthropic.com](https://console.anthropic.com) でAPIキーを取得。

## ローカル開発

```bash
npm install
npm run dev
```

- `npm run dev` で **Vite（フロント）** と **API サーバー（AI・メール）** が同時に起動します。
- ブラウザは http://localhost:5173 または表示されたポートでアクセス。`/api/chat` と `/api/send-email` は Vite のプロキシで `server.js` に転送されます。
- 本番（Vercel）では `api/chat.js` と `api/send-email.js` がサーバーレス関数として動きます。Vercel の Environment Variables に上記キーを設定してください。
