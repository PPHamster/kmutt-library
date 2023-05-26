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

export const mainListItems = (
  <React.Fragment>
    <ListItemButton to='/admin/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton to='/admin/dashboard/book'>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Books" />
    </ListItemButton>
    <ListItemButton to='/admin/dashboard/blog'>
      <ListItemIcon>
        <ArticleIcon />
      </ListItemIcon>
      <ListItemText primary="Blog" />
    </ListItemButton>
    <ListItemButton to='/admin/dashboard/event'>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Event" />
    </ListItemButton>
    <ListItemButton to='/admin/dashboard/room'>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Room" />
    </ListItemButton>
  </React.Fragment>
);
