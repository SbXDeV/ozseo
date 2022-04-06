from django.shortcuts import redirect, render
from django.views.generic import TemplateView

from Index.forms import BackForms


class Index(TemplateView):
    """ Главная страница """
    template_name = 'index/index.html'


# Меню (-Компания-)
class About(TemplateView):
    """ О Нас """
    template_name = 'index/about.html'


class Client(TemplateView):
    """ Клиенты """
    template_name = 'index/client.html'


class Work(TemplateView):
    """ Вакансии """
    template_name = 'index/work.html'


class Review(TemplateView):
    """ Отзывы """
    template_name = 'index/review.html'


class Privacy(TemplateView):
    """ Политика конфиденциальности """
    template_name = 'index/privacy.html'


# Меню (-Услуги-)
class Dev(TemplateView):
    """ Услуги: Разработка сайтов """
    template_name = 'index/services/dev.html'


class Shop(TemplateView):
    """ Услуги: Интернет магазин """
    template_name = 'index/services/online-shop.html'


class HardProject(TemplateView):
    """ Услуги: Сложные проекты """
    template_name = 'index/services/hard-project.html'


class MobileDev(TemplateView):
    """ Услуги: Мобильная разработка """
    template_name = 'index/services/mobile-dev.html'


class Support(TemplateView):
    """ Услуги: Поддержка 24/7 """
    template_name = 'index/services/support.html'


class Support1CBitrix24(TemplateView):
    """ Услуги: Поддержка 1С Bitrix24 """
    template_name = 'index/services/support-1c.html'


class SupportBitrix24(TemplateView):
    """ Услуги: Интеграция Bitrix24 """
    template_name = 'index/services/bitrix24.html'


class SEO(TemplateView):
    """ Услуги: Продвижение сайтов """
    template_name = 'index/services/seo.html'


class Brand(TemplateView):
    """ Услуги: Брендинг и айдентика """
    template_name = 'index/services/brand.html'


# Контакты
class Contact(TemplateView):
    """ Контакты """
    template_name = 'index/contact.html'


# Проекты
class Project(TemplateView):
    """ Проекты """
    template_name = 'index/project.html'


def form_get(request):
    if request.method == "POST":
        form = BackForms(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            redirect('/')
        else:
            print('Проблема какая то: ', form.errors)
    return render(request, 'Index/index.html')
