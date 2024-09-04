import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import { searchImages } from "./api/images.js";
import { ProgressBar } from "react-loader-spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import Modal from "react-modal";
import styles from "./App.module.css";

Modal.setAppElement("#root");

export default function App() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const refModal = useRef(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await searchImages({ query: filter, page });

        setImages((prevData) => [...prevData, ...data.results]);
        setIsLoading(false);
        setHasMoreImages(page < data.total_pages);
      } catch (error) {
        setIsError(true);
        setHasMoreImages(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (!filter) {
      setImages([]);
      setIsLoading(false);
      setIsError(false);
      setHasMoreImages(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    fetchImages();
  }, [filter, page]);

  const handleOnSearch = function (query) {
    setFilter(query);
    setPage(1);
  };
  const handleOnImageClick = function (image) {
    setSelectedImage(image);
  };

  return (
    <>
      <header>
        <SearchBar disabled={isLoading} onSearch={handleOnSearch} />
      </header>
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={handleOnImageClick}
        ></ImageGallery>
      )}
      {isLoading && <ProgressBar />}
      {isError && <ErrorMessage></ErrorMessage>}
      {hasMoreImages && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)}></LoadMoreBtn>
      )}
      <Modal
        isOpen={selectedImage !== null}
        className={{ base: styles.modalContent }}
        style={{
          overlay: {
            overflow: "clip",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            border: "none",
          },
        }}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <img
            className={styles.modalImage}
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description}
          />
        )}
      </Modal>
    </>
  );
}
