document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header) return;

    let lastY = window.pageYOffset;
    let ticking = false;
    const threshold = 6;

    const onScroll = () => {
        const current = window.pageYOffset;
        const delta = current - lastY;

        if (Math.abs(delta) > threshold) {
            if (current > lastY && current > 80) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastY = current;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
});