document.addEventListener('DOMContentLoaded', function() {
const galleryItems = document.querySelectorAll('.gallery-item');
const popup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const closePopup = document.getElementById('closePopup');
const prevArrow = document.getElementById('prevArrow');
const nextArrow = document.getElementById('nextArrow');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));
            
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updatePopupImage();
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
            updateArrows();
        });
    });
            
    closePopup.addEventListener('click', function() {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    prevArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            updatePopupImage();
            updateArrows();
        }
    });
                
    nextArrow.addEventListener('click', function(e) {
        e.stopPropagation();
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updatePopupImage();
            updateArrows();
        }
    });
            
    document.addEventListener('keydown', function(e) {
        if (!popup.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            popup.classList.remove('show');
            document.body.style.overflow = '';
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updatePopupImage();
            updateArrows();
        } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
            currentIndex++;
            updatePopupImage();
            updateArrows();
        }
    });
                
    function updatePopupImage() {
        const image = images[currentIndex];
        popupImage.src = image.src;
        popupImage.alt = image.alt;
    }
                
    function updateArrows() {
        prevArrow.classList.toggle('hidden', currentIndex === 0);
        nextArrow.classList.toggle('hidden', currentIndex === images.length - 1);
    }
});

//переписал на куки
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup-message');
    const closeBtn = popup.querySelector('.popup-close-btn');        

    if (!document.cookie.includes('popupClosed')) {
        setTimeout(function() {
            popup.style.display = 'block';
        }, 30000);
    }
    
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
        document.cookie = 'popupClosed; max-age=864000';
    });
});

document.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const firstScreenHeight = document.querySelector('.about-section').offsetHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    if (scrollPosition >= firstScreenHeight) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
});

const targetDate = new Date(2025, 5, 25, 14, 30, 0);

function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference <= 0) {
        document.querySelector('.countdown').innerHTML = "Событие началось!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days + '<span class="countdown-label">дней</span>';
    document.getElementById('hours').innerHTML = hours + '<span class="countdown-label">часов</span>';
    document.getElementById('minutes').innerHTML = minutes + '<span class="countdown-label">минут</span>';
    document.getElementById('seconds').innerHTML = seconds + '<span class="countdown-label">секунд</span>';
}

setInterval(updateCountdown, 1000);
updateCountdown();

function disappear(element) {
    element.classList.add('hidden');
    setTimeout(() => {
        element.classList.remove('hidden');
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = null;
    }, 3000);
}

document.querySelectorAll('.coin').forEach(coin => {
    coin.addEventListener('click', function() {
        disappear(this);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const openFormBtn = document.getElementById('openFormPopupBtn');
    const formPopup = document.getElementById('formPopup');
    const closeFormPopup = document.querySelector('.popup-form-close');
    
    openFormBtn.addEventListener('click', function() {
        formPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    closeFormPopup.addEventListener('click', function() {
        formPopup.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && formPopup.classList.contains('show')) {
            formPopup.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    document.getElementById('namePopup').addEventListener('input', validatePopupName);
    document.getElementById('emailPopup').addEventListener('input', validatePopupEmail);
    document.getElementById('phonePopup').addEventListener('input', validatePopupPhone);
    document.getElementById('messagePopup').addEventListener('input', validatePopupMessage);

    function validatePopupName() {
        const name = document.getElementById('namePopup').value.trim();
        const errorElement = document.getElementById('namePopup-error');
        const nameRegex = /^[а-яА-ЯёЁ\s]+$/;
            
        if (name === '') {
            showError('namePopup', 'Введите имя');
            return false;
        }
            
        if (!nameRegex.test(name)) {
            showError('namePopup', 'Имя должно содержать только русские буквы');
            return false;
        } else {
            clearError('namePopup');
            return true;
        }
    }

    function validatePopupEmail() {
        const email = document.getElementById('emailPopup').value.trim();
        const errorElement = document.getElementById('emailPopup-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError('emailPopup', 'Введите почту');
            return false;
        }
            
        if (!emailRegex.test(email)) {
            showError('emailPopup', 'Пожалуйста, введите корректный email');
            return false;
        } else {
            clearError('emailPopup');
            return true;
        }
    }
        
    function validatePopupPhone() {
        const phone = document.getElementById('phonePopup').value.trim();
        const errorElement = document.getElementById('phonePopup-error');
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        
        if (phone === '') {
            showError('phonePopup', 'Введите телефон');
            return false;
        }
        
        if (!phoneRegex.test(phone)) {
            showError('phonePopup', 'Телефон должен быть в формате: +7 (123) 456-78-90');
            return false;
        } else {
            clearError('phonePopup');
            return true;
        }
    }
        
    function validatePopupMessage() {
        const text = document.getElementById('messagePopup').value.trim();
        const errorElement = document.getElementById('messagePopup-error');
        const messageRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?-]+$/;
        
        if (text === '') {
            showError('messagePopup', 'Введите сообщение');
            return false;
        }
            
        if (!messageRegex.test(text)) {
            showError('messagePopup', 'Сообщение должно содержать только русские или английские символы');
            return false;
        } else {
            clearError('messagePopup');
            return true;
        }
    }

    document.getElementById('formPopup').addEventListener('submit', function(e) {
        e.preventDefault();
        const isNameValid = validatePopupName();
        const isEmailValid = validatePopupEmail();
        const isPhoneValid = validatePopupPhone();
        const isMessageValid = validatePopupMessage();
        
        if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
            return;
        }
            
        const button = document.getElementById('submit-btn-popup');
        button.disabled = true;
        button.textContent = 'Отправляем...';
        button.style.cursor = 'wait';

        emailjs.init('ELu58zIP2zcP9-epN');
        emailjs.sendForm('service_gvi3xn2', 'template_ljbhuun', this)
        .then(() => {
            button.textContent = 'Успешно отправлено!';
            button.classList.remove('submit-button')
            button.classList.add('success-button');
            button.style.cursor = 'default';
            setTimeout(() => {
                button.disabled = false;
                button.textContent = 'Отправить';
                button.classList.remove('success-button');
                button.classList.add('submit-button');
                button.style.cursor = 'pointer';
            }, 3000);
        })
        .catch(() => {
            button.textContent = 'Ошибка при отправлении!';
            button.classList.remove('submit-button')
            button.classList.add('error-button');
            button.style.cursor = 'default';
            setTimeout(() => {
                button.disabled = false;
                button.textContent = 'Отправить';
                button.classList.remove('error-button');
                button.classList.add('submit-button');
                button.style.cursor = 'pointer';
            }, 3000);
        }); 
    });
});


function showError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
        
    inputElement.classList.add('input-error');
    errorElement.textContent = message;
}
    
function clearError(fieldId) {
    const inputElement = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
     
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
}

document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('message').addEventListener('input', validateMessage);

function validateName() {
    const name = document.getElementById('name').value.trim();
    const errorElement = document.getElementById('name-error');
    const nameRegex = /^[а-яА-ЯёЁ\s]+$/;
        
    if (name === '') {
        showError('name', 'Введите имя');
        return false;
    }
        
    if (!nameRegex.test(name)) {
        showError('name', 'Имя должно содержать только русские буквы');
        return false;
    } else {
        clearError('name');
        return true;
    }
}
    
function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError('email', 'Введите почту');
        return false;
    }
        
    if (!emailRegex.test(email)) {
        showError('email', 'Пожалуйста, введите корректный email');
        return false;
    } else {
        clearError('email');
        return true;
    }
}
    
function validatePhone() {
    const phone = document.getElementById('phone').value.trim();
    const errorElement = document.getElementById('phone-error');
    const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
    
    if (phone === '') {
        showError('phone', 'Введите телефон');
        return false;
    }
    
    if (!phoneRegex.test(phone)) {
        showError('phone', 'Телефон должен быть в формате: +7 (123) 456-78-90');
        return false;
    } else {
        clearError('phone');
        return true;
    }
}
    
function validateMessage() {
    const text = document.getElementById('message').value.trim();
    const errorElement = document.getElementById('message-error');
    const messageRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!?-]+$/;
    
    if (text === '') {
        showError('message', 'Введите сообщение');
        return false;
    }
        
    if (!messageRegex.test(text)) {
        showError('message', 'Сообщение должно содержать только русские или английские символы');
        return false;
    } else {
        clearError('message');
        return true;
    }
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
      
    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
        return;
    }
        
    const button = document.getElementById('submit-btn');
    button.disabled = true;
    button.textContent = 'Отправляем...';
    button.style.cursor = 'wait';

    emailjs.init('ELu58zIP2zcP9-epN');
    emailjs.sendForm('service_gvi3xn2', 'template_ljbhuun', this)
    .then(() => {
        button.textContent = 'Успешно отправлено!';
        button.classList.remove('submit-button')
        button.classList.add('success-button');
        button.style.cursor = 'default';
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Отправить';
            button.classList.remove('success-button');
            button.classList.add('submit-button');
            button.style.cursor = 'pointer';
        }, 3000);
    })
    .catch(() => {
        button.textContent = 'Ошибка при отправлении!';
        button.classList.remove('submit-button')
        button.classList.add('error-button');
        button.style.cursor = 'default';
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Отправить';
            button.classList.remove('error-button');
            button.classList.add('submit-button');
            button.style.cursor = 'pointer';
        }, 3000);
    }); 
});
