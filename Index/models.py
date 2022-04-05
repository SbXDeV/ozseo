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