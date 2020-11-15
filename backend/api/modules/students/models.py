from django.db import models
from rest_framework import serializers


class Students(models.Model):
	GENDER 				=	(
								('M', 'Male'),
								('F', 'Female'),
								('B', 'Both'),
							)
	school_id 			= 	models.IntegerField(null=True, blank=True)
	firstname 			=	models.CharField(max_length=32, null=True, blank=True)
	middlename 			=	models.CharField(max_length=32, null=True, blank=True)
	lastname 			=	models.CharField(max_length=32, null=True, blank=True)
	gender 				=	models.CharField(max_length=1, choices=GENDER, null=True, blank=True)
	birthdate 			=	models.DateField(null=True, blank=True)
	home_address 		=	models.CharField(max_length=255, null=True, blank=True)
	campus_address 		=	models.CharField(max_length=255, null=True, blank=True)
	religion 			= 	models.CharField(max_length=32, null=True, blank=True)
	civil_status 		= 	models.CharField(max_length=255, null=True, blank=True)

	mother_fname		=	models.CharField(max_length=32, null=True, blank=True)
	mother_lname 		=	models.CharField(max_length=32, null=True, blank=True)
	mother_fname 		=	models.CharField(max_length=32, null=True, blank=True)
	mother_birthdate 	=	models.DateField(null=True, blank=True)
	mother_occupation 	=	models.CharField(max_length=32, null=True, blank=True)
	father_fname		=	models.CharField(max_length=32, null=True, blank=True)
	father_lname 		=	models.CharField(max_length=32, null=True, blank=True)
	father_fname 		=	models.CharField(max_length=32, null=True, blank=True)
	father_birthdate 	=	models.DateField(null=True, blank=True)
	father_occupation 	=	models.CharField(max_length=32, null=True, blank=True)

	created_at			=	models.DateTimeField(auto_now_add=True ,null=True, blank=True)
	updated_at			=	models.DateTimeField(auto_now=True, null=True, blank=True)

	class Meta:
		db_table = "students"


class StudentsSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model 	= 	Students
		fields 	= 	('fitstname', 'middlename', 'lastname')
