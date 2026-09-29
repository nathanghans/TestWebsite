(function () {
    const intro = document.getElementById('intro');
    const treeSpot = document.getElementById('treeSpot');
    const tree = document.getElementById('tree');
    const stump = document.getElementById('stump');
    const beaver = document.getElementById('beaver');
    const clickPrompt = document.getElementById('clickPrompt');
    const replayBtn = document.getElementById('replayBtn');

    const WALK_MS = 2600;   // matches CSS "transition: left 2.6s" on .beaver
    const CHOP_MS = 2000;   // 4 axe swings x 0.5s
    const FALL_MS = 900;    // matches CSS treeFall animation
    const FADE_MS = 900;    // matches CSS .intro opacity transition

    function setLeftNoTransition(el, value) {
        const prevTransition = el.style.transition;
        el.style.transition = 'none';
        el.style.left = value;
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight; // force reflow so the next transition re-applies cleanly
        el.style.transition = prevTransition;
    }

    function placeBeaverOffscreen() {
        setLeftNoTransition(beaver, (window.innerWidth + 80) + 'px');
    }

    function targetLeftNearTree() {
        const treeRect = treeSpot.getBoundingClientRect();
        return (treeRect.right - 15) + 'px';
    }

    function onIntroClick() {
        runSequence();
    }

    function runSequence() {
        clickPrompt.classList.add('hidden');

        // 1) Beaver walks in from the right, toward the tree
        beaver.classList.add('walking');
        beaver.style.left = targetLeftNearTree();

        // 2) Beaver arrives, starts chopping; tree shakes with each swing
        setTimeout(() => {
            beaver.classList.remove('walking');
            beaver.classList.add('chopping');
            treeSpot.classList.add('chopping');
            tree.classList.add('hit');
        }, WALK_MS + 100);

        // 3) Tree falls, beaver hops back out of the way
        setTimeout(() => {
            beaver.classList.remove('chopping');
            treeSpot.classList.remove('chopping');
            tree.classList.remove('hit');
            beaver.classList.add('dodge');
            tree.classList.add('falling');
            stump.classList.add('show');
        }, WALK_MS + 100 + CHOP_MS);

        // 4) Once it's down, fade the whole scene out to reveal the page
        const revealDelay = WALK_MS + 100 + CHOP_MS + FALL_MS + 500;
        setTimeout(() => {
            intro.classList.add('faded');
            document.body.classList.remove('locked');
        }, revealDelay);

        setTimeout(() => {
            intro.style.display = 'none';
        }, revealDelay + FADE_MS + 50);
    }

    function resetIntro() {
        intro.style.display = '';
        // reflow before removing 'faded' so the fade-in transition can play
        // eslint-disable-next-line no-unused-expressions
        intro.offsetHeight;
        intro.classList.remove('faded');
        document.body.classList.add('locked');

        tree.classList.remove('falling', 'hit');
        treeSpot.classList.remove('chopping');
        stump.classList.remove('show');
        beaver.classList.remove('walking', 'chopping', 'dodge');
        clickPrompt.classList.remove('hidden');

        placeBeaverOffscreen();
        intro.addEventListener('click', onIntroClick, { once: true });
    }

    document.body.classList.add('locked');
    placeBeaverOffscreen();
    intro.addEventListener('click', onIntroClick, { once: true });
    replayBtn.addEventListener('click', resetIntro);
})();
