const solutionData = {
    'MiraLIZER': {
        title: 'MiraLIZER',
        subtitle: 'Real-time Counting and Tracking',
        videosrc: 'videos/miralizer.mp4',
        description: 'MiraLIZER is a real-time press totalizer designed to count and track paper and waste output, optimizing production efficiency. It offers quick adjustment insights, an intuitive interface, and seamless integration with existing systems, making it vital for modern printing facilities. With 30 years of innovation, it reflects a commitment to excellence and empowers businesses through advanced technology.',
        pageUrl: 'pages/miralizer.html'
    },
    'MiraLABEL': {
        title: 'MiraLABEL / MiraJET 2',
        subtitle: 'In-Line High Speed Labeling',
        videosrc: 'videos/miralabel.mp4',
        description: 'This system offers in-line high-speed labeling with direct printing of addresses, barcodes, and indicia onto papers and packages, eliminating label material costs. Its Stacker Tracker feature manages stacker rotation and ejection for efficient bundle breaks. When integrated with MiraSERT, it ensures seamless production of inserted products with accurate inserts and addresses.',
        pageUrl: 'pages/miralabel.html'
    },
    'MiraPACKAGE': {
        title: 'MiraPACKAGE',
        subtitle: 'Planning, Scheduling and Inventory',
        videosrc: 'videos/mirapackage.mp4',
        description: 'The system simplifies inventory management by allowing easy tracking of multiple insert versions while optimizing production scheduling for seamless coordination across multiple inserting machines. It reduces operating costs by working with your existing non-proprietary equipment, eliminating the need for expensive hardware upgrades. With no internal server requirements or extra licensing fees, it provides a scalable, cost-effective solution that grows with your business.',
        pageUrl: 'pages/mirapackage.html'
    },
    'MiraSERT': {
        title: 'MiraSERT',
        subtitle: '21st Century Insert Control',
        videosrc: 'videos/mirasert.mp4',
        description: 'MiraSERT integrates seamlessly with planning systems for job downloads and inserting run imports while minimizing maintenance with standard Windows-based hardware. Its secure SQL database protects critical data, and its modular design ensures scalability, making it a future-proof solution for growing businesses.',
        pageUrl: 'pages/mirasert.html'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('solutionModal');
    const closeButton = document.querySelector('.close-button');
    const solutions = document.querySelectorAll('.solution');
    const video = document.getElementById('modalVideo');

    function openModal(productName) {
        const data = solutionData[productName];
        if (!data) return;

        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalSubtitle').textContent = data.subtitle;
        document.getElementById('modalDescription').textContent = data.description;
        document.getElementById('modalVideo').src = data.videosrc;
        document.getElementById('modalLearnMore').href = data.pageUrl;
        
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        if (video) {
            video.currentTime = 0;
            video.play();
        }
    }

    function closeModal() {
        if (video) video.pause();
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        history.replaceState({}, '', window.location.pathname);
    }

    // Event Listeners
    closeButton.onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    document.onkeydown = (e) => { if (e.key === 'Escape') closeModal(); };

    // Check URL parameters immediately
    const urlParams = new URLSearchParams(window.location.search);
    const showModal = urlParams.get('modal');
    if (showModal) {
        openModal(showModal);
    }

    solutions.forEach(solution => {
        const imgContainer = solution.querySelector('.img-container');
        imgContainer.addEventListener('click', () => {
            const title = solution.querySelector('h2').textContent;
            const data = solutionData[title.split(' ')[0]];
            
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalSubtitle').textContent = data.subtitle;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalVideo').src = data.videosrc;
            document.getElementById('modalLearnMore').href = data.pageUrl;
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            document.body.style.overflow = 'hidden';
            video.currentTime = 0;
            video.play();
        });
    });

    // Add touch event handling for mobile
    if ('ontouchstart' in window) {
        modal.addEventListener('touchstart', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
