from django.db import models

# Create your models here.
class StringModel(models.Model):
    value = models.TextField()
    is_abc = models.BooleanField(default=False)