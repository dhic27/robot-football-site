import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  Cpu,
  Github,
  Gauge,
  Layers3,
  Mail,
  Map,
  MousePointerClick,
  Play,
  RefreshCw,
  Route,
  Target,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

const scenarios = [
  {
    id: "left",
    label: "左侧切入",
    note: "从边路起步，先压缩转向半径，再用斜线完成射门。",
    robot: { x: 20, y: 66 },
    ball: { x: 39, y: 55 },
    target: { x: 88, y: 48 },
    baseTime: 8.8,
    baseRisk: 34,
    insight: "边路点位的关键不是最短路径，而是减少触球瞬间的角度损失。",
  },
  {
    id: "center",
    label: "中路直推",
    note: "距离最短，但需要控制速度，避免球被推偏。",
    robot: { x: 18, y: 50 },
    ball: { x: 44, y: 50 },
    target: { x: 89, y: 50 },
    baseTime: 7.4,
    baseRisk: 27,
    insight: "中路策略适合验证第一版原型，用最少变量检查控制逻辑是否稳定。",
  },
  {
    id: "right",
    label: "右侧绕行",
    note: "路线更长，但对防守干扰更稳健。",
    robot: { x: 24, y: 34 },
    ball: { x: 45, y: 43 },
    target: { x: 88, y: 51 },
    baseTime: 9.6,
    baseRisk: 38,
    insight: "面对干扰时，需要在速度和稳定性之间做产品式取舍。",
  },
];

const timeline = [
  {
    icon: Brain,
    title: "快速理解规则",
    text: "把比赛拆成点位、路径、角度、速度和触球稳定性，而不是只看最终是否进球。",
  },
  {
    icon: Cpu,
    title: "自学控制逻辑",
    text: "自学 Lua 和官方机器人控制接口，把策略想法写成可运行的控制代码。",
  },
  {
    icon: BarChart3,
    title: "1000+ 次仿真",
    text: "在仿真中比较路线和参数，发现直觉方案和实际表现之间的偏差。",
  },
  {
    icon: RefreshCw,
    title: "4 次实地调试",
    text: "利用有限实测机会校准策略，在速度、稳定性和容错之间迭代。",
  },
];

const pmSkills = [
  {
    title: "用户场景拆解",
    detail: "把“机器人射门”拆成目标、约束、误差和反馈，迁移到产品中就是把用户任务拆成可验证场景。",
    icon: Map,
  },
  {
    title: "策略与交互设计",
    detail: "路线、角度、速度不是孤立参数，而是体验链路；这对应 AI 产品里的输入、反馈和下一步行动。",
    icon: Route,
  },
  {
    title: "数据反馈迭代",
    detail: "仿真结果和实地表现不断互相校正，形成“先跑通，再优化”的产品原型方法。",
    icon: Gauge,
  },
  {
    title: "跨学科学习",
    detail: "从水利工程、陆面模式、机器学习到机器人竞赛，核心能力是快速进入陌生系统并建立判断。",
    icon: Layers3,
  },
];

const productIdeas = [
  "用户刷到机器人、足球或策略类视频后，可进入一个轻量互动空间，直接调整点位和路线。",
  "AI 教练解释每个策略为什么有效，帮助用户理解路径规划、控制逻辑和反馈迭代。",
  "把竞赛经历转化为产品化叙事：不是炫技，而是让用户在几分钟内获得可体验、可复盘的知识。",
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function App() {
  const [scenarioId, setScenarioId] = useState("center");
  const [speed, setSpeed] = useState(68);
  const [angle, setAngle] = useState(54);
  const [stability, setStability] = useState(72);

  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[1];

  const metrics = useMemo(() => {
    const speedFactor = (speed - 50) / 50;
    const stabilityFactor = (stability - 50) / 50;
    const anglePenalty = Math.abs(angle - 52) * 0.45;
    const estimatedTime = clamp(
      scenario.baseTime - speedFactor * 1.4 + anglePenalty * 0.03,
      5.4,
      12.8,
    );
    const risk = clamp(
      scenario.baseRisk + speedFactor * 20 - stabilityFactor * 25 + anglePenalty,
      8,
      82,
    );
    const score = clamp(Math.round(100 - risk * 0.55 - estimatedTime * 2.2 + stability * 0.22), 34, 96);

    return {
      estimatedTime: estimatedTime.toFixed(1),
      risk: Math.round(risk),
      score,
    };
  }, [angle, scenario, speed, stability]);

  const strategyLabel =
    metrics.score >= 80 ? "推荐策略" : metrics.score >= 62 ? "可验证策略" : "需要重构";

  const scrollToLab = () => {
    document.getElementById("strategy-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main>
      <section className="hero-section">
        <nav className="top-nav" aria-label="页面导航">
          <a className="brand" href="#top" aria-label="回到首页">
            <Bot size={22} />
            <span>Robot Football Lab</span>
          </a>
          <div className="nav-links">
            <a href="#experience">经历</a>
            <a href="#strategy-lab">实验室</a>
            <a href="#pm-fit">产品定位</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <Zap size={16} />
              AI 产品经理转行名片
            </p>
            <h1>
              <span className="title-part">从足球机器人</span>
              <span className="title-part">策略，</span>
              <span className="title-break">到 AI 产品</span>
              <span className="title-part">原型验证</span>
            </h1>
            <p className="hero-lede">
              我把一次机器人足球竞赛经历，重新整理成场景洞察、策略拆解、仿真测试和快速迭代的能力样本。它不是单纯的比赛复盘，而是一张面向 AI 产品岗位的实践名片。
            </p>
            <div className="hero-actions">
              <button className="primary-action" onClick={scrollToLab}>
                <Play size={18} />
                进入策略实验室
              </button>
              <a className="secondary-action" href="#pm-fit">
                查看能力迁移
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="proof-strip" aria-label="经历摘要">
              <span>Lua 自学</span>
              <span>1000+ 仿真</span>
              <span>4 次实地调试</span>
              <span>策略迭代</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="足球机器人策略可视化">
            <FieldVisual scenario={scenario} metrics={metrics} compact={false} />
          </div>
        </div>
      </section>

      <section className="section-band light-band" id="experience">
        <div className="section-heading">
          <p className="eyebrow dark">
            <Trophy size={16} />
            Experience
          </p>
          <h2>一段能说明我“会动手”的经历</h2>
          <p>
            足球机器人比赛的价值，不只是拿到奖项，而是训练了我在不确定条件下拆问题、跑验证、改策略的能力。
          </p>
        </div>

        <div className="timeline-grid">
          {timeline.map((item) => (
            <article className="timeline-card" key={item.title}>
              <item.icon size={24} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band dark-band" id="strategy-lab">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">
              <MousePointerClick size={16} />
              Interactive Strategy Lab
            </p>
            <h2>轻交互策略实验室</h2>
          </div>
          <p>
            用一个简化原型展示我的产品思路：把复杂策略转化为用户可理解、可调整、可反馈的交互体验。
          </p>
        </div>

        <div className="lab-layout">
          <div className="lab-control-panel">
            <div className="segmented-control" aria-label="选择射门点位">
              {scenarios.map((item) => (
                <button
                  className={item.id === scenarioId ? "segment active" : "segment"}
                  key={item.id}
                  onClick={() => setScenarioId(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <ControlSlider
              icon={Gauge}
              label="推进速度"
              value={speed}
              min={35}
              max={92}
              suffix="%"
              onChange={setSpeed}
            />
            <ControlSlider
              icon={Target}
              label="射门角度"
              value={angle}
              min={30}
              max={76}
              suffix="deg"
              onChange={setAngle}
            />
            <ControlSlider
              icon={CheckCircle2}
              label="稳定容错"
              value={stability}
              min={42}
              max={94}
              suffix="%"
              onChange={setStability}
            />
          </div>

          <div className="lab-field-panel">
            <FieldVisual scenario={scenario} metrics={metrics} compact />
          </div>

          <aside className="analysis-panel">
            <div className="status-pill">{strategyLabel}</div>
            <h3>{scenario.label}</h3>
            <p>{scenario.note}</p>
            <div className="metric-grid">
              <Metric icon={Timer} label="预估用时" value={`${metrics.estimatedTime}s`} />
              <Metric icon={Gauge} label="偏移风险" value={`${metrics.risk}%`} />
              <Metric icon={BarChart3} label="策略评分" value={metrics.score} />
            </div>
            <div className="ai-note">
              <Brain size={20} />
              <p>{scenario.insight}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-band green-band" id="pm-fit">
        <div className="section-heading">
          <p className="eyebrow dark">
            <Brain size={16} />
            Product Manager Fit
          </p>
          <h2>为什么这段经历能迁移到 AI 产品经理</h2>
          <p>
            AI 产品经理不是只会写需求文档，而是要能理解场景、拆解任务、设计反馈，并推动一个想法被验证。
          </p>
        </div>

        <div className="skill-grid">
          {pmSkills.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <skill.icon size={24} />
              <h3>{skill.title}</h3>
              <p>{skill.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band idea-band">
        <div className="idea-layout">
          <div>
            <p className="eyebrow">
              <Bot size={16} />
              AI Product Idea
            </p>
            <h2>机器人足球教练：让策略被直接玩到</h2>
            <p>
              这个作品可以服务抖音 AI 创变者计划赛道一。用户不只是观看一段机器人足球视频，而是进入一个互动空间，自己调整点位、路线和策略，再由 AI 给出解释和复盘。
            </p>
          </div>
          <div className="idea-steps">
            {productIdeas.map((item, index) => (
              <div className="idea-step" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <h2>我想做能被体验、被验证、被持续打磨的 AI 产品。</h2>
          <p>
            足球机器人是起点，真正想展示的是：我能从真实任务中发现问题，并把它做成清晰的产品逻辑。
          </p>
        </div>
        <div className="footer-actions">
          <a href="https://github.com/dhic27/robot-football-site" target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
          <a href="mailto:dhic27@163.com">
            <Mail size={18} />
            dhic27@163.com
          </a>
        </div>
      </footer>
    </main>
  );
}

function ControlSlider({ icon: Icon, label, value, min, max, suffix, onChange }) {
  return (
    <label className="control-slider">
      <span>
        <Icon size={18} />
        {label}
        <strong>
          {value}
          {suffix}
        </strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="metric">
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FieldVisual({ scenario, metrics, compact }) {
  const midX = (scenario.robot.x + scenario.ball.x) / 2;
  const midY = scenario.robot.y - 18;
  const secondMidX = (scenario.ball.x + scenario.target.x) / 2;
  const secondMidY = scenario.ball.y + 12;

  return (
    <div className={compact ? "field-shell compact" : "field-shell"}>
      <svg viewBox="0 0 100 72" role="img" aria-label="机器人足球策略路径图">
        <defs>
          <pattern id="field-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect className="field-bg" x="3" y="4" width="94" height="64" rx="3" />
        <rect x="3" y="4" width="94" height="64" rx="3" fill="url(#field-grid)" />
        <path className="field-line" d="M50 4v64" />
        <circle className="field-line" cx="50" cy="36" r="10" />
        <rect className="field-line" x="3" y="22" width="14" height="28" />
        <rect className="field-line" x="83" y="22" width="14" height="28" />
        <path
          className="strategy-path"
          d={`M${scenario.robot.x} ${scenario.robot.y} Q${midX} ${midY} ${scenario.ball.x} ${scenario.ball.y} Q${secondMidX} ${secondMidY} ${scenario.target.x} ${scenario.target.y}`}
        />
        <g className="robot-marker" transform={`translate(${scenario.robot.x} ${scenario.robot.y})`}>
          <rect x="-4.8" y="-4.8" width="9.6" height="9.6" rx="2" />
          <path d="M-2 -1h4M-1.8 2h3.6" />
        </g>
        <circle className="ball-marker" cx={scenario.ball.x} cy={scenario.ball.y} r="3.1" />
        <g className="target-marker" transform={`translate(${scenario.target.x} ${scenario.target.y})`}>
          <circle r="4.3" />
          <path d="M-6 0h12M0-6v12" />
        </g>
      </svg>
      <div className="field-caption">
        <span>{scenario.label}</span>
        <strong>{metrics.score}/100</strong>
      </div>
    </div>
  );
}

export default App;
