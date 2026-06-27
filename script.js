let realIP = "51.149.74.70";
let hasAudioStarted = false;

// جلب الـ IP الحقيقي
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => { realIP = data.ip; })
    .catch(() => { realIP = "51.149.74.70"; });

function getOS() {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Windows") !== -1) return "Windows OS";
    if (userAgent.indexOf("Mac") !== -1) return "macOS";
    if (userAgent.indexOf("Linux") !== -1) return "Linux Core";
    if (userAgent.indexOf("Android") !== -1) return "Android System";
    if (userAgent.indexOf("iPhone") !== -1) return "iOS (iPhone)";
    return "Linux Core";
}

window.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.console-line');
    const typingSound = document.getElementById('typing-sound');
    let delay = 100;

    // تشغيل الصوت مع أول حركة للمستخدم في الصفحة لتخطي حظر المتصفحات
    const startAudio = () => {
        if (!hasAudioStarted) {
            hasAudioStarted = true;
            const laugh = document.getElementById('hack-laugh');
            if(laugh) laugh.play().catch(e => console.log("Audio play error:", e));
            if(typingSound) typingSound.play().catch(e => console.log("Audio play error:", e));
        }
    };
    
    window.addEventListener('mousemove', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('click', startAudio);

    // إظهار الأسطر البرمجية
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.display = 'block';
            
            if (index === lines.length - 1) {
                setTimeout(() => {
                    if(typingSound) typingSound.pause();
                    
                    const ipElem = document.getElementById('user-ip');
                    const osElem = document.getElementById('user-os');
                    const infoBox = document.getElementById('info-box');
                    
                    if(ipElem) ipElem.innerText = realIP;
                    if(osElem) osElem.innerText = getOS();
                    if(infoBox) infoBox.style.display = 'block';
                }, 1200);
            }
        }, delay);
        delay += 1400; 
    });
});