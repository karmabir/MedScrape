from django.urls import path
from . import views

urlpatterns = [
    path('formsubmit/',views.formsubmit,name="formsubmit"),
    path('predict/',views.predict,name="predict"),
    path('information/',views.information,name="information")
]