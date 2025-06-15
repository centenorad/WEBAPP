// Features popup logic (click to open, click outside to close)
const featuresTrigger = document.getElementById('features-trigger');
const featuresPopup = document.getElementById('features-popup');
if (featuresTrigger && featuresPopup) {
    featuresTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = featuresPopup.style.display === 'block';
        if (!isOpen) {
            // Temporarily show the popup off-screen to measure its width
            featuresPopup.style.visibility = 'hidden';
            featuresPopup.style.display = 'block';
            featuresPopup.style.left = '-9999px';
            featuresPopup.style.top = '0px';
            // Now measure
            const rect = featuresTrigger.getBoundingClientRect();
            const popupWidth = featuresPopup.offsetWidth;
            let left = rect.left + rect.width / 2 - popupWidth / 2;
            let top = rect.bottom + window.scrollY;
            // Prevent overflow on the left
            if (left < 16) left = 16;
            // Prevent overflow on the right (leave 32px margin)
            if (left + popupWidth > window.innerWidth - 32) {
                left = window.innerWidth - popupWidth - 32;
                if (left < 16) left = 16;
            }
            featuresPopup.style.left = left + 'px';
            featuresPopup.style.top = top + 'px';
            featuresPopup.style.visibility = 'visible';
        } else {
            featuresPopup.style.display = 'none';
        }
    });
    document.addEventListener('mousedown', (e) => {
        if (!featuresPopup.contains(e.target) && !featuresTrigger.contains(e.target)) {
            featuresPopup.style.display = 'none';
        }
    });
}
