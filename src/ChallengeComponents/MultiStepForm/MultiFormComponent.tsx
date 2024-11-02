import { useState } from 'react';
import classes from './MultiFormComponent.module.scss';

const MultiFormComponent = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        portfolio: '',
        skillLevel: '',
        challenges: 0,
    });
    const [currentStep, setCurrentStep] = useState(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(currentStep);
        if (currentStep !== 4 && currentStep !== 0) {
            setCurrentStep((prev) => ++prev);
        } else {
            setCurrentStep(0);
            console.log(formData);
        }

    }   

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData, [name]: value
        });
    }

    const frontEndChallenges = [{name: 'HTML/CSS/JS', id: 1}, {name: 'ReactJs', id: 2}, {name: 'AngularJS', id: 3}, 
        {name: 'vue.js', id: 4}];

    const skillLevels =  ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    const fieldNames = {
        fullName: 'Full Name',
        email: 'E-Mail',
        phoneNumber: 'Phone Number',
        portfolio: 'Portfolio',
        skillLevel: 'Skill Level',
        challenges: 'Challenges',
    }

    const isNextDisabled = () => {
        switch (currentStep) {
          case 1:
            return !formData.fullName || !formData.email || !formData.phoneNumber || !formData.portfolio;
          case 2:
            return !formData.skillLevel;
          case 3:
            return  formData.challenges === 0;
          default:
            return false;
        }
      };

    return <div className={classes.content}>
        <h1>Join Our Community of Developers</h1>
        <h3>To Join our community and participate in frontend challenges.Please fill out the following form</h3>

        <div className={classes.formCard}>
            {
                currentStep === 0 ? 
                
                <div className={classes.completed}>
                    <i className="fa-solid fa-circle-check"></i>
                    <h2>Congratualtion! &#x1F389;</h2>
                    <p>Your profile has been created and you are now ready to start 
                        participating in challenges that match your interest and 
                        coding experince level.
                    </p>
                </div> : 
                <>
                            <div className={classes.progressBar}>
                <ul className={classes.progressSteps}>
                    <li className={ currentStep >= 1 ? classes.active : ''}>1</li>
                    <li className={ currentStep >= 2 ? classes.active : ''}>2</li>
                    <li className={ currentStep >= 3 ? classes.active : ''}>3</li>
                    <li className={ currentStep >= 4 ? classes.active : ''}>4</li>
                </ul>
            </div>
            <hr/>
            <div className={classes.cardForm}>
                {currentStep === 1 && <div>
                <h2>Personal Information</h2>
                <h4>Please provide your personal information so we can know you better</h4>
                </div>}

                {currentStep === 2 && <div>
                <h2>Skill Level</h2>
                <h4>Please tell us about your skill il front-end development</h4>
                </div>}

                {currentStep === 3 && <div>
                <h2>Challenge Preference</h2>
                <h4>Please tell us which frontend challenge you wauld want to participate in</h4>
                </div>}

                {currentStep === 4 && <div>
                <h2>Review and confirm</h2>
                <h4>Please review your information to make sure everything is accurate</h4>
                </div>}

                <form onSubmit={handleSubmit} >
                    {currentStep === 1 && <div className={classes.firstForm}>
                    <div>
                        <label>Full Name</label>
                        <input onChange={handleChange} value={formData.fullName} type='text' name='fullName' placeholder='Full name'></input>
                    </div>
                    <div>
                        <label>Email Address</label>
                    <input  onChange={handleChange} value={formData.email} type='email' name='email' placeholder='example@email.com'></input>
                    </div>
                    <div>
                        <label>Phone number</label>
                        <input onChange={handleChange} value={formData.phoneNumber} type='number' name='phoneNumber' placeholder='PhoneNumber'></input>
                    </div>
                    <div>
                        <label>Portfolio/GitHub Link</label>
                        <input onChange={handleChange} value={formData.portfolio} type='text' name='portfolio' placeholder='github.com/example'></input>
                    </div>
                    </div>}

                    {currentStep === 2 && <div className={classes.secondForm}>
                        <div className={formData.skillLevel === 'Beginner' ? classes.skillActive : ''} onClick={() => setFormData((prev) => ({...prev, skillLevel: 'Beginner'}))}><i className="fa-regular fa-user"></i><span>Beginner</span></div>
                        <div className={formData.skillLevel === 'Intermediate' ? classes.skillActive : ''} onClick={() => setFormData((prev) => ({...prev, skillLevel: 'Intermediate'}))}><i className="fa-regular fa-gem"></i><span>Intermediate</span></div>
                        <div className={formData.skillLevel === 'Advanced' ? classes.skillActive : ''} onClick={() => setFormData((prev) => ({...prev, skillLevel: 'Advanced'}))}><i className="fa-solid fa-chess-queen"></i><span>Advanced</span></div>
                        <div className={formData.skillLevel === 'Expert' ? classes.skillActive : ''} onClick={() => setFormData((prev) => ({...prev, skillLevel: 'Expert'}))}><i className="fa-solid fa-user-graduate"></i><span>Expert</span></div>
                    </div>}

                    {currentStep === 3 && <div className={classes.secondForm}>
                        {
                            frontEndChallenges.map(item => {
                                return (
                                    <div key={item.id} className={formData.challenges === item.id ? classes.skillActive : ''}>
                                        <input id={`check${item.id}`}  type='checkbox' checked ={item.id === formData.challenges} onChange={() => setFormData((prev) => ({...prev, challenges: item.id}))}/><label htmlFor={`check${item.id}`}>{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>}

                    {currentStep === 4 && <div className={classes.forthStep}>
                        {
                            Object.entries(formData).map((item) => {
                                console.log(item)
                                return <div className={classes.reviewDiv}>
                                    <span className={classes.fieldName}>{fieldNames[item[0]]}</span>
                                    {item[0] !== 'challenges' && <span>{item[1]}</span>}
                                    {item[0] === 'challenges' && item[1] !== 0 && <span>{frontEndChallenges.filter((el) => el.id === item[1])[0].name}</span>}
                                </div>
                            })
                        }
                    </div>}

                    <hr />
                    <div className={classes.buttons}>
                    {currentStep > 1 && <div className={classes.backButton}>
                    <button type='button' onClick={() => setCurrentStep((prev) => --prev)}>Go Back</button>
                    </div>}
                    <div className={classes.formButton}>
                    <button type='submit' disabled = {isNextDisabled()}>{currentStep <4 ? 'Next Step' : 'Submit'}</button>
                    </div>
                    </div>

                </form>
            </div>
                </>
            }
        </div>
    </div>
}

export default MultiFormComponent;