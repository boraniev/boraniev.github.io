// Interval Trainer
(function(){
  const runSlider = document.getElementById('runMinutes');
  const runLabel = document.getElementById('runMinutesLabel');
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const stopBtn = document.getElementById('stopBtn');
  const phaseName = document.getElementById('phaseName');
  const timeLeft = document.getElementById('timeLeft');
  const progressBar = document.getElementById('progressBar');
  const transcript = document.getElementById('transcript');
  const voiceToggle = document.getElementById('voiceToggle');

  const STORAGE_KEY = 'interval_trainer_run_minutes_v1';

  // load saved
  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved){
    let v = parseInt(saved,10);
    if(isNaN(v)) v = 2;
    // clamp to allowed range 1..4
    if(v < 1) v = 1;
    if(v > 4) v = 4;
    runSlider.value = v;
  }
  runLabel.textContent = runSlider.value;

  runSlider.addEventListener('input', ()=>{
    runLabel.textContent = runSlider.value;
    localStorage.setItem(STORAGE_KEY, runSlider.value);
  });

  // Build phases
  function buildPhases(runMin){
    // ensure runMin is an integer within allowed range
    runMin = parseInt(runMin, 10) || 2;
    if(runMin < 1) runMin = 1;
    if(runMin > 4) runMin = 4;
    const phases = [];
    phases.push({key:'warmup',label:'Warmup',secs:5*60, color:'--accent-warm'});
    for(let i=0;i<4;i++){
      phases.push({key:'run',label:`Run (${i+1})`,secs:runMin*60, color:'--accent-run'});
      phases.push({key:'rest',label:`Rest (${i+1})`,secs:3*60, color:'--accent-rest'});
    }
    phases.push({key:'jog',label:'Slow Jog',secs:5*60, color:'--accent-jog'});
    return phases;
  }

  // Speech helper
  function speak(text, interrupt=true){
    transcript.textContent = text;
    if(!voiceToggle.checked) return;
    if(!('speechSynthesis' in window)) return;
    try{
      if(interrupt) window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }catch(e){ console.warn('Speech error', e); }
  }

  // Timer state
  let phases = [];
  let current = 0;
  let remaining = 0; // seconds
  let running = false;
  let expectedEnd = 0;
  let totalDuration = 0;
  let lastSpokenSecond = null;
  let tickInterval = null;

  function secondsToMMSS(s){
    const m = Math.floor(s/60).toString().padStart(2,'0');
    const sec = Math.floor(s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  }

  function updateUI(){
    const ph = phases[current] || {label:'Idle',secs:0};
    phaseName.textContent = ph.label;
    timeLeft.textContent = secondsToMMSS(remaining);
    // progress within phase
    const pct = ph.secs? Math.max(0, (1 - remaining/ph.secs)*100) : 0;
    progressBar.style.width = pct + '%';
    // set color via CSS variable
    if(ph.color) progressBar.style.background = `var(${ph.color})`;
  }

  function startTimer(){
    if(running) return;
    if(phases.length===0){
      phases = buildPhases(parseInt(runSlider.value,10));
      totalDuration = phases.reduce((s,p)=>s+p.secs,0);
      current = 0;
      remaining = phases[0].secs;
    }
    running = true; startBtn.disabled = true; pauseBtn.disabled = false; stopBtn.disabled = false;
    expectedEnd = Date.now() + remaining*1000;
    lastSpokenSecond = null;
    speak(`Get ready. ${phases[current].label} for ${Math.round(phases[current].secs/60)} minutes.`);
    tickInterval = setInterval(tick, 250);
  }

  function pauseTimer(){
    if(!running) return;
    running = false; startBtn.disabled = false; pauseBtn.disabled = true;
    clearInterval(tickInterval); tickInterval = null;
    // recompute remaining
    remaining = Math.max(0, Math.round((expectedEnd - Date.now())/1000));
    speak(`${phases[current].label} paused.`);
  }

  function stopTimer(){
    running = false; startBtn.disabled = false; pauseBtn.disabled = true; stopBtn.disabled = true;
    clearInterval(tickInterval); tickInterval = null;
    phases = [];
    current = 0; remaining = 0; expectedEnd = 0;
    lastSpokenSecond = null;
    progressBar.style.width = '0%';
    phaseName.textContent = 'Idle'; timeLeft.textContent = '00:00';
    window.speechSynthesis && window.speechSynthesis.cancel();
    speak('Workout stopped.');
  }

  function nextPhase(){
    current++;
    if(current >= phases.length){
      // finished
      const totalMin = Math.round(totalDuration/60);
      stopTimer();
      speak(`Workout complete! Total time: ${totalMin} minutes. Great job!`);
      transcript.textContent = `Workout complete! Total time: ${totalMin} minutes.`;
      return;
    }
    remaining = phases[current].secs;
    expectedEnd = Date.now() + remaining*1000;
    lastSpokenSecond = null;
    // Announce transition
    speak(`Switching to ${phases[current].label} in 3... 2... 1...`);
  }

  function tick(){
    if(!running) return;
    remaining = Math.max(0, Math.round((expectedEnd - Date.now())/1000));
    // last 10 sec audible countdown
    if(remaining <= 10 && remaining > 0){
      if(remaining !== lastSpokenSecond){
        speak(String(remaining), false);
        lastSpokenSecond = remaining;
      }
    } else {
      lastSpokenSecond = null;
    }
    if(remaining <= 0){
      // phase end
      speak(`${phases[current].label} finished.`);
      nextPhase();
    }
    updateUI();
  }

  // Buttons
  startBtn.addEventListener('click', ()=>{
    startTimer();
  });
  pauseBtn.addEventListener('click', ()=>{
    pauseTimer();
  });
  stopBtn.addEventListener('click', ()=>{
    stopTimer();
  });

  // keyboard: Space toggles start/pause, S stops
  document.addEventListener('keydown', (e)=>{
    if(e.code==='Space'){
      e.preventDefault();
      if(running) pauseTimer(); else startTimer();
    }else if(e.key.toLowerCase()==='s'){
      stopTimer();
    }
  });

  // Pause when tab hidden (graceful degradation)
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden && running){
      pauseTimer();
      transcript.textContent = 'Paused because tab changed focus.';
    }
  });

  // Initialize UI
  function init(){
    phaseName.textContent = 'Idle';
    timeLeft.textContent = '00:00';
    progressBar.style.width = '0%';
  }
  init();

  // Expose for testing (window only)
  window._trainer = {start:startTimer,pause:pauseTimer,stop:stopTimer,buildPhases};

})();
