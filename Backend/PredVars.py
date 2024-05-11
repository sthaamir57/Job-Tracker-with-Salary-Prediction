from pydantic import BaseModel

class PredVar(BaseModel):
    age: int
    gender: int
    education_level: int
    job_title: int
    years_of_experience: float
    modelnum: int