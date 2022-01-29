import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult, NotDraggingStyle,
  ResponderProvided
} from 'react-beautiful-dnd';
import Tierlist from '../types/Tierlist';
import { Box, Paper } from '@mui/material';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

const tierlist: Tierlist = {
  tiers: [
    {
      label: 'S',
      color: '#b28704',
      items: [
        {
          label: 'Gragas'
        },
        {
          label: 'Shen'
        },
        {
          label: 'Gwen'
        }
      ]
    },
    {
      label: 'A',
      color: '#4caf50',
      items: []
    },
    {
      label: 'B',
      color: '#2196f3',
      items: []
    },
    {
      label: 'C',
      color: '#9c27b0',
      items: []
    },
  ]
}

const TierlistEditor: React.FC = () => {
  const [list, setList] = useState<Tierlist>(tierlist);

  const getTierContainerStyle = (isDraggingOver: boolean): SxProps<Theme> => {
    return {
      flex: 1,
      display: 'flex',
      backgroundColor: isDraggingOver ? 'background.paper' : 'transparent'
    }
  };

  const getItemStyle = (providedStyle: DraggingStyle | NotDraggingStyle | undefined): SxProps<Theme> => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      height: 100,
      marginLeft: 1,
      ... providedStyle
    }
  };

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sourceTierIndex = +source.droppableId;
    const destinationTierIndex = +destination.droppableId;
    const element = list.tiers[sourceTierIndex].items[source.index];
    list.tiers[sourceTierIndex].items.splice(source.index, 1);
    list.tiers[destinationTierIndex].items.splice(destination.index, 0, element);
    setList({ tiers: list.tiers });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {list.tiers.map((tier, i) => (
        <Droppable direction={'horizontal'} key={tier.label} droppableId={`${i}`}>
          {(provided, snapshot) => (
            <Box sx={{ height: 120, display: 'flex' }}>
              <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: tier.color, width: 100, height: 100 }}>{tier.label}</Paper>
              <Box
                ref={provided.innerRef}
                sx={getTierContainerStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {tier.items.map((item, j) => (
                  <Draggable
                    key={item.label}
                    draggableId={item.label}
                    index={j}
                  >
                    {(provided, snapshot) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(provided.draggableProps.style)}
                      >
                        {item.label}
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            </Box>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default TierlistEditor;
