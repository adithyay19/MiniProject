import { useState } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import '@mui/lab/themeAugmentation';

async function fetchAnswer(question: string): Promise<string> {
  
  await new Promise(resolve => setTimeout(resolve,2000));
  if(question.match('Hello'))
    return "Hey there";
  else
    return 'Answer from the database';
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
          fullwidth
          label='Question' 
          type='search'
          variant='outlined'
          id="
          fullWidth"
          margin='normal' 
          onChange={(event: React.FormEvent<HTMLFormElement>) => setQuestion(event.currentTarget.value)}
        />
        {/* <input type='text' value={question} onChange={(event) => setQuestion(event.target.value)} /> */}
        <br></br>
        <TextField 
          multiline
          id='outlined-multiline-flexible-read-only-input-fullWidth'
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
