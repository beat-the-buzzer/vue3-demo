import { shallowRef } from 'vue';
import UploadPreviewModal from '/@/components/Upload/src/UploadPreviewModal.vue';
import { useModal } from '/@/components/Modal';

const [registerPreviewModal, { openModal: openPreviewModal }] = useModal();
export function useFilePreview() {
  const curFileList = shallowRef([]);
  const openFileModal = (list) => {
    curFileList.value = list;
    openPreviewModal(true, {});
  };
  return { curFileList, openFileModal, UploadPreviewModal, registerPreviewModal, openPreviewModal };
}
