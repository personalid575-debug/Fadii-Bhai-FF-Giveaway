const uidInput = document.getElementById("uidInput");
const addUidBtn = document.getElementById("addUidBtn");
const uidList = document.getElementById("uidList");
const continueBtn = document.getElementById("continueBtn");
const playerCount = document.getElementById("playerCount");

let players =
    JSON.parse(localStorage.getItem("giveawayPlayers")) || [];


/* =========================
   UID LIST PAGE
========================= */

if (
    uidInput &&
    addUidBtn &&
    uidList &&
    continueBtn
) {

    function displayPlayers() {

        uidList.innerHTML = "";

        players.forEach(function(uid, index) {

            const li =
                document.createElement("li");

            li.innerHTML = `
                <span>${index + 1}. ${uid}</span>

                <button
                    onclick="removePlayer(${index})"
                    title="Remove UID"
                >
                    ×
                </button>
            `;

            uidList.appendChild(li);
        });

        if (playerCount) {
            playerCount.textContent =
                players.length;
        }
    }


    function addPlayer() {

        const uid =
            uidInput.value.trim();


        if (uid === "") {

            alert(
                "Please enter a Player UID."
            );

            return;
        }


        if (players.includes(uid)) {

            alert(
                "This UID is already added."
            );

            return;
        }


        players.push(uid);


        localStorage.setItem(
            "giveawayPlayers",
            JSON.stringify(players)
        );


        uidInput.value = "";


        displayPlayers();
    }


    window.removePlayer =
        function(index) {

            players.splice(index, 1);


            localStorage.setItem(
                "giveawayPlayers",
                JSON.stringify(players)
            );


            displayPlayers();
        };


    addUidBtn.addEventListener(
        "click",
        addPlayer
    );


    uidInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                addPlayer();
            }
        }
    );


    continueBtn.addEventListener(
        "click",
        function() {

            if (players.length < 2) {

                alert(
                    "Please add at least 2 Players."
                );

                return;
            }


            window.location.href =
                "spin.html";
        }
    );


    displayPlayers();
}


/* =========================
   SPIN PAGE
========================= */

const wheel =
    document.getElementById("wheel");


if (wheel) {

    const ctx =
        wheel.getContext("2d");


    const spinWheelBtn =
        document.getElementById(
            "spinWheelBtn"
        );


    const winnerPopup =
        document.getElementById(
            "winnerPopup"
        );


    const popupUid =
        document.getElementById(
            "popupUid"
        );


    const popupReward =
        document.getElementById(
            "popupReward"
        );


    const closePopup =
        document.getElementById(
            "closePopup"
        );


    const spinAgainBtn =
        document.getElementById(
            "spinAgainBtn"
        );


    const backToUidsBtn =
        document.getElementById(
            "backToUidsBtn"
        );


    const rewards = [

        "20 Diamonds",

        "50 Diamonds",

        "100 Diamonds",

        "250 Diamonds",

        "500 Diamonds",

        "Weekly Membership",

        "Monthly Membership"

    ];


    let currentRotation = 0;

    let spinning = false;

    let selectedWinnerIndex = null;


    players =
        JSON.parse(
            localStorage.getItem(
                "giveawayPlayers"
            )
        ) || [];


    if (playerCount) {

        playerCount.textContent =
            players.length;
    }


    /* =========================
       DRAW WHEEL
    ========================= */

    function drawWheel() {

        ctx.clearRect(
            0,
            0,
            wheel.width,
            wheel.height
        );


        if (players.length === 0) {

            ctx.beginPath();

            ctx.arc(
                250,
                250,
                235,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#151515";

            ctx.fill();

            ctx.fillStyle =
                "#777";

            ctx.font =
                "bold 24px Arial";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.fillText(
                "Add UIDs First",
                250,
                250
            );

            return;
        }


        const centerX = 250;

        const centerY = 250;

        const radius = 235;


        const slice =
            (Math.PI * 2) /
            players.length;


        const colors = [

            "#ff7a00",

            "#202020",

            "#ff3d00",

            "#333333",

            "#ff9500",

            "#181818"

        ];


        players.forEach(
            function(uid, index) {

                const startAngle =
                    currentRotation +
                    index * slice;


                const endAngle =
                    startAngle +
                    slice;


                ctx.beginPath();


                ctx.moveTo(
                    centerX,
                    centerY
                );


                ctx.arc(
                    centerX,
                    centerY,
                    radius,
                    startAngle,
                    endAngle
                );


                ctx.closePath();


                ctx.fillStyle =
                    colors[
                        index %
                        colors.length
                    ];


                ctx.fill();


                ctx.strokeStyle =
                    "#080808";

                ctx.lineWidth = 3;

                ctx.stroke();


                const textAngle =
                    startAngle +
                    slice / 2;


                const textX =
                    centerX +
                    Math.cos(textAngle) *
                    radius *
                    0.62;


                const textY =
                    centerY +
                    Math.sin(textAngle) *
                    radius *
                    0.62;


                ctx.save();


                ctx.translate(
                    textX,
                    textY
                );


                ctx.rotate(
                    textAngle
                );


                ctx.fillStyle =
                    "#ffffff";


                ctx.font =
                    "bold 16px Arial";


                ctx.textAlign =
                    "center";


                ctx.textBaseline =
                    "middle";


                let displayUid =
                    String(uid);


                if (
                    displayUid.length > 10
                ) {

                    displayUid =
                        displayUid.substring(
                            0,
                            10
                        ) + "...";
                }


                ctx.fillText(
                    displayUid,
                    0,
                    0
                );


                ctx.restore();
            }
        );


        /* CENTER */

        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            55,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#0b0b0b";

        ctx.fill();

        ctx.strokeStyle =
            "#ff7a00";

        ctx.lineWidth = 5;

        ctx.stroke();


        ctx.beginPath();

        ctx.arc(
            centerX,
            centerY,
            43,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            "rgba(255,122,0,0.25)";

        ctx.lineWidth = 2;

        ctx.stroke();


        ctx.fillStyle =
            "#ff7a00";

        ctx.font =
            "bold 15px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";


        ctx.fillText(
            "SPIN",
            centerX,
            centerY
        );
    }


    /* =========================
       CONFETTI
    ========================= */

    function createConfetti() {

        const oldConfetti =
            document.getElementById(
                "confettiContainer"
            );


        if (oldConfetti) {
            oldConfetti.remove();
        }


        const container =
            document.createElement(
                "div"
            );


        container.id =
            "confettiContainer";


        container.style.position =
            "fixed";

        container.style.inset =
            "0";

        container.style.pointerEvents =
            "none";

        container.style.zIndex =
            "999";


        for (
            let i = 0;
            i < 80;
            i++
        ) {

            const piece =
                document.createElement(
                    "div"
                );


            piece.style.position =
                "absolute";


            piece.style.width =
                Math.random() * 8 +
                5 +
                "px";


            piece.style.height =
                Math.random() * 14 +
                6 +
                "px";


            piece.style.left =
                Math.random() * 100 +
                "%";


            piece.style.top =
                "-20px";


            piece.style.background = [

                "#ff7a00",

                "#ff3d00",

                "#ffffff",

                "#ff9500"

            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


            piece.style.transform =
                "rotate(" +
                Math.random() * 360 +
                "deg)";


            piece.style.animation =
                "confettiFall " +
                (
                    Math.random() * 2 +
                    2
                ) +
                "s linear forwards";


            piece.style.animationDelay =
                Math.random() * 0.5 +
                "s";


            container.appendChild(
                piece
            );
        }


        document.body.appendChild(
            container
        );


        setTimeout(
            function() {

                container.remove();

            },
            4500
        );
    }


    /* =========================
       SHOW WINNER
    ========================= */

    function showWinner() {

        if (
            selectedWinnerIndex === null
        ) {
            return;
        }


        const winner =
            players[
                selectedWinnerIndex
            ];


        if (!winner) {
            return;
        }


        const rewardIndex =
            Math.floor(
                Math.random() *
                rewards.length
            );


        const reward =
            rewards[rewardIndex];


        popupUid.textContent =
            winner;


        popupReward.textContent =
            reward;


        winnerPopup.classList.add(
            "show"
        );


        createConfetti();
    }


    /* =========================
       SPIN
    ========================= */

    function spinWheel() {

        if (players.length < 2) {

            alert(
                "Please add at least 2 Players."
            );

            return;
        }


        if (spinning) {
            return;
        }


        spinning = true;


        spinWheelBtn.disabled =
            true;


        spinWheelBtn.textContent =
            "🎰 SPINNING...";


        /*
            Select winner BEFORE animation.
            This makes every UID, including
            the last UID, work correctly.
        */

        selectedWinnerIndex =
            Math.floor(
                Math.random() *
                players.length
            );


        const slice =
            (Math.PI * 2) /
            players.length;


        const pointerAngle =
            -Math.PI / 2;


        const winnerCenterAngle =
            selectedWinnerIndex *
            slice +
            slice / 2;


        const fullSpins =
            Math.PI * 2 *
            7;


        const targetRotation =
            pointerAngle -
            winnerCenterAngle;


        const currentNormalized =
            (
                currentRotation %
                (Math.PI * 2) +
                Math.PI * 2
            ) %
            (Math.PI * 2);


        let rotationDifference =
            targetRotation -
            currentNormalized;


        rotationDifference =
            (
                rotationDifference +
                Math.PI * 2
            ) %
            (Math.PI * 2);


        const finalRotation =
            currentRotation +
            fullSpins +
            rotationDifference;


        const startRotation =
            currentRotation;


        /* 10 SECONDS */

        const duration =
            10000;


        const startTime =
            performance.now();


        function animate(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed /
                    duration,
                    1
                );


            const easeOut =
                1 -
                Math.pow(
                    1 - progress,
                    5
                );


            currentRotation =
                startRotation +
                (
                    finalRotation -
                    startRotation
                ) *
                easeOut;


            drawWheel();


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                currentRotation =
                    currentRotation %
                    (Math.PI * 2);


                drawWheel();


                spinning = false;


                spinWheelBtn.disabled =
                    false;


                spinWheelBtn.textContent =
                    "🎰 SPIN THE WHEEL";


                setTimeout(
                    showWinner,
                    500
                );
            }
        }


        requestAnimationFrame(
            animate
        );
    }


    /* =========================
       BUTTONS
    ========================= */

    spinWheelBtn.addEventListener(
        "click",
        spinWheel
    );


    closePopup.addEventListener(
        "click",
        function() {

            winnerPopup.classList.remove(
                "show"
            );
        }
    );


    spinAgainBtn.addEventListener(
        "click",
        function() {

            winnerPopup.classList.remove(
                "show"
            );
        }
    );


    if (backToUidsBtn) {

        backToUidsBtn.addEventListener(
            "click",
            function() {

                window.location.href =
                    "index.html";
            }
        );
    }



    drawWheel();
}