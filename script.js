document.addEventListener('DOMContentLoaded', function() {
    const phrases = ['swift developer.', 'jailbreak user.', 'ejecteddev.'];
    let currentPhraseIndex = 0;
    const highlightElement = document.querySelector('.highlight');

    const cursorElement = document.createElement('span');
    cursorElement.textContent = '|';
    cursorElement.classList.add('blinking-cursor');
    highlightElement.parentNode.insertBefore(cursorElement, highlightElement.nextSibling);

    function toggleCursorVisibility() {
        cursorElement.style.visibility = cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }

    setInterval(toggleCursorVisibility, 500); // Blinking interval

    function deletePhrase(callback) {
        const phrase = highlightElement.textContent;
        let charIndex = phrase.length;

        const deletingInterval = setInterval(() => {
            if (charIndex > 0) {
                highlightElement.textContent = phrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                clearInterval(deletingInterval);
                callback();
            }
        }, 100);
    }

    function typePhrase() {
        highlightElement.textContent = '';
        const phrase = phrases[currentPhraseIndex];
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < phrase.length) {
                highlightElement.textContent += phrase[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                const delay = currentPhraseIndex === phrases.length - 1 ? 60000 : 2000; // 60 seconds after last phrase
                setTimeout(() => {
                    deletePhrase(() => {
                        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                        typePhrase();
                    });
                }, delay);
            }
        }, 150);
    }

    typePhrase();
}); 