
import PhotoSlot from "./SupportingPhotoSection/PhotoSlot/PhotoSlot";
import Card from "../Utils/Card/Card";
import { Subtitle2 } from "../Utils/Title/Title";
import PhotoGrid from "./SupportingPhotoSection/PhotoGrid/PhotoGrid";

const SupportingPhotos = ({
  supportingPic1,
  supportingPic2,
  supportingPic3,
  onChange,
}) => {
  return (
    <Card>
      <Subtitle2>Supporting Photos</Subtitle2>
      <PhotoGrid
        supportingPic1={supportingPic1}
        supportingPic2={supportingPic2}
        supportingPic3={supportingPic3}
        onChange={onChange}
      />
    </Card>
  );
};

export default SupportingPhotos;
