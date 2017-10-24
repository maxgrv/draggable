import {Sortable} from '../../../scripts/vendor/draggable';

export default function MultipleContainers() {
  const containerSelector = '#MultipleContainers .Container';
  const containers = document.querySelectorAll(containerSelector);
  const sortable = new Sortable(containers, {
    draggable: '.StackedListItem--isDraggable',
    appendTo: source => source.parentNode,
    mirror: {
      constrainDimensions: true,
    },
  });

  let lastOverContainer;

  // --- Drag states --- //
  sortable.on('drag:start', evt => {
    evt.originalSource.classList.add('StackedListItem--isCloned');
    console.log('Drag: Start', evt); // eslint-disable-line no-console
  });

  sortable.on('drag:over', evt => {
    if (lastOverContainer === evt.overContainer) {
      return;
    }

    const overRect = evt.over.getBoundingClientRect();
    withTransition(evt.mirror, () => {
      evt.mirror.style.width = `${overRect.width}px`;
      evt.mirror.style.height = `${overRect.height}px`;
    });

    lastOverContainer = evt.overContainer;
  });

  sortable.on('drag:over:container', evt => {
    evt.data.overContainer.appendChild(evt.mirror);
    console.log('Drag: Over', evt); // eslint-disable-line no-console
  });

  sortable.on('drag:stop', evt => {
    evt.originalSource.classList.remove('StackedListItem--isCloned');
    console.log('Drag: Stop', evt); // eslint-disable-line no-console
  });

  function withTransition(element, callback) {
    element.style.transition = 'all 200ms ease';
    callback();
    setTimeout(() => {
      element.style.transition = '';
    }, 200);
  }

  return sortable;
}
