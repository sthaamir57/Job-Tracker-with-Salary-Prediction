import { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import './FormApp.css'
import Validation from '../../helper/Validation'
import formatNumber from '../../helper/formatNumber'

function FormApp() {
    const [send, setSend] = useState(false)
    const [result, setResult] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        education_level: "",
        job_title: "",
        years_of_experience: "",
        modelnum: "",
    })

    const [errors, setErrors] = useState({})
    
    const [prediction, setPrediction] = useState(null)
    
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }
    
    const modifiedFormData = {
        age: Number(formData.age),
        gender: Number(formData.gender),
        education_level: Number(formData.education_level),
        job_title: Number(formData.job_title),
        years_of_experience: Number(formData.years_of_experience),
        modelnum: Number(formData.modelnum),
    }
    
    const handleSubmit = async (event) => {
        // handleValidation()
    
        try {
            console.log(JSON.stringify(modifiedFormData));
            const response = await fetch(`${import.meta.env.VITE_URL}`, {
                method: 'POST',
                body: JSON.stringify(modifiedFormData),
                headers: {
                    'content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data.prediction);
            setPrediction(data.prediction);
            setSend(true);
            setResult(true);
            console.log(prediction);
            // console.log(JSON.stringify(modifiedFormData));
        } catch (error) {
                console.error(error);
            }
                console.log(JSON.stringify(modifiedFormData));
        }

        function handleValidation(event) {
            event.preventDefault();
            setErrors(Validation(modifiedFormData));

            setIsSubmit(true);
        }

    useEffect(() => {
        console.log(errors);
        if (Object.keys(errors).length === 0 && isSubmit) {
            handleSubmit();
        } else {
            setResult(false);
        }
    }, [errors])

        const jobTitles = [
        'Account Manager', 'Accountant', 'Administrative Assistant',
        'Back end Developer', 'Business Analyst',
        'Business Development Manager', 'Business Intelligence Analyst',
        'CEO', 'Chief Data Officer', 'Chief Technology Officer',
        'Content Marketing Manager', 'Copywriter', 'Creative Director',
        'Customer Service Manager', 'Customer Service Rep',
        'Customer Service Representative', 'Customer Success Manager',
        'Customer Success Rep', 'Data Analyst', 'Data Entry Clerk',
        'Data Scientist', 'Delivery Driver', 'Digital Content Producer',
        'Digital Marketing Manager', 'Digital Marketing Specialist',
        'Director', 'Director of Business Development',
        'Director of Data Science', 'Director of Engineering',
        'Director of Finance', 'Director of HR',
        'Director of Human Capital', 'Director of Human Resources',
        'Director of Marketing', 'Director of Operations',
        'Director of Product Management', 'Director of Sales',
        'Director of Sales and Marketing', 'Event Coordinator',
        'Financial Advisor', 'Financial Analyst', 'Financial Manager',
        'Front End Developer', 'Front end Developer',
        'Full Stack Engineer', 'Graphic Designer', 'HR Generalist',
        'HR Manager', 'Help Desk Analyst', 'Human Resources Coordinator',
        'Human Resources Director', 'Human Resources Manager',
        'IT Manager', 'IT Support', 'IT Support Specialist',
        'Junior Account Manager', 'Junior Accountant',
        'Junior Advertising Coordinator', 'Junior Business Analyst',
        'Junior Business Development Associate',
        'Junior Business Operations Analyst', 'Junior Copywriter',
        'Junior Customer Support Specialist', 'Junior Data Analyst',
        'Junior Data Scientist', 'Junior Designer', 'Junior Developer',
        'Junior Financial Advisor', 'Junior Financial Analyst',
        'Junior HR Coordinator', 'Junior HR Generalist',
        'Junior Marketing Analyst', 'Junior Marketing Coordinator',
        'Junior Marketing Manager', 'Junior Marketing Specialist',
        'Junior Operations Analyst', 'Junior Operations Coordinator',
        'Junior Operations Manager', 'Junior Product Manager',
        'Junior Project Manager', 'Junior Recruiter',
        'Junior Research Scientist', 'Junior Sales Associate',
        'Junior Sales Representative', 'Junior Social Media Manager',
        'Junior Social Media Specialist', 'Junior Software Developer',
        'Junior Software Engineer', 'Junior UX Designer',
        'Junior Web Designer', 'Junior Web Developer',
        'Juniour HR Coordinator', 'Juniour HR Generalist',
        'Marketing Analyst', 'Marketing Coordinator', 'Marketing Director',
        'Marketing Manager', 'Marketing Specialist', 'Network Engineer',
        'Office Manager', 'Operations Analyst', 'Operations Director',
        'Operations Manager', 'Principal Engineer', 'Principal Scientist',
        'Product Designer', 'Product Manager', 'Product Marketing Manager',
        'Project Engineer', 'Project Manager', 'Public Relations Manager',
        'Receptionist', 'Recruiter', 'Research Director',
        'Research Scientist', 'Sales Associate', 'Sales Director',
        'Sales Executive', 'Sales Manager', 'Sales Operations Manager',
        'Sales Representative', 'Senior Account Executive',
        'Senior Account Manager', 'Senior Accountant',
        'Senior Business Analyst', 'Senior Business Development Manager',
        'Senior Consultant', 'Senior Data Analyst', 'Senior Data Engineer',
        'Senior Data Scientist', 'Senior Engineer',
        'Senior Financial Advisor', 'Senior Financial Analyst',
        'Senior Financial Manager', 'Senior Graphic Designer',
        'Senior HR Generalist', 'Senior HR Manager',
        'Senior HR Specialist', 'Senior Human Resources Coordinator',
        'Senior Human Resources Manager',
        'Senior Human Resources Specialist', 'Senior IT Consultant',
        'Senior IT Project Manager', 'Senior IT Support Specialist',
        'Senior Manager', 'Senior Marketing Analyst',
        'Senior Marketing Coordinator', 'Senior Marketing Director',
        'Senior Marketing Manager', 'Senior Marketing Specialist',
        'Senior Operations Analyst', 'Senior Operations Coordinator',
        'Senior Operations Manager', 'Senior Product Designer',
        'Senior Product Development Manager', 'Senior Product Manager',
        'Senior Product Marketing Manager', 'Senior Project Coordinator',
        'Senior Project Engineer', 'Senior Project Manager',
        'Senior Quality Assurance Analyst', 'Senior Research Scientist',
        'Senior Researcher', 'Senior Sales Manager',
        'Senior Sales Representative', 'Senior Scientist',
        'Senior Software Architect', 'Senior Software Developer',
        'Senior Software Engineer', 'Senior Training Specialist',
        'Senior UX Designer', 'Social Media Man', 'Social Media Manager',
        'Social Media Specialist', 'Software Developer',
        'Software Engineer', 'Software Engineer Manager',
        'Software Manager', 'Software Project Manager',
        'Strategy Consultant', 'Supply Chain Analyst',
        'Supply Chain Manager', 'Technical Recruiter',
        'Technical Support Specialist', 'Technical Writer',
        'Training Specialist', 'UX Designer', 'UX Researcher',
        'VP of Finance', 'VP of Operations', 'Web Developer'
    ]

    const location = useLocation();

    const receivedData = location.state;
    // const a = {formData ? formData.job_title : receivedData.id}
    console.log(formData.job_title === "");

  return (
    <>
        <div className="wrapper">
            <form className='form' onSubmit={handleValidation}>
                <div className="group">
                <div className="container">
                <div className='formEle'>
                    <label htmlFor="">Age</label>
                    <input name='age' type="number" placeholder='Your age...' value={formData.age} onChange={handleChange} autoFocus required/>
                    {errors.age && <p className='text-red-500 text-xs'>{errors.age}</p>}
                </div>

                

                <div className='formEle'>
                    <label htmlFor="id_gender">Gender:</label>
                    <select name="gender" required id="id_gender" value={formData.gender} onChange={handleChange}>

                        <option value="0">Female</option>
                        <option value="1">Male</option>
    
                    </select>
                </div>

                <div className='formEle'>
                    <label htmlFor="id_education_level">Education Level:</label>
                    {/* <select name="education_level" required id="id_education_level" value={formData.education_level} onChange={handleChange}> */}
                    <select name="education_level" required id="id_education_level" value={formData.education_level} onChange={handleChange}>
                    {formData.education_level === "" ? formData.education_level = "1" : ""}
                        <option value="1">High School</option>
                        <option value="0">Bachelor's Degree</option>
                        <option value="2">Master's Degree</option>
                        <option value="3">PhD</option>
    
                    </select>
                    {/* <h1 className='text-green-500 '>{formData.education_level}</h1> */}
                </div>

                <div className='formEle'>
                    <label htmlFor="id_job_title">Job Title:</label>
                    {/* <select name="job_title" required id="id_job_title" value={formData.job_title === "" ? receivedData && receivedData.id : formData.job_title} onChange={handleChange}> */}
                    <select name="job_title" required id="id_job_title" value={receivedData && formData.job_title === "" ? receivedData.id : formData.job_title } onChange={handleChange}>

                    {/* {console.log(formData.job_title === "" ? receivedData.id : formData.job_title)} */}
                    {receivedData && formData.job_title === "" ? formData.job_title = receivedData.id : ""}
                    
                    {receivedData && <option key={receivedData.id} value={receivedData.id} selected="true">{receivedData.title}</option>}

                        {jobTitles.map((title, index) => (
                            <option value={index}>
                            {title}
                            </option>

                        ))}

                    </select>
                </div>



                <div className='formEle'>
                    <label htmlFor="id_years_of_experience">Years of Experience</label>
                    <input name='years_of_experience' type="number" placeholder='Your years of experience...' value={formData.years_of_experience} onChange={handleChange} required/>
                    {errors.years_of_experience && <p className='text-red-500 text-xs'>{errors.years_of_experience}</p>}
                </div>

                </div>
                </div>


                <div className='formEle'>
                    <label htmlFor="id_modelnum">Select Model:</label>
                    <select name="modelnum" required id="id_modelnum" value={formData.modelnum} onChange={handleChange}>

                        <option value="0">Predict Using Linear Regression</option>
                        <option value="1">Predict Using Decision Tree Regressor</option>
                        <option value="2">Predict Using Random Forest Regressor</option>
                    </select>
                </div>

                <button className='btn' type='submit'>Predict</button>
            </form>

            <div className="predict">
            {result && (
                <h1 className='text-4xl text-neutral-100'>
                    The predicted income is <br/> Rs. {formatNumber(prediction)}
                </h1>
            )}

            {/* {receivedData && <p>{receivedData.title}{receivedData.id}</p>} */}
            </div>
        </div>

        
    </>
  )
}

export default FormApp

