# Vercel 環境変数 — 設定一覧

Vercel の **Project → Settings → Environment Variables** で、以下をすべて追加してください。

---

## 必須（動かす機能に応じて）

| 変数名 | 値の例・取得元 | 備考 |
|--------|----------------|------|
| **VITE_SUPABASE_URL** | `https://xxxxx.supabase.co` | Supabase ダッシュボード → Settings → API → Project URL |
| **VITE_SUPABASE_ANON_KEY** | `eyJhbGci...`（長いJWT） | 同上 → Project API keys の **anon public** |
| **ANTHROPIC_API_KEY** | `sk-ant-api03-...` | [console.anthropic.com](https://console.anthropic.com) で API キー作成 |
| **RESEND_API_KEY** | `re_xxxxx` | [resend.com](https://resend.com) → API Keys で作成 |
| **RESEND_FROM_EMAIL** | `onboarding@resend.dev` | テスト送信はこのまま。本番は認証ドメインのアドレス（例: `noreply@yourdomain.com`） |

---

## 入力手順（Vercel）

1. **Vercel** にログイン → 対象プロジェクトを開く
2. 上部 **Settings** → 左メニュー **Environment Variables**
3. **Key** に変数名、**Value** に取得した値を入力
4. **Environment** は **Production**（と必要なら Preview）にチェック
5. **Save** をクリック
6. 上記 5 つを繰り返して登録

---

## コピペ用（Key のみ）

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
ANTHROPIC_API_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
```

※ **Value** は Supabase / Anthropic / Resend の各サイトで取得した**実際のキー**を貼り付けてください。  
※ 設定後、**Deployments** から「Redeploy」すると新しい環境変数が反映されます。
