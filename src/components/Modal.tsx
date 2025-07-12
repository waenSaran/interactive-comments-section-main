import Button from './Button';
import Column from './Column';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => void;
};
function Modal({ isOpen = false, setIsOpen, onConfirmDelete }: ModalProps) {
  if (!isOpen) return;
  return (
    <div className='relative z-10' aria-labelledby='dialog-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-gray-500/75 transition-opacity' aria-hidden='true'></div>

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full justify-center text-center items-center'>
          <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-xs'>
            <Column className='bg-white p-6' gap={4}>
              <h3 className='text-lg font-bold text-gray-800' id='dialog-title'>
                Delete comment
              </h3>
              <p className='text-sm text-gray-500'>
                Are you sure you want to delete this comment? This will remove the comment and can't
                be undone.
              </p>
              <div className='flex w-full gap-3'>
                <Button
                  buttonType='contain'
                  className='w-full justify-center bg-gray-500 text-xs font-semibold text-white'
                  onClick={() => setIsOpen(false)}
                >
                  {'No, Cancel'.toUpperCase()}
                </Button>
                <Button
                  buttonType='contain'
                  className='w-full justify-center bg-error-main text-xs font-semibold text-white'
                  onClick={onConfirmDelete}
                >
                  {'Yes, delete'.toUpperCase()}
                </Button>
              </div>
            </Column>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
