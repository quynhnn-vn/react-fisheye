export default function Modal({ isShowModal, selectedPhoto, children }) {
  return isShowModal && children;
}
