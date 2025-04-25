// DOM 요소 선택
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// 모바일 메뉴 토글
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 동작
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // 활성 링크 스타일 업데이트
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        
        // 모바일에서 메뉴 닫기
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
        }
        
        // 부드러운 스크롤 처리
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 연락처 폼 제출 처리
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 폼 유효성 검사
        let isValid = true;
        const errors = [];
        
        if (!formData.name.trim()) {
            isValid = false;
            errors.push('이름을 입력해주세요.');
        }
        
        if (!formData.email.trim()) {
            isValid = false;
            errors.push('이메일을 입력해주세요.');
        } else if (!isValidEmail(formData.email)) {
            isValid = false;
            errors.push('유효한 이메일 주소를 입력해주세요.');
        }
        
        if (!formData.subject.trim()) {
            isValid = false;
            errors.push('제목을 입력해주세요.');
        }
        
        if (!formData.message.trim()) {
            isValid = false;
            errors.push('메시지를 입력해주세요.');
        }
        
        if (!isValid) {
            alert(errors.join('\n'));
            return;
        }
        
        // 실제로는 여기서 서버로 데이터를 보내거나 처리해야 합니다.
        // 현재는 데모용으로 알림만 표시합니다.
        alert('메시지가 성공적으로 전송되었습니다!\n곧 연락드리겠습니다.');
        contactForm.reset();
    });
}

// 이메일 유효성 검사 함수
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // 현재 보이는 섹션에 따라 네비게이션 활성화
    updateActiveNavOnScroll();
});

// 스크롤 위치에 따라 네비게이션 활성화 업데이트
function updateActiveNavOnScroll() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (
            scrollPosition >= sectionTop && 
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    // 초기 활성 네비게이션 링크 설정
    updateActiveNavOnScroll();
    
    // 애니메이션 효과 추가
    animateOnScroll();
});

// 스크롤 시 요소 애니메이션 효과
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// 창 크기 변경 시 모바일 메뉴 처리
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
    }
});

// 랜덤 통계 수치 업데이트 (데모용)
function updateRandomStats() {
    const accuracyStat = document.querySelector('.stat-item h3:first-child');
    if (accuracyStat) {
        const newAccuracy = 95 + Math.floor(Math.random() * 5);
        accuracyStat.textContent = `${newAccuracy}%`;
    }
}

// 5초마다 랜덤 통계 업데이트 (데모용)
setInterval(updateRandomStats, 5000);