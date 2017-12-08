import {Sortable} from '../../../scripts/vendor/draggable';

export default function Transformed() {
  const containerSelector = '#Transformed .TransformedList';
  const containers = document.querySelectorAll(containerSelector);
  const sortable = new Sortable(containers, {
    draggable: '.TransformedListItem--isDraggable',
    appendTo: containerSelector,
    mirror: {
      constrainDimensions: true,
    },
  });

  // --- Drag states --- //
  sortable.on('drag:start', evt => {
    evt.originalSource.classList.add('TransformedListItem--isCloned');
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('TransformedListItem--isCloned');
  });

  return sortable;
}
