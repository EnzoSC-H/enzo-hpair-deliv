import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { categories } from '../utils/categories';
import { addEntry, deleteEntry, updateEntry } from '../utils/mutations';

// Modal component for BOTH adding and editing entries

export default function EntryModal({ entry, type, user }) {

   // State variables for modal status

   const [open, setOpen] = useState(false);
   const [isEditing, setIsEditing] = useState(false);

   const [name, setName] = useState(entry.name);
   const [email, setEmail] = useState(entry.email);
   const [description, setDescription] = useState(entry.description);
   const [category, setCategory] = React.useState(entry.category);

   // Modal visibility

   const handleClickOpen = () => {
      setOpen(true);
      setName(entry.name);
      setEmail(entry.email);
      setDescription(entry.description);
      setCategory(entry.category);
   };

   const handleClose = () => {
      setIsEditing(false);
      setOpen(false);
   };

   // Mutation handlers

   const handleEdit = () => {
      const updatedEntry = {
         name: name,
         email: email,
         description: description,
         category: category,
         id: entry.id
      };
      updateEntry(updatedEntry).catch(console.error);
      handleClose();
   };

   const handleAdd = () => {
      const newEntry = {
         name: name,
         email: email,
         description: description,
         user: user?.displayName,
         category: category,
         userid: user?.uid,
      };

      addEntry(newEntry).catch(console.error);
      handleClose();
   };

   const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete?")) {
         deleteEntry(entry).catch(console.error);
         handleClose();
      }
   };

   // Button handlers for modal opening and modal actions

   const openButton =
      type === "edit" ? <IconButton onClick={handleClickOpen}>
         <OpenInNewIcon />
      </IconButton>
         : type === "add" ? <Button variant="contained" onClick={handleClickOpen}>
            Add entry
         </Button>
         : null;

   const actionButtons =
      type === "change" ?
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color='warning' onClick={handleDelete}>Delete</Button>
            <Button variant="contained" onClick={handleEdit} sx={{ display: isEditing ? 'inline' : 'none' }}>Confirm</Button>
            <Button variant="contained" onClick={() => setIsEditing(true)} sx={{ display: isEditing ? 'none' : 'inline' }}>Edit</Button>
         </DialogActions>
         : type === "add" ?
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button variant="contained" onClick={handleAdd}>Add Entry</Button>
            </DialogActions>
            : null;

   return (
      <div>
         {openButton}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{type === "edit" ? name : "Add Entry"}</DialogTitle>
            <DialogContent>
               <TextField
                  margin="normal"
                  id="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  InputProps={{
                     readOnly: type === "edit" ? !isEditing : false,
                  }}
               />
               <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  placeholder="e.g. john_doe@google.com"
                  fullWidth
                  variant="standard"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value) }}
                  InputProps={{
                     readOnly: type === "edit" ? !isEditing : false,
                  }}
               />
               <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  multiline
                  maxRows={8}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  InputProps={{
                     readOnly: type === "edit" ? !isEditing : false,
                  }}
               />
               <FormControl fullWidth sx={{ "marginTop": '20px' }}>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={category}
                     label="Category"
                     onChange={(event) => setCategory(event.target.value)}
                     inputProps={{
                        readOnly: type === "edit" ? !isEditing : false,
                     }}
                  >
                     {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                        {category.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </DialogContent>
            {actionButtons}
         </Dialog>
      </div>
   );
}