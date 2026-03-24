// ==================== 프로젝트 선택 기능 ====================
const projectItems = document.querySelectorAll('.project-item');
const projectImage = document.getElementById('projectImage');
const imageInfo = document.querySelector('.image-info');

const projectImages = [
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663466723597/8TKFevD8EhaYugbz6PwrRN/ecoen-project2-CZhGqgqZisnJEdCzRJhBsb.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663466723597/8TKFevD8EhaYugbz6PwrRN/ecoen-project1-AkCyNDLREvdsk8gT454XQy.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663466723597/8TKFevD8EhaYugbz6PwrRN/ecoen-project3-jX6NtAZgVwuQnTuUXE9i48.webp'
];

const projectData = [
    {
        category: '생태공원',
        title: '한강 생태공원',
        location: '서울특별시 마포구',
        area: '45,000㎡'
    },
    {
        category: '단지조경',
        title: '그린 빌리지 단지',
        location: '경기도 성남시',
        area: '28,000㎡'
    },
    {
        category: '옥상정원',
        title: '루프탑 가든 타워',
        location: '서울특별시 강남구',
        area: '3,200㎡'
    }
];

projectItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // 모든 항목에서 active 클래스 제거
        projectItems.forEach(el => el.classList.remove('active'));
        // 클릭한 항목에 active 클래스 추가
        item.classList.add('active');

        // 이미지 변경
        projectImage.style.opacity = '0';
        setTimeout(() => {
            projectImage.src = projectImages[index];
            projectImage.style.opacity = '1';
        }, 300);

        // 정보 업데이트
        imageInfo.innerHTML = `
            <p class="info-category">${projectData[index].category}</p>
            <h3 class="info-title">${projectData[index].title}</h3>
            <p class="info-location">${projectData[index].location}</p>
            <div class="info-area">
                <div>
                    <p class="area-value">${projectData[index].area}</p>
                    <p class="area-label">시공 면적</p>
                </div>
            </div>
        `;
    });
});

// 초기 이미지 투명도 설정
projectImage.style.transition = 'opacity 0.3s ease';

// ==================== 문의 폼 제출 ====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 폼 데이터 수집
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // 유효성 검사
    if (!data.name || !data.phone || !data.message) {
        alert('필수 항목을 모두 입력해주세요.');
        return;
    }

    // 성공 메시지 표시
    alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');

    // 폼 초기화
    contactForm.reset();

    // 실제 환경에서는 여기서 서버로 데이터 전송
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // })
});

// ==================== 소셜 버튼 ====================
const socialButtons = document.querySelectorAll('.social-btn');

socialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        alert(`${btn.textContent} 페이지로 이동합니다.`);
    });
});

// ==================== 푸터 링크 ====================
const footerLinks = document.querySelectorAll('.footer-column a, .footer-legal a');

footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`${link.textContent} 페이지는 준비 중입니다.`);
    });
});

// ==================== 스크롤 애니메이션 ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animatedElements = document.querySelectorAll(
    '.about-text, .about-image, .service-card, .timeline-item, .contact-info, .contact-form'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ==================== 네비게이션 스크롤 효과 ====================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(10, 14, 13, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 14, 13, 0.8)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== 스무스 스크롤 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== 문의하기 버튼 ====================
const contactBtns = document.querySelectorAll('.contact-btn');

contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ==================== 페이지 로드 시 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    // 첫 번째 프로젝트 활성화
    projectItems[0].classList.add('active');

    // 스크롤 위치 초기화
    window.scrollTo(0, 0);
});

// ==================== 모바일 메뉴 토글 (선택사항) ====================
// 모바일 환경에서 네비게이션 메뉴를 추가하려면 아래 코드 사용
// const menuToggle = document.querySelector('.menu-toggle');
// const navLinks = document.querySelector('.nav-links');
// 
// if (menuToggle) {
//     menuToggle.addEventListener('click', () => {
//         navLinks.classList.toggle('active');
//     });
// }

// ==================== 뷰포트 높이 설정 (모바일) ====================
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

/**
 * 히어로 슬라이드 기능 - 최종 수정 버전
 * - 3개의 슬라이드를 자동으로 순환
 * - 인디케이터를 클릭하여 수동 전환 가능
 * - 부드러운 페이드 인/아웃 애니메이션
 * - 레이스 컨디션 방지
 * - 에러 처리 추가
 */

class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.indicators = document.querySelectorAll('.hero-indicators .indicator');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5초마다 자동 전환
        this.isTransitioning = false; // 전환 중 플래그

        // 유효성 검사
        if (this.totalSlides === 0 || this.indicators.length === 0) {
            console.warn('HeroSlider: Required elements not found');
            return;
        }

        console.log('HeroSlider initialized with', this.totalSlides, 'slides');
        this.init();
    }

    init() {
        // 초기 슬라이드 활성화 (중요!)
        this.updateSlide(0);

        // 인디케이터 클릭 이벤트
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                console.log('Indicator clicked:', index);
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // 자동 재생 시작
        this.startAutoPlay();

        // 마우스 호버 시 자동 재생 일시 중지
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                console.log('Mouse entered hero section');
                this.pauseAutoPlay();
            });
            heroSection.addEventListener('mouseleave', () => {
                console.log('Mouse left hero section');
                this.startAutoPlay();
            });
        }

        // 키보드 네비게이션
        this.handleKeydown = (e) => {
            if (e.key === 'ArrowLeft') {
                console.log('Left arrow pressed');
                this.prevSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                console.log('Right arrow pressed');
                this.nextSlide();
                this.resetAutoPlay();
            }
        };
        document.addEventListener('keydown', this.handleKeydown);
    }

    /**
     * 슬라이드 상태 업데이트 (클래스 추가/제거)
     */
    updateSlide(index) {
        // 모든 슬라이드에서 active 클래스 제거
        this.slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev');
        });

        // 모든 인디케이터에서 active 클래스 제거
        this.indicators.forEach((indicator) => {
            indicator.classList.remove('active');
        });

        // 새 슬라이드 활성화
        this.slides[index].classList.add('active');
        this.indicators[index].classList.add('active');

        this.currentSlide = index;
        console.log('Updated to slide:', index);
    }

    /**
     * 특정 슬라이드로 이동
     */
    goToSlide(index) {
        // 같은 슬라이드 클릭 방지
        if (index === this.currentSlide) {
            console.log('Same slide, ignoring');
            return;
        }

        // 전환 중 클릭 방지 (레이스 컨디션 방지)
        if (this.isTransitioning) {
            console.log('Transition in progress, ignoring');
            return;
        }

        this.isTransitioning = true;

        // 이전 슬라이드에 'prev' 클래스 추가 (나가는 애니메이션)
        this.slides[this.currentSlide].classList.add('prev');
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        // 새 슬라이드로 업데이트
        setTimeout(() => {
            this.updateSlide(index);
            this.isTransitioning = false;
        }, 400);

        // 애니메이션 완료 후 'prev' 클래스 제거
        setTimeout(() => {
            this.slides.forEach((slide, idx) => {
                if (idx !== this.currentSlide) {
                    slide.classList.remove('prev');
                }
            });
        }, 800);
    }

    /**
     * 다음 슬라이드로 이동
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        console.log('Next slide:', nextIndex);
        this.goToSlide(nextIndex);
    }

    /**
     * 이전 슬라이드로 이동
     */
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        console.log('Previous slide:', prevIndex);
        this.goToSlide(prevIndex);
    }

    /**
     * 자동 재생 시작
     */
    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        console.log('Auto play started');
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    /**
     * 자동 재생 일시 중지
     */
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
            console.log('Auto play paused');
        }
    }

    /**
     * 자동 재생 리셋 (일시 중지 후 재시작)
     */
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    /**
     * 정리 메서드 (메모리 누수 방지)
     */
    destroy() {
        this.pauseAutoPlay();
        document.removeEventListener('keydown', this.handleKeydown);
        console.log('HeroSlider destroyed');
    }
}

// DOM이 로드되면 슬라이더 초기화
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        console.log('Initializing HeroSlider');
        new HeroSlider();
    } else {
        console.warn('No hero slides found');
    }
}

// 이중 체크: DOMContentLoaded 또는 즉시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
    // 스크립트가 </body> 직전에 있으면 이미 로드됨
    initHeroSlider();
}
