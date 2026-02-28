import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   SVG LINE ICONS
   ═══════════════════════════════════════════════════════════ */
const I = {
  clipboard: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
  coins: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1113.63 5.91"/><path d="M7 6h2v4"/></svg>,
  chart: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  folder: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,
  check: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  clock: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  send: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  search: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  user: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  users: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  star: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  doc: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  brain: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 015 5c0 1.5-.7 2.8-1.7 3.7L12 14l-3.3-3.3A5 5 0 1112 2z"/><path d="M12 14v8"/><path d="M8 18h8"/></svg>,
  arrow: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  chevR: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  back: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  lock: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  logout: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  cal: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  info: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  home: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  gear: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  ext: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  target: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  list: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  phone: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
  plus: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  bell: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  mail: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  link: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
  gift: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>,
  copy: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
  warn: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  dl: (s=20,c="currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
};

/* ═══════════════════════════════════════════════════════════
   REGION DATA
   ═══════════════════════════════════════════════════════════ */
const REGIONS = {
  tokyo: {
    name: "東京都", short: "東京", color: "#0f3d5c", accent: "#c5960c", bg: "#e8f0f6",
    schedule: [
      { label: "事前相談予約", timing: "審査会 前月10日〜", note: "電話で予約・PW取得" },
      { label: "面談・書類修正", timing: "随時", note: "代表者 or 登記役員のみ" },
      { label: "申請書提出", timing: "審査会の前月中", note: "正本2部＋添付書類" },
      { label: "審査会", timing: "毎月20日前後", note: "月1回開催", hl: true },
      { label: "承認通知", timing: "審査会後〜2週間", note: "" },
    ],
    deadlines: [
      { date: "2026-04-10", label: "5月審査会向け 相談予約開始", type: "info" },
      { date: "2026-04-18", label: "4月審査会（20日前後）", type: "deadline" },
      { date: "2026-05-08", label: "6月審査会向け 相談予約開始", type: "info" },
      { date: "2026-05-20", label: "5月審査会", type: "deadline" },
      { date: "2026-06-20", label: "6月審査会", type: "deadline" },
    ],
    docs: [
      { name: "承認申請書（様式第1）", detail: "正本2部・代表者印押印済", req: true, example: "【記載例】\n1. 事業者の概要：事業者名、所在地、代表者名、資本金、従業員数\n2. 経営革新の内容：新事業活動の具体的な内容\n3. 計画の目標：付加価値額・給与支給総額の数値目標\n※東京都HPから様式をダウンロードし、記載要領(2.8MB)を必ず確認" },
      { name: "直近2期分の確定申告書一式", detail: "電子申告→メール詳細添付", req: true, example: "【準備のポイント】\n・法人税申告書（別表一〜十六）の写し\n・決算報告書（BS/PL/株主資本等変動計算書）\n・勘定科目内訳明細書\n・電子申告の場合は「メール詳細」のコピーを必ず添付\n・税務署の受付印があるもの（e-Taxの場合は受信通知）" },
      { name: "商業登記簿謄本", detail: "発行から3ヶ月以内", req: true, example: "【取得方法】\n・法務局の窓口で取得（手数料600円）\n・登記情報提供サービス（オンライン）で取得可\n・発行日から3ヶ月以内のものが必要\n※「履歴事項全部証明書」を取得してください" },
      { name: "定款（原本証明付）", detail: "代表者印を押印した写し", req: true, example: "【原本証明の方法】\n定款の写しの末尾に以下を記載し、代表者印を押印：\n「この写しは原本と相違ありません。\n 令和○年○月○日\n 株式会社○○ 代表取締役 ○○○○（印）」" },
      { name: "会社案内・製品パンフレット", detail: "事業内容がわかる資料", req: false, example: "【推奨内容】\n・事業内容の概要がわかるもの\n・主要製品・サービスの紹介\n・取引先や実績の一覧\n・なければA4で1枚の会社概要でも可" },
      { name: "市場調査結果等の補足資料", detail: "新規性の根拠となる資料", req: false, example: "【効果的な資料例】\n・業界レポートや市場規模データ\n・競合他社との比較表\n・顧客アンケートや引き合い実績\n・展示会出展時のアンケート結果\n・特許や商標の取得資料" },
    ],
    subsidies: [
      { name: "躍進的な事業推進のための設備投資支援事業", amount: "最大2億円", rate: "1/2〜2/3" },
      { name: "経営力強化 創意工夫チャレンジ促進事業", amount: "最大1,000万円", rate: "2/3〜4/5" },
      { name: "事業環境変化対応 経営基盤強化事業", amount: "800万円", rate: "2/3" },
      { name: "DX推進トータルサポート事業", amount: "予算31億円規模", rate: "—" },
    ],
    phone: "03-5320-4795",
  },
  osaka: {
    name: "大阪府", short: "大阪", color: "#6e1b1b", accent: "#d4840a", bg: "#f8eded",
    schedule: [
      { label: "経営革新Gへ相談", timing: "随時", note: "来庁は予約制" },
      { label: "ドラフト送付", timing: "随時", note: "4MB未満でメール" },
      { label: "初回ヒアリング", timing: "ドラフト後", note: "原則オンライン(Teams)" },
      { label: "現地ヒアリング", timing: "初回後", note: "事業所にて実施" },
      { label: "正式申請受付", timing: "補正完了後", note: "" },
      { label: "審査会→承認", timing: "受付〜2-3ヶ月", note: "知事決定", hl: true },
    ],
    deadlines: [
      { date: "2026-04-01", label: "R8年度ドラフト受付開始", type: "info" },
      { date: "2026-06-30", label: "テイクオフ支援事業 申請期限目安", type: "deadline" },
      { date: "2026-09-30", label: "吹田市ブーストアップ補助金 締切", type: "deadline" },
    ],
    docs: [
      { name: "承認申請書（様式指定）", detail: "2部提出", req: true, example: "【記載例】\n・大阪府HPから指定様式をダウンロード\n・新事業活動の内容を具体的に記載\n・計画期間は3〜5年で設定\n・数値目標は付加価値額と給与支給総額の両方を記載" },
      { name: "定款（写し）", detail: "", req: true, example: "【注意】\n・最新の定款の写しを提出\n・目的欄に新事業に関連する記載があるか確認\n・なければ事前に定款変更を検討" },
      { name: "直近2期分の確定申告書一式", detail: "税務申告済", req: true, example: "【東京と同じ準備内容に加えて】\n・法人事業概況説明書も添付推奨\n・売上・利益の推移が分かるように整理" },
      { name: "合計残高試算表", detail: "前期決算日〜直近 ※大阪府独自", req: true, example: "【大阪府独自の要求書類】\n・前期の決算日から直近月までの試算表\n・顧問税理士に依頼して作成\n・現在の経営状況が計画のスタート地点として妥当かを確認するための資料\n※この書類は他県では不要だが大阪では必須" },
      { name: "会社概要パンフレット", detail: "", req: false, example: "【準備のポイント】\n・事業内容、沿革、取引先等がわかるもの\n・HPがあればURL記載でも可" },
      { name: "経営革新計画の補足資料", detail: "企画書類等", req: false, example: "【効果的な資料】\n・新事業の企画書・事業計画書\n・技術的な裏付け資料\n・顧客からの受注見込み書" },
    ],
    subsidies: [
      { name: "新事業展開テイクオフ支援事業", amount: "600者採択", rate: "伴走支援＋補助金" },
      { name: "大阪府 制度融資（経営革新枠）", amount: "優遇枠", rate: "低利融資" },
      { name: "大阪市 AI導入・活用補助金", amount: "—", rate: "—" },
    ],
    phone: "06-6210-9494",
  },
  fukuoka: {
    name: "福岡県", short: "福岡", color: "#145a32", accent: "#c0392b", bg: "#e9f5ee",
    schedule: [
      { label: "商工会議所へ相談", timing: "随時", note: "経営指導員に相談" },
      { label: "策定指導員と面談", timing: "1〜2回", note: "計画書ブラッシュアップ" },
      { label: "申請書類 郵送", timing: "毎月〜25日", note: "振興事務所へ郵送", hl: true },
      { label: "Excelデータ送付", timing: "郵送と同時", note: "指導員へメール" },
      { label: "承認決定", timing: "翌月", note: "26日以降→翌々月" },
    ],
    deadlines: [
      { date: "2026-03-25", label: "3月申請締切（25日厳守）", type: "deadline" },
      { date: "2026-04-25", label: "4月申請締切（25日厳守）", type: "deadline" },
      { date: "2026-05-25", label: "5月申請締切（25日厳守）", type: "deadline" },
      { date: "2026-06-25", label: "6月申請締切（25日厳守）", type: "deadline" },
      { date: "2026-07-01", label: "賃上げ緊急支援補助金 対象開始", type: "info" },
    ],
    docs: [
      { name: "様式第1号 承認申請書", detail: "支援機関・策定指導員を記載", req: true, example: "【記載のポイント】\n・支援機関名（商工会議所等）と策定指導員名を必ず記入\n・新事業活動の4類型のどれに該当するか明記\n・福岡県HPから最新様式をダウンロード" },
      { name: "別表1 経営革新計画", detail: "新事業活動の内容", req: true, example: "【記載例】\n・新事業の具体的な内容（5W1Hで整理）\n・新規性：同業他社・自社の従来との違いを明確に\n・ターゲット市場と差別化ポイント\n・比較表（Before/After）を必ず含める" },
      { name: "別表2 実施計画と実績", detail: "補助金申請予定経費も記載", req: true, example: "【記載例】\n1年目：設備導入・試作品開発\n2年目：本格販売開始・販路開拓\n3年目：売上安定化・次期展開\n※各年度の具体的なアクション項目と予定経費を記載\n※補助金（ものづくり等）で申請予定の経費も明記" },
      { name: "別表3 経営計画及び資金計画", detail: "数値目標の根拠", req: true, example: "【数値目標の根拠記載例】\n・売上予測：既存顧客からの引き合い○件×単価○円＝○円\n・新規顧客：展示会アンケートから○件獲得見込み\n・付加価値額＝営業利益＋人件費＋減価償却費\n・3年で9%以上、4年で12%以上、5年で15%以上を設定" },
      { name: "別表4 設備投資計画", detail: "補助金予定経費含む", req: true, example: "【記載例】\n・導入予定機械装置名と見積額\n・導入時期と目的\n・ものづくり補助金等の活用予定を記載\n・自己資金・借入金の調達方法" },
      { name: "別表5 公表等について", detail: "公表の同意", req: true, example: "公表に同意するかどうかを記入。\n原則「同意する」を選択（承認企業一覧への掲載等）" },
      { name: "別表6 企業概要", detail: "", req: true, example: "【記載内容】\n・業種、主要製品・サービス\n・主要取引先、仕入先\n・従業員数の内訳\n・保有設備・技術の概要" },
      { name: "様式第7号 誓約書", detail: "代表者印必須", req: true, example: "暴力団等の反社会的勢力でないことの誓約書。\n代表者印を必ず押印。" },
      { name: "直近3期分の決算書", detail: "BS・PL・販管費内訳等", req: true, example: "【福岡県は3期分必要（他県は2期）】\n・貸借対照表（BS）\n・損益計算書（PL）\n・販売費及び一般管理費の内訳\n・製造原価報告書（製造業の場合）\n・株主資本等変動計算書" },
    ],
    subsidies: [
      { name: "中小企業経営革新・賃上げ緊急支援補助金", amount: "経費の一部", rate: "賃上げ30円/h以上" },
      { name: "経営革新計画伴走支援事業", amount: "無料", rate: "専門家派遣" },
      { name: "経営強化改善提案制度", amount: "無料", rate: "改善提案書作成" },
    ],
    phone: "092-643-3449",
  },
};

const CATS = [
  { id: "innovation", label: "経営革新申請", icon: "clipboard", color: "#0f3d5c" },
  { id: "subsidy", label: "補助金申請", icon: "coins", color: "#6e1b1b" },
  { id: "report", label: "実績報告", icon: "chart", color: "#145a32" },
  { id: "other", label: "その他申請", icon: "folder", color: "#5b2c6f" },
];

const TARGETS = [
  { p: "3年", v: "9%以上", s: "4.5%以上" },
  { p: "4年", v: "12%以上", s: "6%以上" },
  { p: "5年", v: "15%以上", s: "7.5%以上" },
];

const HEARING = [
  { id: "company", q: "会社名（屋号）と事業内容を教えてください。", ph: "例：株式会社サンプル／金属加工業" },
  { id: "region", q: "申請先の地域を選択してください。", type: "select", opts: ["東京都", "大阪府", "福岡県"] },
  { id: "existing", q: "現在の主力事業の概要を教えてください。", ph: "例：建設業向け金属部品OEM製造が売上80%" },
  { id: "newbiz", q: "新事業活動として検討している内容は？", ph: "例：自社ブランドのアウトドア用金属製品をEC販売" },
  { id: "type", q: "新事業活動の類型を選択してください。", type: "select", opts: ["新商品の開発又は生産", "新役務の開発又は提供", "新たな生産又は販売方式の導入", "新たな提供方式の導入等"] },
  { id: "novelty", q: "新規性がある理由は？", ph: "例：当地域では金属加工業者がBtoC向けEC販売を行った事例がない" },
  { id: "sales", q: "直近の年商と目標売上を教えてください。", ph: "例：現在8,000万円→3年後1億2,000万円" },
  { id: "employees", q: "従業員数と賃上げの予定は？", ph: "例：15名、2名採用予定、全社員3%引上げ" },
  { id: "investment", q: "設備投資・開発投資の予定は？", ph: "例：レーザー加工機2,000万円、ECサイト構築300万円" },
  { id: "concern", q: "不安な点や質問があれば教えてください。", ph: "例：数値目標の設定方法、補助金との連携" },
];

/* ═══════════════════════════════════════════════════════════
   STORAGE
   ═══════════════════════════════════════════════════════════ */
const initUsers = [
  { id: "admin1", email: "admin@keikaku.jp", pw: "admin123", name: "管理者", role: "admin", approved: true, region: null, affCode: "ADMIN001", referrals: 0, commission: 0, permissions: { innovation: true, subsidy: true, report: true, other: true }, alerts: [] },
  { id: "user1", email: "demo@example.com", pw: "demo123", name: "デモ企業", role: "member", approved: true, region: "tokyo", affCode: "DEMO0001", referrals: 3, commission: 4500, permissions: { innovation: true, subsidy: true, report: false, other: false }, alerts: [
    { id: 1, msg: "5月審査会向け 事前相談予約を開始してください（4/10頃）", type: "warn", date: "2026-03-28" },
    { id: 2, msg: "確定申告書一式（直近2期分）の準備は完了していますか？", type: "doc", date: "2026-03-25" },
  ]},
];

const V = { bg: "#f5f6f8", card: "#fff", border: "#e4e8ed", muted: "#7a8594", dark: "#1a1a2e", primary: "#0f3d5c", pLight: "#e8f0f6" };

/* ═══════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;900&family=Shippori+Mincho:wght@400;600;700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Noto Sans JP',sans-serif;background:#f5f6f8;color:#1a1a2e;-webkit-font-smoothing:antialiased}
::selection{background:#0f3d5c;color:#fff}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#c0c7d0;border-radius:3px}
@keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes sr{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.fu{animation:fu .5s ease-out both}.sr{animation:sr .4s ease-out both}
input:focus,textarea:focus,select:focus{border-color:#0f3d5c!important;box-shadow:0 0 0 3px rgba(15,61,92,.08)}
button{font-family:inherit}a{color:inherit;text-decoration:none}
`;

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("landing");
  const [users, setUsers] = useState(initUsers);
  const [pd, setPd] = useState(null);

  const nav = useCallback((p, d) => { setPage(p); setPd(d || null); window.scrollTo(0, 0); }, []);

  const login = (email, pw) => {
    const u = users.find(x => x.email === email && x.pw === pw);
    if (!u) return "メールアドレスまたはパスワードが間違っています";
    if (!u.approved) return "管理者の承認待ちです";
    setUser(u); nav(u.role === "admin" ? "admin" : "dashboard");
    return null;
  };

  const register = (email, pw, name, region, refCode) => {
    if (users.find(u => u.email === email)) return "このメールアドレスは登録済みです";
    const affCode = name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 4).toUpperCase().padEnd(4, "X") + String(users.length).padStart(4, "0");
    const newU = { id: Math.random().toString(36).substr(2, 8), email, pw, name, role: "member", approved: false, region, affCode, referrals: 0, commission: 0, permissions: { innovation: false, subsidy: false, report: false, other: false }, alerts: [] };
    setUsers(p => {
      const updated = [...p, newU];
      if (refCode) {
        const referrer = updated.find(u => u.affCode === refCode);
        if (referrer) {
          referrer.referrals = (referrer.referrals || 0) + 1;
          referrer.commission = (referrer.commission || 0) + 1500;
        }
      }
      return updated;
    });
    return null;
  };

  const updateUser = (id, upd) => {
    setUsers(p => p.map(u => u.id === id ? { ...u, ...upd } : u));
    if (user?.id === id) setUser(p => ({ ...p, ...upd }));
  };

  const lo = () => { setUser(null); nav("landing"); };
  const ctx = { user, nav, login, register, lo, users, updateUser, pd };
  const pages = { landing: Landing, login: Auth, register: Auth, dashboard: Dashboard, admin: Admin, info: Info, checklist: Checklist, wizard: Wizard, timeline: Timeline, chat: Chat, affiliate: Affiliate };
  const P = pages[page] || Landing;
  return (<><style>{CSS}</style><div style={{ minHeight: "100vh" }}><P {...ctx} mode={page === "register" ? "register" : "login"} /></div></>);
}

/* ═══════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════ */
function Header({ user: u, nav, lo, transparent: t, regionColor }) {
  const c = t ? "rgba(255,255,255,.85)" : V.muted;
  const btn = { background: "none", border: "none", padding: "7px 14px", fontSize: 13, fontWeight: 500, color: c, cursor: "pointer", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 };
  return (
    <header style={{ position: t ? "absolute" : "sticky", top: 0, left: 0, right: 0, zIndex: 100, background: t ? "transparent" : "rgba(255,255,255,.96)", backdropFilter: t ? "none" : "blur(16px)", borderBottom: t ? "none" : `1px solid ${V.border}`, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div onClick={() => nav("landing")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 7, background: `linear-gradient(135deg,${regionColor || "#0f3d5c"},${regionColor ? regionColor + "cc" : "#1a6fa0"})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14, fontFamily: "'Shippori Mincho',serif" }}>革</div>
        <span style={{ fontSize: 13, fontWeight: 700, color: t ? "#fff" : V.dark }}>経営革新 AI アシスト</span>
        {u?.region && !t && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: REGIONS[u.region]?.bg, color: REGIONS[u.region]?.color, fontWeight: 700 }}>{REGIONS[u.region]?.name}</span>}
      </div>
      <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button onClick={() => nav("info")} style={btn}>{I.info(14, c)} 情報</button>
        {u ? (<>
          <button onClick={() => nav(u.role === "admin" ? "admin" : "dashboard")} style={btn}>{I.home(14, c)} {u.role === "admin" ? "管理" : "TOP"}</button>
          <button onClick={lo} style={{ ...btn, color: t ? "rgba(255,255,255,.5)" : "#b0b8c1" }}>{I.logout(14)}</button>
        </>) : (<>
          <button onClick={() => nav("login")} style={{ ...btn, border: `1px solid ${t ? "rgba(255,255,255,.3)" : V.border}`, color: t ? "#fff" : V.primary, fontWeight: 600 }}>ログイン</button>
          <button onClick={() => nav("register")} style={{ background: "linear-gradient(135deg,#0f3d5c,#1a6fa0)", border: "none", padding: "7px 18px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", borderRadius: 6 }}>無料登録</button>
        </>)}
      </nav>
    </header>
  );
}

function BackBtn({ nav, user, label }) {
  return <button onClick={() => nav(user ? "dashboard" : "landing")} style={{ background: "none", border: "none", fontSize: 13, color: V.muted, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 18 }}>{I.back(14, V.muted)} {label || "戻る"}</button>;
}

/* ═══════════════════════════════════════════════════════════
   ARROW SCHEDULE
   ═══════════════════════════════════════════════════════════ */
function ArrowSched({ data }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: data.color }} />
        <span style={{ fontSize: 14, fontWeight: 700, color: data.color }}>{data.name}</span>
        <span style={{ fontSize: 11, color: V.muted, display: "flex", alignItems: "center", gap: 3 }}>{I.phone(12, V.muted)} {data.phone}</span>
      </div>
      <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
        {data.schedule.map((s, i) => {
          const last = i === data.schedule.length - 1;
          return (
            <div key={i} style={{ position: "relative", flex: "1 0 auto", minWidth: 130 }}>
              <svg viewBox="0 0 160 52" style={{ width: "100%", height: 52, display: "block" }} preserveAspectRatio="none">
                <path d={i === 0 ? "M4 4H140L156 26L140 48H4V4Z" : last ? "M0 4L16 26L0 48H140Q156 26 140 4Z" : "M0 4L16 26L0 48H140L156 26L140 4Z"} fill={s.hl ? data.color : `${data.color}10`} stroke={data.color} strokeWidth="1.5" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.hl ? "#fff" : data.color, textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
                <span style={{ fontSize: 9, color: s.hl ? "rgba(255,255,255,.8)" : V.muted, marginTop: 1, textAlign: "center" }}>{s.timing}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 0, paddingTop: 2 }}>
        {data.schedule.map((s, i) => <div key={i} style={{ flex: "1 0 auto", minWidth: 130, textAlign: "center" }}>{s.note && <span style={{ fontSize: 9, color: V.muted }}>{s.note}</span>}</div>)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LANDING
   ═══════════════════════════════════════════════════════════ */
function Landing({ user, nav, lo }) {
  return (
    <div>
      <Header user={user} nav={nav} lo={lo} transparent />
      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(155deg,#071a2c 0%,#0f3d5c 45%,#1a6fa0 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(255,255,255,.4) 59px,rgba(255,255,255,.4) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(255,255,255,.4) 59px,rgba(255,255,255,.4) 60px)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760, padding: "120px 28px 80px" }}>
          <div className="fu" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(197,150,12,.12)", border: "1px solid rgba(197,150,12,.25)", borderRadius: 100, padding: "4px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 11, color: "#c5960c", fontWeight: 600 }}>東京・大阪・福岡 対応</span>
          </div>
          <h1 className="fu" style={{ fontSize: "clamp(24px,4.5vw,44px)", fontWeight: 900, color: "#fff", lineHeight: 1.35, marginBottom: 18, animationDelay: ".08s" }}>
            経営革新計画の申請を<br /><span style={{ color: "#c5960c" }}>AI</span>が徹底サポート
          </h1>
          <p className="fu" style={{ fontSize: "clamp(12px,1.7vw,15px)", color: "rgba(255,255,255,.6)", lineHeight: 1.8, marginBottom: 36, animationDelay: ".16s", maxWidth: 540, margin: "0 auto 36px" }}>
            ヒアリング型AIが計画書を自動作成。書類チェックリスト、<br />タイムライン管理、補助金連携まで。紹介報酬制度あり。
          </p>
          <div className="fu" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animationDelay: ".24s" }}>
            <button onClick={() => nav("register")} style={{ background: "linear-gradient(135deg,#c5960c,#e8b90a)", border: "none", padding: "14px 36px", fontSize: 15, fontWeight: 700, color: "#1a1a2e", cursor: "pointer", borderRadius: 7, boxShadow: "0 4px 18px rgba(197,150,12,.25)" }}>無料で会員登録 {I.arrow(16, "#1a1a2e")}</button>
            <button onClick={() => nav("info")} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", padding: "14px 36px", fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer", borderRadius: 7 }}>情報を見る</button>
          </div>
        </div>
      </section>

      {/* SCHEDULE ARROWS */}
      <section style={{ padding: "70px 28px 50px", maxWidth: 1060, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Shippori Mincho','Noto Sans JP',serif", marginBottom: 6 }}>申請スケジュール</h2>
          <p style={{ color: V.muted, fontSize: 13 }}>各地域の申請フローと締切を一目で把握</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {Object.entries(REGIONS).map(([k, r]) => <ArrowSched key={k} data={r} />)}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#fff", padding: "70px 28px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Shippori Mincho','Noto Sans JP',serif", textAlign: "center", marginBottom: 40 }}>便利な申請サポート機能</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {[
              { icon: "brain", title: "AIヒアリング式 計画策定", desc: "10ステップの質問で計画書ドラフトを自動生成", pg: "wizard" },
              { icon: "list", title: "書類チェックリスト", desc: "地域別の必要書類＋記載例付きで準備を支援", pg: "checklist" },
              { icon: "cal", title: "申請タイムライン", desc: "逆算スケジュールで期限を可視化", pg: "timeline" },
              { icon: "search", title: "AIアドバイザー", desc: "新規性、数値目標、補助金連携を何でも相談", pg: "chat" },
              { icon: "bell", title: "締切アラート", desc: "メールで締切日・不足書類をお知らせ", pg: "register" },
              { icon: "gift", title: "紹介アフィリエイト", desc: "紹介URL発行で紹介報酬を獲得", pg: "register" },
            ].map((f, i) => (
              <div key={i} style={{ background: V.bg, borderRadius: 12, padding: "22px 20px", border: `1px solid ${V.border}`, cursor: "pointer", transition: "all .25s" }} onClick={() => nav(f.pg)} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,.05)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 9, background: V.pLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{I[f.icon](20, V.primary)}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: V.muted, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(155deg,#071a2c,#0f3d5c)", padding: "60px 28px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12 }}>経営革新計画の第一歩を踏み出しましょう</h2>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, marginBottom: 28 }}>登録は無料。地域を選んでスタート。</p>
        <button onClick={() => nav("register")} style={{ background: "linear-gradient(135deg,#c5960c,#e8b90a)", border: "none", padding: "14px 40px", fontSize: 15, fontWeight: 700, color: "#1a1a2e", cursor: "pointer", borderRadius: 7 }}>無料で会員登録</button>
      </section>
      <footer style={{ background: "#06111c", padding: "28px", textAlign: "center", color: "rgba(255,255,255,.3)", fontSize: 10 }}>© 2025 経営革新 AI アシスト　※承認や補助金採択を保証するものではありません</footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   AUTH — Login / Register with Region Selection + Referral Code
   ═══════════════════════════════════════════════════════════ */
function Auth({ mode, login: doLogin, register: doReg, nav }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [email, setEmail] = useState(""); const [pw, setPw] = useState(""); const [name, setName] = useState("");
  const [region, setRegion] = useState("tokyo"); const [refCode, setRefCode] = useState("");
  const [err, setErr] = useState(""); const [ok, setOk] = useState("");

  useEffect(() => { const p = new URLSearchParams(window.location.search); if (p.get("ref")) setRefCode(p.get("ref")); }, []);

  const submit = e => {
    e.preventDefault(); setErr(""); setOk("");
    if (isLogin) { const r = doLogin(email, pw); if (r) setErr(r); }
    else {
      if (!name.trim()) return setErr("お名前を入力してください");
      if (pw.length < 6) return setErr("パスワードは6文字以上");
      const r = doReg(email, pw, name, region, refCode);
      if (r) setErr(r); else setOk("登録完了！管理者の承認をお待ちください。");
    }
  };

  const inp = { width: "100%", padding: "11px 13px", fontSize: 13, border: `1px solid ${V.border}`, borderRadius: 7, outline: "none", fontFamily: "inherit", background: "#fff", transition: "border .2s, box-shadow .2s" };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(155deg,${V.bg},#e0e4ea)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "36px 34px", width: "100%", maxWidth: 400, boxShadow: "0 6px 28px rgba(0,0,0,.05)" }}>
        <div onClick={() => nav("landing")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#0f3d5c,#1a6fa0)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 13, fontFamily: "'Shippori Mincho',serif" }}>革</div>
          <span style={{ fontSize: 13, fontWeight: 700 }}>経営革新 AI アシスト</span>
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 4 }}>{isLogin ? "ログイン" : "会員登録"}</h2>
        <p style={{ fontSize: 12, color: V.muted, marginBottom: 22 }}>{isLogin ? "アカウント情報を入力" : "地域を選んで無料登録"}</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {!isLogin && <>
            <div><label style={{ fontSize: 11, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" }}>お名前（企業名）</label><input value={name} onChange={e => setName(e.target.value)} placeholder="株式会社サンプル" style={inp} /></div>
            <div><label style={{ fontSize: 11, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" }}>申請地域</label>
              <div style={{ display: "flex", gap: 6 }}>
                {Object.entries(REGIONS).map(([k, r]) => (
                  <button key={k} type="button" onClick={() => setRegion(k)} style={{ flex: 1, padding: "9px 0", fontSize: 12, fontWeight: region === k ? 700 : 500, border: region === k ? "none" : `1px solid ${V.border}`, borderRadius: 6, cursor: "pointer", background: region === k ? r.color : "#fff", color: region === k ? "#fff" : V.muted }}>{r.short}</button>
                ))}
              </div>
            </div>
          </>}
          <div><label style={{ fontSize: 11, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" }}>メールアドレス</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@company.co.jp" style={inp} /></div>
          <div><label style={{ fontSize: 11, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" }}>パスワード</label><input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder={isLogin ? "パスワード" : "6文字以上"} style={inp} /></div>
          {!isLogin && <div><label style={{ fontSize: 11, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" }}>紹介コード（任意）</label><input value={refCode} onChange={e => setRefCode(e.target.value)} placeholder="紹介者のコード" style={inp} /></div>}
          {err && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: 9, fontSize: 12, color: "#dc2626" }}>{err}</div>}
          {ok && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, padding: 9, fontSize: 12, color: "#16a34a" }}>{ok}</div>}
          <button type="submit" style={{ background: "linear-gradient(135deg,#0f3d5c,#1a6fa0)", border: "none", padding: 12, fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer", borderRadius: 7, marginTop: 4 }}>{isLogin ? "ログイン" : "登録する"}</button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <button onClick={() => { setIsLogin(!isLogin); setErr(""); setOk(""); }} style={{ background: "none", border: "none", fontSize: 12, color: "#1a6fa0", cursor: "pointer" }}>{isLogin ? "新規登録はこちら" : "ログインはこちら"}</button>
        </div>
        {isLogin && <div style={{ marginTop: 16, padding: 12, background: V.bg, borderRadius: 6, fontSize: 11, color: V.muted }}><p style={{ fontWeight: 600, marginBottom: 2 }}>デモアカウント:</p><p>管理者: admin@keikaku.jp / admin123</p><p>会員: demo@example.com / demo123</p></div>}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD — Region-Specific Member TOP
   ═══════════════════════════════════════════════════════════ */
function Dashboard({ user: u, nav, lo }) {
  const r = REGIONS[u?.region] || REGIONS.tokyo;
  const [showDocDetail, setShowDocDetail] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} regionColor={r.color} />
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "24px 22px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>{r.name} 申請サポート</h1>
            <p style={{ fontSize: 12, color: V.muted }}>ようこそ、{u?.name}さん</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => nav("affiliate")} style={{ padding: "7px 14px", fontSize: 11, fontWeight: 600, border: `1px solid ${V.border}`, borderRadius: 6, cursor: "pointer", background: "#fff", display: "flex", alignItems: "center", gap: 4, color: "#d4840a" }}>{I.gift(13, "#d4840a")} 紹介報酬</button>
          </div>
        </div>

        {/* Deadline Alerts */}
        {(u?.alerts?.length > 0 || r.deadlines?.length > 0) && (
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 18, marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>{I.bell(15, "#d97706")} 締切アラート・お知らせ</h3>
            {u?.alerts?.map(a => (
              <div key={a.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 0", borderBottom: "1px solid #fef3c7" }}>
                {a.type === "warn" ? I.warn(13, "#d97706") : I.doc(13, "#2563eb")}
                <div><span style={{ fontSize: 12, fontWeight: 500 }}>{a.msg}</span><span style={{ fontSize: 10, color: V.muted, marginLeft: 8 }}>{a.date}</span></div>
              </div>
            ))}
            {r.deadlines?.filter(d => new Date(d.date) >= new Date()).slice(0, 3).map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 0" }}>
                {d.type === "deadline" ? I.warn(13, "#dc2626") : I.info(13, "#2563eb")}
                <div><span style={{ fontSize: 12, fontWeight: 500 }}>{d.label}</span><span style={{ fontSize: 10, color: V.muted, marginLeft: 8 }}>{d.date}</span></div>
              </div>
            ))}
            <div style={{ marginTop: 10 }}>
              <button style={{ fontSize: 11, color: "#d97706", fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>{I.mail(13, "#d97706")} メールアラートを設定する（※実装準備中）</button>
            </div>
          </div>
        )}

        {/* Region-specific schedule */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: `1px solid ${V.border}`, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: r.color, display: "flex", alignItems: "center", gap: 6 }}>{I.cal(16, r.color)} {r.name}の申請スケジュール</h3>
          <ArrowSched data={r} />
        </div>

        {/* 4 Function Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 20 }}>
          {CATS.map(cat => {
            const ok = u?.permissions?.[cat.id];
            return (
              <div key={cat.id} onClick={() => ok && nav("chat")} style={{ background: "#fff", borderRadius: 11, padding: "18px 16px", border: `1px solid ${V.border}`, opacity: ok ? 1 : .45, cursor: ok ? "pointer" : "not-allowed", transition: "all .2s", position: "relative" }} onMouseEnter={e => { if (ok) e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.05)"; }} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                {!ok && <div style={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center", gap: 2 }}>{I.lock(11, "#b0b8c1")}<span style={{ fontSize: 9, color: "#b0b8c1", fontWeight: 600 }}>未許可</span></div>}
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${cat.color}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>{I[cat.icon](18, cat.color)}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: cat.color, marginBottom: 3 }}>{cat.label}</h3>
                {ok && <span style={{ fontSize: 11, color: "#1a6fa0", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>開始 {I.chevR(12, "#1a6fa0")}</span>}
              </div>
            );
          })}
        </div>

        {/* Quick Tools */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 20 }}>
          {[
            { icon: "brain", label: "AI計画策定ウィザード", pg: "wizard" },
            { icon: "list", label: "書類チェックリスト", pg: "checklist" },
            { icon: "cal", label: "申請タイムライン", pg: "timeline" },
            { icon: "search", label: "AIアドバイザー", pg: "chat" },
          ].map((t, i) => (
            <button key={i} onClick={() => nav(t.pg)} style={{ background: "#fff", border: `1px solid ${V.border}`, borderRadius: 9, padding: "14px 16px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = r.color} onMouseLeave={e => e.currentTarget.style.borderColor = V.border}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I[t.icon](16, r.color)}</div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Region Documents with Examples */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 20, border: `1px solid ${V.border}`, marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: r.color, display: "flex", alignItems: "center", gap: 6 }}>{I.doc(16, r.color)} {r.name}の必要書類（記載例付き）</h3>
          {r.docs.map((doc, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${V.bg}`, padding: "10px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setShowDocDetail(showDocDetail === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {I.doc(14, r.color)}
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{doc.name}</span>
                  {doc.req && <span style={{ fontSize: 9, fontWeight: 700, color: "#dc2626", background: "#fef2f2", padding: "1px 5px", borderRadius: 3 }}>必須</span>}
                </div>
                <span style={{ fontSize: 10, color: "#1a6fa0", fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>記載例 {showDocDetail === i ? "▲" : "▼"}</span>
              </div>
              {doc.detail && <p style={{ fontSize: 11, color: V.muted, marginTop: 3, marginLeft: 22 }}>{doc.detail}</p>}
              {showDocDetail === i && doc.example && (
                <div className="fu" style={{ marginTop: 8, marginLeft: 22, padding: 14, background: r.bg, borderRadius: 8, border: `1px solid ${r.color}20`, fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-wrap", color: V.dark }}>
                  {doc.example}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ticket + Subsidy */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, border: `1px solid ${V.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>{I.coins(16, V.primary)} チケット購入</h3>
            <p style={{ fontSize: 12, color: V.muted, marginBottom: 12, lineHeight: 1.6 }}>AI機能のご利用にはチケットが必要です。</p>
            <button onClick={() => window.open("https://thebase.com", "_blank")} style={{ width: "100%", background: `linear-gradient(135deg,${r.color},${r.color}cc)`, border: "none", padding: 11, fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>BASEで購入 {I.ext(13, "#fff")}</button>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 18, border: `1px solid ${V.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6, color: r.color }}>{I.star(16, r.accent)} {r.name}の補助金</h3>
            {r.subsidies.slice(0, 2).map((s, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: `1px solid ${V.bg}` }}>
                <p style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</p>
                <p style={{ fontSize: 10, color: V.muted }}>{s.amount} / {s.rate}</p>
              </div>
            ))}
            <button onClick={() => nav("info")} style={{ fontSize: 11, color: r.color, fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginTop: 8, display: "flex", alignItems: "center", gap: 3 }}>もっと見る {I.chevR(12, r.color)}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ① AFFILIATE PAGE
   ═══════════════════════════════════════════════════════════ */
function Affiliate({ user: u, nav, lo }) {
  const [copied, setCopied] = useState(false);
  const r = REGIONS[u?.region] || REGIONS.tokyo;
  const affUrl = `${window.location.origin}?ref=${u?.affCode || "NONE"}`;

  const copyUrl = () => {
    navigator.clipboard?.writeText(affUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} regionColor={r.color} />
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 22px" }}>
        <BackBtn nav={nav} user={u} />
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>{I.gift(22, "#d4840a")} 紹介アフィリエイト</h1>
        <p style={{ fontSize: 13, color: V.muted, marginBottom: 24 }}>お知り合いを紹介して報酬を獲得しましょう</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "紹介人数", val: u?.referrals || 0, unit: "人", color: V.primary },
            { label: "累計報酬", val: `¥${(u?.commission || 0).toLocaleString()}`, unit: "", color: "#059669" },
            { label: "報酬単価", val: "¥1,500", unit: "/件", color: "#d4840a" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 11, padding: 18, border: `1px solid ${V.border}`, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: V.muted, marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.val}<span style={{ fontSize: 11, fontWeight: 500 }}>{s.unit}</span></p>
            </div>
          ))}
        </div>

        {/* Affiliate URL */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 22, border: `1px solid ${V.border}`, marginBottom: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>{I.link(16, V.primary)} あなたの紹介URL</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={affUrl} readOnly style={{ flex: 1, padding: "10px 12px", fontSize: 12, border: `1px solid ${V.border}`, borderRadius: 6, background: V.bg, fontFamily: "monospace", color: V.dark }} />
            <button onClick={copyUrl} style={{ padding: "10px 18px", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 6, cursor: "pointer", background: copied ? "#059669" : "linear-gradient(135deg,#0f3d5c,#1a6fa0)", color: "#fff", display: "flex", alignItems: "center", gap: 4, minWidth: 80, justifyContent: "center", transition: "background .3s" }}>
              {copied ? <>{I.check(14, "#fff")} コピー済</> : <>{I.copy(14, "#fff")} コピー</>}
            </button>
          </div>
          <p style={{ fontSize: 11, color: V.muted, marginTop: 8 }}>紹介コード: <strong>{u?.affCode}</strong> — このURLから登録された方がチケット購入すると報酬が発生します</p>
        </div>

        {/* How it works */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 22, border: `1px solid ${V.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>紹介の流れ</h3>
          {[
            { n: "01", t: "紹介URLを共有", d: "上記URLをお知り合いの経営者に共有してください" },
            { n: "02", t: "相手が会員登録", d: "紹介コード付きで登録されます（自動入力）" },
            { n: "03", t: "チケット購入で報酬確定", d: "紹介者がBASEでチケットを購入すると¥1,500の報酬が確定" },
            { n: "04", t: "報酬のお受け取り", d: "累計報酬は毎月末締め・翌月払いで指定口座にお振込み" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${V.bg}` : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: V.pLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color: V.primary, fontFamily: "monospace" }}>{s.n}</div>
              <div><p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.t}</p><p style={{ fontSize: 11, color: V.muted }}>{s.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHECKLIST — with examples
   ═══════════════════════════════════════════════════════════ */
function Checklist({ user: u, nav, lo }) {
  const defRegion = u?.region || "tokyo";
  const [region, setRegion] = useState(defRegion);
  const [checked, setChecked] = useState({});
  const [openEx, setOpenEx] = useState(null);
  const data = REGIONS[region];
  const toggle = i => setChecked(p => ({ ...p, [`${region}-${i}`]: !p[`${region}-${i}`] }));
  const done = data.docs.filter((_, i) => checked[`${region}-${i}`]).length;

  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} regionColor={data.color} />
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "24px 22px" }}>
        <BackBtn nav={nav} user={u} />
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>{I.list(20, V.primary)} 書類チェックリスト</h1>
        <p style={{ fontSize: 12, color: V.muted, marginBottom: 20 }}>チェックを付けながら準備。記載例も確認できます。</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {Object.entries(REGIONS).map(([k, r]) => <button key={k} onClick={() => { setRegion(k); setOpenEx(null); }} style={{ padding: "8px 18px", fontSize: 12, fontWeight: region === k ? 700 : 500, border: region === k ? "none" : `1px solid ${V.border}`, borderRadius: 6, cursor: "pointer", background: region === k ? r.color : "#fff", color: region === k ? "#fff" : V.muted }}>{r.name}</button>)}
        </div>
        <div style={{ background: "#e8ecf1", borderRadius: 3, height: 5, marginBottom: 16, overflow: "hidden" }}><div style={{ height: "100%", background: data.color, borderRadius: 3, width: `${(done / data.docs.length) * 100}%`, transition: "width .3s" }} /></div>
        <p style={{ fontSize: 11, color: V.muted, marginBottom: 16 }}>{done} / {data.docs.length} 準備完了</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {data.docs.map((doc, i) => {
            const c = checked[`${region}-${i}`];
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 9, border: `1px solid ${c ? `${data.color}40` : V.border}` }}>
                <div onClick={() => toggle(i)} style={{ padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: c ? "none" : `2px solid ${V.border}`, background: c ? data.color : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all .2s" }}>{c && I.check(13, "#fff")}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, textDecoration: c ? "line-through" : "none", color: c ? V.muted : V.dark }}>{doc.name}</span>
                      {doc.req && <span style={{ fontSize: 9, fontWeight: 700, color: "#dc2626", background: "#fef2f2", padding: "1px 5px", borderRadius: 3 }}>必須</span>}
                    </div>
                    {doc.detail && <p style={{ fontSize: 11, color: V.muted, marginTop: 2 }}>{doc.detail}</p>}
                  </div>
                </div>
                {doc.example && (
                  <>
                    <button onClick={() => setOpenEx(openEx === i ? null : i)} style={{ width: "100%", padding: "6px 16px 8px 48px", fontSize: 11, color: data.color, fontWeight: 600, background: "none", border: "none", borderTop: `1px solid ${V.bg}`, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 4 }}>{I.info(12, data.color)} {openEx === i ? "記載例を閉じる ▲" : "記載例・準備ポイントを見る ▼"}</button>
                    {openEx === i && <div className="fu" style={{ padding: "10px 16px 14px 48px", fontSize: 12, lineHeight: 1.8, whiteSpace: "pre-wrap", color: V.dark, background: data.bg, borderRadius: "0 0 9px 9px" }}>{doc.example}</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WIZARD, TIMELINE, INFO, CHAT, ADMIN
   (Same structure as v2 but with region-awareness)
   ═══════════════════════════════════════════════════════════ */
function Wizard({ user: u, nav, lo }) {
  const [step, setStep] = useState(0); const [ans, setAns] = useState({}); const [gen, setGen] = useState(false); const [result, setResult] = useState(null);
  const cur = HEARING[step]; const r = REGIONS[u?.region] || REGIONS.tokyo;
  const next = () => { if (step < HEARING.length - 1) setStep(s => s + 1); else generate(); };
  const generate = async () => {
    setGen(true);
    try {
      const prompt = `経営革新計画の専門コンサルタントとして、以下のヒアリング結果から計画書ドラフトを作成:\n${HEARING.map(h => `【${h.q}】\n${ans[h.id] || "未回答"}`).join("\n\n")}\n\n構成: 1.概要 2.新事業活動と新規性 3.数値目標案 4.スケジュール 5.リスクと対策 6.推奨補助金`;
      const resp = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
      const data = await resp.json();
      setResult(data.content?.map(c => c.text || "").join("\n") || "生成に失敗しました。");
    } catch { setResult("接続エラー。再度お試しください。"); }
    setGen(false);
  };
  const inp = { width: "100%", padding: "11px 13px", fontSize: 13, border: `1px solid ${V.border}`, borderRadius: 7, outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.7, transition: "border .2s, box-shadow .2s" };
  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} regionColor={r.color} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 22px" }}>
        <BackBtn nav={nav} user={u} />
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>{I.brain(20, r.color)} AI計画策定ウィザード</h1>
        <p style={{ fontSize: 12, color: V.muted, marginBottom: 24 }}>10ステップで計画書ドラフトを自動生成</p>
        {!result ? (<>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, background: "#e8ecf1", borderRadius: 3, height: 4, overflow: "hidden" }}><div style={{ height: "100%", background: r.color, borderRadius: 3, width: `${(step / HEARING.length) * 100}%`, transition: "width .3s" }} /></div>
            <span style={{ fontSize: 11, color: V.muted, fontWeight: 600 }}>{step + 1}/{HEARING.length}</span>
          </div>
          <div className="fu" key={step} style={{ background: "#fff", borderRadius: 12, padding: "22px 20px", border: `1px solid ${V.border}`, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: r.color }}>{step + 1}</div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{cur.q}</p>
            </div>
            {cur.type === "select" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {cur.opts.map(o => <button key={o} onClick={() => setAns(p => ({ ...p, [cur.id]: o }))} style={{ padding: "10px 14px", fontSize: 13, border: `1px solid ${ans[cur.id] === o ? r.color : V.border}`, borderRadius: 7, cursor: "pointer", background: ans[cur.id] === o ? r.bg : "#fff", color: ans[cur.id] === o ? r.color : V.dark, fontWeight: ans[cur.id] === o ? 600 : 400, textAlign: "left" }}>{o}</button>)}
              </div>
            ) : <textarea value={ans[cur.id] || ""} onChange={e => setAns(p => ({ ...p, [cur.id]: e.target.value }))} placeholder={cur.ph} rows={3} style={inp} />}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => step > 0 && setStep(s => s - 1)} disabled={step === 0} style={{ padding: "9px 18px", fontSize: 12, fontWeight: 600, border: `1px solid ${V.border}`, borderRadius: 6, cursor: step === 0 ? "not-allowed" : "pointer", background: "#fff", color: step === 0 ? "#c0c7d0" : V.dark }}>前へ</button>
            <button onClick={next} disabled={!ans[cur.id] || gen} style={{ padding: "9px 24px", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 6, cursor: "pointer", background: !ans[cur.id] ? "#c0c7d0" : `linear-gradient(135deg,${r.color},${r.color}cc)`, color: "#fff" }}>
              {gen ? <span style={{ animation: "pulse 1.2s infinite" }}>生成中...</span> : step < HEARING.length - 1 ? <>次へ {I.chevR(13, "#fff")}</> : <>計画書を生成</>}
            </button>
          </div>
        </>) : (
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 22, border: `1px solid ${V.border}`, marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>{I.doc(16, r.color)} 計画書ドラフト</h2>
              <div style={{ fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>{result}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setResult(null); setStep(0); setAns({}); }} style={{ padding: "9px 16px", fontSize: 12, border: `1px solid ${V.border}`, borderRadius: 6, cursor: "pointer", background: "#fff" }}>やり直す</button>
              <button onClick={() => nav("chat")} style={{ padding: "9px 16px", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 6, cursor: "pointer", background: `linear-gradient(135deg,${r.color},${r.color}cc)`, color: "#fff" }}>AIに相談 {I.chevR(12, "#fff")}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Timeline({ user: u, nav, lo }) {
  const defR = u?.region || "tokyo";
  const [region, setRegion] = useState(defR);
  const tl = {
    tokyo: [
      { m: "1ヶ月目", tasks: ["事業構想の整理・新規性の洗い出し", "窓口機関の選定"], st: "planning" },
      { m: "2ヶ月目", tasks: ["電話予約・初回相談", "申請書ドラフト作成", "既存/新事業の数値整理"], st: "drafting" },
      { m: "3ヶ月目", tasks: ["申請書修正・補足資料準備", "代表者面談", "添付書類収集"], st: "preparing" },
      { m: "4ヶ月目", tasks: ["正本2部提出", "審査会（毎月20日前後）", "承認結果通知"], st: "submitting", hl: true },
      { m: "5ヶ月目〜", tasks: ["補助金申請（加点活用）", "金融機関へ経営革新貸付相談"], st: "executing" },
    ],
    fukuoka: [
      { m: "1ヶ月目", tasks: ["商工会議所へ初回相談", "事業構想の整理"], st: "planning" },
      { m: "2ヶ月目", tasks: ["策定指導員との面談（1〜2回）", "計画書ブラッシュアップ"], st: "drafting" },
      { m: "3ヶ月目", tasks: ["振興事務所へ郵送（25日厳守）", "Excelデータをメール送付"], st: "submitting", hl: true },
      { m: "4ヶ月目", tasks: ["承認決定", "賃上げ緊急支援補助金の検討"], st: "approved" },
      { m: "5ヶ月目〜", tasks: ["伴走支援事業", "補助事業の実行"], st: "executing" },
    ],
    osaka: [
      { m: "1ヶ月目", tasks: ["経営革新Gへ事前相談", "ドラフト作成"], st: "planning" },
      { m: "2ヶ月目", tasks: ["ドラフトをメール送付", "初回ヒアリング（Teams）"], st: "drafting" },
      { m: "3ヶ月目", tasks: ["現地ヒアリング", "補正作業", "合計残高試算表準備"], st: "preparing" },
      { m: "4ヶ月目", tasks: ["補正完了→正式申請"], st: "submitting" },
      { m: "5-6ヶ月目", tasks: ["審査会→知事承認"], st: "approved", hl: true },
      { m: "7ヶ月目〜", tasks: ["もずやんマーク使用開始", "テイクオフ支援申請"], st: "executing" },
    ],
  };
  const sc = { planning: "#6b7280", drafting: "#2563eb", preparing: "#d97706", submitting: "#059669", approved: "#7c3aed", executing: "#0f3d5c" };
  const sl = { planning: "構想", drafting: "策定", preparing: "準備", submitting: "提出", approved: "承認", executing: "実行" };
  const rd = REGIONS[region];
  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} regionColor={rd.color} />
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 22px" }}>
        <BackBtn nav={nav} user={u} />
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>{I.cal(20, V.primary)} 申請タイムライン</h1>
        <p style={{ fontSize: 12, color: V.muted, marginBottom: 20 }}>逆算スケジュール</p>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {Object.entries(REGIONS).map(([k, r]) => <button key={k} onClick={() => setRegion(k)} style={{ padding: "8px 18px", fontSize: 12, fontWeight: region === k ? 700 : 500, border: region === k ? "none" : `1px solid ${V.border}`, borderRadius: 6, cursor: "pointer", background: region === k ? r.color : "#fff", color: region === k ? "#fff" : V.muted }}>{r.name}</button>)}
        </div>
        <div style={{ position: "relative", paddingLeft: 24 }}>
          <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 2, background: `${rd.color}20` }} />
          {tl[region].map((p, i) => (
            <div key={i} className="sr" style={{ animationDelay: `${i * .07}s`, position: "relative", marginBottom: 16, paddingLeft: 20 }}>
              <div style={{ position: "absolute", left: -16, top: 5, width: 12, height: 12, borderRadius: "50%", background: p.hl ? rd.color : "#fff", border: `2px solid ${rd.color}`, zIndex: 1 }} />
              <div style={{ background: "#fff", borderRadius: 10, padding: "14px 16px", border: `1px solid ${p.hl ? `${rd.color}40` : V.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: rd.color }}>{p.m}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: `${sc[p.st]}14`, color: sc[p.st] }}>{sl[p.st]}</span>
                </div>
                {p.tasks.map((t, j) => <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "3px 0" }}>{I.chevR(11, rd.accent)}<span style={{ fontSize: 12, lineHeight: 1.5 }}>{t}</span></div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ user: u, nav, lo }) {
  const [region, setRegion] = useState(u?.region || "tokyo");
  const [sec, setSec] = useState("overview");
  const r = REGIONS[region];
  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={u} nav={nav} lo={lo} />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 22px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>{I.info(20, V.primary)} 情報ポータル</h1>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {Object.entries(REGIONS).map(([k, rd]) => <button key={k} onClick={() => setRegion(k)} style={{ padding: "9px 20px", fontSize: 13, fontWeight: region === k ? 700 : 500, border: region === k ? "none" : `1px solid ${V.border}`, borderRadius: 7, cursor: "pointer", background: region === k ? rd.color : "#fff", color: region === k ? "#fff" : V.muted }}>{rd.name}</button>)}
        </div>
        <div style={{ display: "flex", gap: 3, marginBottom: 16, background: "#fff", borderRadius: 7, padding: 3, border: `1px solid ${V.border}` }}>
          {[{ id: "overview", l: "概要", ic: "target" }, { id: "schedule", l: "スケジュール", ic: "cal" }, { id: "docs", l: "必要書類", ic: "doc" }, { id: "subsidies", l: "補助金", ic: "coins" }].map(t => (
            <button key={t.id} onClick={() => setSec(t.id)} style={{ padding: "6px 12px", fontSize: 11, fontWeight: sec === t.id ? 700 : 500, color: sec === t.id ? r.color : V.muted, background: sec === t.id ? `${r.color}10` : "transparent", border: "none", borderRadius: 5, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>{I[t.ic](12, sec === t.id ? r.color : V.muted)} {t.l}</button>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.border}`, padding: 22 }}>
          {sec === "overview" && <div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: r.color, marginBottom: 14 }}>{r.name}の経営革新計画</h2>
            <div style={{ background: r.bg, borderRadius: 8, padding: 14, display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>{I.phone(16, r.color)}<div><p style={{ fontSize: 10, color: V.muted }}>問合せ</p><p style={{ fontSize: 15, fontWeight: 700, color: r.color }}>{r.phone}</p></div></div>
            <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>経営指標の目標伸び率</h3>
            <div style={{ borderRadius: 7, overflow: "hidden", border: `1px solid ${V.border}` }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: V.bg }}><th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, borderBottom: `1px solid ${V.border}` }}>期間</th><th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, borderBottom: `1px solid ${V.border}` }}>付加価値額</th><th style={{ padding: "8px 14px", textAlign: "left", fontWeight: 700, borderBottom: `1px solid ${V.border}` }}>給与支給総額</th></tr></thead>
                <tbody>{TARGETS.map((t, i) => <tr key={i}><td style={{ padding: "8px 14px", borderBottom: `1px solid ${V.bg}`, fontWeight: 600 }}>{t.p}</td><td style={{ padding: "8px 14px", borderBottom: `1px solid ${V.bg}`, color: V.primary, fontWeight: 600 }}>{t.v}</td><td style={{ padding: "8px 14px", borderBottom: `1px solid ${V.bg}`, color: "#922b21", fontWeight: 600 }}>{t.s}</td></tr>)}</tbody>
              </table>
            </div>
          </div>}
          {sec === "schedule" && <ArrowSched data={r} />}
          {sec === "docs" && <div>{r.docs.map((d, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 0", borderBottom: `1px solid ${V.bg}` }}>{I.doc(14, r.color)}<div><span style={{ fontSize: 12, fontWeight: 600 }}>{d.name}</span>{d.req && <span style={{ fontSize: 9, fontWeight: 700, color: "#dc2626", background: "#fef2f2", padding: "1px 5px", borderRadius: 3, marginLeft: 5 }}>必須</span>}{d.detail && <p style={{ fontSize: 10, color: V.muted, marginTop: 1 }}>{d.detail}</p>}</div></div>)}</div>}
          {sec === "subsidies" && <div>
            {r.subsidies.map((s, i) => <div key={i} style={{ background: V.bg, borderRadius: 8, padding: 14, border: `1px solid ${V.border}`, marginBottom: 8 }}><p style={{ fontSize: 13, fontWeight: 700, color: r.color, marginBottom: 4 }}>{s.name}</p><div style={{ display: "flex", gap: 8 }}><span style={{ fontSize: 10, background: "#fff", padding: "2px 8px", borderRadius: 4, border: `1px solid ${V.border}` }}>{s.amount}</span><span style={{ fontSize: 10, background: "#fff", padding: "2px 8px", borderRadius: 4, border: `1px solid ${V.border}` }}>{s.rate}</span></div></div>)}
            <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 16, marginBottom: 10 }}>国の主要制度（承認で加点）</h3>
            {[{ n: "ものづくり補助金", d: "成長性加点" }, { n: "持続化補助金", d: "最大250万円上乗せ" }, { n: "日本政策金融公庫", d: "0.4-0.9%金利優遇" }, { n: "信用保証特例", d: "普通2億円・無担保8,000万円別枠" }].map((x, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 0" }}>{I.star(13, "#c5960c")}<div><p style={{ fontSize: 12, fontWeight: 600 }}>{x.n}</p><p style={{ fontSize: 10, color: V.muted }}>{x.d}</p></div></div>)}
          </div>}
        </div>
      </div>
    </div>
  );
}

function Chat({ user: u, nav, lo }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: `こんにちは${u?.name ? `、${u.name}さん` : ""}。${u?.region ? REGIONS[u.region].name + "の" : ""}経営革新計画 AIアシストです。\n\n何でもお気軽にご質問ください。新規性の書き方、数値目標、補助金連携など幅広く対応します。` }]);
  const [input, setInput] = useState(""); const [loading, setLoading] = useState(false);
  const endRef = useRef(null); const r = REGIONS[u?.region] || REGIONS.tokyo;
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); setInput(""); setLoading(true);
    setMsgs(p => [...p, { role: "user", content: msg }]);
    try {
      const sys = `経営革新計画AIアシストの専門コンサルタント。${u?.region ? REGIONS[u.region].name + "の" : ""}申請に精通。新事業活動4類型、数値目標設定、審査ポイント、補助金連携に詳しい。具体的・実践的に日本語で回答。`;
      const resp = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: msgs.slice(1).map(m => ({ role: m.role, content: m.content })).concat([{ role: "user", content: msg }]) }) });
      const data = await resp.json();
      setMsgs(p => [...p, { role: "assistant", content: data.content?.map(c => c.text || "").join("\n") || "エラー" }]);
    } catch { setMsgs(p => [...p, { role: "assistant", content: "接続エラー。再度お試しください。" }]); }
    setLoading(false);
  };
  return (
    <div style={{ minHeight: "100vh", background: V.bg, display: "flex", flexDirection: "column" }}>
      <Header user={u} nav={nav} lo={lo} regionColor={r.color} />
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", width: "100%", padding: "10px 22px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <button onClick={() => nav(u ? "dashboard" : "landing")} style={{ background: "none", border: `1px solid ${V.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, color: V.muted, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>{I.back(12, V.muted)} 戻る</button>
          <h2 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>{I.search(15, r.color)} AIアドバイザー</h2>
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 10 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "82%", display: "flex", gap: 8, alignItems: "flex-start", flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: m.role === "user" ? "#e8ecf1" : r.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.role === "user" ? I.user(14, V.muted) : I.brain(14, r.color)}</div>
                <div style={{ background: m.role === "user" ? r.color : "#fff", color: m.role === "user" ? "#fff" : V.dark, borderRadius: m.role === "user" ? "11px 11px 2px 11px" : "11px 11px 11px 2px", padding: "10px 14px", fontSize: 13, lineHeight: 1.8, border: m.role === "user" ? "none" : `1px solid ${V.border}`, whiteSpace: "pre-wrap" }}>{m.content}</div>
              </div>
            </div>
          ))}
          {loading && <div style={{ display: "flex", gap: 8 }}><div style={{ width: 28, height: 28, borderRadius: 6, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.brain(14, r.color)}</div><div style={{ background: "#fff", borderRadius: "11px 11px 11px 2px", padding: "10px 14px", border: `1px solid ${V.border}`, fontSize: 12, color: V.muted }}><span style={{ animation: "pulse 1.2s infinite" }}>考え中...</span></div></div>}
          <div ref={endRef} />
        </div>
        <div style={{ display: "flex", gap: 6, padding: "8px 0", borderTop: `1px solid ${V.border}` }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()} placeholder="質問を入力..." style={{ flex: 1, padding: "10px 12px", fontSize: 13, border: `1px solid ${V.border}`, borderRadius: 7, outline: "none", fontFamily: "inherit", background: "#fff" }} />
          <button onClick={send} disabled={loading || !input.trim()} style={{ padding: "10px 16px", background: loading || !input.trim() ? "#c0c7d0" : `linear-gradient(135deg,${r.color},${r.color}cc)`, border: "none", borderRadius: 7, cursor: loading || !input.trim() ? "not-allowed" : "pointer" }}>{I.send(15, "#fff")}</button>
        </div>
      </div>
    </div>
  );
}

function Admin({ users, user: cu, updateUser, nav, lo }) {
  const [sel, setSel] = useState(null);
  const members = users.filter(u => u.role !== "admin");
  return (
    <div style={{ minHeight: "100vh", background: V.bg }}>
      <Header user={cu} nav={nav} lo={lo} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 22px" }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>{I.gear(20, V.primary)} 管理画面</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10, marginBottom: 22 }}>
          {[{ l: "総ユーザー", v: members.length, c: V.primary, ic: "users" }, { l: "承認済", v: members.filter(u => u.approved).length, c: "#059669", ic: "check" }, { l: "承認待ち", v: members.filter(u => !u.approved).length, c: "#d97706", ic: "clock" }].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 16, border: `1px solid ${V.border}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: `${s.c}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>{I[s.ic](16, s.c)}</div>
              <div><p style={{ fontSize: 10, color: V.muted }}>{s.l}</p><p style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</p></div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: sel ? "1fr 340px" : "1fr", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.border}`, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${V.border}` }}><h2 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>{I.users(15, V.primary)} ユーザー一覧</h2></div>
            {members.length === 0 ? <div style={{ padding: 30, textAlign: "center", color: "#b0b8c1", fontSize: 12 }}>登録なし</div> : members.map(u => (
              <div key={u.id} onClick={() => setSel(u)} style={{ padding: "12px 18px", borderBottom: `1px solid ${V.bg}`, cursor: "pointer", background: sel?.id === u.id ? V.pLight : "transparent", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: V.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>{I.user(13, V.muted)}</div>
                  <div><p style={{ fontSize: 12, fontWeight: 600 }}>{u.name}</p><p style={{ fontSize: 10, color: V.muted }}>{u.email} — {REGIONS[u.region]?.short || "未選択"}</p></div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, background: u.approved ? "#dcfce7" : "#fef9c3", color: u.approved ? "#16a34a" : "#ca8a04" }}>{u.approved ? "承認済" : "待ち"}</span>
              </div>
            ))}
          </div>
          {sel && (
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${V.border}`, padding: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>ユーザー設定</h3>
              <div style={{ marginBottom: 10 }}><p style={{ fontSize: 10, color: V.muted }}>名前</p><p style={{ fontSize: 13, fontWeight: 600 }}>{sel.name}</p></div>
              <div style={{ marginBottom: 10 }}><p style={{ fontSize: 10, color: V.muted }}>地域</p><p style={{ fontSize: 13, fontWeight: 600 }}>{REGIONS[sel.region]?.name || "未選択"}</p></div>
              <div style={{ marginBottom: 10 }}><p style={{ fontSize: 10, color: V.muted }}>紹介コード</p><p style={{ fontSize: 12, fontFamily: "monospace" }}>{sel.affCode}</p></div>
              <div style={{ marginBottom: 10 }}><p style={{ fontSize: 10, color: V.muted }}>紹介実績</p><p style={{ fontSize: 12 }}>{sel.referrals}件 / ¥{(sel.commission || 0).toLocaleString()}</p></div>
              <div style={{ marginBottom: 16 }}>
                <button onClick={() => { const v = !sel.approved; updateUser(sel.id, { approved: v }); setSel({ ...sel, approved: v }); }} style={{ width: "100%", padding: 9, fontSize: 12, fontWeight: 700, border: "none", borderRadius: 6, cursor: "pointer", background: sel.approved ? "#fef2f2" : "#f0fdf4", color: sel.approved ? "#dc2626" : "#16a34a" }}>{sel.approved ? "承認取消" : "承認する"}</button>
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>機能権限</p>
              {CATS.map(cat => {
                const on = sel.permissions?.[cat.id];
                return (
                  <div key={cat.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${V.bg}` }}>
                    <span style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 5, color: on ? V.dark : V.muted }}>{I[cat.icon](13, on ? cat.color : V.muted)} {cat.label}</span>
                    <button onClick={() => { const p = { ...sel.permissions, [cat.id]: !on }; updateUser(sel.id, { permissions: p }); setSel({ ...sel, permissions: p }); }} style={{ width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer", background: on ? V.primary : "#d1d5db", position: "relative" }}>
                      <div style={{ width: 14, height: 14, borderRadius: 7, background: "#fff", position: "absolute", top: 3, left: on ? 19 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
