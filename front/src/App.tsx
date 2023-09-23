import { Route, Routes } from 'react-router-dom';

import { Container, CssBaseline } from '@mui/material';



import Blocks from "./containers/Blocks/Blocks";



const App = () => (

  <>

    <CssBaseline />

    

    <main>

      <Container maxWidth="xl">

        <Routes>

          <Route path="/" element={<Blocks />} />

        </Routes>

      </Container>

    </main>

  </>

);



export default App;

