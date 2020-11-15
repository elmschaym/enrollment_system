from django.db import models
from rest_framework import serializers


class Departments(models.Model):
	name_alias			=	models.CharField(max_length=6, blank=True, null=True)
	name 				=	models.CharField(max_length=32, blank=True, null=True)
	created_at 			= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 			= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "departments"


class DepartmentsSerializer(serializers.HyperlinkedModelSerializer):
	pass


class Faculties(models.Model):
	department 		=	models.ForeignKey(Departments, on_delete=models.SET_NULL, null=True)
	GENDER 			=	(
							('M', 'Male'),
							('F', 'Female'),
							('B', 'Both'),
						)
	POSITIONS 		=	(
							('DEAN', 'Deparment Dean'),
							('CHAIRP', 'Chairperson'),
							('INST1', 'Instructor I'),
							('INST2', 'Instructor II'),
							('PROF1', 'Professor I'),
							('PROF2', 'Professor II'),
							('ASSOC', 'Associate Professor')
						)
	firstname 		=	models.CharField(max_length=32, blank=True, null=True)
	middlename 		=	models.CharField(max_length=32, blank=True, null=True)
	lastname 		=	models.CharField(max_length=32, blank=True, null=True)
	gender 			=	models.CharField(max_length=1, choices=GENDER, default=None, blank=True, null=True)
	birthdate 		=	models.DateField(blank=True, null=True)
	address 		=	models.CharField(max_length=255, blank=True, null=True)
	position 		=	models.CharField(max_length=8, choices=POSITIONS, blank=True, null=True)
	date_hired 		= 	models.DateField(blank=True, null=True)
	created_at 		= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 		= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "faculties"


class FacultiesSerializer(serializers.HyperlinkedModelSerializer):
	pass


class Courses(models.Model):
	department 		=	models.ForeignKey(Departments, on_delete=models.SET_NULL, null=True)
	PROGRAM_TYPE 	=	(
							('BS', 'Bachelor of Science'),
							('AB', 'Arts Literature')
						)
	name_alias		=	models.CharField(max_length=6, blank=True, null=True)
	name 			=	models.CharField(max_length=32, blank=True, null=True)
	program_type 	=	models.CharField(max_length=2, choices=PROGRAM_TYPE, default='BS', blank=True)
	program_year 	=	models.IntegerField(blank=True, null=True)
	total_units 	= 	models.IntegerField(blank=True, null=True)
	created_at 		= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 		= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "courses"


class CoursesSerializer(serializers.HyperlinkedModelSerializer):
	pass