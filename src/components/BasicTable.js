import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getCategory } from '../utils/categories';
import EntryModal from './EntryModal';

// Table component that displays entries on home screen

export default function BasicTable({ entries }) {
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Open</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {entries.map((entry) => (
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><a href={`mailto:${entry.email}`}>{entry.email}</a></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
