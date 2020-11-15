from django.db import models
from rest_framework import serializers
from backend.api.modules.admissions.models import Admissions


class Enrollment(models.Model):
	admission 			= 	models.ForeignKey(Admissions, on_delete=models.CASCADE)
	created_at 			= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 			= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "enrollment"


class EnrollmentSerializer(serializers.HyperlinkedModelSerializer):
	pass