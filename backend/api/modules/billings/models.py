from django.db import models
from rest_framework import serializers
from backend.api.modules.miscellaneous.models import Miscellaneous

class Billings(models.Model):
	total_amount		=	models.IntegerField(blank=True, null=True)
	discount			=	models.IntegerField(blank=True, null=True)
	created_at 			= 	models.DateTimeField(auto_now_add=True, blank=True, null=True)
	updated_at 			= 	models.DateTimeField(auto_now=True, blank=True, null=True)

	class Meta:
		db_table = "billings"


class BillingsSerializer(serializers.HyperlinkedModelSerializer):
	pass



class MiscBillings(models.Model):
	miscellaneous 	=	models.ForeignKey(Miscellaneous, on_delete=models.CASCADE)
	billing 		=	models.ForeignKey(Billings, on_delete=models.CASCADE)

	class Meta:
		db_table = "misc_billings"


class MiscillingsSerializer(serializers.HyperlinkedModelSerializer):
	pass