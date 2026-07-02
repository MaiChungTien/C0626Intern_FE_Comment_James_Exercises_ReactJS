import "./deletemodal.css";
const DeleteModal = ({ name, onConfirm, onCancel }) => {
  return (
    <>
      <div className="modal" style={{ display: "flex" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body text-center">
              <i className="fas fa-exclamation-triangle warning-icon"></i>
              <p className="mb-0">
                Are you sure you want to delete this {name} item?
                <br />
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                <i className="fas fa-times me-2"></i>Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                <i className="fas fa-trash-alt me-2"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
