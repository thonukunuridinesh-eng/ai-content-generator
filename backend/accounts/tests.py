from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class AuthFlowTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_can_register_and_login(self):
        payload = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "securepass123",
        }

        register_response = self.client.post("/api/auth/register/", payload, format="json")

        self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(register_response.data["username"], payload["username"])
        self.assertNotIn("password", register_response.data)

        login_response = self.client.post(
            "/api/auth/login/",
            {"username": payload["username"], "password": payload["password"]},
            format="json",
        )

        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)
        self.assertIn("refresh", login_response.data)
