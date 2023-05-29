from django.db import models

# Create your models here.
class Word(models.Model):
    word = models.CharField(max_length=64)
    pos = models.CharField(max_length=8)
    translation=models.CharField(max_length=64)
    phone = models.CharField(max_length=64)
    code = models.CharField(max_length=64)
    sentences = models.JSONField()
    chosen =  models.BooleanField()
    date = models.DateField()


    def __str__(self):
        return self.word+" "+self.translation