import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CustomButton from "./CustomButton";
import { DeleteTaskModalProps } from "../types";

const DeleteTaskModal = ({
  open,
  task,
  onClose,
  onConfirm,
}: DeleteTaskModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-lg font-semibold p-5">
        Delete this task?
      </DialogTitle>

      <DialogContent className="text-base px-5">
        Are you sure to delete &quot;
        <span className="text-red-600 font-semibold">{task?.title ?? ""}</span>
        &quot;?
      </DialogContent>

      <DialogActions className="px-5 pb-4">
        <CustomButton
          title="Cancel"
          onClick={onClose}
          className="text-gray-600 hover:bg-gray-600 hover:text-white transition px-4 py-2 rounded-lg"
        />
        <CustomButton
          title="Delete"
          onClick={() => task && onConfirm(task.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition"
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskModal;
