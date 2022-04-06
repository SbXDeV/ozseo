from django.db import models


class Work(models.Model):
    title = models.CharField(verbose_name='Заголовок', max_length=100)
    desk = models.TextField(verbose_name='Описание')
    image = models.ImageField(verbose_name='Главное изображение', upload_to='media/')
    image_slug = models.ImageField(verbose_name='Большое Изображение', upload_to='media/')

    class Meta:
        verbose_name = 'Наши работы'
        verbose_name_plural = 'Наши работы'

    def __str__(self):
        return 'Работа: {}'.format(self.title)


class ModelBackForm(models.Model):
    form_text_5 = models.CharField(verbose_name='Имя клиента', max_length=300)
    form_text_18 = models.CharField(verbose_name='Почта клиента', max_length=300)
    form_text_6 = models.CharField(verbose_name='Телефон клиента', max_length=300)
    form_text_7 = models.TextField(verbose_name='Сообщение от клиента')

    class Meta:
        verbose_name = 'Форму обратной связи'
        verbose_name_plural = 'Форма обратной связи'

    def __str__(self):
        return 'Заказ от клиента: ' + self.form_text_5
