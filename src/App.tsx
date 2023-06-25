import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import '@mui/lab/themeAugmentation';
import intents from './data/intents.json';

 let i: { forEach: (arg0: { tag: string; patterns: string[]; responses: string[]; }[], arg1: {}) => void; };
 var response:(string);

async function fetchAnswer(question: string): Promise<string> {
  response = 'Invalid Question';
  await new Promise(resolve => setTimeout(resolve,2000));
  intents.intents.forEach(i => {
    if(i.patterns.includes(question)) {
      response = i.responses[0];
    }
  });
  return response;
}

// interface DisplayAnswerProps {
//   answer: string;
// }

// const DisplayAnswer: React.FC<DisplayAnswerProps> = ({answer}) => (
//   <div>
//     <br></br>
//     <TextField 
//       multiline
//       id='outlined-multiline-flexible'
//       label='Answer'
//       value={answer}
      
//     />
//   </div>
// );

const QuestionForm: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(question.trim() === '') {
      setAnswer('');
      return;
    }

    try {
      setLoading(true);
      const fetchedAnswer = await fetchAnswer(question);
      setAnswer(fetchedAnswer);
      setLoading(false);
    }
    catch(error) {
      console.error("Error fetching answer: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField 
          multiline
          label='Question' 
          type='search'
          variant='outlined'
          // id="fullWidth"
          value={question}
          margin='normal' 
          onChange={(event) => setQuestion(event.target.value)}
          
        />
        {/* <input type='text' value={question} onChange={(event) => setQuestion(event.target.value)} /> */}
        <br></br>
        <TextField 
          multiline
          variant='outlined'
          id='multiline-flexible-read-only-input'
          label='Answer'
          rows={3}
          value={answer}
        />
        {/* {answer && <DisplayAnswer answer={answer}/>} */}
        <br></br> <br></br> 
        <LoadingButton 
          loading={loading}
          type='submit'
          variant='contained'
          color='info'
        ><span>Fetch Answer</span></LoadingButton>
      </form>
    </div>
  )
}

const App: React.FC = () => (
  <div>
    
    <QuestionForm/>
  </div>
)

export default App
