document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Mobile Navigation Toggle
       ========================================= */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);

            // Toggle icon between menu and x
            const icon = mobileToggle.querySelector('i');
            if (isExpanded) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });

    /* =========================================
       Navbar Scroll Effect & Active Links
       ========================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        // Add shadow/background to navbar on scroll
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       Intersection Observer for Scroll Animations
       ========================================= */
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* =========================================
       Statistics Counter Animation
       ========================================= */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsSection = document.getElementById('statistics');

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };

            updateCounter();
        });
    };

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasAnimatedStats) {
                animateStats();
                hasAnimatedStats = true;
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    /* =========================================
       Modal Logic
       ========================================= */
    const modal = document.getElementById('booking-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    /* =========================================
       Language Toggle Dictionary
       ========================================= */
    const dictionary = {
        en: {
            nav_home: "Home",
            nav_tours: "Tours",
            nav_about: "About",
            nav_gallery: "Gallery",
            book_now: "Book Now",
            hero_title: "Fun Travells",
            hero_tagline: "Traveling is fun!",
            hero_btn_explore: "Explore Tours",
            hero_btn_discover: "Discover Kyrgyzstan",
            book_tour_text: "Book Tour",
            start_adventure: "Start Your Adventure",
            leave_details: "Leave your details, and our guides will craft your perfect itinerary.",
            full_name: "Full Name",
            email_addr: "Email Address",
            phone_number: "Phone Number",
            special_requests: "Special Requests",
            submit_request: "Submit Request",
            tours_title: "Featured Tours",
            tours_subtitle: "Curated alpine experiences tailored for adventurous souls.",
            tour1_title: "Winter Alpine Retreat",
            tour1_desc: "Experience world-class skiing atop majestic, snow-covered peaks.",
            tour1_duration: " 5 Days",
            tour2_title: "Nomadic Yurt Heritage",
            tour2_desc: "Immerse yourself in traditional nomadic culture deep within lush valleys.",
            tour2_duration: " 7 Days",
            tour3_title: "Song Kul Horse Trek",
            tour3_desc: "Ride through untouched pastures to one of Kyrgyzstan's largest alpine lakes.",
            tour3_duration: " 4 Days",
            tour4_title: "Grand Canyons Hike",
            tour4_desc: "Discover breath-taking viewpoints and towering, oxidized rock formations.",
            tour4_duration: " 6 Days",
            about_subtitle: "About Us",
            about_title: "Discover the Heart of Central Asia",
            about_p1: "We are a passionate team of local experts dedicated to sharing the hidden wonders of Kyrgyzstan. Since our founding, we've embraced authenticity, ensuring every journey respectfully showcases our natural landscapes and deep nomadic heritage.",
            about_p2: "Whether you're craving a high-altitude hike or tranquil moments by a pristine alpine lake, Fun Travells guarantees an unforgettable footprint-free adventure.",
            about_btn: "Learn More",
            stat_1: "Years Experience",
            stat_2: "Happy Travelers",
            stat_3: "Tour Routes",
            stat_4: "Professional Guides",
            gallery_title: "Moments Captured",
            gallery_subtitle: "Inspiring scenes from our recent expeditions.",
            footer_desc: "Traveling is fun! Discover the beauty of Kyrgyzstan with passionate local experts.",
            footer_links: "Quick Links",
            footer_support: "Support",
            footer_contact: "Contact Us",
            footer_faq: "FAQ",
            footer_tos: "Terms of Service",
            footer_privacy: "Privacy Policy",
            footer_responsible: "Responsible Travel",
            footer_rights: "© 2026 Fun Travells. All Rights Reserved."
        },
        ru: {
            nav_home: "Главная",
            nav_tours: "Туры",
            nav_about: "О нас",
            nav_gallery: "Галерея",
            book_now: "Забронировать",
            hero_title: "Fun Travells",
            hero_tagline: "Путешествовать — это весело!",
            hero_btn_explore: "Посмотреть туры",
            hero_btn_discover: "Кыргызстан",
            book_tour_text: "Забронировать",
            start_adventure: "Начни свое приключение",
            leave_details: "Оставьте свои данные, и наши гиды составят идеальный маршрут.",
            full_name: "Полное Имя",
            email_addr: "Эл. Адрес",
            phone_number: "Номер Телефона",
            special_requests: "Особые Пожелания",
            submit_request: "Отправить Заявку",
            tours_title: "Наши Туры",
            tours_subtitle: "Тщательно подобранные горные маршруты для искателей приключений.",
            tour1_title: "Горный Курорт",
            tour1_desc: "Испытайте катание мирового класса на величественных заснеженных вершинах.",
            tour1_duration: " 5 Дней",
            tour2_title: "Жизнь Кочевников",
            tour2_desc: "Погрузитесь в традиционную культуру кочевников в самом сердце зеленых долин.",
            tour2_duration: " 7 Дней",
            tour3_title: "Морской Конный Поход",
            tour3_desc: "Прокатитесь по нетронутым пастбищам к одному из крупнейших высокогорных озер.",
            tour3_duration: " 4 Дня",
            tour4_title: "Поход по Каньонам",
            tour4_desc: "Откройте для себя захватывающие виды и возвышающиеся скальные образования.",
            tour4_duration: " 6 Дней",
            about_subtitle: "О Нас",
            about_title: "Откройте Сердце Центральной Азии",
            about_p1: "Мы — страстная команда местных экспертов, стремящаяся поделиться скрытыми чудесами Кыргызстана. Мы придерживаемся аутентичности, гарантируя, что каждое путешествие уважительно демонстрирует нашу природу и наследие кочевников.",
            about_p2: "Жаждете ли вы похода в горы или спокойного отдыха у чистого альпийского озера, Fun Travells гарантирует незабываемое приключение без вреда для экологии.",
            about_btn: "Узнать Больше",
            stat_1: "Лет Опыта",
            stat_2: "Счастливых Туристов",
            stat_3: "Маршрутов",
            stat_4: "Проф. Гидов",
            gallery_title: "Запечатленные Моменты",
            gallery_subtitle: "Вдохновляющие сцены из наших недавних экспедиций.",
            footer_desc: "Путешествовать — это весело! Откройте красоту Кыргызстана с профессиональными гидами.",
            footer_links: "Быстрые Ссылки",
            footer_support: "Поддержка",
            footer_contact: "Контакты",
            footer_faq: "Частые вопросы",
            footer_tos: "Условия использования",
            footer_privacy: "Конфиденциальность",
            footer_responsible: "Эко-туризм",
            footer_rights: "© 2026 Fun Travells. Все права защищены."
        }
    };

    let currentLang = 'en';
    const langToggleBtn = document.getElementById('lang-toggle');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ru' : 'en';
            langToggleBtn.textContent = currentLang === 'en' ? 'Русский' : 'English';

            i18nElements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (dictionary[currentLang][key]) {
                    el.textContent = dictionary[currentLang][key];
                }
            });
        });
    }
});
