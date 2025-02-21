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
        description: 'This system directly prints addresses, barcodes, and indicia on papers and packages using solvent-free ink, reducing label material costs. It features optional controls for stacker turns and ejection to create clean zones. The manual-sealing print unit keeps print heads clean and can interface with MiraSERT inserter controls for better labeling management.',
        pageUrl: 'pages/miralabel.html'
    },
    'MiraPACKAGE': {
        title: 'MiraPACKAGE',
        subtitle: 'Planning, Scheduling and Inventory',
        videosrc: 'videos/mirapackage.mp4',
        description: 'The system streamlines receiving and tracking of insert versions while efficiently scheduling multiple inserting machines. It uses non-proprietary workstations, making it user-friendly and cost-effective by eliminating the need for expensive servers and allowing unlimited users without extra licensing fees.',
        pageUrl: 'pages/mirapackage.html'
    },
    'MiraSERT': {
        title: 'MiraSERT',
        subtitle: '21st Century Insert Control',
        videosrc: 'videos/mirasert.mp4',
        description: 'The ultimate inserter operating system is now available for purchase, including free upgrades with a support contract. It operates on a single MS Windows PC and uses non-proprietary hardware for flexibility. Data is securely stored in an SQL database for reliable access. The system is modular and expandable, allowing enhancements at purchase or later.',
        pageUrl: 'pages/mirasert.html'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('solutionModal');
    const closeButton = document.querySelector('.close-button');
    const solutions = document.querySelectorAll('.solution');
    const video = document.getElementById('modalVideo');

    const closeModal = () => {
        modal.style.display = 'none';
        video.pause();
        toggleScrollLock();
        // Clear the URL parameter when closing
        const url = new URL(window.location);
        url.searchParams.delete('modal');
        window.history.pushState({}, '', url);
    };

    // Function to open modal with proper timing
    const openModal = (productName) => {
        console.log('Opening modal for:', productName); // Debug log
        const data = solutionData[productName];
        if (data) {
            setTimeout(() => {
                document.getElementById('modalTitle').textContent = data.title;
                document.getElementById('modalSubtitle').textContent = data.subtitle;
                document.getElementById('modalDescription').textContent = data.description;
                document.getElementById('modalVideo').src = data.videosrc;
                document.getElementById('modalLearnMore').href = data.pageUrl;
                
                modal.style.display = 'flex';
                toggleScrollLock();
                video.currentTime = 0;
                video.play();
            }, 100); // Small delay to ensure DOM is ready
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
        solution.querySelector('img').addEventListener('click', () => {
            const title = solution.querySelector('h2').textContent;
            const data = solutionData[title.split(' ')[0]];
            
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalSubtitle').textContent = data.subtitle;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalVideo').src = data.videosrc;
            document.getElementById('modalLearnMore').href = data.pageUrl;
            
            modal.style.display = 'flex';
            toggleScrollLock(); // Lock scroll when modal opens

            // Reset and start video when modal opens
            video.currentTime = 0;
            video.play();
        });
    });

    closeButton.addEventListener('click', closeModal);

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
