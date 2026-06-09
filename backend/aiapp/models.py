from django.db import models
from django.contrib.auth.models import User

class GeneratedContent(models.Model):
    CONTENT_TYPES = (
        ("blog", "Blog"),
        ("email", "Email"),
        ("linkedin", "LinkedIn"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    prompt = models.TextField()
    result = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.content_type}"