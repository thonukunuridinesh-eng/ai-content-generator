from rest_framework import serializers
from .models import GeneratedContent

class GeneratedContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneratedContent
        fields = "__all__"
        read_only_fields = ["user", "result", "created_at"]