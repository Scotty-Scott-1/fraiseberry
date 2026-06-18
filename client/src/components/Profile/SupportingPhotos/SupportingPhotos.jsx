import {
  PhotoSlot,
  Card,
  Subtitle2,
  PhotoGrid
 } from "./index.js";

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
