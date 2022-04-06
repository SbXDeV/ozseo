from django.urls import path
from .views import *

app_name = 'Index'

urlpatterns = [
    path('', Index.as_view(), name='index'),
    # Меню (-Компания-)
    # О нас
    path('company/about/', About.as_view(), name='company-about'),
    # Клиенты
    path('company/clients/', Client.as_view(), name='company-clients'),
    # Вакансии
    path('company/work/', Work.as_view(), name='company-work'),
    # Отзывы
    path('company/review/', Review.as_view(), name='company-review'),
    # Контакты
    path('contacts/', Contact.as_view(), name='contact'),
    # Проекты
    path('projects/', Project.as_view(), name='project'),
    # Политика конфиденциальности
    path('privacy/', Privacy.as_view(), name='privacy'),
    # Меню (-Услуги-)
    # Разработка сайтов
    path('development/', Dev.as_view(), name='service-development'),
    # Интернет магазин
    path('shop/', Shop.as_view(), name='service-shop'),
    # Сложные проекты
    path('complex/', HardProject.as_view(), name='service-complex'),
    # Мобильная разработка
    path('mobile/', MobileDev.as_view(), name='service-mobile'),
    # Поддержка 24/7
    path('support/', Support.as_view(), name='service-support'),
    # Поддержка на 1C-Bitrix24
    path('support-bitrix/', Support1CBitrix24.as_view(), name='service-support-1c-bitrix24'),
    # Интеграция с Bitrix24
    path('bitrix24/', SupportBitrix24.as_view(), name='service-bitrix24'),
    # Продвижение сайтов
    path('seo/', SEO.as_view(), name='service-seo'),
    # Брендинг и айдентика
    path('branding/', Brand.as_view(), name='service-branding'),
    # Обработчик формы
    path('form-get/', form_get)
]
