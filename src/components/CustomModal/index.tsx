import React, { FC } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "..";
import "./customModal.scss";

interface Props {
  children: any;
  title: string;
  show: boolean;
  close: any;
  mainClassName: string;
  className?: string;
  showFooter?: any;
  fullscreen?: boolean;
  centered?: boolean;
  cancelText?: string;
  handleClose?: any;
  showSaveButton?: any;
  handelConfirm?: any;
  isLoading?: boolean;
  size?: "sm" | "lg" | "xl";
  buttonVariant?: string;
  backdrop?: boolean | "static";
  keyboard?: boolean;
  closeButton?: boolean;
}
const CustomModal: FC<Props> = ({
  children,
  title,
  show,
  size,
  close,
  className,
  mainClassName,
  showFooter,
  cancelText,
  handleClose,
  handelConfirm,
  showSaveButton,
  isLoading,
  buttonVariant,
  backdrop = true,
  keyboard = true,
  closeButton = true,
}) => {
  // console.log(`CustomModal ${mainClassName} - show:`, show, "backdrop:", backdrop, "keyboard:", keyboard);
  
  return (
    <Modal
      className={mainClassName}
      show={show}
      onHide={close}
      centered
      size={size}
      backdrop={backdrop}
      keyboard={keyboard}
    >
      <Modal.Header closeButton={closeButton}>
        {title && <Modal.Title>{title}</Modal.Title>}
      </Modal.Header>
      <Modal.Body className={className}>{children}</Modal.Body>
      {showFooter && (
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            {cancelText ? cancelText : "Close"}
          </Button>

          {showSaveButton && (
            <Button onClick={handelConfirm} variant={buttonVariant || "success"} isLoading={isLoading} disabled={isLoading}>
              {showSaveButton ? showSaveButton : "Close"}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
