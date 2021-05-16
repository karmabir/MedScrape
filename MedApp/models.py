from django.db import models

class FormSubmit(models.Model):
    MedicineName = models.CharField(max_length=200)
    Introduction = models.CharField(max_length=5000)
    WhenToTake = models.CharField(max_length=5000)
    SideEffects = models.CharField(max_length=5000)

class MedicineDetect(models.Model):
    upload = models.ImageField(upload_to ='media/')