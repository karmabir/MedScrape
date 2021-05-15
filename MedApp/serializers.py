from rest_framework import serializers
from .models import MedicineDetect, FormSubmit

class MedicineDetectSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineDetect
        fields = '__all__'

class FormSubmitSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmit
        fields = '__all__'