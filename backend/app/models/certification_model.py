from pydantic import BaseModel
from typing import Optional


class CertificationSchema(BaseModel):

    employee_id: int

    company_id: int

    certification_name: str

    issuing_organization: str

    issue_date: str

    expiry_date: Optional[str] = None

    document_name: Optional[str] = None