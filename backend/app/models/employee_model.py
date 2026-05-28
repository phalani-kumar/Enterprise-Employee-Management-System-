# from pydantic import BaseModel

# class Employee(BaseModel):

#     id: int

#     name: str

#     email: str

#     department: str

#     role: str

#     status: str

from pydantic import BaseModel

class EmployeeSchema(BaseModel):

    name: str

    email: str

    department: str

    role: str

    status: str