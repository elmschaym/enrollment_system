from django.db import models
from rest_framework import serializers
from backend.api.modules.enrollment.models import Enrollment
from backend.api.modules.subjects.models import Subjects
from backend.api.modules.departments.models import Faculties
from backend.api.modules.billings.models import Billings
from django.utils import timezone


class Sections(models.Model):
	subject 		=	models.ForeignKey(Subjects, on_delete=models.CASCADE)
	faculty			=	models.ForeignKey(Faculties, on_delete=models.SET_NULL, null=True)
	name 			= 	models.CharField(max_length=8, blank=True, null=True)
	sched_days		= 	models.CharField(max_length=8, blank=True, null=True)
	sched_time_set 	= 	models.TimeField(blank=True, null=True)
	sched_time_end 	= 	models.TimeField(blank=True, null=True)
	room 			=	models.CharField(max_length=8, blank=True, null=True)
	max_enrollee 	=	models.IntegerField(blank=True, null=True)
	status 			= 	models.CharField(max_length=1, choices=(('O', 'Open'), ('C', 'Closed')), blank=True, null=True)
	created_at 		= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 		= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "sections"


class SectionsSerializer(serializers.HyperlinkedModelSerializer):
	pass


class SectionsEnrol(models.Model):
	section 		=	models.ForeignKey(Sections, on_delete=models.CASCADE)
	enrolment 		=	models.ForeignKey(Enrollment, on_delete=models.CASCADE)
	billing 		=	models.ForeignKey(Billings, on_delete=models.CASCADE)
	created_at 		= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 		= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "sect_enroll"


class SectionsEnrolSerializer(serializers.HyperlinkedModelSerializer):
	pass