// Функція для переключення меню
function toggleMenu() {
    var menu = document.querySelector('.menu');
    var logo = document.querySelector('.logo');
    var menuButton = document.querySelector('.click-menu button');
    var logoTitle = document.querySelector('.logo h4');
    menu.classList.toggle('show');

    if (menu.classList.contains('show')) {
        logo.style.justifyContent = 'flex-end';
        logoTitle.style.display = 'none';
        menuButton.innerHTML = '✖'; // Змінюємо значок на "✖"
    } else {
        logo.style.justifyContent = 'space-between';
        logoTitle.style.display = 'block';
        menuButton.innerHTML = '&#9776;'; // Змінюємо значок на початковий "☰"
    }
}
// збираємо всі якорі; встановлюємо час анімації та кількість кадрів
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;

anchors.forEach(function (item) {
    // кожному якір присвоюємо обробник події
    item.addEventListener('click', function (e) {
        // прибираємо стандартну поведінку
        e.preventDefault();
        toggleMenu();

        // для кожного якоря беремо відповідний елемент і визначаємо його координату Y
        let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

        // запускаємо інтервал, у якому
        let scroller = setInterval(function () {
            // вважаємо на скільки скролити за 1 такт
            let scrollBy = coordY / framesCount;

            // якщо кількість пікселів для скролла за 1 такт більше відстані до елемента
             // і дно сторінки не досягнуто
            if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
                // то скролимо на кількість пікселів, яке відповідає одному такту
                window.scrollBy(0, scrollBy);
            } else {
                //інакше добираємось до елемента та виходимо з інтервалу
                window.scrollTo(0, coordY);
                clearInterval(scroller);
            }
            // час інтервалу дорівнює приватному від часу анімації та к-ва кадрів
        }, animationTime / framesCount);


    });
});


// counter 
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = numberWithSpaces(currentValue);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function startCountAnimation() {
    const counts = document.querySelectorAll('.count');

    counts.forEach((count) => {
        const startCount = parseInt(count.innerText.replace(/\s/g, ''), 10);
        const endCount = parseInt(count.dataset.target.replace(/\s/g, ''), 10);
        const animationDuration = 2000; // Довжина анімації в мілісекундах

        animateValue(count, startCount, endCount, animationDuration);
    });
}

// Виклик функції для запуску анімації при потраплянні в область видимості
const aboutSection = document.querySelector('.about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startCountAnimation();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(aboutSection);


// detailLinks модальне вікно

// Отримайте всі посилання "Детальніше"
var detailLinks = document.querySelectorAll('.swiper-btn[data-coacherID]');

// Отримайте модальне вікно та його контент
var modal = document.querySelector('.modal');
var modalContent = document.querySelector('.modal-coucher');
var closeBtn = document.querySelector('.close');

// Функція для отримання даних викладача за його ID
function getCoacherData(coacherID) {
    var coacherElement = document.getElementById(coacherID);
    if (coacherElement) {
        var coacherImgSrc = coacherElement.querySelector('img').getAttribute('src');
        var coacherTitle = coacherElement.querySelector('.swiper-card-title').textContent;
        var coacherDesc = coacherElement.querySelector('.swiper-card-desc').textContent;
        return {
            imgSrc: coacherImgSrc,
            title: coacherTitle,
            desc: coacherDesc
        };
    }
    return null;
}

// Додаємо обробник події для кожного посилання "Детальніше"
detailLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var coacherID = link.getAttribute('data-coacherID');
        var coacherData = getCoacherData(coacherID);

        if (coacherData) {
            // Формуємо HTML з даними викладача
            var modalHTML = `
        <div class="modal-coucher-img">
          <img src="${coacherData.imgSrc}" alt="${coacherID}" />
        </div>
        <div class="modal-coucher-info">
          <p class="title">${coacherData.title}</p>
          <p>${coacherData.desc}</p>
          <div class="d-flex">
            <div>
                <a href="">
                    <img src="dist/img/Facebook.svg" alt="Facebook.svg" />
                </a>
            </div>
            <div>
                <a href="">
                 <img src="dist/img/Instagram.svg" alt="Instagram.svg" />
                </a>
            </div>
          </div>
        </div>
      `;

            // Вставляємо отриманий HTML у контент модального вікна
            modalContent.innerHTML = modalHTML;

            // Показуємо модальне вікно
            modal.style.display = 'block';
        }
    });
});

// Обробник події для закриття модального вікна
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Функція для переключення вкладок
function openTab(event, tabName) {
    var i, tabcontent, tablinks;

    // Отримання всіх елементів з класом 'tabcontent' і приховання їх
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
        tabcontent[i].classList.remove('active');
    }

    // Отримання всіх елементів з класом 'tablinks' і видалення класу 'active'
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }

    // Показ активного табу та встановлення його як активного
    document.getElementById(tabName).style.display = 'block';
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Зробити перший таб активним за замовчуванням
document.getElementById('tab1').style.display = 'block';
document.getElementsByClassName('tablinks')[0].classList.add('active');


// Закриття модального вікна при кліці поза ним
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


////////form

// Отримання форми
const contactForm = document.getElementById('contactForm');
// Функція для очищення полів форми
function clearForm() {
    contactForm.reset(); // Скидання полів форми
}

// Отримання форми та обробка відправлення форми
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Отримання значень полів форми
    const fromName = contactForm.elements.from_name.value;
    const toName = contactForm.elements.to_name.value;
    const phone = contactForm.elements.phone.value;

    // Відправка даних за допомогою EmailJS
    emailjs.send("service_f9zb9dd", "template_sspww7m", {
        from_name: fromName,
        to_name: toName,
        message: phone,
    }, 'v9E7a2GfwjLi-0ozd').then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
    }, (error) => {
        console.error('Error sending email:', error);
    });
    clearForm();
});