import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  remove: RemoveChannelModal,
};

const renderModal = (modalName) => modals[modalName]

export default renderModal