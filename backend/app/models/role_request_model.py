from pydantic import BaseModel


class RoleRequestSchema(BaseModel):

    user_name: str

    user_email: str

    current_password: str

    admin_email: str

    requested_role: str = "Admin"

    status: str = "Pending"