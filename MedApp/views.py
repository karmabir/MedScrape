from __future__ import division, print_function
import sys
import os
import glob
import re
import json
from django.http.response import JsonResponse
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

    return JsonResponse({"Status":"200"})


@api_view(['GET','POST'])
def predict(request):

    serializer = MedicineDetectSerializer(data=request.FILES)
    if serializer.is_valid():
        serializer.save()
    
    model = load_model(MODEL_PATH)
    img_name = str(request.FILES['upload'])
    img_path = 'static/uploads/' + str(img_name)
    print(img_name, img_path)
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x=x/255
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    preds=np.argmax(preds, axis=1)

    print(preds)

    return JsonResponse({"Status":"200"})
