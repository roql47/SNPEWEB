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
import { useTranslation } from 'react-i18next'
import useLevelSchedule, { mergeSchedule } from '../../hooks/useLevelSchedule'

const LINKS = {
  level1: {
    primary: 'https://www.s-ground.co.kr/course/Level-1',
    secondary: 'https://pf.kakao.com/_Tqyxib',
  },
  level2: {
    friday: 'https://www.s-ground.co.kr/course/SNPE-LEVEL-2-140%EA%B8%B0-%EA%B8%88%EC%9A%94',
    saturday: 'https://www.s-ground.co.kr/course/SNPE-LEVEL-2-141%EA%B8%B0-%ED%86%A0%EC%9A%94%EB%B0%98',
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
        ['opening', 'Opening', 'June 24 opening / 10-week course'],
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
        ['opening', 'Opening', 'July 3 Friday class / July 4 Saturday class'],
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
      eyebrow: 'SNPE LEVEL 1',
      title: '身体の土台を10週間でつくり直す',
      intro: [
        'LEVEL 1は、足から骨盤、腰、背中、肩、首、全身の連動までを再接続する統合型ムーブメントプログラムです。',
        '一時的な変化ではなく、安定したアライメントと繰り返せる動きの習慣を身体に覚えさせます。',
      ],
      buttons: ['LEVEL 1 に申し込む', 'カカオで問い合わせ'],
      whyTitle: 'なぜ良くなっても不調が戻るのか',
      compare: [
        {
          title: '繰り返されるパターン',
          bad: true,
          body: '痛みやこわばりが戻る理由は、身体が同じ動きのパターンを使い続けるためです。問題は一部位だけではなく、全身のつながり方にあります。',
          points: ['パターン中心の観察', '日常姿勢の認識', '全身のつながり'],
        },
        {
          title: 'SNPEのアプローチ',
          body: 'SNPE LEVEL 1は、反復運動、感覚認知、セルフリカバリーを通じて身体の基本的な連動を回復します。',
          points: ['足・骨盤・腰・背中・肩・首', '動きの習慣づくり', 'セルフリカバリーの土台'],
        },
      ],
      philosophyTitle: 'プログラム哲学',
      philosophyQuote: '問題は痛む場所だけではありません。身体が覚えてしまった動き方です。',
      philosophyBody:
        'LEVEL 1は、反復、認識、動きの学習を軸にしたセルフリカバリープログラムです。自分のアライメントを感じ、より健康的な動きのパターンを再構築します。',
      journeyTitle: '10週間の流れ',
      journey: [
        ['1-4週', '足と下半身の土台', '足の感覚を回復し、下半身の連動と歩行パターンをつくります。'],
        ['5-10週', '骨盤と腰', '骨盤バランス、股関節の可動性、体幹安定性を回復します。'],
        ['11-15週', '背中と肩', '胸椎の可動性、肩の安定性、上半身の連動を高めます。'],
        ['16-20週', '首と全身統合', '首の緊張を和らげ、全身を個別ルーティンとして統合します。'],
      ],
      experienceTitle: '体験できる変化',
      experience: [
        ['緊張パターンの認識', '身体に残った緊張と姿勢の癖を認識します。'],
        ['動きの改善', '腰、背中、肩、首のつながりを改善します。'],
        ['習慣化', '日常でも続けられる動きの習慣をつくります。'],
      ],
      recommendTitle: 'このような方におすすめ',
      recommend: [
        '姿勢を整え、健康な身体の土台をつくりたい方。',
        '腰、背中、肩、首の不快感が繰り返される方。',
        '自分の身体を自分で管理する方法を学びたい方。',
        'LEVEL 1後にSNPE指導者教育へ進みたい方。',
      ],
      schedule: [
        ['opening', '開講', '6月24日開講 / 10週間コース'],
        ['time', '授業時間', '平日夜または週末クラス'],
        ['tuition', '受講料', '180万ウォン'],
        ['place', '場所', 'SNPE江南本院'],
      ],
      closingTitle: '土台から始めましょう',
      closingBody: 'LEVEL 1は、自分の身体を理解し、動きを土台からつくり直す最初のステップです。',
    },
    level2: {
      eyebrow: 'SNPE LEVEL 2',
      title: '動きを理解する人から、変化を導く専門家へ',
      intro: [
        'LEVEL 2は、身体のアライメントと動きを理解し、現場で会員を指導する力を養う専門指導者課程です。',
        '理論、SNPE基本動作、レッスン設計、現場実習を通じて実践的な指導力を育てます。',
      ],
      buttons: ['金曜クラスに申し込む', '土曜クラスに申し込む', 'お問い合わせ'],
      whyTitle: 'なぜLEVEL 2が必要なのか',
      compare: [
        {
          title: '一般的な運動教育',
          bad: true,
          body: '決められた順序で動きを真似し、見える結果を確認することに集中しがちです。',
          points: ['動作の暗記', '標準化された指導', '短期結果中心'],
        },
        {
          title: 'SNPE LEVEL 2',
          body: '身体がなぜ崩れるのか、痛みがなぜ繰り返されるのか、一人ひとりをどう導くのかを理解することから始めます。',
          points: ['アライメントと動きの原理', '個別指導力', '実践的なティーチング'],
        },
      ],
      programTitle: '12週間プログラム',
      programIntro: '理論、動きの理解、指導練習、現場適用までを段階的につなげます。',
      stages: [
        ['1段階', '理論教育', 'SNPEの核心理論と機能解剖を学びます。'],
        ['2段階', 'SNPE 8 Essential Movements', 'ベルトとツールを使ったコンディショニングシステムを練習します。'],
        ['3段階', '指導練習', 'グループ・個人レッスンを設計し指導します。'],
        ['4段階', '現場実習', '専門センターで2週間の実習を行います。'],
      ],
      curriculumTitle: '主要カリキュラム',
      curriculum: [
        ['SNPE概念', 'SNPEの哲学、基盤、全体システムを理解します。'],
        ['9つの核心理論', 'アライメント、不均衡の原因、回復原理を学びます。'],
        ['機能解剖', '脊柱、骨盤、足のアライメント、歩行、感覚安定性を学びます。'],
        ['指導法', 'レッスンの流れ、会員観察、キューイング、修正を練習します。'],
        ['現場実習', '実際の授業を経験し、講師のフィードバックを受けます。'],
      ],
      careerTitle: 'LEVEL 2 キャリアパス',
      careerBody:
        'LEVEL 2修了後は、SNPE指導者として現場活動を始め、グループレッスン、個人レッスン、基本評価、会員コーチングの実践力を身につけます。',
      skillsTitle: '習得能力',
      skills: ['SNPE基本評価', '会員コーチング', 'グループ・個人レッスン運営', '基本プログラム設計', '会員管理'],
      fieldsTitle: '活動分野',
      fields: ['SNPE専門センター', 'SNPE認証スタジオ', '文化・体育センター', '企業・公共機関講座', 'SNPEアンバサダー活動'],
      recommendTitle: 'このような方におすすめ',
      recommend: [
        '身体をより深く理解したい方。',
        '実践的な指導力を高めたい運動指導者。',
        '個別プログラムで会員を導きたい方。',
        'SNPE指導分野へ専門性を広げたい方。',
      ],
      schedule: [
        ['opening', '開講', '7月3日 金曜クラス / 7月4日 土曜クラス'],
        ['period', '課程', '12週間、週1回、現場実習を含む計84時間'],
        ['time', '授業時間', '10:00-18:00 休憩含む'],
        ['tuition', '受講料', '650万ウォン'],
        ['place', '場所', 'SNPE江南本院'],
        ['capacity', '定員', '24名、先着順'],
      ],
      closingTitle: '変化を導ける力へ',
      closingBody: 'LEVEL 2は、自分の動きの経験を専門的な指導力へ広げる課程です。',
    },
    level3: {
      eyebrow: 'SNPE LEVEL 3 - Advanced SNPE Specialist',
      title: '指導者から、変化の方向を設計する専門家へ',
      intro: [
        'LEVEL 3は動作を教える段階を超え、姿勢と動きのパターンを観察し、身体のつながりを理解して回復の方向を設計する専門家を育成します。',
        '現場で使える専門分析、プログラム設計、ケーススタディ、コーチング戦略を深めます。',
      ],
      buttons: ['LEVEL 3 に申し込む', 'お問い合わせ'],
      whyTitle: 'なぜLEVEL 3が必要なのか',
      compare: [
        {
          title: '一般的な運動指導',
          bad: true,
          body: '運動方法を説明し、準備されたプログラムを適用することに集中しがちです。',
          points: ['運動処方中心', 'プログラム適用中心', '短期結果中心'],
        },
        {
          title: 'SNPE LEVEL 3',
          body: '会員ごとに動きがなぜ違うのか、変化がなぜ止まったり繰り返されたりするのかを理解することから始めます。',
          points: ['動きのパターン分析', '原因中心の観察', '個別回復設計'],
        },
      ],
      goalsTitle: '教育目標',
      goals: [
        ['動きの理解', '姿勢を超えて動きそのものを分析します。'],
        ['連動の観察', '身体のつながりと全身バランスを観察します。'],
        ['個別設計', '会員ごとの回復方向を設計します。'],
        ['変化をつくる力', '実際の変化を導く現場型コーチングを育てます。'],
        ['専門指導力', '専門家としての観察力とコーチングを強化します。'],
      ],
      curriculumTitle: '5つの核心カリキュラム',
      curriculum: [
        ['Alignment & Movement', '全身のアライメントが動きに与える影響を分析します。'],
        ['Movement Pattern Analysis', '歩行、姿勢転換、日常動作のパターンを評価します。'],
        ['Recovery Through Movement', '動きに基づく回復戦略を構築します。'],
        ['Program Design & Coaching', 'プログラム設計と結果中心のコーチングを統合します。'],
        ['Case Study', '実際のケースを分析し、専門的なケースポートフォリオを構築します。'],
      ],
      requirementsTitle: 'LEVEL 3 受講条件',
      requirements: [
        ['SNPE LEVEL 2 修了', 'LEVEL 2の正式修了が必要です。'],
        ['現場指導経験', '会員指導経験のある指導者におすすめです。'],
        ['専門性拡張の意思', 'ムーブメントサイエンスを深く学びたい方に適しています。'],
      ],
      careerTitle: 'LEVEL 3 キャリアパス',
      careerBody:
        'LEVEL 3は、体型と動きを分析し、個別プログラムを設計し、意味あるBefore & Afterケースをつくれる上級指導者を育成します。',
      skillsTitle: '習得能力',
      skills: ['高度な体型評価', '動きの分析', '痛みと機能問題へのアプローチ', '個別プログラム設計', 'ケース管理と変化記録'],
      fieldsTitle: '専門活動分野',
      fields: ['SNPEマスター課程への進路', '専門センター指導', 'SNPEスタジオ指導', '企業・公共機関講座', 'SNPEアンバサダー活動'],
      schedule: [
        ['opening', '開講', '未定'],
        ['period', '課程', '6週間、週1回、現場実習を含む計36時間'],
        ['time', '授業時間', '10:00-17:00 休憩含む'],
        ['tuition', '受講料', '300万ウォン'],
        ['place', '場所', 'SNPE江南本院'],
        ['capacity', '定員', '24名、先着順'],
      ],
      closingTitle: '専門家への転換を始めましょう',
      closingBody: 'LEVEL 3は、会員ごとの動きを理解し、意味ある変化を設計する専門家課程です。',
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
              <CTAButton href={LINKS.level1.primary}>{copy.buttons[0]}</CTAButton>
              <CTAButton href={LINKS.level1.secondary} variant="secondary">{copy.buttons[1]}</CTAButton>
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
              <img src={levelImages.level1.benefits} alt="" className="w-full h-auto block" loading="lazy" />
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
        <Closing title={copy.closingTitle} body={copy.closingBody} actions={<CTAButton href={LINKS.level1.primary}>{copy.buttons[0]} <ArrowRight size={16} /></CTAButton>} />
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
                <CTAButton href={LINKS.level2.friday}>{copy.buttons[0]}</CTAButton>
                <CTAButton href={LINKS.level2.saturday}>{copy.buttons[1]}</CTAButton>
                <CTAButton href={LINKS.level2.secondary} variant="secondary">{copy.buttons[2]}</CTAButton>
              </>
            ) : (
              <>
                <CTAButton href={LINKS.level3.primary}>{copy.buttons[0]}</CTAButton>
                <CTAButton href={LINKS.level3.secondary} variant="secondary">{copy.buttons[1]}</CTAButton>
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
              <CTAButton href={LINKS.level2.friday}>{c.fridayApply} <ArrowRight size={16} /></CTAButton>
              <CTAButton href={LINKS.level2.saturday}>{c.saturdayApply} <ArrowRight size={16} /></CTAButton>
            </>
          ) : (
            <CTAButton href={LINKS.level3.primary}>{c.applyLevel3} <ArrowRight size={16} /></CTAButton>
          )
        }
      />
    </div>
  )
}

function Level2Body({ copy }) {
  return (
    <>
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
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center mb-12">
            <div className="rounded-3xl overflow-hidden shadow-md bg-gray-100">
              <img src={levelImages.level2.philosophy} alt="" className="w-full h-auto block" loading="lazy" />
            </div>
            <SectionHeader eyebrow="CORE CURRICULUM" title={copy.curriculumTitle} />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
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

      <CareerAndRecommend copy={copy} image={levelImages.level2.recommend} />
    </>
  )
}

function Level3Body({ copy }) {
  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="EDUCATION GOALS" title={copy.goalsTitle} />
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
          <SectionHeader eyebrow="CORE CURRICULUM" title={copy.curriculumTitle} />
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

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader eyebrow="LEVEL 2 vs. LEVEL 3" title={copy.requirementsTitle} />
          <div className="grid sm:grid-cols-3 gap-5">
            {copy.requirements.map(([title, desc]) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <CheckCircle2 size={20} className="text-snpe-dark mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
