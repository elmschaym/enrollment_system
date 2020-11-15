from django.db import models
from rest_framework import serializers

from backend.api.modules.departments.models import Departments, Courses

class Subjects(models.Model):
	department			=	models.ForeignKey(Departments, models.SET_NULL, null=True)
	code				=	models.CharField(max_length=8)
	name				=	models.CharField(max_length=32)
	description 		=	models.CharField(max_length=255)
	units				=	models.IntegerField()
	recom_seme_taken 	=	models.IntegerField()
	recom_year_taken 	= 	models.IntegerField()

	class Meta:
		db_table = "subjects"


class SubjectsSerializer(serializers.HyperlinkedModelSerializer):
	pass



class SubjCourses(models.Model):
	subject			=	models.ForeignKey(Subjects, models.CASCADE)
	course			=	models.ForeignKey(Courses, models.CASCADE)

	class Meta:
		db_table = "subj_courses"


class SubjCoursesSerializer(serializers.HyperlinkedModelSerializer):
	pass