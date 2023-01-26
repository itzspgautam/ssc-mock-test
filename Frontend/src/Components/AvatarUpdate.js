import React from "react";
import {
  Box,
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { MdUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import getCroppedImg from "../Utils/CropImage";
import { CandidateAction } from "../State/Actions";

const AvatarUpdate = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectImageInput = useRef();

  const Dispatch = useDispatch();
  const { uploadingImage, uploadedImage } = useSelector(
    (state) => state.Candidate
  );

  const [image, setImage] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const selectImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const render = new FileReader();
      render.readAsDataURL(e.target.files[0]);
      render.addEventListener("load", () => {
        setImage(render.result);
      });
    }
  };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const cropAndUpload = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      Dispatch(CandidateAction.updateAvatar(croppedImage));
    } catch (e) {
      console.warn(e);
    }
  }, [croppedAreaPixels, rotation, image, Dispatch]);

  useEffect(() => {
    if (uploadedImage) {
      onClose();
    }
  }, [uploadedImage, onClose]);

  return (
    <>
      <span onClick={onOpen}>{props.children}</span>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent overflow={"hidden"}>
          <ModalBody p="0">
            {image ? (
              <>
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={2 / 3}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{
                    containerStyle: {
                      height: "350px",
                      position: "relative",
                      zIndex: "0",
                    },
                    mediaStyle: {},
                    cropAreaStyle: { borderRadius: "10px" },
                  }}
                  objectFit="auto-cover"
                />
              </>
            ) : (
              <Box
                h="350px"
                onClick={() => {
                  selectImageInput.current.click();
                }}
              >
                <Center
                  justifyContent={"center"}
                  h="100%"
                  flexDirection={"column"}
                  _hover={{ bg: "#E6E7E8" }}
                >
                  <MdUpload fontSize={"150px"} color="#A0AEC0" />
                  <Text color="#A0AEC0">Click Here To Select Image</Text>
                </Center>
              </Box>
            )}
          </ModalBody>
          <Input
            type="file"
            ref={selectImageInput}
            onChange={selectImage}
            display="none"
          />
          <ModalFooter>
            {image ? (
              <>
                <Button
                  size="sm"
                  colorScheme="gray"
                  mr={3}
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Select another
                </Button>
                <Button
                  isLoading={uploadingImage ? true : false}
                  size="sm"
                  variant="solid"
                  colorScheme={"yellow"}
                  onClick={cropAndUpload}
                >
                  Crop And Upload
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                colorScheme="red"
                mr={3}
                onClick={() => {
                  setImage(null);
                  onClose();
                }}
              >
                Cancel
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AvatarUpdate;
