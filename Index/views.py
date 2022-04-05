from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Work


class Index(ListView):
    template_name = 'index/index.html'
    model = Work
    context_object_name = 'work'
