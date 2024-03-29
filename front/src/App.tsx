import { Route, Routes } from 'react-router-dom';

import { Container, CssBaseline } from '@mui/material';



import Blocks from "./containers/Blocks/Blocks";
import CommentsBoard from './components/CommentsBoard';



const App = () => (

  <>

    <CssBaseline />

    

    <main>

      <Container maxWidth="xl">

        <Routes>
          <Route path="/news/:newsId" element={<CommentsBoard />} />
          <Route path="/news" element={<Blocks />} />

        </Routes>

      </Container>

    </main>

  </>

);



export default App;

