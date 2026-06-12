from pydantic import BaseModel

class InvitationSchema(BaseModel):
    email: str
    role: str
    company_id: int
    company_name: str
    created_by: str