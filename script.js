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
let prestigeTracker = 0
const upgradeSoundPlayer = document.getElementById('upgrade-sound');
const prestigeSoundPlayer = document.getElementById('prestige-sound');
const prestigeUpgradeSoundPlayer = document.getElementById('prestigeUpgrade-sound');
const achievementUnlockedSoundPlayer = document.getElementById('achievementUnlock-sound')
const breakAchievementSoundPlayer = document.getElementById('breakAchievement-sound')
let musicMuted = false;
let soundEffectsMuted = false;

function formatNumber(num) {
    if (num >= 1e63) return (num / 1e63).toFixed(2) + "Vg";   // Vigintillion
    if (num >= 1e60) return (num / 1e60).toFixed(2) + "Nv";   // Novemdecillion
    if (num >= 1e57) return (num / 1e57).toFixed(2) + "Oc";   // Octodecillion
    if (num >= 1e54) return (num / 1e54).toFixed(2) + "Sp";   // Septendecillion
    if (num >= 1e51) return (num / 1e51).toFixed(2) + "Sx";   // Sexdecillion
    if (num >= 1e48) return (num / 1e48).toFixed(2) + "Qi";   // Quindecillion
    if (num >= 1e45) return (num / 1e45).toFixed(2) + "Qd";   // Quattuordecillion
    if (num >= 1e42) return (num / 1e42).toFixed(2) + "Td";   // Tredecillion
    if (num >= 1e39) return (num / 1e39).toFixed(2) + "Dd";   // Duodecillion
    if (num >= 1e36) return (num / 1e36).toFixed(2) + "Ud";   // Undecillion
    if (num >= 1e33) return (num / 1e33).toFixed(2) + "Dc";   // Decillion
    if (num >= 1e30) return (num / 1e30).toFixed(2) + "No";   // Nonillion
    if (num >= 1e27) return (num / 1e27).toFixed(2) + "Oc";   // Octillion
    if (num >= 1e24) return (num / 1e24).toFixed(2) + "Sp";   // Septillion
    if (num >= 1e21) return (num / 1e21).toFixed(2) + "Sx";   // Sextillion
    if (num >= 1e18) return (num / 1e18).toFixed(2) + "Qi";   // Quintillion
    if (num >= 1e15) return (num / 1e15).toFixed(2) + "Qa";   // Quadrillion
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
    
    if (!soundEffectsMuted && clickSoundPlayer && clickSoundPlayer.src) {
        const tempSound = new Audio(clickSoundPlayer.src);
        tempSound.volume = 0.4; 
        tempSound.play().catch(error => {
            console.log("SFX blocked by browser context:", error.message);
        });
    }
    

    number += clickPower; 

     if (!firstClickAchievement) {
        unlockFirstClickAchievement();
    }

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
    if (achievementUnlockedSoundPlayer) {
        achievementUnlockedSoundPlayer.src = "sound/universfield-game-level-complete-143022.mp3"
        achievementUnlockedSoundPlayer.volume = 0.5
    }
    
    if (breakAchievementSoundPlayer) {
        breakAchievementSoundPlayer.src = "sound/u_3bsnvt0dsu-spin-fail-295088.mp3"
        breakAchievementSoundPlayer.volume = 0.5
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

function playAchievementSound() {
    if (soundEffectsMuted) return;
    if (achievementUnlockedSoundPlayer && achievementUnlockedSoundPlayer.src) {
        const tempAchievementUnlockedSound = new Audio (achievementUnlockedSoundPlayer.src);
        tempAchievementUnlockedSound.volume = 0.5;
        tempAchievementUnlockedSound.play().catch(error => {
            console.log("Upgrade SFX blocked:", error.message);
        })
    }
}

function playBreakGameSound() {
    if (soundEffectsMuted) return;
    if (breakAchievementSoundPlayer && breakAchievementSoundPlayer.src) {
        const tempBreakAchievementSound = new Audio (breakAchievementSoundPlayer.src);
        tempBreakAchievementSound.volume = 0.5;
        tempBreakAchievementSound.play().catch(error => {
            console.log("Upgrade SFX blocked:", error.message)
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
        totalPlusOneClickOwned ++

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
            prestigeTracker = 1
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
    number += timePower;
    extractNumber.innerHTML = formatNumber(number);
    updateButtonBorders(); 
}, 1000)

function updateUI() {

    if (clickOwned == 1 && !ownPlusOneClickAchievement) {
        unlockOwnPlusOneClickAchievement();
    }
    if (timeOwned == 1 && !ownPlusOneClickPerSecAchievement) {
        unlockOwnPlusOneClickPerSecAchievement();
    }
    if (powerTimeTwoOwned == 1 && !ownTimesTwoClickAchievement) {
        unlockOwnTimesTwoClickAchievement();
    }
    if (timePowerTimesTwoOwned == 1 && !ownTimesTwoClickSecAchievement) {
        unlockOwnTimesTwoClickSecAchievement();
    }
    if (prestigeTracker == 1 && !ownOnePrestigeAchievement) {
        unlockOwnOnePrestigeAchievement();
    }

     if (number >= 10 && !tenClicksAchievement) {
        unlockTenClicksAchievement();
    }
    if (number >= 100 && !hundredClickAchievement) {
        unlockHundrdClickAchievement();
    }
    if (number >= 1000 && !thousandClicksAchievement) {
        unlockThousandClickAchievement();
    }
    if (number >= 10000 && !tenThousandClicksAchievement) {
        unlocktenThousandClickAchievement();
    }
    if (number >= 100000 && !hundredThousandClicksAchievement) {
        unlockHundredThousandClickAchievement();
    }
    if (number >= 1000000 && !oneMillionClicksAchievement) {
        unlockOneMillionClickAchievement();
    }
    if (number >= 10000000 && !tenMillionClicksAchievement) {
        unlockTenMillionClickAchievement();
    }
    if (number >= 100000000 && !hundredMillionClicksAchievement) {
        unlockHundredMillionClickAchievement();
    }
    if (number >= 1000000000 && !oneBillionClicksAchievement) {
        unlockOneBillionClickAchievement();
    }
    if (number >= 10000000000 && !tenBillionClicksAchievement) {
        unlockTenBillionClickAchievement();
    }
    if (number >= 100000000000 && !hundredBillionClicksAchievement) {
        unlockhundredBillionClickAchievement();
    }
    if (number >= 1000000000000 && !trillionClicksAchievement) {
        unlockTrillionClickAchievement();
    }
    if (number >= 10000000000000 && !tenTrillionClicksAchievement) {
        unlockTenTrillionClickAchievement();
    }
    if (number >= 100000000000000 && !hundredTrillionClicksAchievement) {
        unlockHundredTrillionClickAchievement();
    }
    if (number >= 1000000000000000 && !quadrillionClicksAchievement) {
        unlockQuadrillionClickAchivement();
    }
    if (number >= 1000000000000000000 && !breakAchievement) {
        unlockBreakAchievement();
    }
    



    if (clickPower >= 10 && !ownTenClickPowerAchievement) {
        unlockOwnTenClickPowerAchievement();
    }
    if (clickPower >= 1000 && !ownThousandClickPowerAchievement) {
        unlockOwnThousandClickPowerAchievement();
    }
    if (clickPower >= 100000 && !ownHundredThousandClickPowerAchievement) {
        unlockOwnHundredThousandClickPowerAchievement();
    }
    if (clickPower >= 1000000 && !ownMillionClickPowerAchievement) {
        unlockOwnMillionClickPowerAchievement();
    }
    if (clickPower >= 1000000000 && !ownBillionClickPowerAchievement) {
        unlockOwnBillionPowerAchievement();
    }



    if (timePower >= 10 && !ownTenTimePower) {
        unlockOwnTenTimePower();
    }
    if (timePower >= 1000 && !ownThousandTimePower) {
        unlockOwnThousandTimePower();
    }
    if (timePower >= 100000 && !ownHundredThousandTimePower) {
        unlockOwnHundredThousandTimePower();
    }
    if (timePower >= 1000000 && !ownMillionTimePower) {
        unlockOwnMillionTimePower();
    }
    if (timePower >= 1000000000 && !ownBillionTimePower) {
        unlockOwnBillionTimePower();
    }

    if (prestigeAmount >= 10 && !ownTenPrestige) {
        unlockOwnTenPrestige();
    }
    if (prestigeAmount >= 50 && !ownFiftyPrestige) {
        unlockOwnFiftyPrestige();
    }
    if (prestigeAmount >= 100 && !ownHundredPrestige) {
        unlockOwnHundredPrestige();
    }

    if (clickPower >= 1000000000000 && !ownTrillionClickPowerAchievement) {
        unlockOwnTrillionPowerAchievement();
    }


    calculatePrestigeCanBuy();
    extractNumber.innerHTML = formatNumber(number);
    updateButtonBorders();
    requestAnimationFrame(updateUI);
}
requestAnimationFrame(updateUI); 

updateButtonBorders()
extractNumber.innerHTML = formatNumber(number);
extractClickCost.innerHTML = formatNumber(clickCost);
extractClickPower.innerHTML = formatNumber(clickPower)
extractTimeCost.innerHTML = formatNumber(timeCost);
extractPrestigeCost.innerHTML = formatNumber(prestigeCost);
extractPowerTimeTwoCost.innerHTML = formatNumber(powerTimeTwoCost)
extractTimePower.innerHTML = formatNumber(timePower)
extractTimePowerTimesTwoCost.innerHTML = formatNumber(timePowerTimesTwoCost)
extractPrestigeAmount.innerHTML = formatNumber(prestigeAmount)

function openAchievements() {
  document.getElementById("achievementsOverlay").classList.remove("hidden");
  renderAchievements();
}

function closeAchievements() {
  document.getElementById("achievementsOverlay").classList.add("hidden");
}

function openCustomization() {
    document.getElementById("customizationOverlay").classList.remove("hidden")
    renderCustomization();
}

function closeCustomization() {
    document.getElementById("customizationOverlay").classList.add("hidden")
}

let firstClickAchievement = false;
let ownPlusOneClickAchievement = false;
let ownPlusOneClickPerSecAchievement = false;
let ownTimesTwoClickAchievement = false;
let ownTimesTwoClickSecAchievement = false;
let ownOnePrestigeAchievement = false;

let tenClicksAchievement = false;
let hundredClickAchievement = false;
let thousandClicksAchievement = false;
let tenThousandClicksAchievement = false;
let hundredThousandClicksAchievement = false;
let oneMillionClicksAchievement = false;
let tenMillionClicksAchievement = false;
let hundredMillionClicksAchievement = false;
let oneBillionClicksAchievement = false;
let tenBillionClicksAchievement = false;
let hundredBillionClicksAchievement = false;
let trillionClicksAchievement = false;
let tenTrillionClicksAchievement = false;
let hundredTrillionClicksAchievement = false;
let quadrillionClicksAchievement = false;
let breakAchievement = false;

let ownTenClickPowerAchievement = false;
let ownThousandClickPowerAchievement = false;
let ownHundredThousandClickPowerAchievement = false;
let ownMillionClickPowerAchievement = false;
let ownBillionClickPowerAchievement = false;
let ownTrillionClickPowerAchievement = false;

let ownTenTimePower = false;
let ownThousandTimePower = false;
let ownHundredThousandTimePower = false;
let ownMillionTimePower = false;
let ownBillionTimePower = false;

let ownTenPrestige = false;
let ownFiftyPrestige = false;
let ownHundredPrestige = false;

let totalPlusOneClickOwned = 0;

function unlockFirstClickAchievement() {
    firstClickAchievement = true;

    const achievement = document.getElementById("firstClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("The Beginning");
    playAchievementSound();
}

function unlockOwnPlusOneClickAchievement() {
    ownPlusOneClickAchievement = true;

    const achievement = document.getElementById("ownPlusOneClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("1+1=2")
    playAchievementSound();
}

function unlockOwnPlusOneClickPerSecAchievement() {
    ownPlusOneClickPerSecAchievement = true;

    const achievement = document.getElementById("ownPlusOneClickPerSecAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Passive Income")
    playAchievementSound();
}

function unlockOwnTimesTwoClickAchievement() {
    ownTimesTwoClickAchievement = true;

    const achievement = document.getElementById("ownTimesTwoClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Mathing")
    playAchievementSound();
}

function unlockOwnTimesTwoClickSecAchievement() {
    ownTimesTwoClickSecAchievement = true;

    const achievement = document.getElementById("ownTimesTwoClickSecAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Mastering Time");
    playAchievementSound();
    
}

function unlockOwnOnePrestigeAchievement() {
    ownOnePrestigeAchievement = true;

    const achievement = document.getElementById("ownOnePrestigeAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("New and Improved");
    playAchievementSound();
}





function unlockTenClicksAchievement() {
    tenClicksAchievement = true;

    const achievement = document.getElementById("tenClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("We're Getting Somewhere");
    playAchievementSound()
}

function unlockHundrdClickAchievement() {
    hundredClickAchievement = true;

    const achievement = document.getElementById("hundredClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Making Progress");
    playAchievementSound();
}

function unlockThousandClickAchievement() {
    thousandClicksAchievement = true;

    const achievement = document.getElementById("thousandClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Determined");
    playAchievementSound();
    
}

function unlocktenThousandClickAchievement() {
    tenThousandClicksAchievement = true;

    const achievement = document.getElementById("tenThousandClickAchievement")

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Restart?");
    playAchievementSound();
}

function unlockHundredThousandClickAchievement() {
    hundredThousandClicksAchievement = true;

    const achievement = document.getElementById("hundredThousandClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Wow!");
    playAchievementSound();

}

function unlockOneMillionClickAchievement() {
    oneMillionClicksAchievement = true;

    const achievement = document.getElementById("oneMillionClickAchievement")

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Millionaire")
    playAchievementSound();
}

function unlockTenMillionClickAchievement() {
    tenMillionClicksAchievement = true;

    const achievement = document.getElementById("tenMillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Top 1%")
    playAchievementSound();
}

function unlockHundredMillionClickAchievement() {
    hundredMillionClicksAchievement = true;

    const achievement = document.getElementById("hundredMillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Keep Going!");
    playAchievementSound();
}

function unlockOneBillionClickAchievement() {
    oneBillionClicksAchievement = true;

    const achievement = document.getElementById('oneBillionClickAchievement');

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Billionaire");
    playAchievementSound();
    
}

function unlockTenBillionClickAchievement() {
    tenBillionClicksAchievement = true;

    const achievement = document.getElementById("tenBillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Slow Progress");
    playAchievementSound();
}

function unlockhundredBillionClickAchievement() {
    hundredBillionClicksAchievement = true;

    const achievement = document.getElementById("hundredBillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Leave Some For Us!")
    playAchievementSound();
}

function unlockTrillionClickAchievement() {
    trillionClicksAchievement = true;

    const achievement = document.getElementById("trillionClickAchievement")

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Trillionaire")
    playAchievementSound();
}

function unlockTenTrillionClickAchievement() {
    tenTrillionClicksAchievement = true;

    const achievement = document.getElementById("tenTrillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("I Have No Words...")
    playAchievementSound();
}

function unlockHundredTrillionClickAchievement() {
    hundredTrillionClicksAchievement = true;

    const achievement = document.getElementById("hundredTrillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");


    showAchievementPopup("Mind Giving Me Some?")
    playAchievementSound();
}

function unlockQuadrillionClickAchivement() {
    quadrillionClicksAchievement = true;

    const achievement = document.getElementById("quadrillionClickAchievement");

    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");


    showAchievementPopup("The G.O.A.T")
    playAchievementSound();
}

function unlockOwnTenClickPowerAchievement() {
    ownTenClickPowerAchievement = true;

    const achievement = document.getElementById("ownTenClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("You Have the Power");
    playAchievementSound();

}

function unlockOwnThousandClickPowerAchievement() {
    ownThousandClickPowerAchievement = true;

    const achievement = document.getElementById("ownThousandClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("I Sense Your Strength");
    playAchievementSound();
}

function unlockOwnHundredThousandClickPowerAchievement() {
    ownHundredThousandClickPowerAchievement = true;

    const achievement = document.getElementById("ownHundredThousandClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Oof");
    playAchievementSound();
}

function unlockOwnMillionClickPowerAchievement() {
    ownMillionClickPowerAchievement = true;

    const achievement = document.getElementById("ownMillionClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Chill with those Muscles!");
    playAchievementSound();
}

function unlockOwnBillionPowerAchievement() {
    ownBillionClickPowerAchievement = true;

    const achievement = document.getElementById("ownBillionClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Muscular")
    playAchievementSound();
}

function unlockOwnTrillionPowerAchievement() {
    ownTrillionClickPowerAchievement = true;

    const achievement = document.getElementById("ownTrillionClickPowerAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Body Builder");
    playAchievementSound();
}

function unlockOwnTenTimePower() {
    ownTenTimePower = true;

    const achievement = document.getElementById("ownTenTimePower");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Investor")
    playAchievementSound();
}

function unlockOwnThousandTimePower() {
    ownThousandTimePower = true;

    const achievement = document.getElementById("ownThousandTimePower");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Patience is Key")
    playAchievementSound();
}

function unlockOwnHundredThousandTimePower() {
    ownHundredThousandTimePower = true;

    const achievement = document.getElementById("ownHundredThousandTimePower");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Sit Down and Do Nothing")
    playAchievementSound();
}

function unlockOwnMillionTimePower() {
    ownMillionTimePower = true;

    const achievement = document.getElementById("ownMillionTimePower");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Jealous");
    playAchievementSound();
}

function unlockOwnBillionTimePower() {
    ownBillionTimePower = true;

    const achievement = document.getElementById("ownBillionTimePower");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Easy Numbers");
    playAchievementSound();
}

function unlockOwnTenPrestige() {
    ownTenPrestige = true;

    const achievement = document.getElementById("ownTenPrestige");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Saving Up?")
    playAchievementSound();
}

function unlockOwnFiftyPrestige() {
    ownFiftyPrestige = true;

    const achievement = document.getElementById("ownFiftyPrestige");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("You Are Really Dedicated!")
    playAchievementSound();
}

function unlockOwnHundredPrestige() {
    ownHundredPrestige = true;

    const achievement = document.getElementById("ownHundredPrestige");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Prestigious")
    playAchievementSound();
}



function unlockBreakAchievement() {
    breakAchievement = true;

    const achievement = document.getElementById("breakAchievement");
    achievement.classList.remove("achievementLocked");
    achievement.classList.add("achievementUnlocked");

    showAchievementPopup("Welp, that's it for now!")
    playBreakGameSound();
}




function showAchievementPopup(name) {

    const popup = document.getElementById("achievementPopup");
    const text = document.getElementById("achievementPopupText");

    text.textContent = name;

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 3000);
}

const startScreen = document.getElementById("startScreen");

startScreen.addEventListener("click", () => {
    // Start music
    setupFirstTrack();

    audioPlayer.volume = 0.5;
    audioPlayer.play().catch(e => console.log(e));

    musicStarted = true;

    startScreen.classList.add("fadeOut");

    setTimeout(() => {
        startScreen.remove();
    }, 600);
});