from django.db import models
from rest_framework import serializers
from backend.api.modules.students.models import Students
from backend.api.modules.departments.models import Courses


class Admissions(models.Model):
	ACADEMIC_STATUS 	= 	(
								('PAYING', 'PAYING'),
								('FULL_S', 'FULL SCHOLAR'),
								('PART_S', 'PARTIAL SCHOLAR')
							)
	student 			=	models.ForeignKey(Students, on_delete=models.CASCADE)
	course 				=	models.ForeignKey(Courses, on_delete=models.CASCADE, null=True)
	acad_status  		=	models.CharField(max_length=8, choices=ACADEMIC_STATUS, default="PAYING", null=True, blank=True)
	created_at 			= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 			= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "admissions"


class AdmissionsSerializer(serializers.HyperlinkedModelSerializer):
	pass