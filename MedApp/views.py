from __future__ import division, print_function
import json
import os
import numpy as np
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tensorflow.python.client.session import Session
from tensorflow.python.framework.ops import Graph
from .serializers import FormSubmitSerializer, MedicineDetectSerializer

MODEL_PATH ='model/model_inception.h5'

model_graph = Graph()
with model_graph.as_default():
    tf_session = Session()
    with tf_session.as_default():
        model = load_model(MODEL_PATH)

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
    
    img_name = request.FILES['upload']
    img_path = './media/media/'+ img_name.name
    img = image.load_img(img_path, target_size=(224, 224))
    output = image.img_to_array(img)
    output/=255
    x = np.expand_dims(output, axis=0)

    with model_graph.as_default():
        with tf_session.as_default():
            preds = model.predict(x)
  
    preds=np.argmax(preds, axis=1)

    medicine = int(preds[0])

    if medicine==0:
        with open('static/Allegra.json') as f:
            data = json.load(f)
    elif medicine==1:
        with open('static/Antacid.json') as f:
            data = json.load(f)
    elif medicine==2:
        with open('static/Paracetamol.json') as f:
            data = json.load(f)
    elif medicine==3:
        with open('static/Statin.json') as f:
            data = json.load(f)
    


    os.remove(img_path)

    return JsonResponse({"Prediction":medicine})
