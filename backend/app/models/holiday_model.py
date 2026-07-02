from pydantic import BaseModel


class HolidaySchema(BaseModel):

    holiday_name: str

    holiday_date: str

    description: str = ""

    holiday_type: str

    recurring: bool

    company_id: int

    created_by: str


class HolidayUpdateSchema(BaseModel):

    holiday_name: str

    holiday_date: str

    description: str

    holiday_type: str

    recurring: bool