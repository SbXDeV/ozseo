from django.forms import ModelForm

from Index.models import ModelBackForm


class BackForms(ModelForm):
    class Meta:
        model = ModelBackForm
        fields = ['form_text_5', 'form_text_6', 'form_text_18', 'form_text_7']