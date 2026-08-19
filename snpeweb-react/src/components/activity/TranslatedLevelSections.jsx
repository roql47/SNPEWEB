import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Target,
  XCircle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { dataStore } from '../../lib/dataStore'
import useLevelSchedule, { mergeSchedule } from '../../hooks/useLevelSchedule'

const LINKS = {
  level1: {
    primary: 'https://www.s-ground.co.kr/course/SNPE-LEVEL-1-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8',
    secondary: 'https://pf.kakao.com/_Tqyxib',
  },
  level2: {
    friday: 'https://www.s-ground.co.kr/course/SNPE-LEVEL-2-142%EA%B8%B0-%EA%B8%88%EC%9A%94%EB%B0%98',
    saturday: 'https://www.s-ground.co.kr/course/SNPE-LEVEL-2-142%EA%B8%B0-%EA%B8%88%EC%9A%94%EB%B0%98-%EB%B3%B5%EC%A0%9C-2026-08-19%2014:38:47',
    secondary: 'http://pf.kakao.com/_Tqyxib/chat',
  },
  level3: {
    primary: 'https://www.s-ground.co.kr/InstructorCourse',
    secondary: 'http://pf.kakao.com/_Tqyxib/chat',
  },
}

const COMMON = {
  en: {
    inquiry: 'Inquiry',
    scheduleTitle: 'Education Schedule',
    apply: 'Apply',
    fridayApply: 'Friday Class Application',
    saturdayApply: 'Saturday Class Application',
    applyLevel3: 'Apply for LEVEL 3',
    scheduleMap: {
      opening: 'schedule_open',
      period: 'course_period',
      time: 'class_time',
      tuition: 'tuition',
      place: 'location',
      capacity: 'capacity_note',
    },
  },
  ja: {
    inquiry: 'お問い合わせ',
    scheduleTitle: '教育日程',
    apply: '申し込む',
    fridayApply: '金曜クラスに申し込む',
    saturdayApply: '土曜クラスに申し込む',
    applyLevel3: 'LEVEL 3 に申し込む',
    scheduleMap: {
      opening: 'schedule_open',
      period: 'course_period',
      time: 'class_time',
      tuition: 'tuition',
      place: 'location',
      capacity: 'capacity_note',
    },
  },
}

const CONTENT = {
  en: {
    level1: {
      eyebrow: 'SNPE LEVEL 1',
      title: 'Rebuild the foundation of your body in 10 weeks',
      intro: [
        'LEVEL 1 is an integrated movement program that reconnects the whole body from the feet to the pelvis, waist, back, shoulders, neck, and full-body coordination.',
        'Rather than chasing a short-term change, this course trains the body to remember stable alignment and repeatable movement habits.',
      ],
      buttons: ['Apply for LEVEL 1', 'Kakao Inquiry'],
      whyTitle: 'Why does discomfort return after it improves?',
      compare: [
        {
          title: 'Repeating Patterns',
          bad: true,
          body: 'Pain or stiffness often returns because the body keeps using the same movement pattern. The issue is not only one painful area, but the way the whole body is connected and used.',
          points: ['Pattern-focused observation', 'Daily posture awareness', 'Whole-body connection'],
        },
        {
          title: 'SNPE Approach',
          body: 'SNPE LEVEL 1 restores the basic connection of the body through repeated movement, sensory awareness, and self-recovery training.',
          points: ['Feet, pelvis, waist, back, shoulders, and neck', 'Movement habit rebuilding', 'Self-recovery foundation'],
        },
      ],
      philosophyTitle: 'Program Philosophy',
      philosophyQuote: 'The problem is not only where it hurts. It is how the body has learned to move.',
      philosophyBody:
        'LEVEL 1 is a self-recovery program designed around repetition, awareness, and movement learning. Students learn how to sense their own alignment and rebuild healthier movement patterns.',
      journeyTitle: '10 Week Journey',
      journey: [
        ['Weeks 1-4', 'Feet and Lower Body Foundation', 'Recover foot awareness, connect the lower-body chain, and rebuild walking patterns.'],
        ['Weeks 5-10', 'Pelvis and Waist', 'Restore pelvic balance, hip mobility, and core stability.'],
        ['Weeks 11-15', 'Back and Shoulders', 'Improve thoracic mobility, shoulder stability, and upper-body connection.'],
        ['Weeks 16-20', 'Neck and Full Body', 'Relieve neck tension and integrate the full body into a personal routine.'],
      ],
      experienceTitle: 'What You Will Experience',
      experience: [
        ['Tension Pattern Awareness', 'Recognize the body’s habitual tension and posture patterns.'],
        ['Movement Improvement', 'Improve the connection between the waist, back, shoulders, and neck.'],
        ['Habit Formation', 'Build repeatable movement habits that can continue in daily life.'],
      ],
      recommendTitle: 'Recommended For',
      recommend: [
        'People who want to improve posture and build a healthy body foundation.',
        'People with repeated discomfort in the waist, back, shoulders, or neck.',
        'People who want to learn how to manage their body by themselves.',
        'People interested in SNPE instructor education after LEVEL 1.',
      ],
      schedule: [
        ['opening', 'Opening', 'October 7 (Wed) opening / 10-week course'],
        ['time', 'Class Time', 'Weekday evening or weekend class'],
        ['tuition', 'Tuition', 'KRW 1,800,000'],
        ['place', 'Training Location', 'SNPE Gangnam Headquarters'],
      ],
      closingTitle: 'Start With The Foundation',
      closingBody: 'LEVEL 1 is the first step toward understanding your body and rebuilding movement from the ground up.',
    },
    level2: {
      eyebrow: 'SNPE LEVEL 2',
      title: 'From understanding movement to guiding change',
      intro: [
        'LEVEL 2 is a professional instructor course for learning how to understand body alignment and movement, then guide members in the field.',
        'The course develops practical teaching ability through theory, SNPE essential movements, lesson design, and field practice.',
      ],
      buttons: ['Friday Class Application', 'Saturday Class Application', 'Inquiry'],
      whyTitle: 'Why LEVEL 2 Matters',
      compare: [
        {
          title: 'General Exercise Education',
          bad: true,
          body: 'Many programs focus on following movements in a fixed order and checking visible results.',
          points: ['Movement memorization', 'Standardized instruction', 'Short-term results'],
        },
        {
          title: 'SNPE LEVEL 2',
          body: 'LEVEL 2 begins with understanding why the body collapses, why pain repeats, and how to guide each member differently.',
          points: ['Alignment and movement principles', 'Personalized guidance', 'Practical teaching competency'],
        },
      ],
      programTitle: '12 Week Program',
      programIntro: 'A structured course connecting theory, movement understanding, teaching practice, and field application.',
      stages: [
        ['Stage 1', 'Theory Education', 'Learn SNPE core theory and functional anatomy.'],
        ['Stage 2', 'SNPE 8 Essential Movements', 'Practice belt and tool-based conditioning systems.'],
        ['Stage 3', 'Teaching Training', 'Design and guide group and private lessons.'],
        ['Stage 4', 'Field Practice', 'Complete two weeks of practice at a professional center.'],
      ],
      curriculumTitle: 'Core Curriculum',
      curriculum: [
        ['SNPE Concept', 'Understand the philosophy, foundation, and full system of SNPE.'],
        ['Nine Core Theories', 'Study alignment, causes of imbalance, and recovery principles.'],
        ['Functional Anatomy', 'Learn the spine, pelvis, foot alignment, gait, and sensory stability.'],
        ['Teaching Method', 'Practice lesson flow, member observation, cueing, and correction.'],
        ['Field Practice', 'Experience real classes and receive instructor feedback.'],
      ],
      careerTitle: 'LEVEL 2 Career Path',
      careerBody:
        'After LEVEL 2, instructors can begin field activity as SNPE instructors and build practical capability for group lessons, private lessons, basic assessment, and member coaching.',
      skillsTitle: 'Core Competencies',
      skills: ['Basic SNPE assessment', 'Member coaching', 'Group and private lesson operation', 'Basic program design', 'Member management'],
      fieldsTitle: 'Activity Areas',
      fields: ['SNPE professional centers', 'SNPE certified studios', 'Culture and sports centers', 'Corporate and public lectures', 'SNPE ambassador activity'],
      recommendTitle: 'Recommended For',
      recommend: [
        'People who want to understand the body more deeply.',
        'Movement instructors who want practical teaching skills.',
        'People who want to guide members with personalized programs.',
        'Professionals who want to expand into SNPE instruction.',
      ],
      schedule: [
        ['opening', 'Opening', 'Nov 13 (Fri) 142nd Friday class / Nov 14 (Sat) 143rd Saturday class'],
        ['period', 'Course', '12 weeks, once a week, 84 total hours including field practice'],
        ['time', 'Class Time', '10:00-18:00 including break'],
        ['tuition', 'Tuition', 'KRW 6,500,000'],
        ['place', 'Location', 'SNPE Gangnam Headquarters'],
        ['capacity', 'Capacity', '24 people, first-come first-served'],
      ],
      closingTitle: 'Make Change Guideable',
      closingBody: 'LEVEL 2 expands your own movement experience into professional teaching capability.',
    },
    level3: {
      eyebrow: 'SNPE LEVEL 3 - Advanced SNPE Specialist',
      title: 'From instructor to specialist who designs the direction of change',
      intro: [
        'LEVEL 3 goes beyond teaching movements. It trains specialists to observe posture and movement patterns, understand the body’s connections, and design the direction of recovery.',
        'This course deepens professional analysis, program design, case study, and coaching strategy for real field application.',
      ],
      buttons: ['Apply for LEVEL 3', 'Inquiry'],
      whyTitle: 'Why LEVEL 3 Matters',
      compare: [
        {
          title: 'General Movement Instruction',
          bad: true,
          body: 'The focus is often on explaining exercises and applying a prepared program.',
          points: ['Exercise prescription', 'Program application', 'Short-term result focus'],
        },
        {
          title: 'SNPE LEVEL 3',
          body: 'LEVEL 3 begins with understanding why each member moves differently and why certain changes repeat or stop.',
          points: ['Movement pattern analysis', 'Cause-based observation', 'Personalized recovery design'],
        },
      ],
      goalsTitle: 'Education Goals',
      goals: [
        ['Movement Understanding', 'Analyze movement itself beyond posture.'],
        ['Connection Observation', 'Observe body connections and whole-body balance.'],
        ['Personalized Design', 'Design recovery directions for each member.'],
        ['Change Capability', 'Build field-based coaching skills that create actual change.'],
        ['Professional Guidance', 'Strengthen expert-level observation and coaching.'],
      ],
      curriculumTitle: 'Five Core Curriculum Areas',
      curriculum: [
        ['Alignment & Movement', 'Analyze how whole-body alignment affects movement.'],
        ['Movement Pattern Analysis', 'Evaluate gait, posture transitions, and daily movement patterns.'],
        ['Recovery Through Movement', 'Build movement-based recovery strategies.'],
        ['Program Design & Coaching', 'Integrate program design with result-focused coaching.'],
        ['Case Study', 'Analyze real cases and build a professional case portfolio.'],
      ],
      requirementsTitle: 'LEVEL 3 Requirements',
      requirements: [
        ['SNPE LEVEL 2 Completion', 'Formal completion of LEVEL 2 is required.'],
        ['Field Guidance Experience', 'Recommended for instructors with member guidance experience.'],
        ['Professional Growth Intention', 'Designed for those seeking deeper movement science learning.'],
      ],
      careerTitle: 'LEVEL 3 Career Path',
      careerBody:
        'LEVEL 3 develops advanced instructors who can analyze body type and movement, design customized programs, and build meaningful before-and-after cases.',
      skillsTitle: 'Core Competencies',
      skills: ['Advanced body assessment', 'Movement analysis', 'Pain and function-based approach', 'Customized program design', 'Case management and change records'],
      fieldsTitle: 'Professional Areas',
      fields: ['SNPE master course pathway', 'Professional center teaching', 'SNPE studio teaching', 'Corporate and public lectures', 'SNPE ambassador activity'],
      schedule: [
        ['opening', 'Opening', 'To be announced'],
        ['period', 'Course', '6 weeks, once a week, 36 total hours including field practice'],
        ['time', 'Class Time', '10:00-17:00 including break'],
        ['tuition', 'Tuition', 'KRW 3,000,000'],
        ['place', 'Location', 'SNPE Gangnam Headquarters'],
        ['capacity', 'Capacity', '24 people, first-come first-served'],
      ],
      closingTitle: 'Begin the Transition to Specialist',
      closingBody: 'LEVEL 3 is a professional course for understanding member-specific movement and designing meaningful change.',
    },
  },
  ja: {
    level1: {
      eyebrow: "SNPE LEVEL 1",
      title: "自分の体の基準をつくり直す10週間",
      intro: [
        "足から始まり、骨盤・腰・背中・肩・首・全身まで",
        "体全体を順番につなぎ直していく、10週間の統合ムーブメントプログラムです。",
        "早い変化よりも、「元に戻らない変化」をつくること——それがLEVEL 1の始まりです。",
      ],
      buttons: [
        "お申し込み",
        "KakaoTalkで相談",
      ],
      whyTitle: "なぜ、良くなってもまた戻ってしまうのでしょうか?",
      compare: [
        {
          title: "繰り返されるパターン",
          bad: true,
          body: "腰が良くなると肩が痛み、肩が良くなると今度は首がつらくなる——そんな経験。問題は特定の部位そのものよりも、体が慣れ親しんだ動作パターンにあります。",
          points: [
            "パターン中心の観察",
            "日常姿勢の認識",
            "全身のつながり",
          ],
        },
        {
          title: "SNPEのアプローチ",
          bad: false,
          body: "体はもともと、慣れたやり方へ戻ろうとします。SNPE LEVEL 1は、体全体のつながりの構造を学び直し、新しい動きの基準を体に定着させていくプロセスです。",
          points: [
            "足・骨盤・腰・背中・肩・首",
            "動きの習慣づくり",
            "セルフリカバリーの土台",
          ],
        },
      ],
      philosophyTitle: "Program Philosophy",
      philosophyQuote: "問題は「部位」ではなく、「体の使い方」です。",
      philosophyBody: "治療を受けてもまた戻り、運動をしても慣れた姿勢へ帰ってしまう理由——体が、その使い方をすでに記憶しているからです。SNPE LEVEL 1は単なる運動プログラムではなく、反復・感覚の認識・動きの学習を通じて、体そのものが正しい動きを記憶するように設計された、Self Recoveryベースのプログラムです。",
      journeyTitle: "10週間で、こう変わります",
      journey: [
        [
          "第1~4回",
          "足・下半身の土台",
          "足のアーチ感覚の回復、足底筋膜と下半身チェーンの連結、歩行パターンの調整、足と骨盤のつながりの構築",
        ],
        [
          "第5~10回",
          "骨盤・腰",
          "骨盤の前後傾の調整、左右バランスの回復、股関節の可動性アップ、中臀筋と体幹の安定化",
        ],
        [
          "第11~15回",
          "背中・肩",
          "胸椎の可動性の回復、猫背パターンの改善、肩甲骨の安定化、肩・首のつながりの回復",
        ],
        [
          "第16~20回",
          "首・全身",
          "頸椎の安定化、首の緊張の緩和、全身をつなぐルーティンの完成、パーソナルルーティンの整理",
        ],
      ],
      experienceTitle: "LEVEL 1で体験する変化",
      experience: [
        [
          "緊張パターンへの気づき",
          "体の緊張パターンに気づき、歩行と姿勢の変化を自分で実感します。",
        ],
        [
          "動きの改善",
          "腰・肩・首の動きが改善され、体全体のつながりの感覚が戻ってきます。",
        ],
        [
          "習慣づくり",
          "正しい動きの習慣が身につき、日常の動きの効率が高まります。",
        ],
      ],
      recommendTitle: "受講対象",
      recommend: [
        "姿勢を整え、健やかで品のある暮らしをつくりたい方",
        "繰り返す腰・肩・首の痛みから抜け出したい方",
        "運動と治療を繰り返しても、また不調が戻ってくる方",
        "自分の体を自分でケアする方法を学びたい方",
        "ウェルネスライフスタイルと正しい動きの習慣に関心のある方",
        "SNPE指導者課程(LEVEL 2)や専門講師教育に関心のある方",
      ],
      schedule: [
        [
          "opening",
          "開講",
          "10月7日(水)開講/10週間課程(週2回/計40時間)",
        ],
        [
          "time",
          "レッスン時間",
          "毎週水曜(19:00~21:00)/日曜(10:00~12:00)",
        ],
        [
          "tuition",
          "受講料",
          "180万ウォン",
        ],
        [
          "place",
          "会場",
          "SNPEカンナム本院",
        ],
      ],
      closingTitle: "受付のご案内",
      closingBody: "SNPE LEVEL 1は、単に「運動を学ぶ課程」ではなく、体の基準をつくり直す旅です。",
      phases: [
        {
          eyebrow: "PHASE 1 · 2",
          title: "足と骨盤から始まる変化",
          items: [
            {
              range: "第1~4回",
              title: "足・下半身の土台",
              paras: [
                "すべての変化の出発点である、足の感覚とアライメントを取り戻します。",
                "足底筋膜と下半身チェーンをつなぎ、歩行パターンを整えながら、足と骨盤のつながりを築いていきます。",
              ],
              quote: "「体の土台は、足から始まります。」",
            },
            {
              range: "第5~10回",
              title: "骨盤・腰",
              paras: [
                "体の中心である骨盤と股関節の使い方を、安定的につくり直します。",
                "左右バランスを取り戻し、中臀筋と体幹の安定化を通じて、体の中心が安定し始める期間です。",
              ],
              quote: "",
            },
          ],
        },
        {
          eyebrow: "PHASE 3 · 4",
          title: "腰から、全身の統合まで",
          items: [
            {
              range: "第11~15回",
              title: "背中・肩",
              paras: [
                "硬くなった上半身をひらき、緊張のパターンをゆるめていきます。",
                "胸椎の可動性の回復、猫背パターンの改善、肩甲骨の安定化、肩・首のつながりの回復",
              ],
              quote: "",
            },
            {
              range: "第16~20回",
              title: "首・全身",
              paras: [
                "頸椎の安定化と首の緊張の緩和を通じて、体全体をひとつの流れとしてつなぐ、最後の統合ステージです。",
                "第1回と比べたときの変化を、自分の目で確かめることになります。",
              ],
              quote: "",
            },
          ],
        },
      ],
      programBadge: "",
    },
    level2: {
      eyebrow: "SNPE LEVEL 2",
      title: "体の動きを理解する人から、人の変化を導く専門家へ",
      intro: [
        "LEVEL 2は、単に運動の動作を学ぶ課程ではありません。体のアライメントと動きを理解し、人の痛みと姿勢を見つめる基準を学び、実際の現場で会員を指導できる力を育てる、専門家課程です。",
        "SNPE LEVEL 2は、「運動を教える人」である前に、人の体を理解する人を育てる教育を目指します。",
      ],
      buttons: [
        "金曜クラスに申し込む",
        "土曜クラスに申し込む",
        "お問い合わせ",
      ],
      whyTitle: "なぜ、LEVEL 2は違うのでしょうか?",
      compare: [
        {
          title: "一般的な運動教育",
          bad: true,
          body: "動作を覚えて真似する方式に集中します。決められた順番どおりに繰り返し、形を身につけるにとどまります。",
          points: [
            "動作の暗記中心",
            "画一的な指導方式",
            "表面的な結果に集中",
          ],
        },
        {
          title: "SNPE LEVEL 2",
          bad: false,
          body: "なぜ体が崩れるのか、なぜ痛みが繰り返されるのか、なぜ同じ運動をしても結果が変わるのか——それを理解することから始めます。",
          points: [
            "体のアライメントと動きの原理の理解",
            "パーソナライズされた指導力の開発",
            "根本的な変化を導く基準の確立",
          ],
        },
      ],
      programTitle: "12週間のコアカリキュラム",
      programIntro: "LEVEL 2の教育は、単なる実習の繰り返しではなく、理論・動きの理解・ティーチング・現場での応用まで、段階的につながっていきます。",
      stages: [
        [
          "STEP 1",
          "理論教育",
          "SNPEコア理論と機能解剖学の学習",
        ],
        [
          "STEP 2",
          "SNPE 8 Essential Movements 実習",
          "ベルトとツール運動によるセルフコンディショニングシステムの実習",
        ],
        [
          "STEP 3",
          "ティーチングトレーニング",
          "グループ・パーソナルレッスンの構成と指導実習",
        ],
        [
          "STEP 4",
          "現場実習",
          "専門センターでの2週間の現場実習",
        ],
      ],
      curriculumTitle: "SNPEコア理論と動きの理解",
      curriculum: [
        [
          "SNPE概論",
          "SNPEの哲学的基盤と、システム全体への深い理解を形成します。",
        ],
        [
          "9つのコア理論",
          "体のアライメント、崩れる原因、回復の原理まで、体系的に学びます。",
        ],
        [
          "動きの回復原理",
          "理論が実際の現場指導とどうつながるのかを、実践的に習得します。",
        ],
      ],
      careerTitle: "SNPE指導者として、活動を始める",
      careerBody: "SNPE指導者として現場での活動を始めるステップです。LEVEL 2課程を通じて会員指導とティーチングの力を学び、公式指導者としてさまざまな現場で活動できる基盤を備えます。グループレッスンの指導からパーソナルレッスンの運営、基本の体型評価と会員コーチングまで、実践中心で学びます。",
      skillsTitle: "コアスキル",
      skills: [
        "SNPE基本評価",
        "会員への指導法とコーチング",
        "基本プログラムの運営",
        "パーソナル・グループレッスンの進行",
        "会員管理",
      ],
      fieldsTitle: "活動フィールド",
      fields: [
        "SNPE専門センターの運営・講師活動",
        "SNPE認定スタジオの運営・講師",
        "カルチャーセンター・スポーツセンターの講師",
        "企業・学校・官公庁への出張レッスン",
        "SNPE Ambassador(広報・販売パートナー)",
      ],
      recommendTitle: "こんな方におすすめします",
      recommend: [
        "体をもっと深く理解したい方——表面的な動作の先にある、体がなぜそう動くのかという根本原理を知りたい方",
        "運動を原理から学びたい方——暗記する教育ではなく、理解して応用できる本物の知識を求める方",
        "会員をきちんと指導したい方——1対1やグループ指導で、実質的な変化をつくり出したい運動講師",
        "ピラティス・ヨガ・フィットネスの専門性を広げたい方——これまでの専門分野に、SNPEの動きをプラスしたい方",
        "SNPE講師として成長したい方——専門センターで活動したい方、独立して活動したい方",
      ],
      schedule: [
        [
          "opening",
          "開講",
          "142期 金曜クラス 11月13日(金)/143期 土曜クラス 11月14日(土)",
        ],
        [
          "period",
          "課程",
          "全12週・週1回・計84時間(現場実習14時間を含む)",
        ],
        [
          "time",
          "レッスン時間",
          "金/土 10:00~18:00(休憩1時間を含む)",
        ],
        [
          "tuition",
          "受講料",
          "650万ウォン",
        ],
        [
          "place",
          "会場",
          "SNPEカンナム本院(ソウル市江南区ソンヌン路823、ハニャンタウン3F)",
        ],
        [
          "capacity",
          "募集定員",
          "24名限定(先着順)",
        ],
      ],
      closingTitle: "体の変化は、誰かの人生を変える始まりになります",
      closingBody: "LEVEL 2は、あなたの変化を専門性へと広げていく課程です。あなたの専門性が、誰かの人生を変える力になります。",
      programBadge: "10週間の教育+2週間の現場実習=12週間の課程",
      curriculumIntro: "SNPE概論と9つのコア理論を通じて、体のアライメントと動きの回復原理を学びます。単に「姿勢を正しくする」のではなく、体がなぜゆがみ、崩れるのかを理解するプロセスです。",
      anatomyTitle: "機能解剖学にもとづくムーブメント教育",
      anatomyIntro: "オンラインの機能解剖学課程もあわせて行われます。暗記型の解剖学ではなく、実際の会員の動きを理解するための、機能中心の解剖学教育です。",
      anatomy: [
        [
          "背骨と骨盤",
          "背骨のカーブと骨盤の位置が全身のアライメントに与える影響を、動きの視点から理解します。",
        ],
        [
          "呼吸と体幹の安定化",
          "正しい呼吸パターンが、体幹の安定化と全身の動きにどう寄与するのかを学びます。",
        ],
        [
          "足と下肢のアライメント",
          "足のアーチ構造と下肢のアライメントが全身に及ぼす連鎖的な影響を理解します。",
        ],
      ],
      essentialsTitle: "セルフコンディショニングシステム",
      essentialsIntro: "首・肩・腰・骨盤・下肢のアライメントまで、SNPEの多彩なムーブメントシステムを通じて、体のバランス回復と動きの再教育の方法を学びます。",
      essentials: [
        [
          "SNPEベルト運動",
          "SNPE専用ベルトを活用した、背骨のアライメントと姿勢ケアの運動システム。首・腰・骨盤、それぞれの部位別プロトコルを習得します。",
        ],
        [
          "SNPEツール運動",
          "多彩なSNPE専用ツールを活用し、体のアンバランスを効果的に取り戻す運動方法を学び、実習します。",
        ],
      ],
      teachingTitle: "ティーチングとレッスン構成のトレーニング",
      teachingIntro: "良い指導者とは、動作を説明するだけの人ではありません。会員の動きを観察し、必要な情報を伝え、変化を導き出せる人です。",
      teaching: [
        [
          "グループレッスンの構成法",
          "さまざまなレベルの会員のための、体系的なグループレッスン設計",
        ],
        [
          "パーソナルレッスンの構成法",
          "1:1のオーダーメイドプログラムの設計と進め方",
        ],
        [
          "ティーチング実習",
          "本番と同じ環境での、繰り返しの指導経験",
        ],
        [
          "会員の観察",
          "動作パターンの分析と、課題を見抜く力の開発",
        ],
        [
          "動作の修正",
          "ティーチングとフィードバックによる、効果的な動作修正の技術",
        ],
        [
          "レッスン運営の方法",
          "時間管理、流れの調整、レッスン環境づくりの力",
        ],
      ],
      groupTitle: "実践グループレッスン実習",
      groupIntro: "実際の会員プログラムをベースに、グループレッスンの実習を行います。学んで終わりではなく、実際に説明し、指導する経験までつなげます。実習後は講師からきめ細かなフィードバックを受け、指導力をすばやく伸ばしていきます。",
      groupLessons: [
        {
          title: "首・肩プログラム",
          desc: "現代人の代表的な悩みである首と肩の緊張をゆるめ、アライメントを取り戻すレッスンの構成と指導実習",
          img: "/images/level2/lesson-neck.png",
        },
        {
          title: "腰・骨盤プログラム",
          desc: "腰の痛みと骨盤のアンバランスを扱うプログラムの構成と、会員に合わせた指導方法の実習",
          img: "/images/level2/lesson-back.png",
        },
        {
          title: "O脚プログラム",
          desc: "下肢のアライメントの課題を扱うレッスン設計と、段階的な動作修正の指導経験",
          img: "/images/level2/lesson-leg.png",
        },
      ],
      fieldTitle: "2週間の専門センター現場実習",
      fieldIntro: "教育のあとは、SNPE専門センターでの現場実習を行います。実際のレッスン環境の中で、指導者としての感覚と姿勢を体で身につける時間です。",
      fieldwork: [
        [
          "01",
          "会員への応対",
          "実際のセンター会員とのコミュニケーション、初回カウンセリングと関係づくりの方法を経験します。",
        ],
        [
          "02",
          "レッスンの流れの理解",
          "専門講師の実際のレッスンを観察しながら、レッスン構成と流れの原理を体得します。",
        ],
        [
          "03",
          "ティーチング補助とキューイング",
          "実際のレッスン補助の役割を通じて、キューイングの方法とタイミングを現場でトレーニングします。",
        ],
        [
          "04",
          "現場フィードバック",
          "専門講師から、即時かつ具体的なフィードバックを受けながら、すばやく成長します。",
        ],
        [
          "05",
          "センター運営の方法",
          "実際の専門センターの運営構造とプログラム管理の方法を、直接体験します。",
        ],
      ],
      aimsTitle: "LEVEL 2が目指すもの",
      aimsIntro: "SNPE LEVEL 2は、単なる資格取得をゴールにしません。体を見つめる基準を学び、人の動きを理解し、現場で実際の変化をつくり出せる指導者を育てます。",
      aims: [
        [
          "基準を立てる",
          "体を見つめる明確な分析基準と視点を備えた専門家へと成長します。",
        ],
        [
          "動きを理解する",
          "人の動作パターンを読み取り、その原因をとらえる深い理解力を育てます。",
        ],
        [
          "変化をつくる",
          "理論と実習が統合された力で、会員の実質的で続く変化を導きます。",
        ],
      ],
      durationCards: [
        [
          "10週間",
          "教育課程",
          "理論から実習まで、体系的なカリキュラム",
        ],
        [
          "2週間",
          "現場実習",
          "専門センターでの実践経験",
        ],
        [
          "12週間",
          "総教育期間",
          "完成された指導者を育てる集中課程",
        ],
      ],
    },
    level3: {
      eyebrow: "SNPE LEVEL 3 · Advanced SNPE Specialist",
      title: "動きを理解する指導者から、変化の方向を設計する専門家へ",
      intro: [
        "LEVEL 3は、単に運動を指導する課程を超えて、会員の姿勢と動きを観察し、体のつながりと動作パターンを理解し、実際の変化をつくり出せる専門指導者へと成長する課程です。",
        "SNPEは、体を部分でとらえません。足から骨盤、背骨、呼吸、そして日常の動きの習慣までつながった、ひとつのムーブメントシステムとして理解します。LEVEL 3は、会員のいまの状態をより深く理解し、動きの回復の方向を設計できる専門家を育てます。",
      ],
      buttons: [
        "LEVEL 3に申し込む",
        "お問い合わせ",
      ],
      whyTitle: "なぜ、LEVEL 3は違うのでしょうか?",
      compare: [
        {
          title: "一般的な運動指導",
          bad: true,
          body: "運動の方法を説明し、決められたプログラムを当てはめることに集中します。",
          points: [
            "運動処方中心",
            "プログラム適用中心",
            "短期の結果中心",
          ],
        },
        {
          title: "SNPE LEVEL 3",
          bad: false,
          body: "会員がなぜそう動くのか、なぜ同じ運動をしても結果が異なるのか、なぜ変化が繰り返されたり止まったりするのか——それを理解することから始めます。",
          points: [
            "動作パターンの理解",
            "変化の原因の観察",
            "一人ひとりの回復の方向の設計",
          ],
        },
      ],
      goalsTitle: "LEVEL 3の教育目標",
      goals: [
        [
          "動きの理解",
          "姿勢を超えて、動きそのものを理解し分析する視点を備えます。",
        ],
        [
          "つながりの観察",
          "動きのつながりと体のバランスを、体系的に観察・評価します。",
        ],
        [
          "一人ひとりの設計",
          "会員ごとの動きの回復の方向を、パーソナライズして戦略的に設計します。",
        ],
        [
          "変化をつくる力",
          "実際の変化事例をつくり出せる、現場中心の指導力を築きます。",
        ],
        [
          "専門的な指導力",
          "SNPE専門家としての観察力とコーチング指導力を、さらに深めていきます。",
        ],
      ],
      curriculumTitle: "5つのコアカリキュラム",
      curriculum: [
        [
          "アライメントと動きのつながり",
          "身体のアライメントが、動き全体の仕組みにどう影響するのかを深く分析します。構造的なアライメントと機能的な動きの相互作用を理解し、臨床的に応用する力を育てます。",
        ],
        [
          "動作パターンの理解",
          "歩行、姿勢の切り替え、日常動作の中に隠れた動作パターンを、体系的に評価・分類します。代償パターンと機能的な制限を見抜く、専門的な観察の枠組みを確立します。",
        ],
        [
          "動きにもとづく回復戦略",
          "受け身のケアから、能動的な動きの回復へと切り替える戦略を学びます。一人ひとりの回復段階に合わせた、オーダーメイドのムーブメント処方の原理を体系的に習得します。",
        ],
        [
          "変化をつくる指導",
          "データにもとづくプログラム設計と、結果を重視したコーチング戦略を統合します。短期的な修正を超えて、長期的な動きの変化を導き出す、専門的な指導の仕組みを築きます。",
        ],
        [
          "実際の変化事例の研究",
          "現場で集められた実際の会員事例を分析し、動きの回復プロセスを批判的に検討します。自分だけの専門事例ポートフォリオを築く力を育てます。",
        ],
      ],
      requirementsTitle: "LEVEL 3の受講要件",
      requirements: [
        [
          "SNPE Level 2修了",
          "Level 2課程の正式な修了者",
        ],
        [
          "LEVEL 3はSNPE LEVEL 2修了者を対象とし、現場での指導経験を持つ専門家に最適化されています。",
          "",
        ],
        [
          "専門性を広げる意志",
          "ムーブメントサイエンスを深く学ぶ意志",
        ],
      ],
      careerTitle: "変化をつくり出す専門指導者",
      careerBody: "会員の実際の変化をつくり出す、専門指導者の課程です。LEVEL 3は、単に動作を教える講師ではなく、体型と動きを分析し、実質的なBefore & Afterの事例をつくり出せる専門指導者を育てます。痛みや機能の課題にアプローチし、長期の会員コーチングとオーダーメイドプログラムの設計力を備えていきます。",
      skillsTitle: "コアスキル",
      skills: [],
      fieldsTitle: "活動フィールド",
      fields: [
        "SNPEマスター講師",
        "SNPE専門センターの運営・中核講師",
        "SNPE STUDIOの運営・中核講師",
        "出張レッスン(企業・学校・官公庁・カルチャー・スポーツセンターなど)",
        "SNPE Ambassador(広報・販売パートナー)",
      ],
      schedule: [
        [
          "opening",
          "開講",
          "未定(追ってお知らせ)",
        ],
        [
          "period",
          "課程",
          "全6週・週1回・計36時間(現場実習14時間を含む)",
        ],
        [
          "time",
          "レッスン時間",
          "金/土 10:00~17:00(休憩1時間を含む)",
        ],
        [
          "tuition",
          "受講料",
          "300万ウォン",
        ],
        [
          "place",
          "会場",
          "SNPEカンナム本院(ソウル市江南区ソンヌン路823、ハニャンタウン3F)",
        ],
        [
          "capacity",
          "募集定員",
          "24名限定(先着順)",
        ],
      ],
      closingTitle: "いま、専門家への転換を始めてください",
      closingBody: "LEVEL 3は、動作を教える課程を超えて、会員一人ひとりの動きを理解し、変化を設計する専門家課程です。単なる技術の向上ではなく、専門家としての思考の枠組みと臨床的な力を完成させる課程です。",
      goalsIntro: "専門指導者として備えるべき5つのコアスキルを、体系的に育てます。",
      curriculumIntro: "臨床にもとづくムーブメントサイエンスを中心に構成された、LEVEL 3専門教育課程です。",
      integratedTitle: "専門領域——統合ムーブメントシステム",
      integratedIntro: "人体は、ばらばらの部位の集合ではなく、ひとつの統合されたムーブメントシステムです。LEVEL 3は、それぞれの身体領域のつながりを読み取り、SNPEの運動をより深く活用する視点を育てます。",
      integrated: [
        [
          "つながりの理解",
          "人体は、ばらばらの部位の集合ではなく、ひとつの統合システム",
        ],
        [
          "パターン分析",
          "それぞれの身体領域のつながりが、動き全体に及ぼす影響の把握",
        ],
        [
          "専門家の視点",
          "SNPEの運動を深く活用する、専門家としての力の開発",
        ],
      ],
      integratedNote: "このつながりを読み取ること——それが、SNPE LEVEL 3専門家の始まりです。",
      specialistsTitle: "Movement Specialist",
      specialists: [
        [
          "Spine Movement Specialist",
          "背骨のアライメントと動作パターンを分析し、正しい姿勢とバランスの取れた動きのために、一人ひとりの体型特性に合わせたSNPEソリューションを提供します。",
        ],
        [
          "Neck Movement Specialist",
          "首と肩の動きのつながりを分析し、一人ひとりの習慣に合わせて、楽な動きと自然なアライメントの回復のためのSNPEソリューションを提供します。",
        ],
        [
          "Pelvis Movement Specialist",
          "骨盤と体の中心のバランスを評価し、安定した姿勢と動きのための、パーソナライズされたSNPEソリューションを提供します。",
        ],
        [
          "Foot Movement Specialist",
          "一人ひとりの足の構造と歩行パターンを分析し、体のバランスの出発点である足の機能回復のためのSNPEソリューションを提供します。",
        ],
      ],
      whyNote: "体の動きを見つめる基準が変わるとき、会員の変化も変わります。",
    },
  },
}

const levelImages = {
  level1: {
    why: '/images/level1/why.png',
    philosophy: '/images/level1/philosophy.png',
    benefits: '/images/level1/benefits.jpg',
  },
  level2: {
    why: '/images/level2/why.png',
    philosophy: '/images/level2/philosophy.png',
    recommend: '/images/level2/recommend.png',
    schedule: '/images/level2/schedule.png',
  },
}

function langKey(i18n) {
  const lang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0]
  return lang === 'ja' ? 'ja' : 'en'
}

function SectionHeader({ eyebrow, title, children, light = false }) {
  return (
    <div className="text-center mb-10 md:mb-12">
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-[0.3em] uppercase mb-3 ${light ? 'text-white/70' : 'text-snpe-dark'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-2xl md:text-3xl font-bold leading-snug ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      {children && <div className={`mt-4 max-w-2xl mx-auto leading-relaxed ${light ? 'text-white/85' : 'text-gray-600'}`}>{children}</div>}
    </div>
  )
}

function CTAButton({ href, children, variant = 'primary' }) {
  const primary = variant === 'primary'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-medium transition-colors ${
        primary
          ? 'bg-snpe-darker text-white hover:bg-snpe-dark'
          : 'bg-white border border-gray-200 text-gray-700 hover:border-snpe-dark'
      }`}
    >
      {variant === 'secondary' && <MessageCircle size={16} />}
      {children}
    </a>
  )
}

function CompareCards({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item) => {
        const Icon = item.bad ? XCircle : CheckCircle2
        return (
          <div
            key={item.title}
            className={`rounded-2xl p-7 border ${
              item.bad ? 'bg-gray-50 border-gray-100' : 'bg-mint-lighter/40 border-snpe/20'
            }`}
          >
            <h3 className={`font-bold mb-3 ${item.bad ? 'text-gray-900' : 'text-snpe-dark'}`}>{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.body}</p>
            <ul className="space-y-2 text-sm text-gray-600">
              {item.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <Icon size={16} className={`${item.bad ? 'text-gray-300' : 'text-snpe-dark'} flex-shrink-0`} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

function ScheduleBox({ level, rows, c }) {
  const edu = useLevelSchedule(level)
  const labelMap = Object.fromEntries(rows.map(([key, label]) => [label, c.scheduleMap[key]]))
  const scheduleRows = mergeSchedule(
    rows.map(([, label, value]) => ({ label, value })),
    edu,
    labelMap
  )

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader title={`${level.toUpperCase().replace('LEVEL', 'LEVEL ')} ${c.scheduleTitle}`} />
        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
          {scheduleRows.map((row) => (
            <div key={row.label} className="flex flex-col sm:flex-row sm:items-center px-6 py-4">
              <span className="w-36 flex-shrink-0 text-sm font-bold text-snpe-dark flex items-center gap-2">
                <ClipboardCheck size={14} /> {row.label}
              </span>
              <span className="text-sm text-gray-700">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ListCard({ title, items, bullet = 'check' }) {
  return (
    <div className="bg-white rounded-2xl p-7 border border-gray-100">
      <h4 className="font-bold text-gray-900 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
            {bullet === 'check' ? (
              <CheckCircle2 size={16} className="text-snpe-dark flex-shrink-0 mt-0.5" />
            ) : (
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-snpe-dark flex-shrink-0" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TranslatedLevelSections({ level }) {
  const { i18n } = useTranslation()
  const lang = langKey(i18n)
  const copy = CONTENT[lang][level]
  const c = COMMON[lang]

  // 어드민 "교육과정 페이지 관리"의 신청 링크·혜택 이미지를 en/ja 페이지에도 반영
  const [admin, setAdmin] = useState(null)
  useEffect(() => {
    dataStore.getPageContent(level).then(setAdmin).catch(() => setAdmin(null))
  }, [level])

  const links = {
    ...LINKS[level],
    ...(admin?.apply_url ? { primary: admin.apply_url } : null),
    ...(admin?.apply_url_friday ? { friday: admin.apply_url_friday } : null),
    ...(admin?.apply_url_saturday ? { saturday: admin.apply_url_saturday } : null),
  }
  const benefitsImage = admin?.benefits_image_url || levelImages.level1.benefits

  if (!copy) return null

  if (level === 'level1') {
    return (
      <div className="bg-white">
        <section className="py-20 md:py-24 bg-gradient-to-b from-snpe-light/60 via-white to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-snpe-dark mb-4 uppercase">{copy.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-snpe-darker leading-[1.25]">{copy.title}</h2>
            <div className="mt-6 space-y-3 text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {copy.intro.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <CTAButton href={links.primary}>{copy.buttons[0]}</CTAButton>
              <CTAButton href={links.secondary} variant="secondary">{copy.buttons[1]}</CTAButton>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="WHY LEVEL 1" title={copy.whyTitle} />
            <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-square bg-gray-100">
                <img src={levelImages.level1.why} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CompareCards items={copy.compare} />
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${levelImages.level1.philosophy})` }} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-snpe-darker/85 via-snpe-darker/70 to-snpe-darker/50" aria-hidden="true" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-white">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70 mb-4">{copy.philosophyTitle}</p>
            <blockquote className="border-l-4 border-snpe-light pl-6 py-2 text-2xl md:text-4xl font-bold leading-snug max-w-3xl">
              {copy.philosophyQuote}
            </blockquote>
            <p className="mt-8 text-white/85 leading-relaxed md:text-lg max-w-3xl">{copy.philosophyBody}</p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="10 WEEK JOURNEY" title={copy.journeyTitle} />
            <ol className="relative border-l-2 border-snpe-dark/20 ml-5 md:ml-10 space-y-8">
              {copy.journey.map(([range, title, desc], i) => (
                <li key={title} className="relative pl-8 md:pl-12">
                  <span className="absolute -left-[22px] top-0 w-11 h-11 rounded-full bg-snpe-darker text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="bg-snpe-light/50 border border-snpe-dark/10 rounded-2xl p-6">
                    <span className="inline-block text-xs font-semibold text-snpe-dark tracking-wider uppercase mb-2">{range}</span>
                    <h3 className="text-lg font-bold text-snpe-darker mb-2">{title}</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {Array.isArray(copy.phases) && copy.phases.length > 0 && (
          <section className="py-16 md:py-24 bg-mint-lighter/20">
            <div className="max-w-5xl mx-auto px-4 space-y-16">
              {copy.phases.map((phase) => (
                <div key={phase.title}>
                  <SectionHeader eyebrow={phase.eyebrow} title={phase.title} />
                  <div className="grid md:grid-cols-2 gap-6">
                    {(phase.items || []).map((item) => (
                      <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                        <span className="text-xs font-semibold text-snpe-dark tracking-wider">{item.range}</span>
                        <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                          {(item.paras || []).map((p) => <p key={p}>{p}</p>)}
                        </div>
                        {item.quote && (
                          <p className="mt-4 text-sm font-medium text-snpe-dark italic">{item.quote}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="EXPERIENCE" title={copy.experienceTitle} />
            <div className="grid md:grid-cols-3 gap-5">
              {copy.experience.map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <Activity size={22} className="text-snpe-dark mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
              <img src={benefitsImage} alt="" className="w-full h-auto block" loading="lazy" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{copy.recommendTitle}</h2>
              <ul className="space-y-3">
                {copy.recommend.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <CheckCircle2 size={18} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <ScheduleBox level="level1" rows={copy.schedule} c={c} />
        <Closing title={copy.closingTitle} body={copy.closingBody} actions={<CTAButton href={links.primary}>{copy.buttons[0]} <ArrowRight size={16} /></CTAButton>} />
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-mint-lighter/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-snpe-dark/10 text-snpe-dark text-xs font-bold mb-5">
            {copy.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">{copy.title}</h2>
          <div className="space-y-3 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {copy.intro.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {level === 'level2' ? (
              <>
                <CTAButton href={links.friday}>{copy.buttons[0]}</CTAButton>
                <CTAButton href={links.saturday}>{copy.buttons[1]}</CTAButton>
                <CTAButton href={links.secondary} variant="secondary">{copy.buttons[2]}</CTAButton>
              </>
            ) : (
              <>
                <CTAButton href={links.primary}>{copy.buttons[0]}</CTAButton>
                <CTAButton href={links.secondary} variant="secondary">{copy.buttons[1]}</CTAButton>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow={`WHY ${level.toUpperCase().replace('LEVEL', 'LEVEL ')}`} title={copy.whyTitle} />
          {levelImages[level]?.why && (
            <div className="rounded-3xl overflow-hidden shadow-md mb-10 max-h-[420px] bg-gray-100">
              <img src={levelImages[level].why} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          )}
          <CompareCards items={copy.compare} />
        </div>
      </section>

      {level === 'level2' ? <Level2Body copy={copy} /> : <Level3Body copy={copy} />}

      <ScheduleBox level={level} rows={copy.schedule} c={c} />
      <Closing
        title={copy.closingTitle}
        body={copy.closingBody}
        actions={
          level === 'level2' ? (
            <>
              <CTAButton href={links.friday}>{c.fridayApply} <ArrowRight size={16} /></CTAButton>
              <CTAButton href={links.saturday}>{c.saturdayApply} <ArrowRight size={16} /></CTAButton>
            </>
          ) : (
            <CTAButton href={links.primary}>{c.applyLevel3} <ArrowRight size={16} /></CTAButton>
          )
        }
      />
    </div>
  )
}

function Level2Body({ copy }) {
  return (
    <>
      {copy.programBadge && (
        <section className="py-8 bg-snpe-darker text-white text-center">
          <p className="text-sm md:text-base font-semibold tracking-wide">{copy.programBadge}</p>
        </section>
      )}

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="12 WEEK PROGRAM" title={copy.programTitle}>
            <p>{copy.programIntro}</p>
          </SectionHeader>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.stages.map(([step, title, desc], i) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <span className="w-9 h-9 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </span>
                <p className="text-xs text-snpe-dark font-semibold mb-1">{step}</p>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          {Array.isArray(copy.durationCards) && copy.durationCards.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {copy.durationCards.map(([num, title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-snpe/20 text-center">
                  <p className="text-2xl font-bold text-snpe-dark mb-1">{num}</p>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center mb-12">
            <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
              <img src={levelImages.level2.philosophy} alt="" className="w-full h-auto block" loading="lazy" />
            </div>
            <SectionHeader eyebrow="PROGRAM PHILOSOPHY" title={copy.curriculumTitle}>
              {copy.curriculumIntro && <p>{copy.curriculumIntro}</p>}
            </SectionHeader>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {copy.curriculum.map(([title, desc]) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4">
                <BookOpen size={22} className="text-snpe-dark flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {copy.anatomy && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="ONLINE CURRICULUM" title={copy.anatomyTitle}>
              {copy.anatomyIntro && <p>{copy.anatomyIntro}</p>}
            </SectionHeader>
            <div className="grid md:grid-cols-3 gap-5">
              {copy.anatomy.map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy.essentials && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="SNPE 8 ESSENTIAL MOVEMENTS" title={copy.essentialsTitle}>
              {copy.essentialsIntro && <p>{copy.essentialsIntro}</p>}
            </SectionHeader>
            <div className="grid md:grid-cols-2 gap-5">
              {copy.essentials.map(([title, desc]) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <Activity size={22} className="text-snpe-dark mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy.teaching && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="TEACHING TRAINING" title={copy.teachingTitle}>
              {copy.teachingIntro && <p>{copy.teachingIntro}</p>}
            </SectionHeader>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {copy.teaching.map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy.groupLessons && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="GROUP LESSON PRACTICE" title={copy.groupTitle}>
              {copy.groupIntro && <p>{copy.groupIntro}</p>}
            </SectionHeader>
            <div className="grid md:grid-cols-3 gap-5">
              {copy.groupLessons.map((lesson) => (
                <div key={lesson.title} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  {lesson.img && (
                    <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                      <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 mb-2">{lesson.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{lesson.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy.fieldwork && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="FIELD PRACTICE" title={copy.fieldTitle}>
              {copy.fieldIntro && <p>{copy.fieldIntro}</p>}
            </SectionHeader>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {copy.fieldwork.map(([num, title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100">
                  <p className="text-snpe-dark font-bold text-sm mb-2">{num}</p>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {copy.aims && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader title={copy.aimsTitle}>
              {copy.aimsIntro && <p>{copy.aimsIntro}</p>}
            </SectionHeader>
            <div className="grid md:grid-cols-3 gap-5">
              {copy.aims.map(([title, desc]) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <Target size={22} className="text-snpe-dark mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CareerAndRecommend copy={copy} image={levelImages.level2.recommend} />
    </>
  )
}

function Level3Body({ copy }) {
  return (
    <>
      {copy.whyNote && (
        <section className="py-8 bg-mint-lighter/40">
          <p className="max-w-3xl mx-auto px-4 text-center text-sm md:text-base text-gray-700 font-medium leading-relaxed">
            {copy.whyNote}
          </p>
        </section>
      )}

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="EDUCATION GOALS" title={copy.goalsTitle}>
            {copy.goalsIntro && <p>{copy.goalsIntro}</p>}
          </SectionHeader>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {copy.goals.map(([title, desc]) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <Target size={22} className="text-snpe-dark mb-3" />
                <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="CORE CURRICULUM" title={copy.curriculumTitle}>
            {copy.curriculumIntro && <p>{copy.curriculumIntro}</p>}
          </SectionHeader>
          <div className="space-y-4">
            {copy.curriculum.map(([title, desc], i) => (
              <div key={title} className="flex flex-col sm:flex-row gap-5 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4 sm:w-72 flex-shrink-0">
                  <span className="w-10 h-10 rounded-full bg-snpe-darker text-white text-sm flex items-center justify-center font-bold flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-xs text-snpe-dark font-semibold">LEVEL 3</p>
                    <h4 className="font-bold text-gray-900">{title}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {copy.integrated && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="INTEGRATED MOVEMENT SYSTEM" title={copy.integratedTitle}>
              {copy.integratedIntro && <p>{copy.integratedIntro}</p>}
            </SectionHeader>
            <div className="grid md:grid-cols-3 gap-5">
              {copy.integrated.map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            {copy.integratedNote && (
              <p className="mt-8 text-center text-sm font-medium text-snpe-dark">{copy.integratedNote}</p>
            )}
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="LEVEL 2 vs. LEVEL 3" title={copy.requirementsTitle} />
          <div className="grid sm:grid-cols-3 gap-5">
            {copy.requirements.map(([title, desc]) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <CheckCircle2 size={20} className="text-snpe-dark mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {copy.specialists && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <SectionHeader eyebrow="SPECIALIST PATH" title={copy.specialistsTitle || 'Movement Specialist'} />
            <div className="grid md:grid-cols-2 gap-5">
              {copy.specialists.map(([title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CareerAndRecommend copy={copy} />
    </>
  )
}

function CareerAndRecommend({ copy, image }) {
  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="CAREER PATH" title={copy.careerTitle}>
            <p>{copy.careerBody}</p>
          </SectionHeader>
          <div className="grid md:grid-cols-2 gap-6">
            <ListCard title={copy.skillsTitle} items={copy.skills} />
            <ListCard title={copy.fieldsTitle} items={copy.fields} bullet="dot" />
          </div>
        </div>
      </section>

      {copy.recommend && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <SectionHeader title={copy.recommendTitle} />
            <div className={image ? 'grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center' : ''}>
              {image && (
                <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
                  <img src={image} alt="" className="w-full h-auto block" loading="lazy" />
                </div>
              )}
              <ul className="space-y-3">
                {copy.recommend.map((item) => (
                  <li key={item} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100">
                    <CheckCircle2 size={18} className="text-snpe-dark flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function Closing({ title, body, actions }) {
  return (
    <section className="py-16 md:py-24 bg-snpe-darker text-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-xs font-semibold tracking-[0.3em] text-white/70 mb-4">CLOSING</p>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">{title}</h2>
        <p className="text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">{actions}</div>
      </div>
    </section>
  )
}
