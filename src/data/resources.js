/* Resource library — the books, courses, videos and tools this campaign actually uses.
   Selection principle: a source earns a slot only if it (a) has solutions or a graded
   channel, and (b) is scheduled somewhere in the 120 weeks. Everything else is a
   drill bank, not reading. ✓ = already in the local PDF library. */

export const RESOURCES = [
  ["Spine — read in order, one phase each", [
    ["Zeitz — The Art and Craft of Problem Solving 3e ✓", "https://www.wiley.com/en-us/The+Art+and+Craft+of+Problem+Solving%2C+3rd+Edition-p-9781119239901", "wk 1–7 primary · ch.5–9 threaded to wk 56 as the slot-C diet"],
    ["Hammack — Book of Proof 3.4 (FREE) — DOWNLOAD", "https://richardhammack.github.io/BookOfProof/", "wk 1–3 on-ramp. Direct PDF: richardhammack.github.io/BookOfProof/Main.pdf"],
    ["Spivak — Calculus 4e ✓", "https://www.mathpop.com/bookhtms/cal.htm", "wk 8–19, chapter map in the Plan tab"],
    ["Niven–Zuckerman–Montgomery — Theory of Numbers ✓", "https://www.wiley.com/en-us/An+Introduction+to+the+Theory+of+Numbers%2C+5th+Edition-p-9780471625469", "wk 20–23: §1.1–1.4, ch.2, §3.1–3.3, §4.1"],
    ["Bóna — A Walk Through Combinatorics 4e ✓", "https://www.worldscientific.com/worldscibooks/10.1142/10258", "wk 24–28 (ch.1–8) · wk 52–53 (ch.9–13, graphs)"],
    ["Wilf — generatingfunctionology (FREE) ✓", "https://www2.math.upenn.edu/~wilf/DownldGF.html", "wk 27–28: ch.1 + ch.2 §2.1–2.3 · file: GFUNC/gfologyLinked2.pdf"],
    ["Rudin — Principles of Mathematical Analysis 3e ✓", "https://www.mheducation.com/highered/product/principles-mathematical-analysis-rudin.html", "wk 30–37, ch.1–7, one chapter a week from memory"],
    ["Axler — Linear Algebra Done Right 4e (FREE PDF) — DOWNLOAD", "https://linear.axler.net/LADR4e.pdf", "wk 38–43, ch.1–7 + 8A. CC BY-NC, free and legal. You own only the solutions manual"],
    ["Steele — The Cauchy–Schwarz Master Class ✓", "https://www.cambridge.org/9780521546775", "wk 44–45: ch.1–2, 5, 6, 8, 13"],
    ["Manfrino–Ortega–Delgado — Inequalities ✓", "https://link.springer.com/book/10.1007/978-3-0346-0050-7", "wk 45–46: ch.1 + ch.3, solutions in ch.4 · file: Inequalities/Ineq/"],
    ["Andreescu–Andrica — Complex Numbers from A to Z ✓", "https://link.springer.com/book/10.1007/0-8176-4449-0", "wk 47–48 PRIMARY (it has full solutions): ch.2, §5.7–5.8 · file: Complex/"],
    ["Evan Chen — Euclidean Geometry in Mathematical Olympiads ✓", "https://web.evanchen.cc/geombook.html", "wk 49–50: ch.1–4 fast, then ch.5–7 (complex + barycentric) properly"],
    ["Grinstead & Snell — Introduction to Probability (FREE) ✓", "https://math.dartmouth.edu/~prob/prob/prob.pdf", "wk 51: ch.1, 3, 6"],
    ["Gallian — Contemporary Abstract Algebra ✓", "https://www.d.umn.edu/~jgallian/", "wk 54 SELECTIVE ONLY: ch.1–6, 26–27. Do not read this book cover to cover"],
  ]],

  ["Putnam problem core", [
    ["Gelca & Andreescu — Putnam and Beyond ✓", "https://link.springer.com/book/10.1007/978-3-319-58988-6", "THE spine problem book: a section every week from wk 1 → 80, then completion passes"],
    ["Kedlaya Putnam Archive (FREE)", "https://kskedlaya.org/putnam-archive/", "Every simulation, wk 1 → 120. Print the paper the night before"],
    ["Kedlaya–Poonen–Vakil — Putnam 1985–2000 — BUY", "https://bookstore.ams.org/prb-33/", "wk 59–60 + reference to the end. The commentary names the TECHNIQUE behind each problem — nothing else does this"],
    ["Andreescu–Dospinescu — Problems from the Book ✓", "https://www.awesomemath.org/product/problems-from-the-book/", "Block-B swaps at wk 21, 23, 28, 46, 48, 53, 55 · file: Real Analyis/problems-from-the-book-1.pdf"],
    ["Larson — Problem-Solving Through Problems ✓", "https://link.springer.com/book/10.1007/978-1-4612-5498-0", "wk 76–77, technique-indexed against the gap map"],
    ["Kaczor–Nowak — Problems in Mathematical Analysis I–III ✓", "https://bookstore.ams.org/stml-4", "wk 30–36 Block-B swaps, chapter-mapped to Rudin. Full solutions · file: Real Analyis/"],
    ["Berkeley Problems in Mathematics ✓", "https://link.springer.com/book/10.1007/978-1-4757-3749-0", "Free-choice drill bank for analysis + linear algebra from wk 30 · file: Real Analyis/"],
    ["Loh — Probabilistic Methods in Combinatorics ✓", "https://www.math.cmu.edu/~ploh/olympiad.shtml", "wk 51, all problems, solutions included · file: Probability/prob-comb.pdf"],
  ]],

  ["Free courses, seminars & notes", [
    ["Yufei Zhao — MIT 18.A34 Putnam Seminar", "https://yufeizhao.com/a34/", "Public lecture notes + prior-year (2017–22) material. Current problem sets sit behind Canvas/Dropbox — take what is open"],
    ["Stanford Putnam preparation reading list", "https://web.stanford.edu/~cm5/putnam.html", "A curated pointer page, not problem sets — useful as a second opinion on what to read"],
    ["Evan Chen — The Napkin Project (FREE)", "https://web.evanchen.cc/napkin.html", "Fast, honest tour of topology/algebra/analysis. Breadth reference, not a scheduled read"],
    ["Evan Chen — OTIS Excerpts + handouts (FREE)", "https://web.evanchen.cc/olympiad.html", "Technique handouts. Use the inequality + FE ones at wk 44–46 and 55"],
    ["MIT OCW 18.100A Real Analysis (FREE)", "https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/", "Second voice for Rudin weeks 30–37 when a chapter stalls"],
    ["MIT OCW 18.06 Linear Algebra — Strang (FREE)", "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", "Computational counterweight to Axler's abstraction, wk 38–43"],
    ["AoPS Contest Collections — Putnam forum", "https://artofproblemsolving.com/community/c3249", "Alternative solutions + discussion for every archive problem"],
  ]],

  ["Video — watch AFTER attempting, never before", [
    ["Michael Penn — Putnam & competition problems", "https://www.youtube.com/@MichaelPennMath", "Largest catalogue of worked Putnam problems on YouTube. Search the problem code (e.g. '2016 B4')"],
    ["Mohamed Omar — Putnam solution walkthroughs", "https://www.youtube.com/@DrOmarMath", "Explains problem-selection and framing, not just the algebra"],
    ["3Blue1Brown — Essence of Linear Algebra", "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", "Watch the whole series in wk 37, the week before Axler starts. ~3 hours, huge payoff"],
    ["3Blue1Brown — Essence of Calculus", "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", "Optional wk 8 primer if Spivak ch.5 feels abstract"],
    ["blackpenredpen — integrals & limits", "https://www.youtube.com/@blackpenredpen", "Mechanical speed on integration tricks. Background only — this is not proof training"],
    ["Richard Borcherds — graduate maths lectures", "https://www.youtube.com/@richardborcherds7998", "Group theory + Galois for wk 54. A Fields medallist explaining algebra slowly"],
  ]],

  ["Method & tools — the multiplier layer", [
    ["Anki — spaced repetition", "https://apps.ankiweb.net/", "DAILY 10 min. Card front: theorem statement. Back: the proof you must reproduce. This is what stops wk-8 Spivak rotting by wk 60"],
    ["Overleaf / LaTeX — the write-up archive", "https://www.overleaf.com", "Type up your best proof each week. A searchable archive of your own arguments beats any notebook"],
    ["Zetamac — arithmetic speed", "https://arithmetic.zetamac.com/", "Quant thread, 15 min/day, target 80-in-8"],
    ["Jane Street puzzles", "https://www.janestreet.com/puzzles/", "Monthly, from wk 32. Recruiting funnel, not decoration"],
    ["UMN Putnam training group", "https://cse.umn.edu/math", "From wk 56 — free coaching, a peer group, and the department contact who registers you"],
    ["Private Putnam grader / coach", "https://www.wyzant.com", "From wk 44: 3 write-ups/wk graded, $80–200/hr. The highest-ROI money in the campaign"],
  ]],

  ["Weakness Arsenal — drill banks, NEVER scheduled reading", [
    ["Andreescu — 101 Problems in Algebra ✓", "https://www.awesomemath.org", "Timed category sets by gap map only · polynomials/101-problems-in-algebra.pdf"],
    ["Andreescu–Feng — 102 Combinatorial Problems ✓", "https://link.springer.com/book/10.1007/978-0-8176-8222-4", "Timed category sets only · Combinatorics/102-combinatorial-problems.pdf"],
    ["Andreescu–Feng — 103 Trigonometry Problems ✓", "https://link.springer.com/book/10.1007/b139082", "Timed category sets only · Trigonometry/"],
    ["Andreescu et al. — 117 Polynomial Problems ✓", "https://www.awesomemath.org", "Timed category sets only · polynomials/"],
    ["Khurmi — Modern Olympiad Number Theory ✓", "https://artofproblemsolving.com/community", "Timed category sets only · Number Theory/"],
    ["Andreescu–Andrica–Cucurezeanu — Diophantine Equations ✓", "https://link.springer.com/book/10.1007/978-0-8176-4549-6", "Pairs with wk 23 (Pell + descent) · Number Theory/"],
    ["Andreescu — Problems in Real Analysis ✓", "https://link.springer.com/book/10.1007/978-0-387-77379-7", "Analysis drill bank from wk 30 · Real Analyis/"],
    ["Functional-equation problem sets ✓", "https://artofproblemsolving.com/community", "wk 55 · Func Eq/ — 100 FE problems + the 5-FE scan"],
  ]],

  ["SAT — ends 3 Oct 2026, then never again", [
    ["Bluebook official practice tests", "https://bluebook.collegeboard.org", "Weekly full-length, wk 5 checkpoint, target 1500+ → 1550"],
    ["College Board Question Bank", "https://satsuitequestionbank.collegeboard.org", "20 items/day on your weakest tag, slot C only"],
    ["Meltzer — Grammar + The Critical Reader", "https://thecriticalreader.com", "Chapter-mapped wk 1–5 · BUY NOW if you don't own them"],
    ["Registration — deadline Fri 18 Sep 2026", "https://satsuite.collegeboard.org/sat/registration", "Backup sittings: 7 Nov 2026. NOT 5 Dec — that's rehearsal day"],
  ]],

  ["Quant · scheduled reading — the 8 that get weeks", [
    ["Zhou — A Practical Guide to Quantitative Finance Interviews", "https://www.amazon.com/Practical-Guide-Quantitative-Finance-Interviews/dp/1438236670", "~$40 · THE green book. Pass 1 untimed wk 1–54 (Tue/Fri), pass 2 timed from wk 55"],
    ["Blitzstein & Hwang — Introduction to Probability (FREE)", "http://probabilitybook.net", "Redirects to the authors' free PDF. wk 24–54. Conditional/Bayesian fluency Putnam does NOT give you · free course at stat110.net"],
    ["Joshi — Quant Job Interview Questions and Answers", "https://www.markjoshi.com/", "~$45 · The other canonical interview book. wk 55+, alternates with the green book pass 2"],
    ["Crack — Heard on the Street", "https://www.amazon.com/Heard-Street-Quantitative-Questions-Interviews/dp/0994138423", "~$60 · Breadth, wk 55+. Buy the current edition, it is revised often"],
    ["Mosteller — 50 Challenging Problems in Probability", "https://store.doverpublications.com/0486653552.html", "~$10 · Short. Source of half the canonical interview questions. Any time"],
    ["Harris — Trading and Exchanges", "https://global.oup.com/academic/product/trading-and-exchanges-9780195144703", "~$70 · wk 19–43, alongside the C++ order book. This is what makes that project defensible in an interview instead of just impressive"],
    ["Tsay — Analysis of Financial Time Series", "https://www.wiley.com/en-us/Analysis+of+Financial+Time+Series%2C+3rd+Edition-p-9780470414354", "~$130 · wk 84 gate: ch.1–3 + GARCH, feeding the flagship's HMM upgrade"],
    ["Natenberg — Option Volatility and Pricing", "https://www.amazon.com/Option-Volatility-Pricing-Strategies-Techniques/dp/0071818774", "~$50 · 2029 sprint ONLY (wk 133+). Vol intuition, not memorised formulae"],
  ]],

  ["Quant · the two projects", [
    ["learncpp.com (FREE)", "https://www.learncpp.com/", "wk 19–24 C++ ramp. You write Java already, so skip the beginner chapters: go at pointers/references, RAII, the STL, templates, const-correctness"],
    ["Stroustrup — A Tour of C++ (3rd ed.)", "https://www.stroustrup.com/tour3.html", "~$40 · wk 19–24 alongside learncpp. Short by design and written for people who already program"],
    ["Meyers — Effective Modern C++", "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/", "~$50 · wk 44+, once the order book compiles and you want it to be GOOD. Not before — it is a book about doing it well, not doing it"],
    ["Laaksonen — Competitive Programmer's Handbook (FREE)", "https://cses.fi/book/book.pdf", "The standard CP text, free PDF. wk 19 → Expert. Pair with the CSES problem set"],
    ["CSES Problem Set (FREE)", "https://cses.fi/problemset/", "300 curated problems mapping to the handbook. Solve them IN C++ from wk 19 — cheapest C++ practice there is, and it builds the rating at the same time"],
    ["López de Prado — Advances in Financial Machine Learning", "https://www.wiley.com/en-us/Advances+in+Financial+Machine+Learning-p-9781119482086", "~$70 · Flagship reference. Backtest overfitting, deflated Sharpe, cross-validation for time series"],
    ["Bailey & López de Prado — The Deflated Sharpe Ratio (FREE paper)", "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2460551", "Your research note already promises a deflated Sharpe — this is where that number comes from. Read it before wk 46"],
    ["James et al. — Introduction to Statistical Learning (FREE)", "https://www.statlearning.com", "Free PDF (R and Python editions). The stats layer under the flagship, wk 34+"],
    ["Hastie et al. — Elements of Statistical Learning (FREE)", "https://hastie.su.domains/ElemStatLearn/", "Free PDF. Reference only — open it when ISL is not deep enough"],
  ]],

  ["Quant · market literacy + practice — minutes a day", [
    ["Matt Levine — Money Stuff (FREE)", "https://www.bloomberg.com/account/newsletters/money-stuff", "5 min/day, the Wed market-reading slot. The highest market-literacy-per-minute source that exists for a beginner"],
    ["tradermath.org", "https://tradermath.org/", "Zetamac's harder sibling — percentages, fractions, PnL arithmetic. Alternate with Zetamac from wk 20"],
    ["Brainstellar (FREE)", "https://brainstellar.com/", "Prop-shop-style puzzles by difficulty. The 10-min brainteaser slot in Phase B"],
    ["QuantGuide", "https://www.quantguide.io/", "Timed practice in the format the OAs actually use. From wk 55"],
    ["LeetCode", "https://leetcode.com/", "Only the firms with a coding OA. Codeforces covers this better — do not double-spend"],
    ["Odd Lots / Flirting with Models (FREE)", "https://podcasts.apple.com/us/podcast/odd-lots/id1056200096", "Walks and the gym commute. Passive, zero opportunity cost, real market vocabulary"],
    ["Citadel Datathon / Terminal", "https://www.citadel.com/careers/students/datathons/", "Watch for dates. Another explicit recruiting funnel"],
  ]],


  ["Training — body", [
    ["Nippard — Ultimate PPL System (6x PDF) ✓", "https://jeffnippard.com", "Push/Pull days only on M·T·W·F · 13-wk cycles auto-mapped by the app"],
  ]],
];

/* Books that were in the plan or the PDF folder and are deliberately NOT used.
   Shown in the Library tab so the decision stays visible instead of being re-litigated. */
export const CUT_LIST = [
  ["West — Introduction to Graph Theory", "Bóna ch.9–13 covers every graph result Putnam has ever needed, with problems. West is a 600-page course text and a 65 MB file. Delete."],
  ["OmegaLearn — Mastering AMC 10/12", "AMC track removed. Nothing in it is Putnam-shaped."],
  ["AoPS Volume 1 / Volume 2 / Alcumus / AMC Trivial", "AMC track removed. Volume 2 ch.14–17 is the only part worth keeping, and P&B covers all of it better."],
  ["AIME handouts (Polynomials / Trigonometry / Sequences in the AIME)", "AIME is unreachable without an AMC score. The topic content survives in P&B §2.2, §4.2 and §3.1."],
  ["Needham — Visual Complex Analysis", "Kept as a reference for wk 47 intuition only. It is a 500-page geometry-of-complex-analysis book with few competition problems — A-to-Z is the one that gets worked."],
  ["Hoffman & Kunze, Shilov, and the other linear-algebra PDFs", "Axler + MIT 18.06 is enough. Three more linear algebra books is a way to feel busy."],
  ["Munkres — Topology, Tenenbaum & Pollard — ODEs, Zorich — Analysis", "Not Putnam-shaped. Rudin ch.2 covers the topology that appears; ODE questions are rare and P&B §3.4.2–3.4.3 handles them."],
  ["Parvardi-style compilations (100 NT / 100 Combinatorics / 1220 NT / 407 Review)", "Problems without solutions cannot support adversarial grading. Timed-set fodder only, graded via their AoPS threads."],
  ["Shreve — Stochastic Calculus for Finance I/II, Hull — Options Futures and Other Derivatives, Wilmott", "The QR-at-a-bank reading list, and a trap for you specifically. Jane Street, Citadel Securities, SIG, IMC and Optiver are PROP TRADING shops: they interview on probability, mental arithmetic, game sense and market-making, not on Ito's lemma. If interview routing later pushes you toward derivatives research, buy Shreve I then — not in 2027."],
  ["Wasserman — All of Statistics, Casella & Berger — Statistical Inference", "Only if the QR routing actually happens. Wasserman is the right one if so (fast, dense, ~$80); Casella & Berger is a two-semester course you do not have room for."],
];
