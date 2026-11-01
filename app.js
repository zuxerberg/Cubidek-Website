const heroChart=document.querySelector('#hero-chart');
const heroDashboard=document.querySelector('.dashboard');
const heroPanel=document.querySelector('#hero-dash-panel');
const heroDashTabs=[...document.querySelectorAll('[data-dash-view]')];
const heroViews={
 overview:{crumb:'Overview',eyebrow:'YOUR BUSINESS, AT A GLANCE',title:'A clearer picture',period:'Live · September 2026',metrics:[['Total revenue','$128,450','+12.8% vs. last month'],['Operating profit','$42,680','+8.2% vs. last month'],['Outstanding invoices','$18,240','8 invoices to collect']],chart:'Cash flow',legend:'Income · Expenses',insight:['Built around how you work','Project margins, retainers, and billable time. Already in place.'],seed:1},
 transactions:{crumb:'Transactions',eyebrow:'ADAPTIVE CLASSIFICATION',title:'Everything in its place',period:'Live · 246 synced',metrics:[['Auto-matched','238','96.7% confidence'],['Needs review','8','Ready for your team'],['Rules improved','14','Learned this month']],chart:'Transaction flow',legend:'Matched · Review',insight:['Eight items need a human look','Cübidek grouped the rest using your project and vendor patterns.'],seed:2},
 invoices:{crumb:'Invoices',eyebrow:'REVENUE IN MOTION',title:'Keep cash moving',period:'Live · September 2026',metrics:[['Open invoices','$18,240','Across 8 invoices'],['Due this week','$7,850','3 client payments'],['Average paid','11 days','2 days faster']],chart:'Collections pace',legend:'Paid · Outstanding',insight:['Two invoices are likely to land early','Payment timing is forecast from each client’s history.'],seed:3},
 projects:{crumb:'Projects',eyebrow:'MARGINS, PROJECT BY PROJECT',title:'See where work pays',period:'Live · 12 active',metrics:[['Active value','$164,900','Across 12 projects'],['Average margin','33.2%','+4.6 pts this quarter'],['Unbilled time','$6,420','Ready to invoice']],chart:'Project profitability',legend:'Revenue · Cost',insight:['Strategy work is leading margin growth','Three projects are trending above their original estimate.'],seed:4},
 reports:{crumb:'Reports',eyebrow:'INDUSTRY-READY REPORTING',title:'Answers, already framed',period:'Updated just now',metrics:[['Net income','$42,680','September 2026'],['Runway','18.4 mo','At current spend'],['Forecast','$156,200','Expected next month']],chart:'Forward outlook',legend:'Actual · Forecast',insight:['Your next close is already taking shape','Reports adapt as new revenue and cost patterns appear.'],seed:5}
};
let heroViewIndex=0;
let heroCycle;
let heroSwitchTimer;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
function buildHeroChart(seed){heroChart.replaceChildren(...Array.from({length:64},(_,i)=>{const bar=document.createElement('span');bar.className='chart-bar';const height=24+i*.65+Math.sin((i+seed*4)*1.37)*15+Math.cos((i+seed)*.63)*10+(seed%2)*4;bar.style.setProperty('--h',`${Math.max(12,Math.min(92,height))}%`);bar.style.setProperty('--i',i);return bar}))}
function setText(id,value){document.getElementById(id).textContent=value}
function renderHeroView(key){const view=heroViews[key];if(!view)return;clearTimeout(heroSwitchTimer);heroPanel.classList.add('is-switching');heroSwitchTimer=setTimeout(()=>{heroDashTabs.forEach((tab,index)=>{const active=tab.dataset.dashView===key;tab.classList.toggle('selected',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active)heroViewIndex=index});setText('hero-crumb',view.crumb);setText('hero-dash-eyebrow',view.eyebrow);setText('hero-dash-title',view.title);setText('hero-period',view.period);['one','two','three'].forEach((name,index)=>{setText(`hero-metric-${name}-label`,view.metrics[index][0]);setText(`hero-metric-${name}-value`,view.metrics[index][1]);setText(`hero-metric-${name}-note`,view.metrics[index][2])});setText('hero-chart-title',view.chart);setText('hero-chart-legend',view.legend);setText('hero-insight-title',view.insight[0]);setText('hero-insight-copy',view.insight[1]);buildHeroChart(view.seed);heroPanel.classList.remove('is-switching')},160)}
function startHeroCycle(){clearInterval(heroCycle);if(reducedMotion.matches)return;heroCycle=setInterval(()=>{heroViewIndex=(heroViewIndex+1)%heroDashTabs.length;renderHeroView(heroDashTabs[heroViewIndex].dataset.dashView)},4600)}
heroDashTabs.forEach((tab,index)=>{tab.tabIndex=index===0?0:-1;tab.addEventListener('click',()=>{renderHeroView(tab.dataset.dashView);startHeroCycle()});tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%heroDashTabs.length;else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index+heroDashTabs.length-1)%heroDashTabs.length;else return;event.preventDefault();heroDashTabs[next].focus();renderHeroView(heroDashTabs[next].dataset.dashView)})});
heroDashboard.addEventListener('mouseenter',()=>clearInterval(heroCycle));
heroDashboard.addEventListener('mouseleave',startHeroCycle);
heroDashboard.addEventListener('focusin',()=>clearInterval(heroCycle));
heroDashboard.addEventListener('focusout',event=>{if(!heroDashboard.contains(event.relatedTarget))startHeroCycle()});
reducedMotion.addEventListener?.('change',startHeroCycle);
buildHeroChart(1);
startHeroCycle();
const trialButton=document.querySelector('#market-trial');
const trialMarketLabel=document.querySelector('#trial-market');
const trialMarkets=[['services','Services','professional services'],['retail','Retail','retail and commerce'],['construction','Construction','construction'],['saas','SaaS','SaaS and technology']];
let trialMarketIndex=0;
let trialCycle;
let trialSwitchTimer;
function renderTrialMarket(){const [market,label,spoken]=trialMarkets[trialMarketIndex];clearTimeout(trialSwitchTimer);trialButton.classList.add('is-switching');trialSwitchTimer=setTimeout(()=>{trialButton.dataset.market=market;trialMarketLabel.textContent=label;trialButton.setAttribute('aria-label',`Start a free trial for ${spoken}`);trialButton.classList.remove('is-switching');trialButton.classList.add('is-arriving');setTimeout(()=>trialButton.classList.remove('is-arriving'),620)},220)}
function startTrialCycle(){clearInterval(trialCycle);if(reducedMotion.matches)return;trialCycle=setInterval(()=>{trialMarketIndex=(trialMarketIndex+1)%trialMarkets.length;renderTrialMarket()},8000)}
reducedMotion.addEventListener?.('change',startTrialCycle);
startTrialCycle();
const industries={
 services:{index:'01 / PROFESSIONAL SERVICES',word:'Professional services',mode:'Services mode',icon:'◆',features:['Project-based profit tracking','Retainer and milestone billing','Billable time reconciliation'],preview:'Project performance',metrics:['Project revenue','$128,450','Across 12 active projects','Average margin','33.2%','+4.6 pts this quarter'],headings:['Project','Revenue','Margin'],rows:[['Brand identity','$42,500','38.4%'],['Digital experience','$56,200','31.8%'],['Strategy retainer','$29,750','28.6%']],insight:'Your retainer income is recognized monthly, with project costs matched to each engagement.'},
 retail:{index:'02 / RETAIL & COMMERCE',word:'Retail & commerce',mode:'Commerce mode',icon:'●',features:['Inventory and landed cost tracking','Sales channel reconciliation','Product-level margin reporting'],preview:'Commerce performance',metrics:['Net sales','$186,720','Across 3 sales channels','Gross margin','46.8%','After landed product costs'],headings:['Sales channel','Net sales','Margin'],rows:[['Online store','$98,420','49.2%'],['Flagship store','$62,100','45.6%'],['Wholesale','$26,200','40.6%']],insight:'Supplier freight is allocated to inventory, so every product margin reflects its full landed cost.'},
 construction:{index:'03 / CONSTRUCTION',word:'Construction',mode:'Jobsite mode',icon:'▰',features:['Job costing and budget comparisons','Progress and retention billing','Subcontractor cost allocation'],preview:'Job performance',metrics:['Contract value','$842,000','Across 3 active jobs','Budget remaining','$316,400','Committed costs included'],headings:['Active job','Billed to date','Completion'],rows:[['Riverside renovation','$186,200','72%'],['North quarter fit-out','$142,800','54%'],['Cedar house','$84,500','38%']],insight:'Retention is tracked separately from receivables, giving you a clearer view of what is payable today.'},
 saas:{index:'04 / SAAS & TECHNOLOGY',word:'SaaS & technology',mode:'Live SaaS mode',icon:'✦',features:['Subscription revenue recognition','Deferred revenue schedules','Recurring revenue and churn reporting'],preview:'Subscription performance',metrics:['Monthly recurring revenue','$94,280','Across 486 subscriptions','Net revenue retention','112.4%','Trailing 12 months'],headings:['Plan','Monthly revenue','Accounts'],rows:[['Business','$51,840','288'],['Scale','$32,640','96'],['Enterprise','$9,800','102']],insight:'Annual subscriptions are spread over their service period, keeping recognized revenue aligned with delivery.'}
};
const tabs=[...document.querySelectorAll('[data-industry]')];
const industryKeys=Object.keys(industries);
const industrySection=document.querySelector('#industries');
const industryPanel=document.querySelector('#industry-panel');
const industryPreview=document.querySelector('.industry-preview');
const industryWord=document.querySelector('#industry-word');
const industryTimer=document.querySelector('.industry-timer');
let industryPosition=0;
let industryCycle;
let industrySwapTimer;
let industryVisible=false;
function applyIndustry(key){const d=industries[key];industryPosition=industryKeys.indexOf(key);tabs.forEach(t=>{const active=t.dataset.industry===key;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});industryPanel.setAttribute('aria-labelledby','tab-'+key);industryPanel.dataset.industry=key;industryPreview.dataset.theme=key;const fields={'industry-index':d.index,'industry-word':d.word,'preview-title':d.preview,'preview-insight':d.insight,'metric-one-label':d.metrics[0],'metric-one-value':d.metrics[1],'metric-one-note':d.metrics[2],'metric-two-label':d.metrics[3],'metric-two-value':d.metrics[4],'metric-two-note':d.metrics[5],'table-heading':d.headings[0],'table-value-heading':d.headings[1],'table-status-heading':d.headings[2]};Object.entries(fields).forEach(([id,value])=>setText(id,value));const list=document.getElementById('industry-features');list.replaceChildren(...d.features.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));document.getElementById('industry-rows').replaceChildren(...d.rows.map(row=>{const tr=document.createElement('tr');row.forEach(value=>{const td=document.createElement('td');td.textContent=value;tr.append(td)});return tr}));}
function selectIndustry(key){const d=industries[key];if(!d)return;clearTimeout(industrySwapTimer);if(reducedMotion.matches){applyIndustry(key);return}industryWord.classList.remove('is-entering');industryWord.classList.add('is-exiting');industryPreview.classList.add('is-changing');industrySwapTimer=setTimeout(()=>{applyIndustry(key);industryWord.classList.remove('is-exiting');void industryWord.offsetWidth;industryWord.classList.add('is-entering');industryPreview.classList.remove('is-changing');industryPreview.classList.add('is-arriving');setTimeout(()=>{industryWord.classList.remove('is-entering');industryPreview.classList.remove('is-arriving')},720)},320)}
function restartIndustryTimer(){industryTimer.classList.remove('is-running');void industryTimer.offsetWidth;if(industryVisible&&!reducedMotion.matches)industryTimer.classList.add('is-running')}
function startIndustryCycle(){clearInterval(industryCycle);restartIndustryTimer();if(!industryVisible||reducedMotion.matches)return;industryCycle=setInterval(()=>{industryPosition=(industryPosition+1)%industryKeys.length;selectIndustry(industryKeys[industryPosition]);restartIndustryTimer()},8000)}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>{selectIndustry(tab.dataset.industry);startIndustryCycle()});tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();tabs[next].focus();selectIndustry(tabs[next].dataset.industry);startIndustryCycle()})});
const industryObserver=new IntersectionObserver(entries=>{industryVisible=entries.some(entry=>entry.isIntersecting);startIndustryCycle()},{threshold:.28});
industryObserver.observe(industrySection);
reducedMotion.addEventListener?.('change',startIndustryCycle);

const statCounters=[...document.querySelectorAll('.stat-count')];
function showFinalStats(){statCounters.forEach(counter=>{const value=Number(counter.dataset.statValue);const decimals=Number(counter.dataset.statDecimals||0);counter.textContent=value.toFixed(decimals)})}
function animateStats(){const duration=1500;const start=performance.now();function frame(now){const progress=Math.min(1,(now-start)/duration);const eased=progress===1?1:1-Math.pow(2,-10*progress);statCounters.forEach(counter=>{const value=Number(counter.dataset.statValue)*eased;const decimals=Number(counter.dataset.statDecimals||0);counter.textContent=value.toFixed(decimals)});if(progress<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)}
if(reducedMotion.matches){showFinalStats()}else{const stats=document.querySelector('.hero-stats');const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){animateStats();observer.disconnect()}},{threshold:.35});observer.observe(stats)}

// Fit the live application precisely inside the photographed monitor screen.
const monitorScreen=document.querySelector('.hero-monitor-screen');
if(monitorScreen){const fitMonitor=()=>monitorScreen.style.setProperty('--screen-scale',monitorScreen.clientWidth/1000);fitMonitor();new ResizeObserver(fitMonitor).observe(monitorScreen);}

// Match the hero at the top, then restore the white navigation on scroll.
const stickyNavigation=document.querySelector('.site-header');
function updateNavigationAppearance(){const hero=document.querySelector('.hero');if(!stickyNavigation||!hero)return;stickyNavigation.classList.toggle('is-scrolled',hero.getBoundingClientRect().bottom<=stickyNavigation.offsetHeight);}
updateNavigationAppearance();
window.addEventListener('scroll',updateNavigationAppearance,{passive:true});
window.addEventListener('pageshow',updateNavigationAppearance);
window.addEventListener('resize',updateNavigationAppearance);
const navigationHero=document.querySelector('.hero');if(navigationHero)new ResizeObserver(updateNavigationAppearance).observe(navigationHero);
