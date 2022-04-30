import { useState } from 'react';
import './App.css';
// ------------------------------- Imports styles -------------------------------
import { StepperContext } from './context/StepperContext';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';
// ------------------------------- Imports components -------------------------------
import Account from './components/steps/Account';
import Details from './components/steps/Details';
import Final from './components/steps/Final';
import Payment from './components/steps/Payment';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [userData, setUserData] = useState('');

  const [finalData, setFinalData] = useState([]);

  const steps = [
    'Account Information',
    'Personal Details',
    'Complete'
  ];

  const displayStep = (step) => {
    switch(step) {
      case 1: 
        return <Account />
      case 2: 
        return <Details />
      case 3: 
        return <Final />
      default:
    }
  }

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "Next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      {/* Stepper */}
      <div className='container horizontal mt-5'>
        <Stepper 
        steps={steps}
        currentStep={currentStep} />
      </div>
      {/* Disable Components */}
        <div className='my-10 p-10'>
          <StepperContext.Provider value={{
            userData,
            setUserData,
            finalData,
            setFinalData
          }}>
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      {/* Navigation Controls */}
      <StepperControl 
      handleClick={handleClick}
      currentStep={currentStep}
      steps={steps} />
    </div>
  );
}

export default App;
