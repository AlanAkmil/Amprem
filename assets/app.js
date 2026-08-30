// ─── AM SCRAPER V2.0 // BRUTAL EDITION ───
// Full client-side scraper for am.yappi.my.id
// Deploy to GitHub Pages or Vercel

const CONFIG = {
    BASE_URL: 'https://am.yappi.my.id',
    COOKIE_API: '/api/cookie',
    SEND_API: '/api/send',
    VERIFY_API: '/api/verify'
};

let sessionCookie = null;
let targetEmail = '';

// ─── UTILS ───
function log(msg, type = 'info') {
    const terminal = document.getElementById('terminal');
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    const typeClass = {
        'success': 'terminal-success',
        'error': 'terminal-error',
        'warn': 'terminal-warn',
        'info': 'terminal-info'
    }[type] || 'terminal-info';

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `
        <span class="terminal-prompt">$</span>
        <span class="terminal-time">[${time}]</span>
        <span class="${typeClass}">${escapeHtml(msg)}</span>
    `;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function setProgress(percent) {
    const bar = document.getElementById('progressBar');
    const container = document.getElementById('progressContainer');
    container.classList.remove('hidden');
    bar.style.width = percent + '%';
}

function setStatus(status, text) {
    const dot = document.getElementById('statusDot');
    const txt = document.getElementById('statusText');
    dot.className = 'status-dot ' + status;
    txt.textContent = text;
}

function show(id) {
    document.getElementById(id).classList.remove('hidden');
}

function hide(id) {
    document.getElementById(id).classList.add('hidden');
}

// ─── STEP 1: GET COOKIE ───
async function initSession() {
    targetEmail = document.getElementById('emailInput').value.trim();
    if (!targetEmail || !targetEmail.includes('@')) {
        log('ERROR: Invalid email format', 'error');
        return;
    }

    const btn = document.getElementById('btnInit');
    btn.disabled = true;
    setStatus('loading', 'ACQUIRING SESSION...');
    setProgress(25);
    log(`Target acquired: ${targetEmail}`);
    log('Requesting session cookie from API...');

    try {
        const res = await fetch(CONFIG.BASE_URL + CONFIG.COOKIE_API, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36'
            }
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.ok && data.cookie) {
            sessionCookie = data.cookie;
            log(`Session cookie acquired: ${sessionCookie.substring(0, 30)}...`, 'success');
            setProgress(50);
            setStatus('online', 'SESSION ACTIVE');
            hide('step1');
            show('step2');
        } else {
            throw new Error(data.error || 'Invalid cookie response');
        }
    } catch (err) {
        log(`FAILED: ${err.message}`, 'error');
        setStatus('offline', 'SESSION FAILED');
        btn.disabled = false;
    }
}

// ─── STEP 2: SEND LINK ───
async function sendLink() {
    const btn = document.getElementById('btnSend');
    btn.disabled = true;
    setStatus('loading', 'SENDING PAYLOAD...');
    setProgress(60);
    log(`Sending verification link to ${targetEmail}...`);

    try {
        const res = await fetch(CONFIG.BASE_URL + CONFIG.SEND_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': CONFIG.BASE_URL,
                'Referer': `${CONFIG.BASE_URL}/`,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
            },
            body: JSON.stringify({
                email: targetEmail,
                cookie: sessionCookie
            })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.ok) {
            log('Verification link sent successfully!', 'success');
            log('Check target inbox and paste magic link below.', 'warn');
            setProgress(75);
            setStatus('online', 'AWAITING MAGIC LINK');
            hide('step2');
            show('step3');
        } else {
            throw new Error(data.error || 'Send failed');
        }
    } catch (err) {
        log(`FAILED: ${err.message}`, 'error');
        setStatus('offline', 'SEND FAILED');
        btn.disabled = false;
    }
}

// ─── STEP 3: VERIFY ───
async function verifyLink() {
    const magicLink = document.getElementById('magicLinkInput').value.trim();
    if (!magicLink || magicLink.length < 10) {
        log('ERROR: Invalid magic link format', 'error');
        return;
    }

    const btn = document.getElementById('btnVerify');
    btn.disabled = true;
    setStatus('loading', 'VERIFYING...');
    setProgress(90);
    log('Verifying magic link...');

    try {
        const res = await fetch(CONFIG.BASE_URL + CONFIG.VERIFY_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': CONFIG.BASE_URL,
                'Referer': `${CONFIG.BASE_URL}/`,
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
            },
            body: JSON.stringify({
                email: targetEmail,
                link: magicLink,
                cookie: sessionCookie
            })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.ok) {
            log('VERIFICATION SUCCESSFUL!', 'success');
            setProgress(100);
            setStatus('online', 'EXTRACTION COMPLETE');
            displayResult(data.data?.user || data);
        } else {
            throw new Error(data.error || 'Verification failed');
        }
    } catch (err) {
        log(`FAILED: ${err.message}`, 'error');
        setStatus('offline', 'VERIFY FAILED');
        btn.disabled = false;
    }
}

// ─── DISPLAY RESULT ───
function displayResult(userData) {
    const resultCard = document.getElementById('resultCard');
    const resultGrid = document.getElementById('resultGrid');
    const jsonView = document.getElementById('jsonView');

    resultGrid.innerHTML = '';

    if (typeof userData === 'object' && userData !== null) {
        Object.entries(userData).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <label>${key.toUpperCase()}</label>
                <div class="value">${escapeHtml(String(value ?? 'N/A'))}</div>
            `;
            resultGrid.appendChild(item);
        });
    } else {
        resultGrid.innerHTML = `
            <div class="result-item" style="grid-column: 1/-1;">
                <label>RESPONSE</label>
                <div class="value">${escapeHtml(String(userData))}</div>
            </div>
        `;
    }

    jsonView.textContent = JSON.stringify(userData, null, 2);
    show('resultCard');
    log('Data extraction complete. Results displayed below.', 'success');
}

// ─── RESET ───
function resetAll() {
    sessionCookie = null;
    targetEmail = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('magicLinkInput').value = '';
    document.getElementById('terminal').innerHTML = `
        <div class="terminal-line">
            <span class="terminal-prompt">$</span>
            <span class="terminal-time">[INIT]</span>
            <span>System reset. Waiting for input<span class="cursor"></span></span>
        </div>
    `;
    hide('step2');
    hide('step3');
    hide('resultCard');
    hide('progressContainer');
    show('step1');
    document.getElementById('btnInit').disabled = false;
    document.getElementById('btnSend').disabled = false;
    document.getElementById('btnVerify').disabled = false;
    setStatus('online', 'SYSTEM READY');
    log('System reset complete.');
}

// ─── INIT ───
log('AM Scraper v2.0 - Brutal Edition loaded.');
log('Ready for deployment to GitHub Pages / Vercel.');