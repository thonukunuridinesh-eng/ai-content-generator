import os
from openai import OpenAI

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import GeneratedContent
from .serializers import GeneratedContentSerializer

def get_openai_client():
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        return None

    return OpenAI(api_key=api_key)


class GenerateContentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        content_type = request.data.get("content_type")
        prompt = request.data.get("prompt")

        if not content_type or not prompt:
            return Response({"error": "Content type and prompt are required"}, status=400)

        system_prompt = f"""
        You are a premium AI content writer for businesses.
        Generate professional, clear, attractive {content_type} content.
        Make it polished, engaging, and business-ready.
        """

        try:
            client = get_openai_client()

            if client is None:
                raise RuntimeError("OPENAI_API_KEY is not configured")

            ai_response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=700
            )

            result = ai_response.choices[0].message.content

        except Exception:
            result = f"Demo AI Output: Premium {content_type} content generated for: {prompt}"

        saved = GeneratedContent.objects.create(
            user=request.user,
            content_type=content_type,
            prompt=prompt,
            result=result
        )

        return Response({
            "message": "Content generated successfully",
            "data": GeneratedContentSerializer(saved).data
        })


class HistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        history = GeneratedContent.objects.filter(user=request.user).order_by("-created_at")
        serializer = GeneratedContentSerializer(history, many=True)
        return Response(serializer.data)
