import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

export default function ImageModal({ image, onRequestClose }) {
  return (
    <ReactModal
      isOpen={image !== null}
      className={styles.modalContent}
      style={{
        overlay: {
          overflow: "clip",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          border: "none",
        },
      }}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => onRequestClose()}
    >
      {image && (
        <img
          className={styles.modalImage}
          src={image.urls.regular}
          alt={image.alt_description}
        />
      )}
    </ReactModal>
  );
}
