# from pydantic import BaseModel

# class Employee(BaseModel):

#     id: int

#     name: str

#     email: str

#     department: str

#     role: str

#     status: str

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.connection import Base

class Employee(Base):

    __tablename__ = "employees"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    email = Column(String)

    department = Column(String)

    role = Column(String)

    status = Column(String)