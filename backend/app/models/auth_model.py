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

from typing import Optional

class ProfileUpdateSchema(BaseModel):

    first_name: Optional[str] = None

    last_name: Optional[str] = None

    phone_number: Optional[str] = None

    department: Optional[str] = None

    designation: Optional[str] = None

    profile_picture: Optional[str] = None

    address: Optional[str] = None

    date_of_joining: Optional[str] = None

    employee_id: Optional[str] = None