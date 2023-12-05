import React, { useState } from 'react';
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  department: string;
  sub_departments: string[];
}

interface SecondComponentProps {
  data: Department[];
}

const SecondComponent: React.FC<SecondComponentProps> = ({ data }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (department: string) => {
    if (expanded === department) {
      setExpanded(null);
    } else {
      setExpanded(department);
    }
  };

  const handleSelect = (department: string) => {
    if (selected.includes(department)) {
      // Remove the department from the selected list
      setSelected((prevSelected) =>
        prevSelected.filter((item) => item !== department)
      );
    } else {
      // Add the department to the selected list
      setSelected((prevSelected) => [...prevSelected, department]);
    }
  };

  const handleSelectAllSubDepartments = (
    department: string,
    subDepartments: string[]
  ) => {
    if (selected.includes(department)) {
      // Remove all sub-departments from the selected list
      setSelected((prevSelected) =>
        prevSelected.filter((item) => !subDepartments.includes(item))
      );
    } else {
      // Check if all sub-departments are already selected
      if (subDepartments.every((item) => selected.includes(item))) {
        // Remove all sub-departments from the selected list
        setSelected((prevSelected) =>
          prevSelected.filter((item) => !subDepartments.includes(item))
        );
        return;
      }

      // Prevent duplicate sub-departments
      const filteredSubDepartments = subDepartments.filter(
        (item) => !selected.includes(item)
      );

      // Add all sub-departments to the selected list
      setSelected((prevSelected) => [
        ...prevSelected,
        ...filteredSubDepartments,
      ]);
    }
  };

  const determineSelectionStatus = (department: string) => {
    const subDepartments = data.find(
      (item) => item.department === department
    )?.sub_departments;

    if (!subDepartments) {
      return 'notSelected';
    }

    if (subDepartments.every((item) => selected.includes(item))) {
      return 'fullySelected';
    }

    if (subDepartments.some((item) => selected.includes(item))) {
      return 'partiallySelected';
    }

    return 'notSelected';
  };

  return (
    <List>
      {data.map((item) => (
        <React.Fragment key={item.department}>
          <ListItem
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={
                  determineSelectionStatus(item.department) === 'fullySelected'
                }
                indeterminate={
                  determineSelectionStatus(item.department) ===
                  'partiallySelected'
                }
                onClick={() => {
                  handleSelectAllSubDepartments(
                    item.department,
                    item.sub_departments
                  );
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.department}
              onClick={() => handleToggle(item.department)}
            />
            {expanded === item.department ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={expanded === item.department}
            timeout="auto"
            unmountOnExit
          >
            <List>
              {item.sub_departments.map((subDepartment) => (
                <ListItem
                  key={subDepartment}
                  sx={{
                    pl: 4,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                  onClick={() => handleSelect(subDepartment)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected.includes(subDepartment)}
                      onClick={() => handleSelect(subDepartment)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default SecondComponent;
