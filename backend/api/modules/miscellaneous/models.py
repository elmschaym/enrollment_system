from django.db import models
from rest_framework import serializers


class Miscellaneous(models.Model):
	name				=	models.CharField(max_length=32)
	created_at 			= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 			= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "miscellaneous"


class MiscellaneousSerializer(serializers.HyperlinkedModelSerializer):
	pass