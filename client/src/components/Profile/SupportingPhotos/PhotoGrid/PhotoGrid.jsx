import PhotoSlot from "../PhotoSlot/PhotoSlot";
import styles from "./PhotoGrid.module.css";

const PhotoGrid = ({
  supportingPic1,
  supportingPic2,
  supportingPic3,
  onChange,
}) => {
  return (
    <div className={styles.photosGrid}>
        <PhotoSlot
          title="Photo 1"
          photo={supportingPic1}
          onChange={(photo) => onChange("supportingPic1", photo)}
        />
        <PhotoSlot
          title="Photo 2"
          photo={supportingPic2}
          onChange={(photo) => onChange("supportingPic2", photo)}
        />
        <PhotoSlot
          title="Photo 3"
          photo={supportingPic3}
          onChange={(photo) => onChange("supportingPic3", photo)}
        />
      </div>
  );
}

export default PhotoGrid;
