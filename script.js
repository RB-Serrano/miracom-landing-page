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

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            if (video) video.pause();
        }, 300);
        document.body.style.overflow = '';
        
        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.delete('modal');
        window.history.pushState({}, '', url);
    };

    // Function to open modal with proper timing
    const openModal = (productName) => {
        console.log('Opening modal for:', productName); // Debug log
        const data = solutionData[productName];
        if (data) {
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalSubtitle').textContent = data.subtitle;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalVideo').src = data.videosrc;
            document.getElementById('modalLearnMore').href = data.pageUrl;
            
            modal.style.display = 'flex';
            // Add small delay to trigger transitions
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            toggleScrollLock();
            video.currentTime = 0;
            video.play();
        }
    };

    // Check URL parameters immediately
    const urlParams = new URLSearchParams(window.location.search);
    const showModal = urlParams.get('modal');
    if (showModal) {
        openModal(showModal);
    }

    // Function to toggle scroll lock
    const toggleScrollLock = () => {
        document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
    };

    // Create intersection observer for video
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && modal.style.display === 'flex') {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    // Observe the video element
    observer.observe(video);

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
            toggleScrollLock();
            video.currentTime = 0;
            video.play();
        });
    });

    closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
    });

    // Improve modal background click handling
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Add escape key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
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
