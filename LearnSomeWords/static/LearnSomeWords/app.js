document.addEventListener('DOMContentLoaded', function () {

    // load
    const data = JSON.parse(document.querySelector('#data').innerHTML);
    //console.log(typeof (data));
    const words = data.words;
    const translation = data.translation;
    const sentences = data.sentences;
    let pos = 0;
    let english = true;


    function move(n) {
        pos = (pos + n) % words.length;
        if (pos < 0) {
            pos = words.length - 1;
        }
        document.querySelector('#text').innerHTML = words[pos];
        english = true;
        document.querySelector('#position').innerHTML = `${pos + 1}/${words.length}`;
        let text = '';
        for (let i = 0; i < sentences[pos].length; i++) {
            text += sentences[pos][i]["sContent"];
            text += '<br />'
        }
        document.querySelector('#sentence').innerHTML = text;
        window.scrollTo(0, 0);
    }

    function translate() {
        if (english) {
            let text = '';
            for (let i = 0; i < sentences[pos].length; i++) {
                text += sentences[pos][i]["sContent"];
                text += '<br />'
                text += sentences[pos][i]["sCn"];
                text += '<br />';

            }
            document.querySelector('#text').innerHTML = translation[pos];
            document.querySelector('#sentence').innerHTML = text;
            english = false;
        } else {
            document.querySelector('#text').innerHTML = words[pos];
            let text = '';
            for (let i = 0; i < sentences[pos].length; i++) {
                text += sentences[pos][i]["sContent"];
                text += '<br />'
            }
            document.querySelector('#sentence').innerHTML = text;
            english = true;
        }
    }

    document.querySelector('#position').innerHTML = `${pos + 1}/${words.length}`;
    document.querySelector('#text').innerHTML = words[pos];
    let text = '';
    for (let i = 0; i < sentences[pos].length; i++) {
        text += sentences[pos][i]["sContent"];
        text += '<br />'
    }
    document.querySelector('#sentence').innerHTML = text;

    // translate button
    document.querySelector('#translate').onclick = (ev) => {
        translate();
        ev.stopPropagation();
    };
    // next button
    setInterval(function () {
        if (pos === words.length - 1) {
            document.querySelector('#finish').disabled = false;
        } else {
            document.querySelector('#finish').disabled = true;
        }
    }, 10);

    document.onkeyup = (e) => {
        if (e.code === 'KeyD' || e.code === 'ArrowRight') {
            move(1);
        }
        if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
            move(-1);
        }
        if (e.code === 'Space') {
            translate();
        }
    }
    document.querySelector('#pronounce').onclick = (ev) => {
        var audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${words[pos]}&type=1`);
        audio.play();
        ev.stopPropagation();

    }
    document.addEventListener("click", (event) => {

        if (event.target !== document.querySelectorAll('button')) {

            let middlehalf = window.innerWidth / 2;
            if (event.clientX > middlehalf) {
                move(1);
            } else {
                move(-1);
            }
            console.log('clicked');
        }

    });


})