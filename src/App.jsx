import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════
   ICONS (SVG line icons)
   ═══════════════════════════════════════════ */
const I={home:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
edit:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
brain:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 8.5c0 2 .9 3.7 2.3 4.9L12 18l4.7-4.6A6.3 6.3 0 0019 8.5C19 5 16 2 12 2z"/><circle cx="12" cy="9" r="2"/></svg>,
doc:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
list:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
cal:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
coins:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1113.63 5.91"/><path d="M7 6h2v4"/></svg>,
search:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
gift:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>,
ext:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
user:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
users:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
chart:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
gear:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
check:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
clock:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
send:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
star:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
building:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M9 18h6"/></svg>,
warn:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
save:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
copy:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>,
back:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
chevR:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
menu:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
logout:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
info:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
target:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
dl:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
clipboard:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
folder:(s=20,c="currentColor")=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>};

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const RG={tokyo:{name:"東京都",short:"東京",color:"#0f3d5c",bg:"#e8f0f6"},osaka:{name:"大阪府",short:"大阪",color:"#6e1b1b",bg:"#f8eded"},fukuoka:{name:"福岡県",short:"福岡",color:"#145a32",bg:"#e9f5ee"}};
const V={bg:"#f1f3f7",bd:"#e2e6ea",mt:"#7a8594",dk:"#1a1a2e",pr:"#1e3a5f",pl:"#e8f0f6",sb:"#1a2332",sa:"#0f3d5c"};
const CATS=[{id:"innovation",label:"経営革新申請",icon:"clipboard",c:"#0f3d5c"},{id:"subsidy",label:"補助金申請",icon:"coins",c:"#6e1b1b"},{id:"report",label:"実績報告",icon:"chart",c:"#145a32"},{id:"other",label:"その他",icon:"folder",c:"#5b2c6f"}];

/* ═══════════════════════════════════════════
   FORM SECTIONS — 経営革新計画に必要な全情報
   ═══════════════════════════════════════════ */
const SEC=[
{id:"S1",t:"企業基本情報",icon:"building",f:[
  {id:"companyName",l:"会社名（屋号）",p:"株式会社サンプル",rq:1},
  {id:"corpType",l:"法人種別",ty:"sel",opts:["株式会社","有限会社","合同会社","合名会社","個人事業主","企業組合","協同組合","その他"],rq:1},
  {id:"representative",l:"代表者氏名",p:"山田 太郎",rq:1},
  {id:"repTitle",l:"代表者役職",p:"代表取締役"},
  {id:"zipcode",l:"郵便番号",p:"160-0023"},
  {id:"address",l:"本社所在地",p:"東京都新宿区西新宿1-1-1 ○○ビル3F",rq:1},
  {id:"tel",l:"電話番号",p:"03-1234-5678",rq:1},
  {id:"fax",l:"FAX番号",p:"03-1234-5679"},
  {id:"email",l:"メールアドレス",p:"info@sample.co.jp",rq:1},
  {id:"url",l:"ホームページURL",p:"https://www.sample.co.jp"},
  {id:"established",l:"設立年月日",p:"2010年4月1日",rq:1},
  {id:"capital",l:"資本金",p:"1,000万円",rq:1},
  {id:"industry",l:"業種（日本標準産業分類）",ty:"sel",opts:["製造業","建設業","卸売業","小売業","サービス業","情報通信業","運輸業","宿泊業・飲食業","不動産業","専門・技術サービス業","その他"],rq:1},
  {id:"industryDetail",l:"業種の詳細",p:"金属製品製造業（建築用金属部品）"},
  {id:"employees",l:"常時使用する従業員数",p:"25名",rq:1},
  {id:"partTime",l:"パート・アルバイト数",p:"5名"},
  {id:"annualSales",l:"直近期の年商（売上高）",p:"1億2,000万円",rq:1},
  {id:"fiscalEnd",l:"決算月",ty:"sel",opts:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],rq:1},
]},
{id:"S2",t:"既存事業の概要",icon:"building",f:[
  {id:"mainBiz",l:"主たる事業内容",ty:"ta",p:"建設業向けの金属部品のOEM製造。鋼材の切削・溶接・表面処理まで一貫生産体制を構築。創業以来20年にわたり、建設業界向けに高品質な金属部品を供給している。",rq:1,rows:4},
  {id:"mainProducts",l:"主要製品・サービス（売上構成比含む）",ty:"ta",p:"① 建築用ステンレス金具（売上構成比60%）\n② 産業機械向け精密部品（同30%）\n③ その他受託加工（同10%）",rows:4},
  {id:"mainClients",l:"主要取引先（年間取引額）",ty:"ta",p:"① A建設株式会社（年間取引額3,000万円、取引年数15年）\n② B工業株式会社（同2,000万円、取引年数8年）\n③ C設備株式会社（同1,500万円、取引年数5年）",rows:4},
  {id:"strength",l:"自社の強み（経営資源）",ty:"ta",p:"① 20年の金属加工技術の蓄積と独自のノウハウ\n② 多品種少量生産に対応できる熟練工5名体制\n③ ISO9001認証取得による品質管理体制\n④ 大手建設会社との長年の信頼関係",rq:1,rows:4},
  {id:"weakness",l:"現在の経営課題",ty:"ta",p:"① 建設業界の需要変動による売上の不安定さ（前年比-8%）\n② 熟練工の高齢化（平均年齢57歳）と後継者不足\n③ BtoB依存（100%）による価格決定力の弱さ\n④ デジタル活用の遅れ（受発注がFAX中心）",rq:1,rows:4},
  {id:"bizHistory",l:"これまでの主な経営改善の取り組み",ty:"ta",p:"2020年: ISO9001認証取得\n2022年: 5軸加工機導入による精度向上\n2024年: 基幹システム刷新（受発注のデジタル化着手）"},
]},
{id:"S3",t:"新事業活動の内容",icon:"star",f:[
  {id:"newBizType",l:"新事業活動の類型",ty:"sel",opts:["新商品の開発又は生産","新役務（サービス）の開発又は提供","商品の新たな生産又は販売方式の導入","役務の新たな提供方式の導入等"],rq:1},
  {id:"planTitle",l:"経営革新計画の名称（タイトル）",p:"金属加工技術を活かしたBtoC向けアウトドア用品のD2C展開",rq:1},
  {id:"newBizDetail",l:"新事業活動の具体的な内容",ty:"ta",p:"自社が20年間培ってきた金属加工技術（切削・溶接・表面処理）を活かし、一般消費者向けのアウトドア用金属製品（焚き火台・クッカー・ペグ等）を開発する。\n\n製品は自社ECサイトおよびAmazon等のモール型ECで販売し、SNS（Instagram・YouTube）を活用したマーケティングにより、「職人品質のアウトドア用品」というブランドポジションを確立する。",rq:1,rows:6},
  {id:"novelty",l:"新規性の根拠（なぜ「新事業活動」と言えるのか）",ty:"ta",p:"① 当地域の金属加工業者30社を調査した結果、BtoC向けEC販売を展開している事例は皆無\n② 製造業者が直接消費者に販売するD2Cモデルは、当業界において革新的なアプローチ\n③ AR（拡張現実）技術を用いた製品シミュレーション機能は、アウトドア用品業界でも先駆的\n④ 当社はこれまでBtoB100%であり、BtoC事業は完全に新しい取り組み",rq:1,rows:5},
  {id:"before",l:"従来の事業内容（Before）",ty:"ta",p:"【ターゲット顧客】建設会社・産業機械メーカー（BtoB 100%）\n【提供価値】受託による金属部品の製造\n【販売方法】営業担当による既存顧客への対面営業\n【収益モデル】単発のOEM受注（単価×数量）\n【利益率】粗利率18%",rq:1,rows:5},
  {id:"after",l:"革新後の事業内容（After）",ty:"ta",p:"【ターゲット顧客】一般消費者・アウトドア愛好家（BtoC新規）\n【提供価値】高品質な金属製アウトドア用品＋DIY指導動画＋コミュニティ\n【販売方法】自社EC＋モール型EC＋SNSマーケティング\n【収益モデル】製品販売＋定期購買（消耗品）＋有料コミュニティ\n【利益率】粗利率45%（直販のため中間マージン排除）",rq:1,rows:5},
  {id:"market",l:"ターゲット市場の規模と根拠",ty:"ta",p:"① 国内アウトドア用品市場規模: 約3,200億円（○○総研2025年調査）\n② うち金属製キャンプ用品: 約480億円（同調査）\n③ EC購入率: 35%（前年比+5pt、経産省EC市場調査）\n④ ターゲット層: 30-50代男性・世帯年収600万円以上のキャンプ愛好家\n⑤ 初年度獲得目標: 上記市場の0.003%（= 約1,500万円）"},
  {id:"competitors",l:"競合分析と差別化ポイント",ty:"ta",p:"【主な競合】スノーピーク、ユニフレーム、SOTO、バンドック等\n\n【差別化ポイント】\n① 大手にない「職人の手仕事」感（1点1点手作業の仕上げ工程）\n② 個別カスタマイズ対応（名入れ・サイズ変更・素材選択）\n③ 地元の鋼材を使用した「メイドイン○○」ブランディング\n④ 工場見学・製作体験によるファンコミュニティ形成"},
]},
{id:"S4",t:"経営目標（数値計画）",icon:"chart",f:[
  {id:"planPeriod",l:"計画期間",ty:"sel",opts:["3年計画（令和8年度〜令和10年度）","4年計画（令和8年度〜令和11年度）","5年計画（令和8年度〜令和12年度）"],rq:1},
  {id:"salesPlan",l:"売上高計画",ty:"ta",p:"【基準年（令和7年度）】12,000万円\n【1年目】13,500万円（前年比+12.5%）\n  うち既存事業: 12,000万円 / 新事業: 1,500万円\n【2年目】15,800万円（前年比+17.0%）\n  うち既存事業: 12,000万円 / 新事業: 3,800万円\n【3年目】18,600万円（前年比+17.7%）\n  うち既存事業: 12,000万円 / 新事業: 6,600万円",rq:1,rows:8},
  {id:"profitPlan",l:"営業利益計画",ty:"ta",p:"【基準年】600万円（営業利益率5.0%）\n【1年目】850万円（6.3%）新事業粗利＋既存効率化\n【2年目】1,200万円（7.6%）新事業拡大＋ブランド確立\n【3年目】1,600万円（8.6%）規模の経済＋リピート率向上",rq:1,rows:5},
  {id:"personnelCost",l:"人件費計画",ty:"ta",p:"【基準年】6,000万円\n【1年目】6,300万円（新規採用1名＋全社2%昇給）\n【2年目】6,700万円（新規採用1名＋全社2.5%昇給）\n【3年目】7,200万円（業績連動賞与増＋全社3%昇給）",rq:1,rows:5},
  {id:"depreciation",l:"減価償却費計画",ty:"ta",p:"【基準年】800万円\n【1年目】1,100万円（設備投資に伴う増加300万円）\n【2年目】1,050万円\n【3年目】1,000万円",rows:4},
  {id:"addedValueNote",l:"※付加価値額について",ty:"note",note:"付加価値額 ＝ 営業利益 ＋ 人件費 ＋ 減価償却費\n3年計画: 9%以上（年率3%）の向上が必要\n4年計画: 12%以上 / 5年計画: 15%以上が必要\n\n上記の営業利益・人件費・減価償却費の計画を入力すると、AI生成時に付加価値額を自動算出します。"},
  {id:"salaryTotal",l:"給与支給総額の計画",ty:"ta",p:"【基準年】4,800万円\n【1年目】5,040万円（+5.0%）\n【2年目】5,290万円（+5.0%）\n【3年目】5,555万円（+5.0%）\n※年率1.5%以上の向上が必要",rq:1,rows:5},
  {id:"wageRationale",l:"賃上げの根拠と方針",ty:"ta",p:"① 新事業の営業利益を原資として全社員のベースアップ（毎年2%以上）を実施\n② 業績連動型賞与制度を新設し、新事業の成果を全従業員に還元\n③ 新規採用2名（ECマーケ1名＋製造1名）による人材強化\n④ 社会保険料の増加分（約0.5%）も考慮した現実的な計画"},
]},
{id:"S5",t:"実施スケジュール",icon:"cal",f:[
  {id:"year1",l:"1年目の実施内容（月別）",ty:"ta",p:"4〜6月: 製品企画・デザイン確定・試作品開発（3品目）\n7〜8月: ECサイト構築・SNSアカウント開設・コンテンツ制作\n9月: テスト販売開始（自社EC）・インフルエンサー提供\n10〜11月: フィードバック収集・製品改良・Amazon出店準備\n12月: Amazon出店・クリスマスキャンペーン\n1〜2月: 展示会出展（アウトドアデイジャパン）\n3月: 初年度振り返り・2年目計画策定",rq:1,rows:7},
  {id:"year2",l:"2年目の実施内容",ty:"ta",p:"4〜9月: 製品ラインナップ拡充（3品目→15品目）\n通年: YouTube製作動画の定期配信（月2本）\n10月: 実店舗（アウトドアショップ）への卸売開始\n通年: Google/Meta広告によるEC集客強化",rows:5},
  {id:"year3",l:"3年目以降の実施内容",ty:"ta",p:"・ふるさと納税返礼品への登録\n・工場見学＋製作体験の観光コンテンツ化\n・海外展開の市場調査（台湾・韓国のキャンプ市場）\n・サブスクリプション型「メンテナンスキット」の提供開始",rows:4},
  {id:"milestones",l:"重要マイルストーン",ty:"ta",p:"M1（6ヶ月後）: 試作品完成・ECサイト公開\nM2（12ヶ月後）: 月商100万円達成\nM3（24ヶ月後）: 月商300万円・卸売5店舗\nM4（36ヶ月後）: 新事業売上6,600万円・全社営業利益率8%超"},
  {id:"org",l:"実施体制（役割分担）",ty:"ta",p:"【プロジェクトリーダー】代表取締役 山田太郎（商品企画・戦略統括）\n【製造担当】製造部門長 鈴木一郎＋熟練工2名（試作・量産）\n【EC・マーケティング】新規採用予定のWebマーケティング担当1名\n【デザイン・ブランディング】外注: ○○デザイン事務所\n【財務・管理】経理部長 佐藤花子（資金管理・補助金申請）",rq:1,rows:5},
]},
{id:"S6",t:"設備投資・資金計画",icon:"coins",f:[
  {id:"equipPlan",l:"設備投資の内容と金額",ty:"ta",p:"① レーザー加工機 AMADA LCG3015AJ: 2,000万円\n   →小ロット・多品種の消費者向け製品の精密加工に必要\n② ECサイト構築一式（Shopify Plus＋カスタマイズ）: 300万円\n   →自社ブランドサイトでのD2C販売基盤\n③ 撮影スタジオ設備（カメラ・照明・背景）: 100万円\n   →商品写真・動画の自社撮影体制構築\n④ AR製品シミュレーションシステム開発: 200万円\n\n【設備投資合計】2,600万円",rq:1,rows:8},
  {id:"funding",l:"資金調達の方法と内訳",ty:"ta",p:"① 自己資金: 800万円（内部留保より充当）\n② 日本政策金融公庫 経営革新貸付: 1,200万円（金利優遇0.4%適用予定）\n③ ものづくり補助金: 600万円（補助率1/2、対象経費1,200万円）\n\n【資金調達合計】2,600万円",rq:1,rows:5},
  {id:"subsidyPlan",l:"活用予定の補助金・支援制度",ty:"ta",p:"① ものづくり補助金（成長性加点を活用 / 通常枠1,250万円）\n② 東京都 躍進的な事業推進のための設備投資支援事業（最大2億円 / 1/2〜2/3）\n③ 小規模事業者持続化補助金（販路開拓費用 / 最大250万円）\n④ IT導入補助金（EC・AR関連 / 最大450万円）"},
  {id:"bankStatus",l:"金融機関との事前調整状況",ty:"ta",p:"① メインバンク（○○信用金庫 △△支店）に経営革新計画の概要を説明済み（2026年2月）\n② 承認後の経営革新貸付1,200万円について内諾を得ている\n③ 信用保証協会への事前相談も完了（別枠保証の適用を確認）"},
]},
{id:"S7",t:"リスク管理",icon:"warn",f:[
  {id:"risk1",l:"想定されるリスクと対策",ty:"ta",p:"【リスク1】BtoC市場での認知度不足\n→対策: 初年度は広告宣伝費を売上の20%確保。キャンプ系YouTuber3名への製品提供。Instagram広告で認知拡大。\n\n【リスク2】製造キャパシティの不足\n→対策: 既存設備の稼働率を最適化（夜間バッチ加工の導入）。繁忙期は協力工場（B工業）へ外注（事前合意済み）。\n\n【リスク3】価格競争による利益率低下\n→対策: 「職人品質」のブランディングにより価格ではなく品質で差別化。カスタマイズ対応で付加価値を確保。\n\n【リスク4】EC運営人材の確保\n→対策: 採用が遅れる場合はEC運営代行サービスを一時活用。並行してindeedでの採用活動を実施。",rq:1,rows:10},
  {id:"exitPlan",l:"計画未達成時の代替策",ty:"ta",p:"【売上が計画の70%未満の場合】\n① 既存BtoB事業の営業強化（新規顧客3社獲得目標）で全社売上を補完\n② EC販売中心モデルから卸売中心モデルへ転換を検討\n③ アウトドアショップとのコラボ商品開発に方針転換\n\n【売上が計画の50%未満の場合】\n① 新事業を縮小し、既存事業への経営資源集中\n② 設備は既存事業の生産性向上に転用可能（レーザー加工機は汎用性あり）",rq:1,rows:8},
]},
];

/* ═══════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════ */
const CSS=`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Noto Sans JP',sans-serif;background:${V.bg};color:${V.dk};-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#c0c7d0;border-radius:3px}
@keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
.fu{animation:fu .35s ease-out both}
input:focus,textarea:focus,select:focus{border-color:${V.pr}!important;box-shadow:0 0 0 3px rgba(30,58,95,.07)}
button,textarea,input,select{font-family:inherit}`;

/* ═══════════════════════════════════════════
   INITIAL USERS
   ═══════════════════════════════════════════ */
const INIT_USERS=[
  {id:"a1",em:"admin@keikaku.jp",pw:"admin123",nm:"管理者",role:"admin",ok:true,rg:null,aff:"ADMIN0001",refs:0,comm:0,perms:{innovation:1,subsidy:1,report:1,other:1},fd:{}},
  {id:"u1",em:"demo@example.com",pw:"demo123",nm:"デモ企業（東京）",role:"member",ok:true,rg:"tokyo",aff:"DEMO0001",refs:3,comm:4500,perms:{innovation:1,subsidy:1},fd:{}},
];

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App(){
  const[user,setUser]=useState(null);
  const[page,setPage]=useState("landing");
  const[users,setUsers]=useState(INIT_USERS);
  const go=useCallback(p=>{setPage(p);window.scrollTo(0,0);},[]);
  const login=(em,pw)=>{const u=users.find(x=>x.em===em&&x.pw===pw);if(!u)return"メールアドレスまたはパスワードが違います";if(!u.ok)return"管理者の承認をお待ちください";setUser(u);go(u.role==="admin"?"admin":"member");return null;};
  const register=(em,pw,nm,rg,ref)=>{if(users.find(u=>u.em===em))return"このメールアドレスは既に登録されています";const ac=nm.replace(/[^a-zA-Z0-9]/g,"").slice(0,4).toUpperCase().padEnd(4,"X")+String(users.length).padStart(4,"0");const nu={id:Math.random().toString(36).substr(2,8),em,pw,nm,role:"member",ok:false,rg,aff:ac,refs:0,comm:0,perms:{},fd:{}};setUsers(p=>{const up=[...p,nu];if(ref){const r=up.find(u=>u.aff===ref);if(r){r.refs++;r.comm+=1500;}}return up;});return null;};
  const upU=(id,d)=>{setUsers(p=>p.map(u=>u.id===id?{...u,...d}:u));if(user?.id===id)setUser(p=>({...p,...d}));};
  const lo=()=>{setUser(null);go("landing");};
  return(<><style>{CSS}</style>{page==="landing"?<Landing user={user} go={go} lo={lo}/>:page==="login"||page==="register"?<Auth go={go} login={login} register={register} mode={page}/>:page==="member"?<Member user={user} go={go} lo={lo} upU={upU}/>:page==="admin"?<Admin users={users} user={user} upU={upU} go={go} lo={lo}/>:<Landing user={user} go={go} lo={lo}/>}</>);
}

/* ═══════════════════════════════════════════
   LANDING
   ═══════════════════════════════════════════ */
function Landing({user,go,lo}){
  return(<div>
    <div style={{position:"absolute",top:0,left:0,right:0,zIndex:100,padding:"0 28px",height:52,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:26,height:26,borderRadius:5,background:`linear-gradient(135deg,${V.pr},#2563eb)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:12}}>革</div><span style={{fontSize:12,fontWeight:700,color:"#fff"}}>経営革新 AI アシスト</span></div>
      <div style={{display:"flex",gap:6}}>{user?<button onClick={()=>go(user.role==="admin"?"admin":"member")} style={{padding:"5px 13px",fontSize:11,fontWeight:600,border:"1px solid rgba(255,255,255,.3)",borderRadius:5,cursor:"pointer",background:"transparent",color:"#fff"}}>管理画面</button>:<><button onClick={()=>go("login")} style={{padding:"5px 13px",fontSize:11,fontWeight:600,border:"1px solid rgba(255,255,255,.3)",borderRadius:5,cursor:"pointer",background:"transparent",color:"#fff"}}>ログイン</button><button onClick={()=>go("register")} style={{padding:"5px 15px",fontSize:11,fontWeight:700,border:"none",borderRadius:5,cursor:"pointer",background:"linear-gradient(135deg,#c5960c,#e8b90a)",color:"#1a1a2e"}}>無料登録</button></>}</div>
    </div>
    <section style={{minHeight:"100vh",background:`linear-gradient(155deg,#071a2c 0%,${V.pr} 50%,#2563eb 100%)`,display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"100px 24px 60px"}}>
      <div style={{maxWidth:660}}>
        <div className="fu" style={{display:"inline-flex",padding:"3px 13px",background:"rgba(197,150,12,.12)",border:"1px solid rgba(197,150,12,.25)",borderRadius:50,marginBottom:18}}><span style={{fontSize:10,color:"#c5960c",fontWeight:600}}>東京・大阪・福岡 対応 ｜ 2026年度版</span></div>
        <h1 className="fu" style={{fontSize:"clamp(21px,4.2vw,38px)",fontWeight:900,color:"#fff",lineHeight:1.35,marginBottom:12,animationDelay:".08s"}}>経営革新計画の申請書類を<br/><span style={{color:"#c5960c"}}>AI</span>が自動作成</h1>
        <p className="fu" style={{fontSize:"clamp(11px,1.4vw,13px)",color:"rgba(255,255,255,.5)",lineHeight:1.8,marginBottom:26,animationDelay:".16s"}}>フォーム入力 or AI対話ヒアリング、2つの方式で情報を入力。<br/>全データからAIが承認申請書のドラフトを自動生成します。</p>
        <div className="fu" style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",animationDelay:".24s"}}>
          <button onClick={()=>go("register")} style={{background:"linear-gradient(135deg,#c5960c,#e8b90a)",border:"none",padding:"12px 30px",fontSize:14,fontWeight:700,color:"#1a1a2e",cursor:"pointer",borderRadius:6}}>無料で始める</button>
          <button onClick={()=>go("login")} style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.2)",padding:"12px 30px",fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",borderRadius:6}}>ログイン</button>
        </div>
        <div className="fu" style={{display:"flex",justifyContent:"center",gap:28,marginTop:32,animationDelay:".32s"}}>{[{n:"7セクション",d:"詳細入力フォーム"},{n:"AI対話",d:"チャットで情報整理"},{n:"自動生成",d:"申請書ドラフト"}].map((x,i)=><div key={i} style={{textAlign:"center"}}><p style={{fontSize:18,fontWeight:800,color:"#c5960c"}}>{x.n}</p><p style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{x.d}</p></div>)}</div>
      </div>
    </section>
  </div>);
}

/* ═══════════════════════════════════════════
   AUTH
   ═══════════════════════════════════════════ */
function Auth({go,login,register,mode}){
  const[isL,setIsL]=useState(mode==="login");
  const[em,setEm]=useState("");const[pw,setPw]=useState("");const[nm,setNm]=useState("");
  const[rg,setRg]=useState("tokyo");const[ref,setRef]=useState("");
  const[err,setErr]=useState("");const[ok,setOk]=useState("");
  useEffect(()=>{const p=new URLSearchParams(window.location.search);if(p.get("ref"))setRef(p.get("ref"));},[]);
  const sub=e=>{e.preventDefault();setErr("");setOk("");if(isL){const r=login(em,pw);if(r)setErr(r);}else{if(!nm.trim())return setErr("企業名を入力してください");if(pw.length<6)return setErr("パスワードは6文字以上");const r=register(em,pw,nm,rg,ref);if(r)setErr(r);else setOk("登録完了！管理者の承認後にログインできます。");}};
  const IS={width:"100%",padding:"10px 12px",fontSize:13,border:`1px solid ${V.bd}`,borderRadius:6,outline:"none"};
  return(<div style={{minHeight:"100vh",background:`linear-gradient(135deg,#e8ecf1,#dce1e8)`,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:"#fff",borderRadius:12,padding:"28px 26px",width:"100%",maxWidth:370,boxShadow:"0 4px 20px rgba(0,0,0,.04)"}}>
      <div onClick={()=>go("landing")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:7,marginBottom:22}}>
        <div style={{width:26,height:26,borderRadius:5,background:`linear-gradient(135deg,${V.pr},#2563eb)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:12}}>革</div>
        <span style={{fontSize:12,fontWeight:700}}>経営革新 AI アシスト</span>
      </div>
      <h2 style={{fontSize:17,fontWeight:800,marginBottom:16}}>{isL?"ログイン":"新規会員登録"}</h2>
      <form onSubmit={sub} style={{display:"flex",flexDirection:"column",gap:9}}>
        {!isL&&<><input value={nm} onChange={e=>setNm(e.target.value)} placeholder="企業名（屋号）" style={IS}/>
        <div style={{display:"flex",gap:4}}>{Object.entries(RG).map(([k,r])=><button key={k} type="button" onClick={()=>setRg(k)} style={{flex:1,padding:"7px 0",fontSize:11,fontWeight:rg===k?700:500,border:rg===k?"none":`1px solid ${V.bd}`,borderRadius:5,cursor:"pointer",background:rg===k?r.color:"#fff",color:rg===k?"#fff":V.mt}}>{r.short}</button>)}</div></>}
        <input type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="メールアドレス" style={IS}/>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder={isL?"パスワード":"パスワード（6文字以上）"} style={IS}/>
        {!isL&&<input value={ref} onChange={e=>setRef(e.target.value)} placeholder="紹介コード（任意）" style={IS}/>}
        {err&&<p style={{fontSize:11,color:"#dc2626",background:"#fef2f2",borderRadius:4,padding:7}}>{err}</p>}
        {ok&&<p style={{fontSize:11,color:"#16a34a",background:"#f0fdf4",borderRadius:4,padding:7}}>{ok}</p>}
        <button type="submit" style={{background:`linear-gradient(135deg,${V.pr},#2563eb)`,border:"none",padding:10,fontSize:13,fontWeight:700,color:"#fff",cursor:"pointer",borderRadius:6,marginTop:2}}>{isL?"ログイン":"登録する"}</button>
      </form>
      <div style={{marginTop:10,textAlign:"center"}}><button onClick={()=>{setIsL(!isL);setErr("");setOk("");}} style={{background:"none",border:"none",fontSize:11,color:"#2563eb",cursor:"pointer"}}>{isL?"新規登録":"ログイン"}はこちら</button></div>
      {isL&&<div style={{marginTop:10,padding:9,background:V.bg,borderRadius:4,fontSize:9,color:V.mt,lineHeight:1.7}}><b>管理者:</b> admin@keikaku.jp / admin123<br/><b>会員:</b> demo@example.com / demo123</div>}
    </div>
  </div>);
}

/* ═══════════════════════════════════════════
   WP-STYLE SIDEBAR
   ═══════════════════════════════════════════ */
function SB({user,lo,items,cur,setCur,col,setCol}){
  const rc=RG[user?.rg]?.color||V.pr;
  return(<aside style={{width:col?54:224,background:V.sb,transition:"width .2s",flexShrink:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>
    <div style={{padding:col?"10px 7px":"10px 13px",borderBottom:"1px solid #2d3a4a",display:"flex",alignItems:"center",gap:8,minHeight:48}}>
      <div style={{width:26,height:26,borderRadius:5,background:`linear-gradient(135deg,${rc},${rc}cc)`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:12,flexShrink:0}}>革</div>
      {!col&&<div><p style={{fontSize:11,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>経営革新 AI アシスト</p>{user?.rg&&<p style={{fontSize:8,color:"rgba(255,255,255,.4)"}}>{RG[user.rg]?.name}</p>}</div>}
    </div>
    <nav style={{flex:1,padding:"5px 0",overflowY:"auto"}}>{items.map((it,i)=>{
      if(it.sep)return<div key={i} style={{height:1,background:"#2d3a4a",margin:"5px 8px"}}/>;
      if(it.hd&&!col)return<div key={i} style={{padding:"7px 13px 3px",fontSize:8,fontWeight:700,color:"#556677",textTransform:"uppercase",letterSpacing:.5}}>{it.hd}</div>;
      if(it.hd)return null;
      const on=cur===it.id;
      return(<button key={it.id} onClick={()=>setCur(it.id)} title={col?it.l:""} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:col?"8px 15px":"7px 13px",fontSize:11.5,fontWeight:on?700:500,color:on?"#fff":"rgba(255,255,255,.55)",background:on?V.sa:"transparent",border:"none",borderLeft:on?`3px solid ${rc}`:"3px solid transparent",cursor:"pointer",textAlign:"left",transition:"all .1s"}}>
        {I[it.icon]?.(14,on?"#fff":"rgba(255,255,255,.45)")}
        {!col&&<span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.l}</span>}
        {!col&&it.badge&&<span style={{marginLeft:"auto",fontSize:8,fontWeight:700,background:"#ef4444",color:"#fff",borderRadius:7,padding:"1px 5px"}}>{it.badge}</span>}
      </button>);
    })}</nav>
    <div style={{borderTop:"1px solid #2d3a4a",padding:col?"7px":"7px 11px"}}>
      {!col&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><div style={{width:22,height:22,borderRadius:4,background:"#3d4f63",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.user(11,"#94a3b8")}</div><div><p style={{fontSize:10,fontWeight:600,color:"#e2e8f0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:135}}>{user?.nm}</p><p style={{fontSize:8,color:"#64748b"}}>{user?.em}</p></div></div>}
      <div style={{display:"flex",gap:3}}>
        <button onClick={()=>setCol(!col)} style={{flex:col?1:0,padding:"5px 7px",background:"#2d3a4a",border:"none",borderRadius:3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{I.menu(12,"#94a3b8")}</button>
        {!col&&<button onClick={lo} style={{flex:1,padding:"5px",background:"#2d3a4a",border:"none",borderRadius:3,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:3,fontSize:10,color:"#94a3b8"}}>{I.logout(11,"#94a3b8")} ログアウト</button>}
      </div>
    </div>
  </aside>);
}

/* ═══════════════════════════════════════════
   MEMBER AREA
   ═══════════════════════════════════════════ */
function Member({user:u,go,lo,upU}){
  const[cur,setCur]=useState("home");const[col,setCol]=useState(false);
  const r=RG[u?.rg]||RG.tokyo;
  const menu=[{hd:"メイン"},{id:"home",l:"ダッシュボード",icon:"home"},{hd:"経営革新申請"},{id:"form",l:"フォーム入力で作成",icon:"edit"},{id:"chat",l:"AI対話で作成",icon:"brain"},{id:"gen",l:"申請書類をAI生成",icon:"doc"},{sep:true},{hd:"サポート"},{id:"ck",l:"書類チェックリスト",icon:"list"},{id:"tl",l:"申請タイムライン",icon:"cal"},{id:"sub",l:"補助金・支援情報",icon:"coins"},{id:"ai",l:"AIアドバイザー",icon:"search"},{sep:true},{id:"aff",l:"紹介報酬",icon:"gift"},{id:"tk",l:"チケット購入",icon:"ext"}];
  const P={home:<PHome u={u} r={r} go={setCur}/>,form:<PForm u={u} up={upU} r={r}/>,chat:<PChat u={u} up={upU} r={r}/>,gen:<PGen u={u} r={r}/>,ck:<PCk r={r}/>,tl:<PTl r={r}/>,sub:<PSub r={r}/>,ai:<PAi u={u} r={r}/>,aff:<PAff u={u}/>,tk:<PTk r={r}/>};
  return(<div style={{display:"flex",minHeight:"100vh"}}><SB user={u} lo={lo} items={menu} cur={cur} setCur={setCur} col={col} setCol={setCol}/><main style={{flex:1,overflow:"auto",background:V.bg}}>{P[cur]||P.home}</main></div>);
}

/* ── MEMBER HOME ── */
function PHome({u,r,go}){
  const fd=u?.fd||{};const fi=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note"&&fd[f.id]).length,0);const to=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note").length,0);const pc=Math.round((fi/to)*100);
  return(<div style={{padding:"20px 24px",maxWidth:940}}>
    <h1 style={{fontSize:18,fontWeight:800,marginBottom:2}}>ダッシュボード</h1>
    <p style={{fontSize:11,color:V.mt,marginBottom:18}}>ようこそ、{u?.nm}さん — {r.name}の経営革新計画をサポートします</p>
    <div style={{background:"#fff",borderRadius:10,padding:16,border:`1px solid ${V.bd}`,marginBottom:14,display:"flex",gap:16,alignItems:"center"}}>
      <div style={{width:52,height:52,borderRadius:10,background:`linear-gradient(135deg,${r.color},${r.color}cc)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I.clipboard(22,"#fff")}</div>
      <div style={{flex:1}}><h3 style={{fontSize:14,fontWeight:700,marginBottom:4}}>経営革新計画 申請書作成</h3><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}><div style={{flex:1,background:"#e8ecf1",borderRadius:3,height:5,overflow:"hidden"}}><div style={{height:"100%",background:r.color,borderRadius:3,width:`${pc}%`,transition:"width .3s"}}/></div><span style={{fontSize:11,fontWeight:700,color:r.color}}>{pc}%</span></div><p style={{fontSize:10,color:V.mt}}>{fi}/{to}項目入力済み — {SEC.length}セクション</p></div>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        <button onClick={()=>go("form")} style={{padding:"7px 14px",fontSize:10.5,fontWeight:700,border:"none",borderRadius:5,cursor:"pointer",background:`linear-gradient(135deg,${r.color},${r.color}cc)`,color:"#fff",display:"flex",alignItems:"center",gap:3}}>{I.edit(11,"#fff")} フォーム入力</button>
        <button onClick={()=>go("chat")} style={{padding:"7px 14px",fontSize:10.5,fontWeight:600,border:`1px solid ${r.color}`,borderRadius:5,cursor:"pointer",background:"#fff",color:r.color,display:"flex",alignItems:"center",gap:3}}>{I.brain(11,r.color)} AI対話</button>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:8}}>{[{icon:"doc",l:"AI書類生成",id:"gen",d:"入力データから自動作成"},{icon:"list",l:"チェックリスト",id:"ck",d:"必要書類を確認"},{icon:"cal",l:"タイムライン",id:"tl",d:"スケジュール管理"},{icon:"search",l:"AIアドバイザー",id:"ai",d:"何でも質問OK"},{icon:"coins",l:"補助金情報",id:"sub",d:"活用できる制度"},{icon:"gift",l:"紹介報酬",id:"aff",d:"URL共有で報酬"}].map((t,i)=>
      <button key={i} onClick={()=>go(t.id)} style={{background:"#fff",border:`1px solid ${V.bd}`,borderRadius:7,padding:"12px 11px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"flex-start",gap:8,transition:"all .12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=r.color} onMouseLeave={e=>e.currentTarget.style.borderColor=V.bd}>
        <div style={{width:28,height:28,borderRadius:5,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{I[t.icon](13,r.color)}</div>
        <div><p style={{fontSize:11,fontWeight:600}}>{t.l}</p><p style={{fontSize:9,color:V.mt}}>{t.d}</p></div>
      </button>
    )}</div>
  </div>);
}

/* ── FORM INPUT ── */
function PForm({u,up,r}){
  const[fd,setFd]=useState(u?.fd||{});const[sec,setSec]=useState(SEC[0].id);const[saved,setSaved]=useState(false);
  const upd=(id,v)=>{setFd(p=>({...p,[id]:v}));setSaved(false);};
  const save=()=>{up(u.id,{fd});setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const cur=SEC.find(s=>s.id===sec);
  const IS={width:"100%",padding:"8px 10px",fontSize:12.5,border:`1px solid ${V.bd}`,borderRadius:5,outline:"none"};
  return(<div style={{display:"flex",height:"100%"}}>
    <div style={{width:200,background:"#fff",borderRight:`1px solid ${V.bd}`,padding:"12px 0",flexShrink:0,overflowY:"auto"}}>
      <h3 style={{fontSize:9,fontWeight:700,color:V.mt,padding:"0 11px",marginBottom:6,textTransform:"uppercase",letterSpacing:.5}}>入力セクション</h3>
      {SEC.map(s=>{const fi=s.f.filter(f=>f.ty!=="note"&&fd[f.id]).length;const to=s.f.filter(f=>f.ty!=="note").length;const on=sec===s.id;
        return(<button key={s.id} onClick={()=>setSec(s.id)} style={{width:"100%",padding:"8px 11px",fontSize:11,fontWeight:on?700:500,color:on?r.color:V.dk,background:on?r.bg:"transparent",border:"none",borderLeft:on?`3px solid ${r.color}`:"3px solid transparent",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{display:"flex",alignItems:"center",gap:5}}>{I[s.icon](12,on?r.color:V.mt)}<span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:115}}>{s.t}</span></span>
          <span style={{fontSize:8,fontWeight:700,color:fi===to?"#16a34a":V.mt,background:fi===to?"#dcfce7":"#f1f3f5",padding:"1px 4px",borderRadius:3,flexShrink:0}}>{fi}/{to}</span>
        </button>);
      })}
    </div>
    <div style={{flex:1,padding:"16px 22px",overflowY:"auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <h2 style={{fontSize:16,fontWeight:800,display:"flex",alignItems:"center",gap:6}}>{I[cur.icon](16,r.color)} {cur.t}</h2>
        <button onClick={save} style={{padding:"6px 16px",fontSize:11,fontWeight:700,border:"none",borderRadius:5,cursor:"pointer",background:saved?"#16a34a":`linear-gradient(135deg,${r.color},${r.color}cc)`,color:"#fff",display:"flex",alignItems:"center",gap:3}}>{saved?<>{I.check(12,"#fff")} 保存済</>:<>{I.save(12,"#fff")} 保存</>}</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        {cur.f.map(f=>{
          if(f.ty==="note")return(<div key={f.id} style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:6,padding:11}}><p style={{fontSize:11,fontWeight:600,color:"#d97706",display:"flex",alignItems:"center",gap:3,marginBottom:3}}>{I.info(12,"#d97706")} {f.l}</p><p style={{fontSize:12,color:V.dk,whiteSpace:"pre-wrap",lineHeight:1.7}}>{f.note}</p></div>);
          return(<div key={f.id}><label style={{fontSize:11,fontWeight:600,marginBottom:2,display:"flex",alignItems:"center",gap:3}}>{f.l}{f.rq&&<span style={{fontSize:8,color:"#dc2626",fontWeight:700}}>必須</span>}</label>
            {f.ty==="ta"?<textarea value={fd[f.id]||""} onChange={e=>upd(f.id,e.target.value)} placeholder={f.p} rows={f.rows||4} style={{...IS,resize:"vertical",lineHeight:1.7}}/>
            :f.ty==="sel"?<select value={fd[f.id]||""} onChange={e=>upd(f.id,e.target.value)} style={{...IS,cursor:"pointer"}}><option value="">選択してください</option>{f.opts.map(o=><option key={o} value={o}>{o}</option>)}</select>
            :<input value={fd[f.id]||""} onChange={e=>upd(f.id,e.target.value)} placeholder={f.p} style={IS}/>}
          </div>);
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:16,paddingTop:12,borderTop:`1px solid ${V.bd}`}}>
        <button onClick={()=>{const i=SEC.findIndex(s=>s.id===sec);if(i>0)setSec(SEC[i-1].id);}} disabled={SEC[0].id===sec} style={{padding:"6px 14px",fontSize:11,border:`1px solid ${V.bd}`,borderRadius:5,cursor:"pointer",background:"#fff",display:"flex",alignItems:"center",gap:3}}>{I.back(11,V.mt)} 前へ</button>
        <button onClick={()=>{save();const i=SEC.findIndex(s=>s.id===sec);if(i<SEC.length-1)setSec(SEC[i+1].id);}} style={{padding:"6px 14px",fontSize:11,fontWeight:700,border:"none",borderRadius:5,cursor:"pointer",background:`linear-gradient(135deg,${r.color},${r.color}cc)`,color:"#fff",display:"flex",alignItems:"center",gap:3}}>保存して次へ {I.chevR(11,"#fff")}</button>
      </div>
    </div>
  </div>);
}

/* ── AI CHAT INPUT ── */
function PChat({u,up,r}){
  const[msgs,setMsgs]=useState([{role:"assistant",content:`${u?.nm}さん、経営革新計画の作成を対話形式でお手伝いします。\n\n以下の7つのセクションについて、順番に質問していきます：\n① 企業基本情報  ② 既存事業の概要  ③ 新事業活動の内容\n④ 経営目標（数値計画）  ⑤ 実施スケジュール\n⑥ 設備投資・資金計画  ⑦ リスク管理\n\nまず、御社のことを教えてください。\n・会社名と主な事業内容は何ですか？\n・従業員数と年商はどれくらいですか？\n・御社の一番の強みは何だとお考えですか？`}]);
  const[inp,setInp]=useState("");const[ld,setLd]=useState(false);const end=useRef(null);
  useEffect(()=>{end.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
  const send=async()=>{
    if(!inp.trim()||ld)return;const msg=inp.trim();setInp("");setLd(true);
    setMsgs(p=>[...p,{role:"user",content:msg}]);
    try{
      const fd=u?.fd||{};const ex=Object.entries(fd).filter(([,v])=>v).map(([k,v])=>`${k}: ${typeof v==="string"?v.slice(0,100):v}`).join("\n");
      const sys=`あなたは経営革新計画申請の専門コンサルタントAIです。対話を通じて申請に必要な全情報を引き出してください。

【入力済みデータ】
${ex||"（まだ入力なし）"}

【必要な7セクション】
1. 企業基本情報（会社名、代表者、所在地、資本金、従業員数、年商、業種、決算月）
2. 既存事業の概要（事業内容、主要製品、取引先、強み、課題、過去の改善策）
3. 新事業活動（類型、計画名称、具体的内容、新規性の根拠、Before/After、市場規模、競合との差別化）
4. 経営目標（計画期間、売上計画、利益計画、人件費計画、減価償却費、給与支給総額、賃上げ根拠）
5. 実施スケジュール（年度別計画、マイルストーン、実施体制）
6. 設備投資・資金計画（投資内容、調達方法、補助金活用、金融機関調整状況）
7. リスク管理（リスクと対策、代替策）

【ルール】
- 1回の返答で2〜3個の質問をする（多すぎない）
- ユーザーの回答から情報を抽出し、足りない情報を次に質問する
- 具体的な記入例を示しながら質問する（例：「売上は○○万円くらいですか？」）
- 未記入項目があれば優先的に質問する
- 回答の末尾に【進捗: ○/7セクション完了】と表示する
- 全セクション完了時は「フォーム入力画面で確認・修正」を促す
- 審査で重要な「新規性」と「数値根拠」は特に深掘りする
- 日本語で回答する`;
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:msgs.slice(1).map(m=>({role:m.role,content:m.content})).concat([{role:"user",content:msg}])})});
      const data=await resp.json();setMsgs(p=>[...p,{role:"assistant",content:data.content?.map(c=>c.text||"").join("\n")||"エラーが発生しました"}]);
    }catch(e){setMsgs(p=>[...p,{role:"assistant",content:"接続エラーが発生しました。再度お試しください。"}]);}setLd(false);
  };
  return(<div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{padding:"12px 20px",borderBottom:`1px solid ${V.bd}`,background:"#fff"}}><h2 style={{fontSize:15,fontWeight:800,display:"flex",alignItems:"center",gap:6}}>{I.brain(16,r.color)} AI対話で申請情報を入力</h2><p style={{fontSize:10,color:V.mt,marginTop:1}}>AIの質問に答えるだけで申請に必要な情報が整理されます</p></div>
    <div style={{flex:1,overflowY:"auto",padding:"12px 20px",display:"flex",flexDirection:"column",gap:9}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"82%",display:"flex",gap:6,flexDirection:m.role==="user"?"row-reverse":"row",alignItems:"flex-start"}}>
        <div style={{width:24,height:24,borderRadius:5,background:m.role==="user"?"#e8ecf1":r.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{m.role==="user"?I.user(11,V.mt):I.brain(11,r.color)}</div>
        <div style={{background:m.role==="user"?r.color:"#fff",color:m.role==="user"?"#fff":V.dk,borderRadius:m.role==="user"?"8px 8px 2px 8px":"8px 8px 8px 2px",padding:"8px 12px",fontSize:12.5,lineHeight:1.8,border:m.role==="user"?"none":`1px solid ${V.bd}`,whiteSpace:"pre-wrap"}}>{m.content}</div>
      </div></div>)}
      {ld&&<div style={{display:"flex",gap:6}}><div style={{width:24,height:24,borderRadius:5,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.brain(11,r.color)}</div><div style={{background:"#fff",borderRadius:"8px 8px 8px 2px",padding:"8px 12px",border:`1px solid ${V.bd}`,fontSize:11,color:V.mt}}><span style={{animation:"pulse 1.2s infinite"}}>考え中...</span></div></div>}
      <div ref={end}/>
    </div>
    <div style={{padding:"7px 20px",borderTop:`1px solid ${V.bd}`,background:"#fff",display:"flex",gap:5}}>
      <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="回答を入力してください..." style={{flex:1,padding:"8px 10px",fontSize:12.5,border:`1px solid ${V.bd}`,borderRadius:5,outline:"none"}}/>
      <button onClick={send} disabled={ld||!inp.trim()} style={{padding:"8px 13px",background:ld||!inp.trim()?"#c0c7d0":`linear-gradient(135deg,${r.color},${r.color}cc)`,border:"none",borderRadius:5,cursor:ld?"not-allowed":"pointer"}}>{I.send(13,"#fff")}</button>
    </div>
  </div>);
}

/* ── AI GENERATE DOCUMENT ── */
function PGen({u,r}){
  const[res,setRes]=useState(null);const[ld,setLd]=useState(false);const[copied,setCopied]=useState(false);
  const fd=u?.fd||{};const fi=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note"&&fd[f.id]).length,0);const to=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note").length,0);
  const gen=async()=>{
    setLd(true);
    try{
      const data=SEC.map(s=>`\n━━【${s.t}】━━\n${s.f.filter(f=>f.ty!=="note").map(f=>`■ ${f.l}: ${fd[f.id]||"（未入力）"}`).join("\n")}`).join("\n");
      const prompt=`あなたは経営革新計画の申請書類作成の専門家です。以下の入力データをもとに、${r.name}向けの「経営革新計画承認申請書」の完全なドラフトを作成してください。

【申請地域】${r.name}

【入力データ】
${data}

【出力構成】以下の構成で、実際の申請書の様式に沿った形式で出力してください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 経営革新計画の名称
━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. 申請者の概要
   （会社名、代表者、所在地、資本金、従業員数、業種、年商等）
━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. 経営革新の目標
   （計画全体の目的・ビジョンを200字程度で）
━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. 経営革新の内容
   4-1. 新事業活動の類型
   4-2. 新事業活動の内容（詳細に記述）
   4-3. 新規性の説明（エビデンス付き）
   4-4. 従来との比較表（Before / After）
━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. 経営目標（数値計画）
   5-1. 付加価値額の計画（営業利益＋人件費＋減価償却費で算出）
   5-2. 給与支給総額の計画
   5-3. 年度別数値計画表
━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. 経営革新を実施するために必要な資金及び調達方法
━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. 実施スケジュール（年度別・月別）
━━━━━━━━━━━━━━━━━━━━━━━━━━━
8. リスク管理と代替策
━━━━━━━━━━━━━━━━━━━━━━━━━━━

【重要な注意事項】
- 審査員を意識した説得力のある文章で記述すること
- 「新規性」は、当該地域・業界で一般的でないことを客観的に示すこと
- 数値目標は、売上の積み上げ根拠を明確にすること
- 未入力の項目は「※要入力：○○の情報が必要です」と明記すること
- 付加価値額と給与支給総額は、入力データから計算して記載すること`;
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4000,messages:[{role:"user",content:prompt}]})});
      const d=await resp.json();setRes(d.content?.map(c=>c.text||"").join("\n")||"生成エラー");
    }catch{setRes("接続エラーが発生しました。再度お試しください。");}setLd(false);
  };
  const cp=()=>{navigator.clipboard?.writeText(res||"");setCopied(true);setTimeout(()=>setCopied(false),2000);};
  return(<div style={{padding:"16px 22px",maxWidth:860,overflowY:"auto"}}>
    <h2 style={{fontSize:16,fontWeight:800,marginBottom:3,display:"flex",alignItems:"center",gap:6}}>{I.doc(16,r.color)} 申請書類 AI生成</h2>
    <p style={{fontSize:11,color:V.mt,marginBottom:14}}>入力済みのデータをもとに、AIが経営革新計画承認申請書のドラフトを自動作成します</p>
    <div style={{background:"#fff",borderRadius:8,padding:14,border:`1px solid ${V.bd}`,marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:700}}>入力進捗状況</span><span style={{fontSize:12,fontWeight:700,color:r.color}}>{fi}/{to}項目 ({Math.round(fi/to*100)}%)</span></div>
      <div style={{background:"#e8ecf1",borderRadius:3,height:5,overflow:"hidden",marginBottom:8}}><div style={{height:"100%",background:fi===to?"#16a34a":r.color,borderRadius:3,width:`${fi/to*100}%`}}/></div>
      {SEC.map(s=>{const sf=s.f.filter(f=>f.ty!=="note"&&fd[f.id]).length;const st=s.f.filter(f=>f.ty!=="note").length;return(<div key={s.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"3px 0",fontSize:10}}><span style={{color:V.mt,display:"flex",alignItems:"center",gap:3}}>{I[s.icon](10,sf===st?"#16a34a":V.mt)} {s.t}</span><span style={{fontWeight:600,color:sf===st?"#16a34a":V.mt}}>{sf}/{st}</span></div>);})}
    </div>
    <button onClick={gen} disabled={ld||fi<5} style={{width:"100%",padding:12,fontSize:13,fontWeight:700,border:"none",borderRadius:6,cursor:ld||fi<5?"not-allowed":"pointer",background:ld||fi<5?"#c0c7d0":`linear-gradient(135deg,${r.color},${r.color}cc)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginBottom:12}}>
      {ld?<span style={{animation:"pulse 1.2s infinite"}}>AIが申請書ドラフトを生成中...</span>:<>{I.brain(14,"#fff")} 入力データから申請書類を生成する</>}
    </button>
    {fi<5&&<p style={{fontSize:10,color:"#d97706",textAlign:"center",marginBottom:10}}>※最低5項目以上入力してから生成してください</p>}
    {res&&<div style={{background:"#fff",borderRadius:8,padding:16,border:`1px solid ${V.bd}`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <h3 style={{fontSize:14,fontWeight:800,display:"flex",alignItems:"center",gap:5}}>{I.doc(14,r.color)} 生成された申請書ドラフト</h3>
        <button onClick={cp} style={{padding:"5px 10px",fontSize:10,fontWeight:600,border:`1px solid ${V.bd}`,borderRadius:4,cursor:"pointer",background:copied?"#f0fdf4":"#fff",color:copied?"#16a34a":V.mt,display:"flex",alignItems:"center",gap:3}}>{copied?<>{I.check(10,"#16a34a")} コピー済</>:<>{I.copy(10,V.mt)} コピー</>}</button>
      </div>
      <div style={{fontSize:12.5,lineHeight:2,whiteSpace:"pre-wrap",padding:14,background:V.bg,borderRadius:6,border:`1px solid ${V.bd}`,maxHeight:550,overflowY:"auto"}}>{res}</div>
    </div>}
  </div>);
}

/* ── SMALL PANELS ── */
function PCk({r}){const[ck,setCk]=useState({});const docs=[{n:"承認申請書（様式第1）正本2部",rq:1},{n:"直近2期分の確定申告書一式",rq:1},{n:"商業登記簿謄本（3ヶ月以内）",rq:1},{n:"定款の写し（原本証明付）",rq:1},{n:"会社案内・製品パンフレット"},{n:"市場調査資料・競合分析資料"},{n:"設備投資の見積書"},{n:"金融機関との相談記録"},{n:"合計残高試算表（大阪のみ）",rq:r.name==="大阪府"}];
return(<div style={{padding:"16px 22px",maxWidth:620}}><h2 style={{fontSize:16,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{I.list(16,r.color)} 書類チェックリスト</h2>{docs.map((d,i)=>{const c=ck[i];return(<div key={i} onClick={()=>setCk(p=>({...p,[i]:!p[i]}))} style={{background:"#fff",borderRadius:6,padding:"9px 12px",border:`1px solid ${c?r.color+"40":V.bd}`,cursor:"pointer",display:"flex",alignItems:"center",gap:8,marginBottom:4}}><div style={{width:16,height:16,borderRadius:3,border:c?"none":`2px solid ${V.bd}`,background:c?r.color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{c&&I.check(10,"#fff")}</div><span style={{fontSize:11.5,fontWeight:c?500:600,textDecoration:c?"line-through":"none",color:c?V.mt:V.dk}}>{d.n}</span>{d.rq&&<span style={{fontSize:7,fontWeight:700,color:"#dc2626",background:"#fef2f2",padding:"1px 3px",borderRadius:2,flexShrink:0}}>必須</span>}</div>);})}</div>);}

function PTl({r}){const tl=[{m:"1ヶ月目",t:["事業構想の整理","窓口選定・初回相談予約"],s:"構想"},{m:"2ヶ月目",t:["申請書ドラフト作成","数値計画の精査"],s:"策定"},{m:"3ヶ月目",t:["書類修正・ブラッシュアップ","添付書類の収集"],s:"準備"},{m:"4ヶ月目",t:["正式申請の提出","審査会でのプレゼン"],s:"提出",hl:1},{m:"5ヶ月目〜",t:["補助金申請","新事業の実行開始"],s:"実行"}];
return(<div style={{padding:"16px 22px",maxWidth:620}}><h2 style={{fontSize:16,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{I.cal(16,r.color)} 申請タイムライン</h2><div style={{position:"relative",paddingLeft:16}}><div style={{position:"absolute",left:6,top:4,bottom:4,width:2,background:r.color+"20"}}/>{tl.map((p,i)=><div key={i} style={{position:"relative",marginBottom:10,paddingLeft:14}}><div style={{position:"absolute",left:-12,top:4,width:8,height:8,borderRadius:"50%",background:p.hl?r.color:"#fff",border:`2px solid ${r.color}`,zIndex:1}}/><div style={{background:"#fff",borderRadius:6,padding:"10px 12px",border:`1px solid ${p.hl?r.color+"40":V.bd}`}}><div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><span style={{fontSize:12,fontWeight:700,color:r.color}}>{p.m}</span><span style={{fontSize:8,fontWeight:700,padding:"1px 4px",borderRadius:3,background:r.color+"10",color:r.color}}>{p.s}</span></div>{p.t.map((t,j)=><div key={j} style={{fontSize:11,padding:"1px 0",display:"flex",alignItems:"center",gap:3}}>{I.chevR(8,r.color)}{t}</div>)}</div></div>)}</div></div>);}

function PSub({r}){return(<div style={{padding:"16px 22px",maxWidth:620}}><h2 style={{fontSize:16,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{I.coins(16,r.color)} 補助金・支援制度</h2>{[{n:"ものづくり補助金",d:"経営革新計画で「成長性加点」取得。最大1,250万円"},{n:"小規模事業者持続化補助金",d:"販路開拓。最大250万円（賃上げ特例）"},{n:"日本政策金融公庫 経営革新貸付",d:"通常金利から0.4〜0.9%優遇"},{n:"信用保証の特例",d:"普通保証2億円・無担保8,000万円の別枠"},{n:"固定資産税の減免",d:"先端設備等導入計画と連携で3〜5年間1/2〜1/4"},{n:"法人税の即時償却",d:"経営力向上計画と併用で設備取得額の全額を初年度償却"}].map((x,i)=><div key={i} style={{background:"#fff",borderRadius:6,padding:"10px 12px",border:`1px solid ${V.bd}`,marginBottom:5,display:"flex",alignItems:"center",gap:8}}>{I.star(12,r.color)}<div><p style={{fontSize:12,fontWeight:600}}>{x.n}</p><p style={{fontSize:10,color:V.mt,lineHeight:1.5}}>{x.d}</p></div></div>)}</div>);}

function PAi({u,r}){const[msgs,setMsgs]=useState([{role:"assistant",content:"経営革新計画について何でもお気軽にご質問ください。\n\n例えば：\n・「新規性」の書き方のコツは？\n・数値目標はどう設定すれば？\n・補助金との連携方法は？\n・審査で落ちやすいポイントは？"}]);const[inp,setInp]=useState("");const[ld,setLd]=useState(false);const end=useRef(null);
useEffect(()=>{end.current?.scrollIntoView({behavior:"smooth"});},[msgs]);
const send=async()=>{if(!inp.trim()||ld)return;const msg=inp.trim();setInp("");setLd(true);setMsgs(p=>[...p,{role:"user",content:msg}]);try{const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`あなたは経営革新計画の専門コンサルタントです。${r.name}の申請制度に精通しています。具体的で実用的な回答を日本語で行ってください。制度の要件、数値目標の考え方、新規性の示し方、補助金との連携など幅広く対応します。`,messages:msgs.slice(1).map(m=>({role:m.role,content:m.content})).concat([{role:"user",content:msg}])})});const data=await resp.json();setMsgs(p=>[...p,{role:"assistant",content:data.content?.map(c=>c.text||"").join("\n")||"エラー"}]);}catch{setMsgs(p=>[...p,{role:"assistant",content:"接続エラー"}]);}setLd(false);};
return(<div style={{display:"flex",flexDirection:"column",height:"100%"}}><div style={{padding:"10px 20px",borderBottom:`1px solid ${V.bd}`,background:"#fff"}}><h2 style={{fontSize:15,fontWeight:800,display:"flex",alignItems:"center",gap:5}}>{I.search(15,r.color)} AIアドバイザー</h2></div><div style={{flex:1,overflowY:"auto",padding:"10px 20px",display:"flex",flexDirection:"column",gap:8}}>{msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"82%",background:m.role==="user"?r.color:"#fff",color:m.role==="user"?"#fff":V.dk,borderRadius:8,padding:"7px 11px",fontSize:12.5,lineHeight:1.8,border:m.role==="user"?"none":`1px solid ${V.bd}`,whiteSpace:"pre-wrap"}}>{m.content}</div></div>)}{ld&&<div style={{fontSize:11,color:V.mt}}><span style={{animation:"pulse 1.2s infinite"}}>考え中...</span></div>}<div ref={end}/></div><div style={{padding:"6px 20px",borderTop:`1px solid ${V.bd}`,background:"#fff",display:"flex",gap:4}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();send();}}} placeholder="質問を入力..." style={{flex:1,padding:"7px 9px",fontSize:12.5,border:`1px solid ${V.bd}`,borderRadius:5,outline:"none"}}/><button onClick={send} disabled={ld||!inp.trim()} style={{padding:"7px 12px",background:ld||!inp.trim()?"#c0c7d0":`linear-gradient(135deg,${r.color},${r.color}cc)`,border:"none",borderRadius:5,cursor:"pointer"}}>{I.send(12,"#fff")}</button></div></div>);}

function PAff({u}){const[cp,setCp]=useState(false);const url=`${window.location.origin}?ref=${u?.aff||""}`;
return(<div style={{padding:"16px 22px",maxWidth:560}}><h2 style={{fontSize:16,fontWeight:800,marginBottom:10,display:"flex",alignItems:"center",gap:6}}>{I.gift(16,"#d4840a")} 紹介アフィリエイト</h2>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginBottom:12}}>{[{l:"紹介人数",v:u?.refs||0,c:V.pr},{l:"累計報酬",v:`¥${(u?.comm||0).toLocaleString()}`,c:"#059669"},{l:"報酬単価",v:"¥1,500",c:"#d4840a"}].map((s,i)=><div key={i} style={{background:"#fff",borderRadius:7,padding:11,border:`1px solid ${V.bd}`,textAlign:"center"}}><p style={{fontSize:9,color:V.mt}}>{s.l}</p><p style={{fontSize:17,fontWeight:800,color:s.c}}>{s.v}</p></div>)}</div>
<div style={{background:"#fff",borderRadius:7,padding:13,border:`1px solid ${V.bd}`}}><h3 style={{fontSize:12,fontWeight:700,marginBottom:6}}>あなたの紹介URL</h3><div style={{display:"flex",gap:4}}><input value={url} readOnly style={{flex:1,padding:"6px 8px",fontSize:10,border:`1px solid ${V.bd}`,borderRadius:4,background:V.bg,fontFamily:"monospace"}}/><button onClick={()=>{navigator.clipboard?.writeText(url);setCp(true);setTimeout(()=>setCp(false),2000);}} style={{padding:"6px 11px",fontSize:10,fontWeight:700,border:"none",borderRadius:4,cursor:"pointer",background:cp?"#059669":"linear-gradient(135deg,#1e3a5f,#2563eb)",color:"#fff"}}>{cp?"コピー済":"コピー"}</button></div><p style={{fontSize:9,color:V.mt,marginTop:4}}>コード: <b>{u?.aff}</b></p></div></div>);}

function PTk({r}){return(<div style={{padding:"16px 22px",maxWidth:420}}><h2 style={{fontSize:16,fontWeight:800,marginBottom:10}}>{I.ext(16,V.pr)} チケット購入</h2><div style={{background:"#fff",borderRadius:7,padding:14,border:`1px solid ${V.bd}`}}><p style={{fontSize:11,color:V.mt,marginBottom:10,lineHeight:1.6}}>AI機能のご利用にはチケット購入が必要です。</p><button onClick={()=>window.open("https://thebase.com","_blank")} style={{width:"100%",background:`linear-gradient(135deg,${r.color},${r.color}cc)`,border:"none",padding:10,fontSize:12,fontWeight:700,color:"#fff",cursor:"pointer",borderRadius:5}}>BASEでチケットを購入 {I.ext(11,"#fff")}</button></div></div>);}

/* ═══════════════════════════════════════════
   ADMIN AREA
   ═══════════════════════════════════════════ */
function Admin({users,user:cu,upU,go,lo}){
  const[cur,setCur]=useState("users");const[col,setCol]=useState(false);const[sel,setSel]=useState(null);
  const mems=users.filter(u=>u.role!=="admin");const pending=mems.filter(u=>!u.ok).length;
  const menu=[{hd:"管理メニュー"},{id:"users",l:"ユーザー管理",icon:"users",badge:pending||null},{id:"data",l:"申請データ管理",icon:"doc"},{id:"stats",l:"統計・レポート",icon:"chart"},{sep:true},{id:"settings",l:"システム設定",icon:"gear"}];
  return(<div style={{display:"flex",minHeight:"100vh"}}>
    <SB user={cu} lo={lo} items={menu} cur={cur} setCur={setCur} col={col} setCol={setCol}/>
    <main style={{flex:1,overflow:"auto",background:V.bg,padding:"16px 22px"}}>
      {cur==="users"&&<div>
        <h2 style={{fontSize:16,fontWeight:800,marginBottom:12}}>{I.users(16,V.pr)} ユーザー管理</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>{[{l:"総ユーザー",v:mems.length,c:V.pr,i:"users"},{l:"承認済",v:mems.filter(u=>u.ok).length,c:"#059669",i:"check"},{l:"承認待ち",v:pending,c:"#d97706",i:"clock"}].map((s,j)=><div key={j} style={{background:"#fff",borderRadius:7,padding:11,border:`1px solid ${V.bd}`,display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:5,background:s.c+"10",display:"flex",alignItems:"center",justifyContent:"center"}}>{I[s.i](13,s.c)}</div><div><p style={{fontSize:9,color:V.mt}}>{s.l}</p><p style={{fontSize:16,fontWeight:800,color:s.c}}>{s.v}</p></div></div>)}</div>
        <div style={{display:"grid",gridTemplateColumns:sel?"1fr 280px":"1fr",gap:12}}>
          <div style={{background:"#fff",borderRadius:8,border:`1px solid ${V.bd}`,overflow:"hidden"}}>{mems.map(u=><div key={u.id} onClick={()=>setSel(u)} style={{padding:"9px 13px",borderBottom:`1px solid ${V.bg}`,cursor:"pointer",background:sel?.id===u.id?V.pl:"transparent",display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:22,height:22,borderRadius:4,background:V.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.user(10,V.mt)}</div><div><p style={{fontSize:11,fontWeight:600}}>{u.nm}</p><p style={{fontSize:9,color:V.mt}}>{u.em} — {RG[u.rg]?.short||"?"}</p></div></div><span style={{fontSize:8,fontWeight:700,padding:"2px 4px",borderRadius:3,background:u.ok?"#dcfce7":"#fef9c3",color:u.ok?"#16a34a":"#ca8a04"}}>{u.ok?"承認":"待ち"}</span></div>)}{mems.length===0&&<div style={{padding:18,textAlign:"center",color:V.mt,fontSize:11}}>ユーザーなし</div>}</div>
          {sel&&<div style={{background:"#fff",borderRadius:8,border:`1px solid ${V.bd}`,padding:13}}>
            <h3 style={{fontSize:13,fontWeight:700,marginBottom:8}}>ユーザー詳細</h3>
            {[["名前",sel.nm],["メール",sel.em],["地域",RG[sel.rg]?.name||"未選択"],["紹介",`${sel.refs}件 / ¥${(sel.comm||0).toLocaleString()}`],["入力進捗",`${SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note"&&sel.fd?.[f.id]).length,0)}/${SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note").length,0)}項目`]].map(([k,v],i)=><div key={i} style={{marginBottom:5}}><p style={{fontSize:9,color:V.mt}}>{k}</p><p style={{fontSize:11,fontWeight:600}}>{v}</p></div>)}
            <button onClick={()=>{const v=!sel.ok;upU(sel.id,{ok:v});setSel({...sel,ok:v});}} style={{width:"100%",padding:7,fontSize:11,fontWeight:700,border:"none",borderRadius:4,cursor:"pointer",background:sel.ok?"#fef2f2":"#f0fdf4",color:sel.ok?"#dc2626":"#16a34a",marginBottom:8}}>{sel.ok?"承認を取り消す":"承認する"}</button>
            <p style={{fontSize:10,fontWeight:600,marginBottom:4}}>機能権限</p>
            {CATS.map(cat=>{const on=sel.perms?.[cat.id];return(<div key={cat.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${V.bg}`}}><span style={{fontSize:10,display:"flex",alignItems:"center",gap:3}}>{I[cat.icon](10,on?cat.c:V.mt)} {cat.label}</span><button onClick={()=>{const p={...sel.perms,[cat.id]:on?0:1};upU(sel.id,{perms:p});setSel({...sel,perms:p});}} style={{width:30,height:15,borderRadius:8,border:"none",cursor:"pointer",background:on?V.pr:"#d1d5db",position:"relative"}}><div style={{width:10,height:10,borderRadius:5,background:"#fff",position:"absolute",top:2.5,left:on?17:3,transition:"left .2s"}}/></button></div>);})}
          </div>}
        </div>
      </div>}
      {cur==="data"&&<div><h2 style={{fontSize:16,fontWeight:800,marginBottom:10}}>{I.doc(16,V.pr)} 申請データ管理</h2>
        <div style={{background:"#fff",borderRadius:8,border:`1px solid ${V.bd}`,overflow:"hidden"}}>{mems.filter(u=>u.ok).map(u=>{const fi=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note"&&u.fd?.[f.id]).length,0);const to=SEC.reduce((a,s)=>a+s.f.filter(f=>f.ty!=="note").length,0);return(<div key={u.id} style={{padding:"10px 14px",borderBottom:`1px solid ${V.bg}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><p style={{fontSize:11,fontWeight:600}}>{u.nm}</p><p style={{fontSize:9,color:V.mt}}>{RG[u.rg]?.name}</p></div><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:80,background:"#e8ecf1",borderRadius:3,height:4}}><div style={{height:"100%",background:fi===to?"#16a34a":V.pr,borderRadius:3,width:`${fi/to*100}%`}}/></div><span style={{fontSize:9,fontWeight:700,color:fi===to?"#16a34a":V.mt}}>{fi}/{to}</span></div></div>);})}</div>
      </div>}
      {cur==="stats"&&<div><h2 style={{fontSize:16,fontWeight:800}}>統計・レポート</h2><p style={{color:V.mt,fontSize:11,marginTop:6}}>今後実装予定</p></div>}
      {cur==="settings"&&<div><h2 style={{fontSize:16,fontWeight:800}}>システム設定</h2><p style={{color:V.mt,fontSize:11,marginTop:6}}>今後実装予定</p></div>}
    </main>
  </div>);
}
