function Validation(modifiedFormData) {
    const errors = {}

    const age_val = modifiedFormData.age
    const years_of_experience_val = modifiedFormData.years_of_experience
    
    console.log(years_of_experience_val);
    
    console.log(years_of_experience_val < 0);

    if (age_val < 21 || age_val > 62 ) {
        console.log(age_val);
        errors.age = "Age must be between 21 and 62";
    }
    if (years_of_experience_val < 0 || years_of_experience_val > 34 ) {
        errors.years_of_experience = "Value must be between 0 and 34";
    }

    return errors;
}

export default Validation