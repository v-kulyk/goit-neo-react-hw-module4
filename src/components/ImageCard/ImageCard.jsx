import styles from "./ImageCard.module.css";
export default function ImageCard({ image }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={image.urls.small}
          alt={image.alt_description}
          data-id={image.id}
        />
      </div>
      <div className={styles.details}>
        <p>
          Author: <b>{image.user.name}</b>
        </p>
        {image.likes && (
          <p>
            Likes: <b>{image.likes}</b>
          </p>
        )}
      </div>
    </div>
  );
}
