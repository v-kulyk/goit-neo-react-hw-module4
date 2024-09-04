import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  const handleOnClick = function (event) {
    if (event.target.tagName !== "IMG") return;

    const clickedImage = images.filter((image) => {
      return image.id === event.target.dataset.id;
    })[0];

    onImageClick(clickedImage);
  };
  return (
    <ul className={styles.container} onClick={handleOnClick}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
