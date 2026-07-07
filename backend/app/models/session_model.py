from pydantic import BaseModel


class SessionSchema(BaseModel):

    user_id: int

    company_id: int

    user_name: str

    email: str

    browser: str

    ip_address: str

    device_name: str

    trusted: bool = False