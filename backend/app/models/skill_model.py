from pydantic import BaseModel


class SkillSchema(BaseModel):

    employee_id: int

    company_id: int

    skill_name: str

    proficiency_level: str

    years_of_experience: float

    primary_skill: bool = False