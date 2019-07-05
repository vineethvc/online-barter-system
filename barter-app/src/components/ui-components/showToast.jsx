import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const showToast = (message, position) =>  
toast.notify(message, {
    position
  });

export default showToast