from pydantic import BaseModel

class SignupSchema(BaseModel):

    name: str
    email: str
    password: str
    role: str
    company_id: int


class LoginSchema(BaseModel):

    email: str
    password: str


class ForgotPasswordSchema(BaseModel):

    email: str
    new_password: str