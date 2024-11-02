const appSize = 20; 
const margin = 4; 
const appsPerRow = 4; 

function updateTime() {
    const timeElement = document.getElementById('time');
    const timeElement2 = document.getElementById('time-lockscreen');
    

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    
    hours = hours < 10 ? hours : hours; 
    minutes = minutes < 10 ? '0' + minutes : minutes; 

    timeElement.textContent = `${hours}:${minutes}`;
    timeElement2.textContent = `${hours}:${minutes}`;
    
    
}

updateTime();

setInterval(() => {
    updateTime();
}, 1000);

let appOpen = false;

function executeApp(apkg) {
    console.debug("Executing " + apkg);
}function addApp(iconUrl, goToUrl) {
    const app = document.createElement('div');
    app.classList.add('app');
    app.setAttribute('data-id', goToUrl); 

    
    const totalApps = document.querySelectorAll('.app').length;
    const row = Math.floor(totalApps / appsPerRow);
    const col = totalApps % appsPerRow;

    
    app.style.top = `calc(${row * (appSize + margin)}vw + 75px)`;
    app.style.left = `${col * (appSize + margin)}vw`;
    app.style.position = 'absolute'; 

    if (!iconUrl) {
        app.innerHTML = `<img src="defaultIcon.png" class="AppIcon">`;
    } else {
        app.innerHTML = `<img src="${iconUrl}" class="AppIcon">`;
    }
    

    
    app.addEventListener('click', () => {
        const allApps = document.querySelectorAll('.app');

        document.getElementById('wallpaper').classList.toggle('blurheader');

        allApps.forEach(otherApp => {
            if (otherApp !== app) {
                otherApp.classList.toggle('blur');
            }
        });
        app.classList.toggle('open');

        app.setAttribute('draggable', 'false');

        const appPackage = app.getAttribute('data-id');

        if (!appOpen) {
            executeApp(appPackage);
            appOpen = true;
        } else {
            appOpen = false;
        }
        

        setTimeout(() => {
            
        }, 500);
    });

    document.body.appendChild(app); 
}
const lockscreen = document.getElementById('lockscreen');
const line = document.getElementById('line');
const data = document.getElementById('data');

let isDragging = false;
let initialY = 0;
let initialTop = 0;line.addEventListener('mousedown', (e) => {
    startDragging(e.clientY);
});line.addEventListener('touchstart', (e) => {
    startDragging(e.touches[0].clientY);
});function startDragging(clientY) {
    isDragging = true;
    initialY = clientY;
    initialTop = lockscreen.getBoundingClientRect().top;
    lockscreen.style.cursor = 'grabbing';
}

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

function stopDragging() {
    isDragging = false;
    lockscreen.style.cursor = 'grab';

    const lsBg = document.getElementById('ls-bg');
    lsBg.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    lockscreen.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    data.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    line.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    if (newTop <= -50) {
        newTop = -2000;
        lsBg.style.opacity = 0;
    } else {
        newTop = 0;
        lsBg.style.opacity = 1;
    }

    setTimeout(() => {
        lockscreen.style.top = `${newTop}px`;
        lsBg.style.marginBottom = `-${newTop}px`;

        data.style.marginTop = `${Math.abs(newTop) / 15}px`;
        line.style.marginBottom = `${Math.abs(newTop) / 15}px`;
    }, 0);
}

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        handleDrag(e.clientY);
    }
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        handleDrag(e.touches[0].clientY);
    }
});

function handleDrag(clientY) {
    const lsBg = document.getElementById('ls-bg');
    lsBg.style.transition = '';
    lockscreen.style.transition = '';
    data.style.transition = '';
    line.style.transition = '';

    const deltaY = clientY - initialY;
    newTop = initialTop + deltaY;

    console.debug(newTop);

    if (deltaY <= 0) {
        lsBg.style.opacity = 1 - (Math.abs(newTop) / (window.innerHeight * 0.8));

        lockscreen.style.top = `${newTop}px`;
        lsBg.style.marginBottom = `-${newTop}px`;

        data.style.marginTop = `${Math.abs(newTop) / 15}px`;
        line.style.marginBottom = `${Math.abs(newTop) / 15}px`;
    }
}

function lockScreen () {
    const lsBg = document.getElementById('ls-bg');
    lsBg.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    lockscreen.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    data.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    line.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    newTop = 0;
    lsBg.style.opacity = 1;

    setTimeout(() => {
        lockscreen.style.top = `${newTop}px`;
        lsBg.style.marginBottom = `-${newTop}px`;

        data.style.marginTop = `${Math.abs(newTop) / 15}px`;
        line.style.marginBottom = `${Math.abs(newTop) / 15}px`;
    }, 0);
}

function unlockScreen () {
    const lsBg = document.getElementById('ls-bg');
    lsBg.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    lockscreen.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    data.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    line.style.transition = '0.4s cubic-bezier(0.4, 0, 0.2, 1)';

    newTop = -2000;
    lsBg.style.opacity = 1;

    setTimeout(() => {
        lockscreen.style.top = `${newTop}px`;
        lsBg.style.marginBottom = `-${newTop}px`;

        data.style.marginTop = `${Math.abs(newTop) / 15}px`;
        line.style.marginBottom = `${Math.abs(newTop) / 15}px`;
    }, 0);
}

setTimeout(
    function() {
        
    }, 500
)

addApp("appmgr.png", "com.system.appmgr");
addApp("browser.png", "com.system.browser");
addApp("", "addapp");
