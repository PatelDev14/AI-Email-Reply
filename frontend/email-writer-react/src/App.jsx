import { useState } from 'react'
import './App.css'
import { Typography, Container } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';    
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress'; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }
    catch (error) {
      setError('An error occurred while generating the reply. Please try again.');
      console.error('Error:', error);
    }
    finally {
      setLoading(false);
    }

  };
  // return (
  //   <Container maxWidth="md" sx={{py:4}}>
  //     <Typography variant="h4" component="h1" align="center" gutterBottom>
  //       Email Reply Generator
  //     </Typography>
      
  //   <Box sc={{ mx: 3 }}>
  //   <TextField
    
  //     fullWidth
  //     multiline
  //     rows={6}
  //     variant="outlined"
  //     label="Email Content"
  //     value={emailContent || ''}
  //     onChange={(e) => setEmailContent(e.target.value)}
  //     sx={{ mb: 2 }}//margin bottom
  //   />
  //   <FormControl fullWidth sx={{ mb: 2 }}>
  //     <InputLabel>Tone (Optional)</InputLabel>
  //     <Select 
  //     value={tone || ''}
  //     label="Tone (Optional)"
  //     onChange={(e) => setTone(e.target.value)}>
  //       <MenuItem value="formal">Formal</MenuItem>
  //       <MenuItem value="friendly">Friendly</MenuItem>
  //       <MenuItem value="concise">Concise</MenuItem>
  //       <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
  //       <MenuItem value="professional">Professional</MenuItem>
  //       <MenuItem value="casual">Casual</MenuItem>
  //       <MenuItem value="sympathetic">Sympathetic</MenuItem>
  //       <MenuItem value="humorous">Humorous</MenuItem>
  //       <MenuItem value="assertive">Assertive</MenuItem>
  //       <MenuItem value="empathetic">Empathetic</MenuItem>
  //       <MenuItem value="persuasive">Persuasive</MenuItem>
  //       <MenuItem value="optimistic">Optimistic</MenuItem>
  //       <MenuItem value="pessimistic">Pessimistic</MenuItem>
  //       <MenuItem value="sarcastic">Sarcastic</MenuItem>
  //       <MenuItem value="apologetic">Apologetic</MenuItem>
  //       <MenuItem value="encouraging">Encouraging</MenuItem>
  //       <MenuItem value="motivational">Motivational</MenuItem>
  //       <MenuItem value="supportive">Supportive</MenuItem>
  //       <MenuItem value="reassuring">Reassuring</MenuItem>
  //       <MenuItem value="inspirational">Inspirational</MenuItem>
  //       <MenuItem value="thoughtful">Thoughtful</MenuItem>
  //       <MenuItem value="respectful">Respectful</MenuItem>
  //       <MenuItem value="grateful">Grateful</MenuItem>
  //       <MenuItem value="appreciative">Appreciative</MenuItem>
  //       <MenuItem value="sincere">Sincere</MenuItem>  

  //     </Select>
  //   </FormControl>
  //       <Button
  //     variant='contained'
  //     onClick={handleSubmit}
  //     disabled={!emailContent || loading}
  //     fullWidth>
  //     {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
  //       </Button>
  //     </Box>
  //     {error && (
  //       <Typography color="error" align="center" sx={{ mb: 2 }}>
  //         {error}
  //       </Typography>
  //     )}

  //     {generatedReply && (
  //       <Box sx={{ mt: 4 }}>
  //         <Typography variant="h6" gutterBottom>
  //           Generated Reply:
  //         </Typography>
  //         <TextField
  //           fullWidth
  //           multiline
  //           rows={6}
  //           variant="outlined"
  //           value={generatedReply || ''}
  //           inputProps={{
  //              readOnly: true,
  //           }}
  //         />
  //         <Button
  //           variant="outlined"
  //           onClick={() => {
  //             navigator.clipboard.writeText(generatedReply);
  //           }}
  //           sx={{ mt: 2 }}>
  //           Copy to Clipboard
  //           </Button>
  //       </Box>
  //     )}
  //   </Container>
  // )

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 6, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 700, color: '#3b3b3b' }}>
              Email Reply Generator
            </Typography>
            <Box sx={{ mx: 1, my: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Email Content"
                value={emailContent || ''}
                onChange={(e) => setEmailContent(e.target.value)}
                sx={{ mb: 3, background: '#fff', borderRadius: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Tone (Optional)</InputLabel>
                <Select
                  value={tone || ''}
                  label="Tone (Optional)"
                  onChange={(e) => setTone(e.target.value)}
                >
                  {/* ...MenuItems... */}
                  <MenuItem value="formal">Formal</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="concise">Concise</MenuItem>
                  <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="sympathetic">Sympathetic</MenuItem>
                  <MenuItem value="humorous">Humorous</MenuItem>
                  <MenuItem value="assertive">Assertive</MenuItem>
                  <MenuItem value="empathetic">Empathetic</MenuItem>
                  <MenuItem value="persuasive">Persuasive</MenuItem>
                  <MenuItem value="optimistic">Optimistic</MenuItem>
                  <MenuItem value="pessimistic">Pessimistic</MenuItem>
                  <MenuItem value="sarcastic">Sarcastic</MenuItem>
                  <MenuItem value="apologetic">Apologetic</MenuItem>
                  <MenuItem value="encouraging">Encouraging</MenuItem>
                  <MenuItem value="motivational">Motivational</MenuItem>
                  <MenuItem value="supportive">Supportive</MenuItem>
                  <MenuItem value="reassuring">Reassuring</MenuItem>
                  <MenuItem value="inspirational">Inspirational</MenuItem>
                  <MenuItem value="thoughtful">Thoughtful</MenuItem>
                  <MenuItem value="respectful">Respectful</MenuItem>
                  <MenuItem value="grateful">Grateful</MenuItem>
                  <MenuItem value="appreciative">Appreciative</MenuItem>
                  <MenuItem value="sincere">Sincere</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                  boxShadow: 3,
                  mb: 1,
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
              </Button>
            </Box>
            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            {generatedReply && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Generated Reply:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={generatedReply || ''}
                  inputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    background: '#f3f4f6',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedReply);
                  }}
                  sx={{
                    mt: 2,
                    borderColor: '#6366f1',
                    color: '#6366f1',
                    fontWeight: 600,
                    '&:hover': {
                      background: '#6366f1',
                      color: '#fff',
                    },
                  }}
                >
                  Copy to Clipboard
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App
