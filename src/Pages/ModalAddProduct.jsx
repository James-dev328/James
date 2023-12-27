import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function ModalAddTodo() {
    const navigate = useNavigate();

    const handleClose = () => {
      navigate(-1); 
    };
  
    return (
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
        <Outlet />
        </Box>
      </Modal>
    );
  }
  
export default ModalAddTodo