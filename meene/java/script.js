document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Закрытие меню при клике на ссылку
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
  
  // Корзина
  const cartButtons = document.querySelectorAll('.btn-add-cart');
  const cartCount = document.querySelector('.cart-count');
  let cartItems = 0;
  
  cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      cartItems++;
      cartCount.textContent = cartItems;
      
      // Анимация добавления
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Добавлено!';
      this.style.background = '#00b894';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = '';
      }, 2000);
    });
  });
  
  // Копирование промокода
  const copyBtn = document.querySelector('.btn-copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const code = this.getAttribute('data-code');
      
      // Создаем временный input для копирования
      const tempInput = document.createElement('input');
      tempInput.value = code;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Показываем уведомление
      const originalText = this.textContent;
      this.textContent = 'Скопировано!';
      this.style.background = '#00b894';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);
    });
  }
  
  // Подписка на рассылку
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput.value) {
        alert('Спасибо за подписку! Проверьте вашу почту для подтверждения.');
        emailInput.value = '';
      }
    });
  }
  
  // Модальное окно
  const modal = document.getElementById('productModal');
  const closeModal = document.querySelector('.close-modal');
  const productLinks = document.querySelectorAll('.product-link');
  
  // Данные товаров
  const products = {
    1: {
      title: 'Худи New Balance',
      price: '59 $',
      oldPrice: '69 $',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Теплое и удобное худи от New Balance. Идеально подходит для прохладной погоды. Материал: 80% хлопок, 20% полиэстер. Размеры: S, M, L, XL. Доставка: 3-5 рабочих дней.'
    },
    2: {
      title: 'Футболка Adidas',
      price: '39 $',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Классическая футболка Adidas с логотипом бренда. Изготовлена из 100% хлопка премиум качества. Размеры: XS, S, M, L. Рекомендуется ручная стирка.'
    },
    3: {
      title: 'Худи Adidas',
      price: '55 $',
      image: 'https://images.unsplash.com/photo-1578763460786-323df76f13c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Спортивное худи Adidas с капюшоном и передним карманом. Идеально для тренировок и повседневной носки. Размеры: S, M, L, XL. Машинная стирка при 40°C.'
    },
    4: {
      title: 'Зипка Nike Tech',
      price: '79 $',
      oldPrice: '99 $',
      image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Легкая куртка-зипка от Nike с технологией Dri-FIT. Идеальна для бега и активного отдыха. Размеры: S, M, L. Водоотталкивающая ткань.'
    },
    5: {
      title: 'Футболка Nike',
      price: '49 $',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Стильная футболка Nike с минималистичным дизайном. Подходит для ежедневного использования. Размеры: XS, S, M. 100% хлопок.'
    },
    6: {
      title: 'Худи Nike',
      price: '55 $',
      image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      description: 'Классическое худи Nike с большим логотипом. Очень мягкое и комфортное. Размеры: S, M, L, XL. Материал: хлопок с начесом.'
    }
  };
  
  // Открытие модального окна
  productLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product');
      const product = products[productId];
      
      if (product) {
        document.getElementById('modalTitle').textContent = product.title;
        document.getElementById('modalPrice').textContent = product.price;
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalImage').alt = product.title;
        document.getElementById('modalDescription').textContent = product.description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  // Закрытие модального окна
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Кнопка "Наверх"
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Пропускаем якорь на ту же страницу
      if (href === '#' || href === '#cart') return;
      
      e.preventDefault();
      
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Выбор размера товара
  const sizeElements = document.querySelectorAll('.size');
  sizeElements.forEach(size => {
    size.addEventListener('click', function() {
      // Убираем выделение у всех размеров
      sizeElements.forEach(s => s.classList.remove('selected'));
      
      // Добавляем выделение текущему размеру
      this.classList.add('selected');
    });
  });
  
  // Инициализация первого выбранного размера
  if (sizeElements.length > 0) {
    sizeElements[0].classList.add('selected');
  }
});