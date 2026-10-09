let player = {
    hp: 100,
    maxHp: 100,
    xp: 0,
    gold: 20
};

let enemy = {
    name: "Wolf",
    hp: 30,
    maxHp: 30,
    xpReward: 25,
    goldReward: 15
};

function level() {
    return Math.floor(player.xp / 100) + 1;
}

function updateUI() {

    document.getElementById("hpBar").style.width =
        (player.hp / player.maxHp * 100) + "%";

    document.getElementById("enemyHp").style.width =
        (enemy.hp / enemy.maxHp * 100) + "%";

    document.getElementById("xpBar").style.width =
        (player.xp % 100) + "%";

    document.getElementById("levelText").textContent =
        "Level " + level();

    document.getElementById("goldText").textContent =
        "🪙 Gold: " + player.gold;
}

function attackEnemy() {

    const damage =
        Math.floor(Math.random() * 10) + 5;

    enemy.hp -= damage;

    showDamage(damage);

    if (enemy.hp <= 0) {

        player.gold += enemy.goldReward;
        player.xp += enemy.xpReward;

        log(
            enemy.name +
            " defeated! +" +
            enemy.goldReward +
            " gold +" +
            enemy.xpReward +
            " XP"
        );

        enemy.hp = enemy.maxHp;
    }

    updateUI();
}

function restPlayer() {

    player.hp = player.maxHp;

    log("You rested at the inn.");

    updateUI();
}

function acceptQuest() {

    document.getElementById("dialogue").textContent =
        "Quest Accepted: Defeat wolves for rewards!";
}

function showDamage(amount) {

    const popup =
        document.createElement("div");

    popup.className = "damage";

    popup.innerText = "-" + amount;

    popup.style.left =
        (window.innerWidth / 2) + "px";

    popup.style.top =
        "250px";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1000);
}

function log(text) {

    const log =
        document.getElementById("log");

    log.innerHTML =
        text + "<br>" +
        log.innerHTML;
}

updateUI();
