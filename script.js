let extractNumber = document.getElementById("number");
let number = parseFloat(extractNumber.innerHTML);

let extractClickCost = document.getElementById("clickCost");
let clickCost = parseFloat(extractClickCost.innerHTML);

let extractClickOwned = document.getElementById("clickOwned");
let clickOwned = parseFloat(extractClickOwned.innerHTML);

let extractClickPower = document.getElementById("statTextPower");
let clickPower = parseFloat(extractClickPower.innerHTML);

let extractTimeCost = document.getElementById("timeCost");
let timeCost = parseFloat(extractTimeCost.innerHTML);

let extractTimeOwned = document.getElementById("timeOwned");
let timeOwned = parseFloat(extractTimeOwned.innerHTML);

let extractTimePower = document.getElementById("statTextSec");
let timePower = parseFloat(extractTimePower.innerHTML);

let clickPowerUpgrade = document.getElementById("clickPowerUpgrade");
let clickTimeUpgrade = document.getElementById("clickTimeUpgrade");

let prestigeUpgrade = document.getElementById("prestigeUpgrade");

let extractPrestigeCost = document.getElementById("prestigeCost");
let prestigeCost = parseFloat(extractPrestigeCost.innerHTML);

let extractPrestigeAmount = document.getElementById("prestigeAmount");
let prestigeAmount = parseFloat(extractPrestigeAmount.innerHTML);

let extractOneClickSecCost = document.getElementById("oneClickSecCost");
let oneClickSecCost = parseFloat(extractOneClickSecCost.innerHTML);

let extractClickSecStartPower = document.getElementById("clickSecStartPower");
let clickSecStartPower = parseFloat(extractClickSecStartPower.innerHTML);

let startWithTenClickSec = document.getElementById("startWithTenClickSec");

let extractPrestigeCanBuy = document.getElementById("prestigeCanBuy");
let prestigeCanBuy = parseFloat(extractPrestigeCanBuy.innerHTML);
 
let extractPowerTimeTwoCost = document.getElementById("powerTimeTwoCost");
let powerTimeTwoCost = parseFloat(extractPowerTimeTwoCost.innerHTML);

let extractPowerTimeTwoOwned = document.getElementById("powerTimeTwoOwned");
let powerTimeTwoOwned = parseFloat(extractPowerTimeTwoOwned.innerHTML);

let clickPowerTimeTwoUpgrade = document.getElementById("clickPowerTimeTwoUpgrade");

let extractTimePowerTimesTwoCost = document.getElementById("timePowerTimesTwoCost");
let timePowerTimesTwoCost = parseFloat(extractTimePowerTimesTwoCost.innerHTML);

let extractTimePowerTimesTwoOwned = document.getElementById("timePowerTimesTwoOwned");
let timePowerTimesTwoOwned = parseFloat(extractTimePowerTimesTwoOwned.innerHTML);

let timePowerTimeTwoUpgrade = document.getElementById("timePowerTimeTwoUpgrade");

let extractClickStartPower = document.getElementById("clickStartPower");
let clickStartPower = parseFloat(extractClickStartPower.innerHTML);

let extractClickStartCost = document.getElementById("clickStartCost");
let clickStartCost = parseFloat(extractClickStartCost.innerHTML);

let startWithHundred = document.getElementById("startWithHundred");

let muteSoundEffectButton = document.getElementById("muteSoundEffect");
let muteMusicButton = document.getElementById("muteMusic");

let permanentStartingSec = 0
let permanentStartingClick = 0
const upgradeSoundPlayer = document.getElementById('upgrade-sound');
const prestigeSoundPlayer = document.getElementById('prestige-sound');
const prestigeUpgradeSoundPlayer = document.getElementById('prestigeUpgrade-sound');
let musicMuted = false;
let soundEffectsMuted = false;

function formatNumber(num) {
    if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qa";
    if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
    if (num >= 1e9)  return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6)  return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3)  return (num / 1e3).toFixed(2) + "k";
    return num.toFixed(0);
}

const audioPlayer = document.getElementById('bg-music'); 

const clickSoundPlayer = document.getElementById('click-sound');

const playlist = [ 
    'music/tunetank-jazz-cafe-music-348267.mp3', 
    'music/vibedepot-jazz-walk-419815.mp3', 
    'music/waveloom-jazz-cafe-516774.mp3', 
    'music/waveloom-jazz-restaurant-516751.mp3', 
    'music/waveloom-no-copyright-jazz-elegant-525518.mp3' 
];

let currentTrackIndex = -1; 

function setupFirstTrack() {
    let randomIndex = Math.floor(Math.random() * playlist.length);
    currentTrackIndex = randomIndex;
    audioPlayer.muted = musicMuted;
    audioPlayer.volume = 0.5; 
    audioPlayer.src = playlist[randomIndex];
    console.log("🎵 Music primed and waiting for player interaction.");
}

function playRandomTrack() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * playlist.length);
    } while (randomIndex === currentTrackIndex && playlist.length > 1);

    currentTrackIndex = randomIndex; 
    audioPlayer.muted = musicMuted;
    audioPlayer.volume = 0.5;
    audioPlayer.src = playlist[randomIndex];
    audioPlayer.play().catch(e => console.log("Playback error:", e.message));
}


audioPlayer.addEventListener('ended', playRandomTrack);


let musicStarted = false;

// Core game click engine
function handleGameClick() {
    
    if (!musicStarted && audioPlayer) {
        audioPlayer.muted = musicMuted;
        audioPlayer.volume = 0.5;
        audioPlayer.play()
            .then(() => {
                musicStarted = true; 
                console.log("🎵 Background playlist started successfully!");
            })
            .catch(error => {
                console.log("Play blocked by browser context:", error.message);
            });
    }

    if (!soundEffectsMuted && clickSoundPlayer && clickSoundPlayer.src) {
        const tempSound = new Audio(clickSoundPlayer.src);
        tempSound.volume = 0.4; 
        tempSound.play().catch(error => {
            console.log("SFX blocked by browser context:", error.message);
        });
    }

    number += clickPower;
    extractNumber.innerHTML = formatNumber(number);
    
    if (typeof saveGame === "function") saveGame(); 
    updateButtonBorders();
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Prime the first song
    setupFirstTrack();
    
        muteMusicButton.addEventListener("click", () => {
        musicMuted = !musicMuted;

        audioPlayer.muted = musicMuted;

        muteMusicButton.style.borderColor = musicMuted ? "gray" : "white";
        muteMusicButton.style.color = musicMuted ? "gray" : 'white';
    });

    muteSoundEffectButton.addEventListener("click", () => {
        soundEffectsMuted = !soundEffectsMuted;

        muteSoundEffectButton.style.borderColor =
        soundEffectsMuted ? "gray" : "white";

        muteSoundEffectButton.style.color =
        soundEffectsMuted ? "gray" : "white";
    });

    if (clickSoundPlayer) {
        clickSoundPlayer.src = 'sound/dragon-studio-pop-402323.mp3'; 
        clickSoundPlayer.volume = 0.4; 
    }
    

    const increaseButton = document.getElementById("increase");
    if (increaseButton) {
        increaseButton.addEventListener('click', handleGameClick);
    }

   
    if (upgradeSoundPlayer) {
    upgradeSoundPlayer.src = 'sound/dragon-studio-register-cha-ching-376896.mp3'; 
    upgradeSoundPlayer.volume = 0.5;

    if (prestigeSoundPlayer) {
        prestigeSoundPlayer.src = "sound/tithuh-powerup-success-523645.mp3";
        prestigeSoundPlayer.volume = 0.5;
    }

    if (prestigeUpgradeSoundPlayer) {
        prestigeUpgradeSoundPlayer.src = 'sound/liecio-bonus-points-190035.mp3';
        prestigeUpgradeSoundPlayer.volume = 0.5
    }
}

});

function playUpgradeSound() {

       if (soundEffectsMuted) return;

    if (upgradeSoundPlayer && upgradeSoundPlayer.src) {
        const tempUpgradeSound = new Audio(upgradeSoundPlayer.src);
        tempUpgradeSound.volume = 0.5; 
        tempUpgradeSound.play().catch(error => {
            console.log("Upgrade SFX blocked:", error.message);
        });
    }
}

function playPrestigeSound() {

        if (soundEffectsMuted) return;
    if (prestigeSoundPlayer && prestigeSoundPlayer.src) {
        const tempPrestigeSound = new Audio(prestigeSoundPlayer.src);
        tempPrestigeSound.volume = 0.5; 
        tempPrestigeSound.play().catch(error => {
            console.log("Upgrade SFX blocked:", error.message);
        });
    }
}

function playPrestigeUpgradeSound() {

        if (soundEffectsMuted) return;
    if (prestigeUpgradeSoundPlayer && prestigeUpgradeSoundPlayer.src) {
        const tempPrestigeUpgradeSound = new Audio(prestigeUpgradeSoundPlayer.src);
        tempPrestigeUpgradeSound.volume = 0.5;
        tempPrestigeUpgradeSound.play().catch(error => {
            console.log("Upgrade SFX blocked:", error.message);
        })
    }
}

function upgradeTimesTwo() {
    if (number >= powerTimeTwoCost) {
        number = number - powerTimeTwoCost;
        powerTimeTwoCost = Math.ceil(powerTimeTwoCost * 2);
        powerTimeTwoOwned ++
        clickPower *= 2

        extractPowerTimeTwoCost.innerHTML = formatNumber(powerTimeTwoCost);
        extractNumber.innerHTML = formatNumber(number);
        extractPowerTimeTwoOwned.innerHTML = formatNumber(powerTimeTwoOwned);
        extractClickPower.innerHTML = formatNumber(clickPower)
        playUpgradeSound();
    }
}

function upgradeClick() {
    if (number >= clickCost) {
        number = number - clickCost;
        clickCost = Math.ceil(clickCost * 1.5);
        clickOwned ++
        clickPower ++

        extractClickCost.innerHTML = formatNumber(clickCost);
        extractNumber.innerHTML = formatNumber(number);
        extractClickOwned.innerHTML = formatNumber(clickOwned);
        extractClickPower.innerHTML = formatNumber(clickPower);
        updateButtonBorders()
        playUpgradeSound();
       
    } 
}



function updateButtonBorders() {
    if (number >= clickCost) {
        clickPowerUpgrade.style.borderColor = "white";
    } else {
        clickPowerUpgrade.style.borderColor = "gray";
    }

    if (number >= timeCost) {
        clickTimeUpgrade.style.borderColor = "white";
    } else {
        clickTimeUpgrade.style.borderColor = "gray";
    }

    if (number >= prestigeCost) {
        prestigeUpgrade.style.borderColor = "white";
    } else {
        prestigeUpgrade.style.borderColor = "gray";
    }
    if (prestigeAmount >= oneClickSecCost) {
        startWithTenClickSec.style.borderColor = "white"
    } else {
        startWithTenClickSec.style.borderColor = "gray"
    }
    if (number >= powerTimeTwoCost) {
        clickPowerTimeTwoUpgrade.style.borderColor = "white"
    } else {
        clickPowerTimeTwoUpgrade.style.borderColor = "gray"
    } 
    if (number >= timePowerTimesTwoCost) {
        timePowerTimeTwoUpgrade.style.borderColor = "white"
    } else {
        timePowerTimeTwoUpgrade.style.borderColor = "gray"
    } if (prestigeAmount >= clickStartCost) {
        startWithHundred.style.borderColor = "white"
    } else {
        startWithHundred.style.borderColor = "gray"
    }
}

function upgradeTime() {
    if (number >= timeCost) {
        number = number - timeCost;
        timeCost = Math.ceil(timeCost * 1.5)
        timeOwned ++
        timePower += 1
        
        extractTimeCost.innerHTML = formatNumber(timeCost);
        extractNumber.innerHTML = formatNumber(number);
        extractTimeOwned.innerHTML = formatNumber(timeOwned);
        extractTimePower.innerHTML = formatNumber(timePower);
        updateButtonBorders();
        playUpgradeSound();
    } 
    return timePower;
}

function upgradePrestige() { 
    if (number >= prestigeCost) { 
        let purchasedPrestiges = 0; 
        while (number >= prestigeCost) { 
            
            if (prestigeCost <= 0) break;

            number = number - prestigeCost; 
            prestigeCost = Math.ceil(prestigeCost * 1.2); 
            prestigeAmount++; 
            purchasedPrestiges++; 
        } 
    
        timeOwned = 0 
        timeCost = 100 
        timePower = 0 + permanentStartingSec
        clickPower = 1 + permanentStartingClick
        clickCost = 10 
        clickOwned = 0 
        number = 0 
        powerTimeTwoCost = 1000
        powerTimeTwoOwned = 0


        
        prestigeCanBuy = 1;

        extractPowerTimeTwoOwned.innerHTML = formatNumber(powerTimeTwoOwned)
        extractPowerTimeTwoCost.innerHTML = formatNumber(powerTimeTwoCost)
        extractPrestigeCanBuy.innerHTML = formatNumber(prestigeCanBuy);
        extractClickOwned.innerHTML = formatNumber(clickOwned); 
        extractClickPower.innerHTML = formatNumber(clickPower); 
        extractClickCost.innerHTML = formatNumber(clickCost); 
        extractTimeOwned.innerHTML = formatNumber(timeOwned); 
        extractTimePower.innerHTML = formatNumber(timePower); 
        extractTimeCost.innerHTML = formatNumber(timeCost); 
        extractPrestigeAmount.innerHTML = formatNumber(prestigeAmount); 
        extractPrestigeCost.innerHTML = formatNumber(prestigeCost); 
        extractNumber.innerHTML = formatNumber(number); 
        updateButtonBorders(); 
        playPrestigeSound();
    } 
} 

function calculatePrestigeCanBuy() {
    let tempNumber = number;
    let tempPrestigeCost = prestigeCost;
    let count = 0;
    let totalCostAccumulated = 0;

    while (tempNumber >= tempPrestigeCost) {
        totalCostAccumulated += tempPrestigeCost;
        tempNumber -= tempPrestigeCost;
        tempPrestigeCost = Math.ceil(tempPrestigeCost * 1.2);
        count++;
    }

    if (tempPrestigeCost <= 0) {
        prestigeCanBuy = 1;
        extractPrestigeCanBuy.innerHTML = "1";
        return;
    }

    
    prestigeCanBuy = count > 0 ? count : 1;
    extractPrestigeCanBuy.innerHTML = formatNumber(prestigeCanBuy);
    
    let costContainer = extractPrestigeCost.parentElement;

    if (count > 1) {
        costContainer.innerHTML = 'Total Cost: <span id="prestigeCost">' + formatNumber(totalCostAccumulated) + '</span>';
    } else {
        costContainer.innerHTML = 'Cost: <span id="prestigeCost">' + formatNumber(prestigeCost) + '</span>';
    }
    
    extractPrestigeCost = document.getElementById("prestigeCost");
}


function upgradeStartingClick() {
    if (prestigeAmount >= oneClickSecCost) {
        prestigeAmount = prestigeAmount - oneClickSecCost;
        permanentStartingSec += clickSecStartPower
        timePower += clickSecStartPower
        clickSecStartPower = clickSecStartPower*10;
        oneClickSecCost = oneClickSecCost + 1 

        extractClickSecStartPower.innerHTML = formatNumber(clickSecStartPower)
        extractTimePower.innerHTML = formatNumber(timePower)
        extractPrestigeAmount.innerHTML = formatNumber(prestigeAmount)
        extractOneClickSecCost.innerHTML = formatNumber(oneClickSecCost)
        updateButtonBorders();
        playPrestigeUpgradeSound();
    }
}

function upgradeStartWithHundred() {
    if (prestigeAmount >= clickStartCost) {
        prestigeAmount = prestigeAmount - clickStartCost
        permanentStartingClick += clickStartPower
        clickPower += clickStartPower
        clickStartPower = clickStartPower*2;
        clickStartCost = clickStartCost + 1

        extractPrestigeAmount.innerHTML = formatNumber(prestigeAmount);
        extractClickStartCost.innerHTML = formatNumber(clickStartCost);
        extractClickStartPower.innerHTML = formatNumber(clickStartPower);
        extractClickPower.innerHTML = formatNumber(clickPower);
        updateButtonBorders();
        playPrestigeUpgradeSound();
    }
}

function upgradeTimesTwoSec() {
    if (number >= timePowerTimesTwoCost) {
        number = number - timePowerTimesTwoCost;
        timePowerTimesTwoCost = Math.ceil(timePowerTimesTwoCost * 2);
        timePowerTimesTwoOwned ++;
        timePower = timePower * 2;

        extractTimePowerTimesTwoCost.innerHTML = formatNumber(timePowerTimesTwoCost);
        extractTimePowerTimesTwoOwned.innerHTML = formatNumber(timePowerTimesTwoOwned);
        extractNumber.innerHTML = formatNumber(number);
        extractTimePower.innerHTML = formatNumber(timePower);
        
        updateButtonBorders();
        playUpgradeSound();
    }
}


setInterval(() => {
number += timePower
extractNumber.innerHTML = formatNumber(number);
updateButtonBorders(); 
}, 1000)

function updateUI() {
    calculatePrestigeCanBuy();
    extractNumber.innerHTML = formatNumber(number);
    updateButtonBorders();
    requestAnimationFrame(updateUI);
}
requestAnimationFrame(updateUI); 

updateButtonBorders()
extractNumber.innerHTML = formatNumber(number);
extractClickCost.innerHTML = formatNumber(clickCost);
extractTimeCost.innerHTML = formatNumber(timeCost);
extractPrestigeCost.innerHTML = formatNumber(prestigeCost);
extractPowerTimeTwoCost.innerHTML = formatNumber(powerTimeTwoCost)
extractTimePower.innerHTML = formatNumber(timePower)
extractTimePowerTimesTwoCost.innerHTML = formatNumber(timePowerTimesTwoCost)






