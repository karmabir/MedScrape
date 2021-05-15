from __future__ import division, print_function
import sys
import os
import glob
import re
import json
from django.http.response import HttpResponse
import numpy as np
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import FormSubmitSerializer, MedicineDetectSerializer

MODEL_PATH ='static/model_inception.h5'

@api_view(['POST'])
def formsubmit(request):

    serializer = FormSubmitSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    MedicineName =request.POST['MedicineName']
    Introduction = request.POST['Introduction']
    WhenToTake = request.POST['WhenToTake']
    SideEffects = request.POST['SideEffects']

    form_dict = {
        "MedicineName":MedicineName,
        "Introduction":Introduction,
        "WhenToTake":WhenToTake,
        "SideEffects":SideEffects
    }

    file_name = 'static/json/' + MedicineName + '.json'

    with open(file_name, 'w') as json_file:
        json.dump(form_dict, json_file)

    return HttpResponse("Saved!")


@api_view(['GET','POST'])
def predict(request):

    model = load_model(MODEL_PATH)
    
    serializer = MedicineDetectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
