import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to='/admin/dashboard/order'>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Order" />
      </ListItemButton>
    </Link>
    <Link to='/admin/dashboard/book'>
      <ListItemButton>
        <ListItemIcon>
          <LibraryBooksIcon />
        </ListItemIcon>
        <ListItemText primary="Book" />
      </ListItemButton>
    </Link>
    <Link to='/admin/dashboard/blog'>
      <ListItemButton>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItemButton>
    </Link>
    <Link to='/admin/dashboard/event'>
      <ListItemButton>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Event" />
      </ListItemButton>
    </Link>
    <Link to='/admin/dashboard/room'>
      <ListItemButton>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Room" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
