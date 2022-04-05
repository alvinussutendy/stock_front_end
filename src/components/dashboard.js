import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Header from './header';
import CloseIcon from '@mui/icons-material/Close';

// Table style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// Rest API end point
var API_URL="http://localhost:8080";

// Table heading configuration
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 300 },
  { field: 'price', headerName: 'Price', type: 'number', width: 300 },
];

export default function Dashboard({ setToken }) {
  const [rows, setRows] = React.useState([]); //state for row in table
  const [openFormInput, setOpenFormInput] = React.useState(false); //state for modal form input
  const [openFormUpdate, setOpenFormUpdate] = React.useState(false); //state for modal form update and delete
  const [idSelected, setIdSelected] = React.useState(0); //id of selected row
  const [nameSelected, setNameSelected] = React.useState(); //name of selected row
  const [quantitySelected, setQuantitySelected] = React.useState(); //quantity of selected row
  const [priceSelected, setPriceSelected] = React.useState(); //price of selected row

  //method for open form modal input new stock
  const handleOpenFormInput = () => {
    setOpenFormInput(true);
  };
  //method for close form modal input new stock
  const handleCloseFormInput = () => {
    setOpenFormInput(false);
  };

  //method for open form modal update and delete stock
  const handleOpenFormUpdate = () => {
    setOpenFormUpdate(true);
  };
  //method for delete form modal update and delete stock
  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(false);
  };

 //method for get all stock in database
  const getStockList = () =>{
    let stockList = [];
     axios.get(`${API_URL}/api/stock/`)
      .then(json => {
          json.data.map((obj, idx) => {
              stockList.push({
                id: obj.id,
                name: obj.name,
                quantity: obj.quantity,
                price: obj.price,
              })
          })
      })
      .then(() => setRows(stockList))
  }

  //method for get all stock in database
  const addStockList = (e) =>{
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    let stockList = [...rows];
     axios.post(`${API_URL}/api/stock/add`, {
      name: data.get('name'),
      quantity: data.get('quantity'),
      price: data.get('price')
     })
      .then(json => {
          let obj = json.data;
          stockList.push({
            id: obj.id,
            name: obj.name,
            quantity: obj.quantity,
            price: obj.price,
          })
      })
      .then(() => setRows(stockList))

      handleCloseFormInput();
  }

  //method for update stock in database
  const updateStockList = (e) =>{
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    let stockList = [...rows];
     axios.put(`${API_URL}/api/stock/${idSelected}`, {
      name: nameSelected,
      quantity: quantitySelected,
      price: priceSelected
     })
      .then(json => {
          let obj = json.data;
          let item = stockList.find(objFound => objFound.id == obj.id)
          item.name = obj.name;
          item.quantity = obj.quantity;
          item.price = obj.price;
      })
      .then(() => setRows(stockList))

      handleCloseFormUpdate()
  }

  // method for delete stock in database
  const deleteStockList = () =>{
    console.log(idSelected)
    let stockList = [...rows];
     axios.delete(`${API_URL}/api/stock/${idSelected}`)
      .then(json => {
          var index = stockList.findIndex(obj => obj.id == idSelected)
          console.log(index)
          stockList.splice(index, 1)
      })
      .then(() => setRows(stockList))
  }

  //get all stock list for the first render
  React.useEffect(() => {
      getStockList()
    }, []
  )

  return (
    <>
      <Header setToken={setToken}/>
      <Container fixed sx={{ paddingTop: '30px' }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" class="text-center my-3">
          Stock Data
        </Typography>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleOpenFormInput}
        >
          Add stock
        </Button>
        <div style={{ height: 400, width: '100%' }}>
          <Modal
            open={openFormInput}
            onClose={handleCloseFormInput}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={addStockList} noValidate>
              <div><CloseIcon sx={{ float: 'right', marginRight: '-20px', marginTop: '-5px' }} type="button" onClick={() => handleCloseFormInput()}/></div>
              <Typography id="modal-modal-title" variant="h6" component="h4" class="text-center my-3">
                Add New Stock
              </Typography>
              <TextField
                  margin="normal"
                  fullWidth
                  id="usename"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  id="quantity"
                  type="number"
                  autoComplete="quantity"
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="price"
                  label="Price"
                  id="price"
                  type="number"
                  autoComplete="price"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
            </Box>
          </Modal>

          <Modal
            open={openFormUpdate}
            onClose={handleCloseFormUpdate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form" onSubmit={updateStockList} noValidate>
              <div><CloseIcon sx={{ float: 'right', marginRight: '-20px', marginTop: '-5px' }} type="button" onClick={() => handleCloseFormUpdate()}/></div>
              <Typography id="modal-modal-title" variant="h6" component="h4" class="text-center my-3">
                Edit Stock
              </Typography>
              <TextField
                  margin="normal"
                  fullWidth
                  id="usename"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={nameSelected}
                  onChange={e => setNameSelected(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  id="quantity"
                  type="number"
                  autoComplete="quantity"
                  value={quantitySelected}
                  onChange={e => setQuantitySelected(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="price"
                  label="Price"
                  id="price"
                  type="number"
                  autoComplete="price"
                  value={priceSelected}
                  onChange={e => setPriceSelected(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mb: 2 }}
                  onClick={() => {deleteStockList(); handleCloseFormUpdate()}}
                >
                  Delete
                </Button>
            </Box>
          </Modal>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            onRowClick={(obj) => {
              setIdSelected(obj.row.id)
              setNameSelected(obj.row.name);
              setQuantitySelected(obj.row.quantity);
              setPriceSelected(obj.row.price);
              handleOpenFormUpdate();
            }}
          />
        </div>
      </Container>
    </>
  );
}
